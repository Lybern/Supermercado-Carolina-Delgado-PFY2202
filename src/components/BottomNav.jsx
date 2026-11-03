import { NavLink } from "react-router";

/**
 * Menú Inferior de Navegación (Requerimiento evaluativo)
 * Permite navegar hacia el inventario, formulario de ingreso y páginas institucionales sin recargar la SPA.
 */
function BottomNav() {
  const getNavClass = ({ isActive }) =>
    `btn d-flex flex-column flex-sm-row align-items-center justify-content-center gap-1 px-3 py-1 fw-semibold transition-all ${
      isActive
        ? "btn-success shadow-sm"
        : "btn-outline-secondary border-0 text-dark"
    }`;

  return (
    <nav
      className="bottom-navigation bg-white border-top shadow-lg py-2 sticky-bottom"
      aria-label="Menú inferior de navegación"
    >
      <div className="container">
        <div className="d-flex flex-wrap justify-content-center justify-content-lg-between align-items-center gap-2">
          <div className="small text-muted d-none d-lg-block">
            <strong>Navegación del sitio:</strong> Seleccione una sección
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-1 gap-sm-2 w-100 w-lg-auto">
            {/* Inicio / Panel */}
            <NavLink to="/" className={getNavClass} end>
              <span className="fs-5">🏠</span>
              <span>Inicio</span>
            </NavLink>

            {/* Listado en Tabla Requerido Semana 2 */}
            <NavLink to="/inventario" className={getNavClass}>
              <span className="fs-5">📋</span>
              <span>Tabla Inventario</span>
            </NavLink>

            {/* Ingresar Artículos Requerido Semana 2 */}
            <NavLink to="/nuevo-producto" className={getNavClass}>
              <span className="fs-5">➕</span>
              <span>Ingresar Artículo</span>
            </NavLink>

            {/* Páginas Adicionales Institucionales */}
            <NavLink to="/tiendas" className={getNavClass}>
              <span className="fs-5">🏪</span>
              <span>Tiendas</span>
            </NavLink>

            <NavLink to="/quienes-somos" className={getNavClass}>
              <span className="fs-5">👥</span>
              <span>Quiénes Somos</span>
            </NavLink>

            <NavLink to="/contactanos" className={getNavClass}>
              <span className="fs-5">📞</span>
              <span>Contáctanos</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
