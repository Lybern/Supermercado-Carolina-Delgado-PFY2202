import { useState } from "react";
import { Link } from "react-router";
import useInventario from "../hooks/useInventario";
import {
  CATEGORIAS_INVENTARIO,
  ESTADO_INICIAL_PRODUCTO,
  UNIDADES_MEDIDA,
} from "../data/inventarioData";
import KpiCard from "../components/KpiCard";
import {
  esStockCritico,
  obtenerEstadoStock,
  formatearMoneda,
} from "../utils/inventarioUtils";

function HomeInventario() {
  // Consumo del estado global mediante Context API y hook personalizado
  const { productos, agregarProducto, modificarStock } = useInventario();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [soloCriticos, setSoloCriticos] = useState(false);

  // Estado centralizado para el formulario de nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState(ESTADO_INICIAL_PRODUCTO);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mensajeFormulario, setMensajeFormulario] = useState(null); // Feedback visual en lugar de alert()

  // Categorías centralizadas derivadas de la fuente de verdad
  const categorias = ["Todas", ...CATEGORIAS_INVENTARIO];

  // Manejo de envío de nuevo producto delegando la lógica al Context global
  const handleCrearProducto = (e) => {
    e.preventDefault();
    setMensajeFormulario(null);

    const resultado = agregarProducto(nuevoProducto);

    if (!resultado.exito) {
      setMensajeFormulario({
        tipo: "danger",
        texto: resultado.mensaje,
      });
      return;
    }

    setNuevoProducto(ESTADO_INICIAL_PRODUCTO);
    setMensajeFormulario({
      tipo: "success",
      texto: `¡Producto "${resultado.producto.nombre}" (${resultado.producto.marca}) registrado con éxito en el estado global!`,
    });
  };

  // Filtrado de productos
  const productosFiltrados = productos.filter((p) => {
    const coincideTexto =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.sku.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaSeleccionada === "Todas" || p.categoria === categoriaSeleccionada;
    const esCritico = esStockCritico(p);
    const coincideCritico = soloCriticos ? esCritico : true;

    return coincideTexto && coincideCategoria && coincideCritico;
  });

  // Métricas para los KPI cards (reglas centralizadas)
  const totalItems = productos.length;
  const itemsCriticos = productos.filter(esStockCritico).length;
  const valorTotalInventario = productos.reduce(
    (acc, curr) => acc + curr.precio * curr.stock,
    0
  );

  return (
    <div className="container py-4">
      {/* Título de bienvenida */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">
            📦 Panel de Control de Inventario
          </h1>
          <p className="text-secondary mb-0">
            Administración centralizada de existencias y reposición para Supermercado Don Ahorro Eri Market.
          </p>
        </div>
        <div className="d-flex flex-wrap gap-2">
          <Link to="/nuevo-producto" className="btn btn-success fw-semibold shadow-sm">
            ➕ Ingresar Artículo
          </Link>
          <Link to="/inventario" className="btn btn-outline-success fw-semibold">
            📋 Ver Listado en Tabla
          </Link>
        </div>
      </div>

      {/* Tarjetas KPI modularizadas aplicando DRY */}
      <div className="row g-3 mb-4">
        <KpiCard
          titulo="Total Productos"
          valor={totalItems}
          color="primary"
          descripcion="En catálogo activo"
          icono="📦"
        />
        <KpiCard
          titulo="Stock Bajo / Crítico"
          valor={itemsCriticos}
          color="danger"
          descripcion="Requieren reposición"
          icono="⚠️"
        />
        <KpiCard
          titulo="Valor del Inventario"
          valor={formatearMoneda(valorTotalInventario)}
          color="success"
          descripcion="Valorización estimada"
          icono="💰"
        />
        <KpiCard
          titulo="Categorías"
          valor={categorias.length - 1}
          color="info"
          descripcion="Secciones habilitadas"
          icono="🏷️"
        />
      </div>

      {/* Formulario desplegable para nuevo producto */}
      {mostrarFormulario && (
        <div className="card shadow-sm border-0 mb-4 bg-light">
          <div className="card-body p-4">
            <h5 className="card-title fw-bold text-success mb-3">
              Registrar Nuevo Producto en Inventario
            </h5>

            {/* Alerta de validación visible (reemplaza alert() del navegador) */}
            {mensajeFormulario && (
              <div
                className={`alert alert-${mensajeFormulario.tipo} alert-dismissible fade show`}
                role="alert"
              >
                {mensajeFormulario.texto}
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMensajeFormulario(null)}
                  aria-label="Cerrar"
                ></button>
              </div>
            )}

            <form onSubmit={handleCrearProducto}>
              <div className="row g-3">
                <div className="col-md-2">
                  <label className="form-label small fw-semibold">Código SKU *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: ABA-999"
                    value={nuevoProducto.sku}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, sku: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Nombre del Producto *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Fideos Spaghetti 400g"
                    value={nuevoProducto.nombre}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Campo Marca: Requerimiento obligatorio Semana 2 */}
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Marca *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Carozzi / Colun"
                    value={nuevoProducto.marca}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, marca: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Categoría *</label>
                  <select
                    className="form-select"
                    value={nuevoProducto.categoria}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })
                    }
                  >
                    {CATEGORIAS_INVENTARIO.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Precio Unitario (CLP) *</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    placeholder="Ej: 1290"
                    value={nuevoProducto.precio}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label small fw-semibold">Stock Inicial *</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="Ej: 50"
                    value={nuevoProducto.stock}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, stock: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label small fw-semibold">Stock Mínimo</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="Ej: 10"
                    value={nuevoProducto.stockMinimo}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, stockMinimo: e.target.value })
                    }
                  />
                </div>

                <div className="col-md-2">
                  <label className="form-label small fw-semibold">Unidad</label>
                  <select
                    className="form-select"
                    value={nuevoProducto.unidad}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, unidad: e.target.value })
                    }
                  >
                    {UNIDADES_MEDIDA.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Ubicación</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Pasillo 3"
                    value={nuevoProducto.ubicacion}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, ubicacion: e.target.value })
                    }
                  />
                </div>

                <div className="col-12 text-end mt-3">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                    onClick={() => {
                      setMostrarFormulario(false);
                      setMensajeFormulario(null);
                    }}
                  >
                    Cerrar
                  </button>
                  <button type="submit" className="btn btn-success fw-semibold">
                    Guardar Producto
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Controles de Búsqueda y Filtros */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white">🔍</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre o SKU..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                {busqueda && (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setBusqueda("")}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            <div className="col-12 col-sm-6 col-md-4">
              <select
                className="form-select"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    Categoría: {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="switchCriticos"
                  checked={soloCriticos}
                  onChange={(e) => setSoloCriticos(e.target.checked)}
                />
                <label className="form-check-label fw-semibold text-danger small" htmlFor="switchCriticos">
                  Ver solo stock bajo/crítico
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla de Productos del Inventario */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-bold text-dark">
            Listado de Existencias ({productosFiltrados.length})
          </h5>
          <span className="badge bg-secondary">
            Mostrando {productosFiltrados.length} de {productos.length} items
          </span>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">SKU</th>
                <th scope="col">Producto</th>
                <th scope="col">Marca</th>
                <th scope="col">Categoría</th>
                <th scope="col">Ubicación</th>
                <th scope="col" className="text-end">Precio (CLP)</th>
                <th scope="col" className="text-center">Stock Actual</th>
                <th scope="col" className="text-center">Estado</th>
                <th scope="col" className="text-center">Ajuste Rápido</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-muted">
                    No se encontraron productos que coincidan con los criterios de búsqueda.
                  </td>
                </tr>
              ) : (
                productosFiltrados.map((item) => {
                  const estadoInfo = obtenerEstadoStock(item);
                  const esCritico = esStockCritico(item);

                  return (
                    <tr key={item.id} className={esCritico ? "table-danger-subtle" : ""}>
                      <td className="fw-bold text-secondary">{item.sku}</td>
                      <td>
                        <strong>{item.nombre}</strong>
                        <div className="small text-muted">{item.unidad}</div>
                      </td>
                      <td>
                        <span className="fw-semibold text-dark">{item.marca || "Genérica"}</span>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {item.categoria}
                        </span>
                      </td>
                      <td className="small text-muted">{item.ubicacion}</td>
                      <td className="text-end fw-semibold">
                        {formatearMoneda(item.precio)}
                      </td>
                      <td className="text-center">
                        <span className="fw-bold fs-6">{item.stock}</span>
                        <div className="small text-muted">Mín: {item.stockMinimo}</div>
                      </td>
                      <td className="text-center">
                        <span className={`badge ${estadoInfo.badgeClass}`}>
                          {esCritico ? "⚠️ " : ""}{estadoInfo.estado}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="btn-group btn-group-sm">
                          <button
                            className="btn btn-outline-danger"
                            title="Restar 1 unidad"
                            onClick={() => modificarStock(item.id, -1)}
                          >
                            -1
                          </button>
                          <button
                            className="btn btn-outline-success"
                            title="Sumar 1 unidad"
                            onClick={() => modificarStock(item.id, 1)}
                          >
                            +1
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomeInventario;
