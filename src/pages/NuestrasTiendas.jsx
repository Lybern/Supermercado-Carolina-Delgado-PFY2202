function NuestrasTiendas() {
  const tiendas = [
    {
      id: 1,
      nombre: "Sucursal Central Santiago",
      direccion: "Av. Libertador Bernardo O'Higgins 1234",
      comuna: "Santiago Centro, RM",
      horario: "Lunes a Sábado: 08:30 - 21:30 | Domingo: 09:00 - 20:00",
      telefono: "+56 2 2345 6789",
      servicios: ["Estacionamiento subterráneo", "Panadería artesanal", "Farmacia integrada", "Retiro en tienda"],
      bodegaCentral: true
    },
    {
      id: 2,
      nombre: "Sucursal Providencia",
      direccion: "Av. Providencia 2045",
      comuna: "Providencia, RM",
      horario: "Lunes a Domingo: 08:30 - 21:00",
      telefono: "+56 2 2456 7890",
      servicios: ["Estacionamiento clientes", "Cajas de autoservicio", "Carnicería premium", "Retiro Express"],
      bodegaCentral: false
    },
    {
      id: 3,
      nombre: "Sucursal Maipú",
      direccion: "Av. Pajaritos 3400",
      comuna: "Maipú, RM",
      horario: "Lunes a Domingo: 08:30 - 21:30",
      telefono: "+56 2 2567 8901",
      servicios: ["Estacionamiento amplio", "Centro de distribución local", "Patio de comidas", "Cajas preferenciales"],
      bodegaCentral: false
    },
    {
      id: 4,
      nombre: "Sucursal Viña del Mar",
      direccion: "Av. Libertad 890",
      comuna: "Viña del Mar, Región de Valparaíso",
      horario: "Lunes a Sábado: 08:30 - 21:00 | Domingo: 09:00 - 19:30",
      telefono: "+56 32 267 8912",
      servicios: ["Estacionamiento", "Sector productos locales", "Atención a empresas", "Retiro Click & Collect"],
      bodegaCentral: false
    }
  ];

  return (
    <div className="container py-4">
      {/* Encabezado */}
      <div className="text-center mb-5">
        <span className="badge bg-success-subtle text-success border border-success-subtle px-3 py-2 rounded-pill fw-semibold mb-2">
          Red de Distribución y Ventas
        </span>
        <h1 className="h2 fw-bold text-dark">🏪 Nuestras Tiendas y Sucursales</h1>
        <p className="text-secondary mx-auto" style={{ maxWidth: "680px" }}>
          Conoce la ubicación de nuestras salas de venta y centros logísticos donde se abastece y gestiona nuestro inventario diario.
        </p>
      </div>

      {/* Grid de Tiendas */}
      <div className="row g-4 mb-5">
        {tiendas.map((tienda) => (
          <div key={tienda.id} className="col-12 col-md-6">
            <div className="card h-100 shadow-sm border-0 border-top border-4 border-success">
              <div className="card-body p-4 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-bold text-success mb-0">
                      {tienda.nombre}
                    </h5>
                    {tienda.bodegaCentral && (
                      <span className="badge bg-warning text-dark">
                        Hub Central Logístico
                      </span>
                    )}
                  </div>
                  <p className="text-muted small mb-3">
                    📍 <strong>{tienda.direccion}</strong>, {tienda.comuna}
                  </p>

                  <div className="mb-3 bg-light p-3 rounded">
                    <p className="small mb-1 text-dark">
                      <strong>🕒 Horario de atención:</strong>
                    </p>
                    <p className="small text-secondary mb-2">{tienda.horario}</p>
                    <p className="small mb-0 text-dark">
                      <strong>📞 Teléfono:</strong>{" "}
                      <span className="text-secondary">{tienda.telefono}</span>
                    </p>
                  </div>

                  <div className="mb-2">
                    <p className="small fw-semibold text-dark mb-2">Servicios disponibles:</p>
                    <div className="d-flex flex-wrap gap-1">
                      {tienda.servicios.map((srv, idx) => (
                        <span key={idx} className="badge bg-secondary-subtle text-dark border">
                          ✓ {srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
                  <span className="text-success small fw-semibold">
                    ● Abierto hoy
                  </span>
                  <button className="btn btn-sm btn-outline-success">
                    Ver en Mapa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tarjeta informativa de reposición */}
      <div className="card bg-success text-white border-0 shadow-sm p-4 text-center">
        <h4 className="fw-bold mb-2">¿Necesitas coordinar despacho entre sucursales?</h4>
        <p className="mb-0 opacity-75">
          El equipo de logística del supermercado realiza traslados diarios de inventario entre la bodega central y nuestras salas de venta.
        </p>
      </div>
    </div>
  );
}

export default NuestrasTiendas;
