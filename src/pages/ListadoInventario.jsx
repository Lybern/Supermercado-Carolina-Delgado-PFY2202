import { useState } from "react";
import { Link } from "react-router";
import useInventario from "../hooks/useInventario";
import KpiCard from "../components/KpiCard";
import {
  CATEGORIAS_INVENTARIO,
} from "../data/inventarioData";
import {
  esStockCritico,
  obtenerEstadoStock,
  formatearMoneda,
} from "../utils/inventarioUtils";

/**
 * Página dedicada: Listado en Tabla del Inventario.
 * Requisito evaluativo de la Semana 2 (Forma B).
 * Muestra todos los artículos registrados en el estado global (Context API),
 * permitiendo búsqueda, filtrado por categorías, alerta de stock crítico y ajuste inmutable.
 */
function ListadoInventario() {
  const { productos, modificarStock } = useInventario();

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");
  const [soloCriticos, setSoloCriticos] = useState(false);

  // Categorías para el filtro
  const categorias = ["Todas", ...CATEGORIAS_INVENTARIO];

  // Filtrado reactivo en tiempo real
  const productosFiltrados = productos.filter((p) => {
    const coincideBusqueda =
      p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.sku.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.marca.toLowerCase().includes(busqueda.toLowerCase());

    const coincideCategoria =
      categoriaSeleccionada === "Todas" || p.categoria === categoriaSeleccionada;

    const coincideCritico = soloCriticos ? esStockCritico(p) : true;

    return coincideBusqueda && coincideCategoria && coincideCritico;
  });

  // Cálculo de KPIs a partir del estado global
  const totalProductos = productos.length;
  const totalUnidades = productos.reduce((acc, p) => acc + p.stock, 0);
  const stockCriticoCount = productos.filter(esStockCritico).length;
  const valorTotalInventario = productos.reduce(
    (acc, p) => acc + p.precio * p.stock,
    0
  );

  return (
    <div className="container py-4">
      {/* Encabezado y Navegación contextual */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-success">
              Inicio
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Listado de Inventario
          </li>
        </ol>
      </nav>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h1 className="h2 fw-bold text-success mb-1 d-flex align-items-center gap-2">
            <span>📋</span> Listado en Tabla de Artículos
          </h1>
          <p className="text-muted mb-0">
            Vista tabular completa del inventario sincronizada en tiempo real mediante Context API.
          </p>
        </div>
        <div className="mt-3 mt-md-0 d-flex gap-2">
          <Link to="/nuevo-producto" className="btn btn-success fw-semibold shadow-sm">
            ➕ Ingresar Artículo
          </Link>
        </div>
      </div>

      {/* Tarjetas KPI de Resumen (Principio DRY con KpiCard) */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <KpiCard
            titulo="Total Artículos"
            valor={totalProductos}
            icono="📦"
            color="primary"
            descripcion="Artículos únicos en catálogo"
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <KpiCard
            titulo="Unidades Físicas"
            valor={totalUnidades.toLocaleString("es-CL")}
            icono="🔢"
            color="info"
            descripcion="Total unidades en almacén"
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <KpiCard
            titulo="Stock Crítico"
            valor={stockCriticoCount}
            icono="⚠️"
            color="danger"
            descripcion="Productos bajo el mínimo"
          />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <KpiCard
            titulo="Valor Estimado"
            valor={formatearMoneda(valorTotalInventario)}
            icono="💰"
            color="success"
            descripcion="Capital total inmovilizado"
          />
        </div>
      </div>

      {/* Barra de Filtros y Búsqueda */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body p-3">
          <div className="row g-3 align-items-center">
            {/* Campo de búsqueda */}
            <div className="col-12 col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white">🔍</span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar por nombre, marca o SKU..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
                {busqueda && (
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => setBusqueda("")}
                    title="Limpiar búsqueda"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Selector de categoría */}
            <div className="col-12 col-sm-6 col-md-4">
              <select
                className="form-select"
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "Todas" ? "Todas las Categorías" : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkbox solo críticos */}
            <div className="col-12 col-sm-6 col-md-3">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="filtroCriticoListado"
                  checked={soloCriticos}
                  onChange={(e) => setSoloCriticos(e.target.checked)}
                />
                <label className="form-check-label fw-semibold" htmlFor="filtroCriticoListado">
                  Solo Stock Crítico ({stockCriticoCount})
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla del Inventario */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
          <h2 className="h6 mb-0 fw-bold text-dark">
            Mostrando {productosFiltrados.length} de {totalProductos} artículos
          </h2>
          {soloCriticos && (
            <span className="badge bg-danger-subtle text-danger border border-danger-subtle px-2 py-1">
              Filtro Activo: Stock Crítico
            </span>
          )}
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col" style={{ width: "110px" }}>SKU</th>
                <th scope="col">Artículo</th>
                <th scope="col">Marca</th>
                <th scope="col">Categoría</th>
                <th scope="col" className="text-end">Precio</th>
                <th scope="col" className="text-center" style={{ width: "160px" }}>Stock</th>
                <th scope="col" className="text-center">Estado</th>
                <th scope="col">Ubicación</th>
              </tr>
            </thead>
            <tbody>
              {productosFiltrados.length > 0 ? (
                productosFiltrados.map((item) => {
                  const estado = obtenerEstadoStock(item);
                  return (
                    <tr key={item.id}>
                      <td className="fw-mono text-secondary small">
                        <code>{item.sku}</code>
                      </td>
                      <td>
                        <div className="fw-semibold text-dark">{item.nombre}</div>
                        <small className="text-muted">{item.unidad}</small>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark border">
                          {item.marca}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-secondary-subtle text-secondary-emphasis">
                          {item.categoria}
                        </span>
                      </td>
                      <td className="text-end fw-semibold">
                        {formatearMoneda(item.precio)}
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center gap-1">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary px-2 py-0"
                            onClick={() => modificarStock(item.id, -1)}
                            disabled={item.stock === 0}
                            title="Disminuir stock en 1"
                          >
                            -
                          </button>
                          <span
                            className={`fw-bold px-2 py-1 rounded small ${
                              item.stock <= item.stockMinimo
                                ? "bg-danger-subtle text-danger"
                                : "text-dark"
                            }`}
                            style={{ minWidth: "35px", textAlign: "center" }}
                          >
                            {item.stock}
                          </span>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary px-2 py-0"
                            onClick={() => modificarStock(item.id, 1)}
                            title="Aumentar stock en 1"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-center text-muted" style={{ fontSize: "0.7rem" }}>
                          Mín: {item.stockMinimo}
                        </div>
                      </td>
                      <td className="text-center">
                        <span className={`badge ${estado.claseBadge}`}>
                          {estado.texto}
                        </span>
                      </td>
                      <td className="small text-muted">{item.ubicacion}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <div className="text-muted">
                      <span className="fs-1 d-block mb-2">🔍</span>
                      <p className="mb-2 fw-semibold">No se encontraron productos coincidentes.</p>
                      <button
                        className="btn btn-sm btn-outline-success"
                        onClick={() => {
                          setBusqueda("");
                          setCategoriaSeleccionada("Todas");
                          setSoloCriticos(false);
                        }}
                      >
                        Restablecer Filtros
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListadoInventario;
