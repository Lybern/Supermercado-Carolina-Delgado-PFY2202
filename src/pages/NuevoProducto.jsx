import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useInventario from "../hooks/useInventario";
import {
  CATEGORIAS_INVENTARIO,
  ESTADO_INICIAL_PRODUCTO,
  UNIDADES_MEDIDA,
  UBICACIONES_SUPERMERCADO,
} from "../data/inventarioData";

/**
 * Página dedicada: Ingresar Artículos al Inventario.
 * Requisito evaluativo de la Semana 2 (Forma B).
 * Permite registrar nuevos productos en el estado global (Context API)
 * con validaciones frontend y retroalimentación visual al usuario.
 */
function NuevoProducto() {
  const navigate = useNavigate();
  const { agregarProducto } = useInventario();

  const [formData, setFormData] = useState(ESTADO_INICIAL_PRODUCTO);
  const [feedback, setFeedback] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback(null);
    setEnviando(true);

    const resultado = agregarProducto(formData);

    setEnviando(false);

    if (!resultado.exito) {
      setFeedback({
        tipo: "danger",
        mensaje: resultado.mensaje,
      });
      return;
    }

    setFeedback({
      tipo: "success",
      mensaje: `¡Producto "${resultado.producto.nombre}" (${resultado.producto.marca}) registrado con éxito en el estado global!`,
      producto: resultado.producto,
    });

    // Reiniciar formulario al estado inicial
    setFormData(ESTADO_INICIAL_PRODUCTO);
  };

  return (
    <div className="container py-4">
      {/* Migas de pan / Navegación contextual */}
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-decoration-none text-success">
              Inicio
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/inventario" className="text-decoration-none text-success">
              Inventario
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Ingresar Artículo
          </li>
        </ol>
      </nav>

      {/* Título de la vista */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 pb-2 border-bottom">
        <div>
          <h1 className="h2 fw-bold text-success mb-1 d-flex align-items-center gap-2">
            <span>📝</span> Ingresar Nuevo Artículo
          </h1>
          <p className="text-muted mb-0">
            Formulario oficial para incorporar productos al inventario general del supermercado.
          </p>
        </div>
        <div className="mt-3 mt-md-0 d-flex gap-2">
          <Link to="/inventario" className="btn btn-outline-secondary">
            ← Ver Listado en Tabla
          </Link>
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-12 col-lg-9">
          {/* Mensaje de Feedback visual (Alertas Bootstrap) */}
          {feedback && (
            <div
              className={`alert alert-${feedback.tipo} alert-dismissible fade show shadow-sm d-flex align-items-center justify-content-between`}
              role="alert"
            >
              <div>
                <strong>{feedback.tipo === "success" ? "✓ Operación Exitosa:" : "⚠️ Atención:"}</strong>{" "}
                {feedback.mensaje}
              </div>
              {feedback.tipo === "success" && (
                <button
                  type="button"
                  className="btn btn-sm btn-success ms-3"
                  onClick={() => navigate("/inventario")}
                >
                  Ir a la Tabla →
                </button>
              )}
            </div>
          )}

          {/* Tarjeta del formulario */}
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-header bg-success text-white py-3">
              <h2 className="h5 mb-0 fw-semibold">
                Datos del Producto (Forma B: Nombre, Marca y Categoría obligatorios)
              </h2>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  {/* SKU */}
                  <div className="col-12 col-md-4">
                    <label htmlFor="sku" className="form-label fw-semibold">
                      Código SKU <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="sku"
                      name="sku"
                      className="form-control"
                      placeholder="Ej: BEB-305"
                      value={formData.sku}
                      onChange={handleChange}
                      required
                    />
                    <div className="form-text">Identificador alfanumérico único.</div>
                  </div>

                  {/* Nombre */}
                  <div className="col-12 col-md-8">
                    <label htmlFor="nombre" className="form-label fw-semibold">
                      Nombre del Producto <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      className="form-control"
                      placeholder="Ej: Jugo Natural Naranja 1.5L"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Marca (Requerimiento evaluativo explícito Forma B) */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="marca" className="form-label fw-semibold">
                      Marca del Producto <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      id="marca"
                      name="marca"
                      className="form-control"
                      placeholder="Ej: Andina, Colun, Tucapel, Ideal..."
                      value={formData.marca}
                      onChange={handleChange}
                      required
                    />
                    <div className="form-text">Marca comercial fabricante del producto.</div>
                  </div>

                  {/* Categoría / Tipo de Producto */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="categoria" className="form-label fw-semibold">
                      Tipo de Producto (Categoría) <span className="text-danger">*</span>
                    </label>
                    <select
                      id="categoria"
                      name="categoria"
                      className="form-select"
                      value={formData.categoria}
                      onChange={handleChange}
                      required
                    >
                      {CATEGORIAS_INVENTARIO.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Precio Unitario */}
                  <div className="col-12 col-md-4">
                    <label htmlFor="precio" className="form-label fw-semibold">
                      Precio Unitario ($ CLP) <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        id="precio"
                        name="precio"
                        min="0"
                        step="1"
                        className="form-control"
                        placeholder="Ej: 1990"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Stock Actual */}
                  <div className="col-12 col-md-4">
                    <label htmlFor="stock" className="form-label fw-semibold">
                      Stock Inicial <span className="text-danger">*</span>
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      min="0"
                      step="1"
                      className="form-control"
                      placeholder="Ej: 25"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Stock Mínimo */}
                  <div className="col-12 col-md-4">
                    <label htmlFor="stockMinimo" className="form-label fw-semibold">
                      Stock Mínimo (Alerta)
                    </label>
                    <input
                      type="number"
                      id="stockMinimo"
                      name="stockMinimo"
                      min="0"
                      step="1"
                      className="form-control"
                      placeholder="Ej: 10"
                      value={formData.stockMinimo}
                      onChange={handleChange}
                    />
                    <div className="form-text">Umbral para alertas de reabastecimiento.</div>
                  </div>

                  {/* Unidad de Medida */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="unidad" className="form-label fw-semibold">
                      Unidad de Medida
                    </label>
                    <select
                      id="unidad"
                      name="unidad"
                      className="form-select"
                      value={formData.unidad}
                      onChange={handleChange}
                    >
                      {UNIDADES_MEDIDA.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Ubicación en Tienda */}
                  <div className="col-12 col-md-6">
                    <label htmlFor="ubicacion" className="form-label fw-semibold">
                      Ubicación en Supermercado
                    </label>
                    <select
                      id="ubicacion"
                      name="ubicacion"
                      className="form-select"
                      value={formData.ubicacion}
                      onChange={handleChange}
                    >
                      {UBICACIONES_SUPERMERCADO.map((ub) => (
                        <option key={ub} value={ub}>
                          {ub}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="d-flex flex-wrap justify-content-end gap-2 mt-4 pt-3 border-top">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={() => setFormData(ESTADO_INICIAL_PRODUCTO)}
                    disabled={enviando}
                  >
                    Limpiar Campos
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success px-4 fw-semibold"
                    disabled={enviando}
                  >
                    {enviando ? "Guardando..." : "✓ Guardar en Inventario Global"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuevoProducto;
