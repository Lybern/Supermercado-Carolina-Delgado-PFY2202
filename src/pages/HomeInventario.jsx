import { useState } from "react";
import { productosIniciales } from "../data/inventarioData";

function HomeInventario() {
  const [productos, setProductos] = useState(productosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [soloCriticos, setSoloCriticos] = useState(false);

  // Estados para formulario de nuevo producto
  const [nuevoProducto, setNuevoProducto] = useState({
    sku: "",
    nombre: "",
    categoria: "Abarrotes",
    precio: "",
    stock: "",
    stockMinimo: "",
    unidad: "Unidad",
    ubicacion: "Bodega Central",
  });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Lista de categorías únicas para el filtro
  const categorias = ["Todas", ...new Set(productosIniciales.map((p) => p.categoria))];

  // Modificar stock rápidamente (+ o -)
  const modificarStock = (id, delta) => {
    setProductos((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nuevoStock = Math.max(0, item.stock + delta);
          return { ...item, stock: nuevoStock };
        }
        return item;
      })
    );
  };

  // Manejo de envío de nuevo producto
  const handleCrearProducto = (e) => {
    e.preventDefault();
    if (!nuevoProducto.sku || !nuevoProducto.nombre || !nuevoProducto.precio || !nuevoProducto.stock) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    const itemCreado = {
      id: Date.now(),
      sku: nuevoProducto.sku.toUpperCase(),
      nombre: nuevoProducto.nombre,
      categoria: nuevoProducto.categoria,
      precio: Number(nuevoProducto.precio),
      stock: Number(nuevoProducto.stock),
      stockMinimo: Number(nuevoProducto.stockMinimo) || 10,
      unidad: nuevoProducto.unidad,
      ubicacion: nuevoProducto.ubicacion || "Bodega Central",
    };

    setProductos([itemCreado, ...productos]);
    setNuevoProducto({
      sku: "",
      nombre: "",
      categoria: "Abarrotes",
      precio: "",
      stock: "",
      stockMinimo: "",
      unidad: "Unidad",
      ubicacion: "Bodega Central",
    });
    setMostrarFormulario(false);
  };

  // Filtrado de productos
  const productosFiltrados = productos.filter((p) => {
    const coincideTexto =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.sku.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria =
      categoriaSeleccionada === "Todas" || p.categoria === categoriaSeleccionada;
    const esCritico = p.stock <= p.stockMinimo;
    const coincideCritico = soloCriticos ? esCritico : true;

    return coincideTexto && coincideCategoria && coincideCritico;
  });

  // Métricas para los KPI cards
  const totalItems = productos.length;
  const itemsCriticos = productos.filter((p) => p.stock <= p.stockMinimo).length;
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
        <button
          className={`btn ${mostrarFormulario ? "btn-secondary" : "btn-success"} fw-semibold`}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          {mostrarFormulario ? "Cerrar Formulario" : "➕ Agregar Producto"}
        </button>
      </div>

      {/* Tarjetas KPI */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-4 border-primary h-100">
            <div className="card-body">
              <span className="text-muted small fw-semibold text-uppercase">Total Productos</span>
              <h3 className="fw-bold my-1 text-primary">{totalItems}</h3>
              <small className="text-muted">En catálogo activo</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-4 border-danger h-100">
            <div className="card-body">
              <span className="text-muted small fw-semibold text-uppercase">Stock Bajo / Crítico</span>
              <h3 className="fw-bold my-1 text-danger">{itemsCriticos}</h3>
              <small className="text-muted">Requieren reposición</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-4 border-success h-100">
            <div className="card-body">
              <span className="text-muted small fw-semibold text-uppercase">Valor del Inventario</span>
              <h3 className="fw-bold my-1 text-success">
                ${valorTotalInventario.toLocaleString("es-CL")}
              </h3>
              <small className="text-muted">Valorización estimada</small>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card shadow-sm border-0 border-start border-4 border-info h-100">
            <div className="card-body">
              <span className="text-muted small fw-semibold text-uppercase">Categorías</span>
              <h3 className="fw-bold my-1 text-info">{categorias.length - 1}</h3>
              <small className="text-muted">Secciones habilitadas</small>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario desplegable para nuevo producto */}
      {mostrarFormulario && (
        <div className="card shadow-sm border-0 mb-4 bg-light">
          <div className="card-body p-4">
            <h5 className="card-title fw-bold text-success mb-3">
              Registrar Nuevo Producto en Inventario
            </h5>
            <form onSubmit={handleCrearProducto}>
              <div className="row g-3">
                <div className="col-md-3">
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
                <div className="col-md-5">
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
                <div className="col-md-4">
                  <label className="form-label small fw-semibold">Categoría *</label>
                  <select
                    className="form-select"
                    value={nuevoProducto.categoria}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })
                    }
                  >
                    <option value="Abarrotes">Abarrotes</option>
                    <option value="Lácteos">Lácteos</option>
                    <option value="Frutas y Verduras">Frutas y Verduras</option>
                    <option value="Carnicería">Carnicería</option>
                    <option value="Limpieza">Limpieza</option>
                    <option value="Panadería">Panadería</option>
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Precio Unitario (CLP) *</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Ej: 1290"
                    value={nuevoProducto.precio}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, precio: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Stock Inicial *</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Ej: 50"
                    value={nuevoProducto.stock}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, stock: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Stock Mínimo (Alerta)</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Ej: 15"
                    value={nuevoProducto.stockMinimo}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, stockMinimo: e.target.value })
                    }
                  />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-semibold">Ubicación</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ej: Pasillo 2"
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
                    onClick={() => setMostrarFormulario(false)}
                  >
                    Cancelar
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
                  <td colSpan="8" className="text-center py-4 text-muted">
                    No se encontraron productos que coincidan con los criterios de búsqueda.
                  </td>
                </tr>
              ) : (
                productosFiltrados.map((item) => {
                  const esCritico = item.stock <= item.stockMinimo;
                  const esMedio = item.stock <= item.stockMinimo * 1.5 && !esCritico;

                  return (
                    <tr key={item.id} className={esCritico ? "table-danger-subtle" : ""}>
                      <td className="fw-bold text-secondary">{item.sku}</td>
                      <td>
                        <strong>{item.nombre}</strong>
                        <div className="small text-muted">{item.unidad}</div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {item.categoria}
                        </span>
                      </td>
                      <td className="small text-muted">{item.ubicacion}</td>
                      <td className="text-end fw-semibold">
                        ${item.precio.toLocaleString("es-CL")}
                      </td>
                      <td className="text-center">
                        <span className="fw-bold fs-6">{item.stock}</span>
                        <div className="small text-muted">Mín: {item.stockMinimo}</div>
                      </td>
                      <td className="text-center">
                        {esCritico ? (
                          <span className="badge bg-danger">⚠️ Crítico</span>
                        ) : esMedio ? (
                          <span className="badge bg-warning text-dark">Alerta</span>
                        ) : (
                          <span className="badge bg-success">Óptimo</span>
                        )}
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
