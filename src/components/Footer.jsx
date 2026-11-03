function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-light border-top py-3 text-center text-muted small">
      <div className="container">
        <p className="mb-1 text-dark fw-bold">
          Supermercado Don Ahorro &copy; {anio} &bull; Propiedad de Eri Market &bull; Sistema de Inventario
        </p>
        <p className="mb-0">
          Desarrollo Frontend II (PFY2202) &bull; Evaluación Formativa Semana 1 &bull; Duoc UC
        </p>
      </div>
    </footer>
  );
}

export default Footer;
