import { NavLink } from "react-router";

/**
 * Menú Inferior de Navegación (Requerimiento evaluativo)
 * Permite navegar hacia la página principal (Inventario) y las páginas adicionales requeridas.
 */
function BottomNav() {
  const getNavClass = ({ isActive }) =>
    `btn d-flex flex-column flex-sm-row align-items-center justify-content-center gap-1 px-3 py-2 fw-semibold transition-all ${
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
        <div className="d-flex flex-wrap justify-content-center justify-content-md-between align-items-center gap-2">
          
          <div className="small text-muted d-none d-md-block">
            <strong>Navegación del sitio:</strong> Seleccione una sección
          </div>

          <div className="d-flex flex-wrap justify-content-center gap-2 w-100 w-md-auto">
            {/* Página Principal: Gestión de Inventario */}
            <NavLink to="/" className={getNavClass} end>
              <span className="fs-5">📦</span>
              <span>Gestión Inventario</span>
            </NavLink>

            {/* Página Adicional 1: Nuestras Tiendas */}
            <NavLink to="/tiendas" className={getNavClass}>
              <span className="fs-5">🏪</span>
              <span>Nuestras Tiendas</span>
            </NavLink>

            {/* Página Adicional 2: Quiénes Somos */}
            <NavLink to="/quienes-somos" className={getNavClass}>
              <span className="fs-5">👥</span>
              <span>Quiénes Somos</span>
            </NavLink>

            {/* Página Adicional 3 (Opcional/Complementaria): Contáctanos */}
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
