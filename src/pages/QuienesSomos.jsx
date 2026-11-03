function QuienesSomos() {
  return (
    <div className="container py-4">
      {/* Encabezado */}
      <div className="text-center mb-5">
        <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill fw-semibold mb-2">
          Nuestra Identidad
        </span>
        <h1 className="h2 fw-bold text-dark">👥 Quiénes Somos</h1>
        <p className="text-secondary mx-auto" style={{ maxWidth: "680px" }}>
          Más de 15 años comprometidos con las familias chilenas, entregando productos frescos, precios justos y una gestión responsable de nuestras existencias.
        </p>
      </div>

      {/* Historia y Visión */}
      <div className="row g-4 align-items-center mb-5">
        <div className="col-12 col-lg-6">
          <div className="pe-lg-4">
            <h3 className="fw-bold text-success mb-3">Nuestra Trayectoria</h3>
            <p className="text-secondary lh-lg mb-3">
              <strong>Supermercado Don Ahorro Eri Market</strong> nació en el año 2011 como una iniciativa barrial con el propósito de ofrecer abarrotes, frutas y carnes de primera calidad a precios accesibles para toda la comunidad, acompañados con el cariño de nuestra querida mascota Eri.
            </p>
            <p className="text-secondary lh-lg mb-4">
              Con el paso de los años, expandimos nuestra red de sucursales e implementamos tecnologías modernas de inventario para garantizar que los estantes siempre cuenten con existencias frescas y sin roturas de stock.
            </p>
            <div className="row g-3 text-center">
              <div className="col-4">
                <div className="p-3 bg-light rounded border">
                  <h4 className="fw-bold text-success mb-0">+15</h4>
                  <small className="text-muted">Años de historia</small>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 bg-light rounded border">
                  <h4 className="fw-bold text-success mb-0">4</h4>
                  <small className="text-muted">Sucursales activas</small>
                </div>
              </div>
              <div className="col-4">
                <div className="p-3 bg-light rounded border">
                  <h4 className="fw-bold text-success mb-0">100%</h4>
                  <small className="text-muted">Compromiso local</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm border-0 bg-success-subtle p-4 rounded-4">
            <div className="card-body">
              <h4 className="fw-bold text-success mb-3">🎯 Nuestra Misión</h4>
              <p className="text-dark mb-4">
                Facilitar la vida diaria de nuestros clientes entregando alimentos y productos de consumo básico con la mayor frescura, atención cercana y el mejor estándar de control de stock y calidad.
              </p>

              <h4 className="fw-bold text-success mb-3">👁️ Nuestra Visión</h4>
              <p className="text-dark mb-0">
                Ser la cadena regional de supermercados más valorada por su cercanía comunitaria, eficiencia logística y uso de herramientas frontend modernas para la gestión ágil del inventario.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pilares */}
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm border-0 text-center p-3">
            <div className="card-body">
              <div className="fs-1 mb-2">🥬</div>
              <h5 className="fw-bold text-dark">Frescura Insuperable</h5>
              <p className="text-secondary small mb-0">
                Coordinación directa con agricultores y distribuidores locales para asegurar reposición diaria.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm border-0 text-center p-3">
            <div className="card-body">
              <div className="fs-1 mb-2">💰</div>
              <h5 className="fw-bold text-dark">Precios Transparentes</h5>
              <p className="text-secondary small mb-0">
                Mantenemos políticas de ahorro real y promociones periódicas para cuidar el presupuesto familiar.
              </p>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card h-100 shadow-sm border-0 text-center p-3">
            <div className="card-body">
              <div className="fs-1 mb-2">⚡</div>
              <h5 className="fw-bold text-dark">Control Ágil de Stock</h5>
              <p className="text-secondary small mb-0">
                Monitoreo en tiempo real de niveles críticos para anticipar compras y reposición oportuna.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuienesSomos;
