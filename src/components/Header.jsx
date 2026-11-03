import { Link, NavLink } from "react-router";
import OrangeTabbyCat from "./OrangeTabbyCat";

/**
 * Encabezado institucional con identidad del supermercado
 * y menú de navegación superior con enlaces activos mediante NavLink.
 */
function Header() {
  const getTopNavLinkClass = ({ isActive }) =>
    `nav-link px-3 py-1 fw-semibold rounded text-decoration-none ${
      isActive
        ? "bg-white text-success shadow-sm"
        : "text-white opacity-75"
    }`;

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm py-2">
      <div className="container">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center gap-2 fw-bold text-white text-decoration-none"
        >
          <span className="fs-3">🛒</span>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2 fs-4">
              <span>Supermercado Don Ahorro</span>
              <OrangeTabbyCat
                size={38}
                className="ms-1 me-1 shadow-sm rounded-circle bg-white p-1"
              />
              <span className="badge bg-warning text-dark fs-6 px-2 py-1">
                Eri Market
              </span>
            </div>
            <span
              className="text-white-50 fw-normal"
              style={{ fontSize: "0.78rem", letterSpacing: "0.5px" }}
            >
              🐾 Propiedad de Eri Market
            </span>
          </div>
        </Link>

        <div className="d-flex align-items-center gap-3">
          {/* Navegación Principal Superior Requerida por la Semana 2 */}
          <nav
            className="d-none d-lg-flex align-items-center gap-1"
            aria-label="Navegación superior"
          >
            <NavLink to="/" className={getTopNavLinkClass} end>
              Inicio
            </NavLink>
            <NavLink to="/inventario" className={getTopNavLinkClass}>
              📋 Tabla Inventario
            </NavLink>
            <NavLink to="/nuevo-producto" className={getTopNavLinkClass}>
              ➕ Ingresar Artículo
            </NavLink>
            <NavLink to="/tiendas" className={getTopNavLinkClass}>
              Tiendas
            </NavLink>
            <NavLink to="/quienes-somos" className={getTopNavLinkClass}>
              Nosotros
            </NavLink>
          </nav>

          <span className="badge bg-warning text-dark fw-semibold px-2 py-2 d-none d-sm-inline-block">
            Semana 2 - Context API
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
