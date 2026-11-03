import { Link } from "react-router";
import OrangeTabbyCat from "./OrangeTabbyCat";

function Header() {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-success shadow-sm py-2">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold text-white text-decoration-none">
          <span className="fs-3">🛒</span>
          <div className="d-flex flex-column">
            <div className="d-flex align-items-center gap-2 fs-4">
              <span>Supermercado Don Ahorro</span>
              <OrangeTabbyCat size={38} className="ms-1 me-1 shadow-sm rounded-circle bg-white p-1" />
              <span className="badge bg-warning text-dark fs-6 px-2 py-1">Eri Market</span>
            </div>
            <span className="text-white-50 fw-normal" style={{ fontSize: "0.78rem", letterSpacing: "0.5px" }}>
              🐾 Propiedad de Eri Market
            </span>
          </div>
        </Link>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-light text-success fw-semibold px-3 py-2">
            Módulo: Control de Inventario
          </span>
          <span className="badge bg-warning text-dark fw-semibold px-2 py-2 d-none d-md-inline-block">
            Semana 1 - React Router
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
