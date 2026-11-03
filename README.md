# Supermercado Don Ahorro (Eri Market) - Control de Inventario 🛒🐾

Proyecto desarrollado para la **Evaluación Formativa Semana 2 (Forma B)** de la asignatura **Desarrollo Frontend II (PFY2202)** en Duoc UC.

- **Estudiante:** Carolina Delgado
- **Repositorio Oficial:** [Supermercado-Carolina-Delgado-PFY2202](https://github.com/Lybern/Supermercado-Carolina-Delgado-PFY2202)
- **Stack Tecnológico:** React 19, React Router, Context API, Bootstrap 5, Vite

---

## 🎯 Requerimientos y Mejoras Implementadas (Semana 2 - Forma B)

### 1. Gestión de Estado Global con Context API (40 pts)
- **`InventarioContext.js`:** Contexto centralizado creado de forma modular y desacoplada para soporte de Fast Refresh.
- **`InventarioProvider.jsx`:** Proveedor que envuelve toda la aplicación (`App.jsx`). Administra la lista de productos en memoria asegurando que los datos persistan durante la navegación entre rutas.
- **`useInventario.js`:** Hook personalizado para consumo directo del estado global con validación de contexto activo.
- **Inmutabilidad:** Operaciones de agregado (`agregarProducto`) y ajuste de existencias (`modificarStock`) implementadas mediante técnicas de actualización inmutable (`[...previos, nuevo]`, `.map()`).

### 2. Atributos Requeridos por Caso Supermercado (Forma B)
- **Campo Obligatorio `marca`:** Se incorporó el atributo `marca` tanto en la fuente de datos base ([`inventarioData.js`](file:///C:/Users/Carolina/Desktop/Noveno%20bimestre/Desarrollo%20Frontend%20II/Exp1%20S2/Exp1_S2_CarolinaDelgado/src/data/inventarioData.js)), como en las columnas de la tabla y en el formulario de registro.
- **Tipos de producto (categorías):** Centralizados en una constante única para evitar discrepancias.

### 3. Vistas Dedicadas y Enrutamiento con React Router
- **`/` (Panel de Control):** Vista general con métricas ejecutivas, accesos rápidos y panel de gestión.
- **`/inventario` (Listado en Tabla):** Vista tabular dedicada que consume el estado global, con KPIs ([`KpiCard.jsx`](file:///C:/Users/Carolina/Desktop/Noveno%20bimestre/Desarrollo%20Frontend%20II/Exp1%20S2/Exp1_S2_CarolinaDelgado/src/components/KpiCard.jsx)), filtros dinámicos por texto/categoría, alerta de stock crítico y botones de ajuste de existencias.
- **`/nuevo-producto` (Ingresar Artículos):** Página independiente con formulario estructurado, validaciones en tiempo real (SKU único, obligatoriedad, control contra números negativos) y alertas visuales Bootstrap.
- **`/tiendas`, `/quienes-somos`, `/contactanos`:** Páginas informativas del supermercado.
- **`*` (Error 404):** Vista amigable [`NotFound.jsx`](file:///C:/Users/Carolina/Desktop/Noveno%20bimestre/Desarrollo%20Frontend%20II/Exp1%20S2/Exp1_S2_CarolinaDelgado/src/pages/NotFound.jsx) para destinos no reconocidos.

### 4. Modularidad y Buenas Prácticas (Retroalimentación Docente)
- **Principio DRY en KPIs:** Componente reutilizable [`KpiCard.jsx`](file:///C:/Users/Carolina/Desktop/Noveno%20bimestre/Desarrollo%20Frontend%20II/Exp1%20S2/Exp1_S2_CarolinaDelgado/src/components/KpiCard.jsx) parametrizado por props.
- **Lógica de negocio unificada:** [`inventarioUtils.js`](file:///C:/Users/Carolina/Desktop/Noveno%20bimestre/Desarrollo%20Frontend%20II/Exp1%20S2/Exp1_S2_CarolinaDelgado/src/utils/inventarioUtils.js) centraliza `esStockCritico`, `obtenerEstadoStock` y `formatearMoneda`.
- **Generación de ID segura:** Uso de `crypto.randomUUID()` para evitar colisiones.

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/Lybern/Supermercado-Carolina-Delgado-PFY2202.git
   cd Supermercado-Carolina-Delgado-PFY2202
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor local en modo desarrollo:**
   ```bash
   npm run dev
   ```

4. **Compilar para producción:**
   ```bash
   npm run build
   ```

---

## 📁 Estructura del Proyecto

```text
src/
├── components/
│   ├── BottomNav.jsx         # Menú inferior con React Router NavLink
│   ├── Header.jsx            # Encabezado institucional y navegación superior
│   ├── Footer.jsx            # Pie de página institucional
│   ├── KpiCard.jsx           # Tarjeta modular reutilizable de indicadores (DRY)
│   └── OrangeTabbyCat.jsx    # Mascota institucional del supermercado
├── context/
│   ├── InventarioContext.js  # Contexto global
│   └── InventarioProvider.jsx # Proveedor de estado global e inmutabilidad
├── data/
│   └── inventarioData.js     # Datos iniciales, categorías y constantes
├── hooks/
│   └── useInventario.js      # Hook personalizado para consumo del contexto
├── pages/
│   ├── HomeInventario.jsx    # Panel de control de inventario
│   ├── ListadoInventario.jsx # Vista dedicada: Listado en tabla de artículos
│   ├── NuevoProducto.jsx     # Vista dedicada: Formulario de ingreso de artículos
│   ├── NuestrasTiendas.jsx   # Información de sucursales y bodegas
│   ├── QuienesSomos.jsx      # Misión, visión e historia institucional
│   ├── Contactanos.jsx       # Canales de soporte y formulario
│   └── NotFound.jsx          # Manejo de error 404 para rutas desconocidas
├── utils/
│   └── inventarioUtils.js    # Funciones utilitarias y reglas de stock centralizadas
├── App.jsx                   # Layout global, enrutamiento y envoltura con Context
├── main.jsx                  # Entrada principal y BrowserRouter
└── index.css                 # Estilos y temas
```
