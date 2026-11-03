import { Link } from "react-router";
import OrangeTabbyCat from "../components/OrangeTabbyCat";

/**
 * Página 404 - Ruta no encontrada
 * Resuelve la observación docente informando al usuario destinos desconocidos.
 */
function NotFound() {
  return (
    <div className="container py-5 text-center my-auto">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 p-4 p-md-5">
            <div className="mb-3 d-flex justify-content-center">
              <OrangeTabbyCat size={80} className="p-2 bg-light rounded-circle shadow-sm" />
            </div>
            <span className="badge bg-danger-subtle text-danger fs-6 mb-2 align-self-center px-3 py-2">
              Error 404 - Pasillo no encontrado
            </span>
            <h1 className="display-5 fw-bold text-dark mb-3">
              ¿Te perdiste en el supermercado?
            </h1>
            <p className="text-muted mb-4 lead">
              La sección o página a la que intentas acceder no existe en nuestro catálogo o fue reubicada en otra góndola.
            </p>
            <div className="d-flex justify-content-center gap-3">
              <Link to="/" className="btn btn-success fw-semibold px-4 py-2 shadow-sm">
                🏠 Volver al Panel Principal
              </Link>
              <Link to="/tiendas" className="btn btn-outline-secondary fw-semibold px-3 py-2">
                🏪 Ver Tiendas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
