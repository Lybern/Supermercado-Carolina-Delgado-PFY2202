/**
 * Componente reutilizable KpiCard
 * Resuelve la retroalimentación de la Semana 1 aplicando el principio DRY (Don't Repeat Yourself).
 * 
 * @param {string} titulo - Etiqueta o título del KPI
 * @param {string|number} valor - Valor numérico o texto a destacar
 * @param {string} color - Variante de color Bootstrap (primary, danger, success, info, warning)
 * @param {string} descripcion - Texto secundario descriptivo
 * @param {string} [icono] - Ícono emoji u opcional
 */
function KpiCard({ titulo, valor, color = "primary", descripcion, icono }) {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className={`card shadow-sm border-0 border-start border-4 border-${color} h-100`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <span className="text-muted small fw-semibold text-uppercase">{titulo}</span>
            {icono && <span className="fs-5">{icono}</span>}
          </div>
          <h3 className={`fw-bold my-1 text-${color}`}>{valor}</h3>
          {descripcion && <small className="text-muted">{descripcion}</small>}
        </div>
      </div>
    </div>
  );
}

export default KpiCard;
