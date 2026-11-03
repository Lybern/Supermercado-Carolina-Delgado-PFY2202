# Supermercado Don Ahorro - Gestión de Inventario 🛒

Proyecto desarrollado para la **Evaluación Formativa Semana 1** de la asignatura **Desarrollo Frontend II (PFY2202)** en Duoc UC.

- **Estudiante:** Carolina Delgado
- **Repositorio:** [Exp1_S1_FrontendII](https://github.com/Lybern/Exp1_S1_FrontendII)
- **Tecnologías:** React 19, React Router (v8), Bootstrap 5, Vite

---

## 📌 Requerimientos Desarrollados

1. **Página Principal (Home) - Gestión de Inventario:**
   - Métricas en tiempo real (Total de productos, stock crítico, valor total del inventario y categorías).
   - Tabla interactiva con búsqueda por texto y SKU, filtrado por categorías y filtro de existencias críticas.
   - Ajuste rápido de stock (+1 / -1) y formulario para registrar nuevos productos.
2. **Menú Inferior de Navegación (Bottom Navigation):**
   - Barra de navegación ubicada en la parte inferior del sitio (`BottomNav.jsx`), implementada con `NavLink` de **React Router** para evitar recargas de página y mantener la experiencia SPA.
3. **Páginas Adicionales Seleccionadas:**
   - **Nuestras Tiendas (`/tiendas`):** Red de sucursales, horarios, teléfonos, servicios y bodega central.
   - **Quiénes Somos (`/quienes-somos`):** Historia, misión, visión y pilares de calidad.
   - **Contáctanos (`/contactanos`):** Canales de atención y formulario interactivo.

---

## 🚀 Instalación y Ejecución Local

1. **Clonar o abrir la carpeta del proyecto en Visual Studio Code:**
   ```bash
   cd Exp1_S1_FrontendII
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador:**
   Accede a la URL indicada en la consola (por defecto `http://localhost:5173`).

---

## 📁 Estructura del Proyecto

```text
Exp1_S1_FrontendII/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Encabezado institucional
│   │   ├── BottomNav.jsx    # Menú inferior con React Router NavLink
│   │   └── Footer.jsx       # Pie de página y créditos
│   ├── pages/
│   │   ├── HomeInventario.jsx # Home: Control de existencias y catálogo
│   │   ├── NuestrasTiendas.jsx # Información de sucursales
│   │   ├── QuienesSomos.jsx    # Misión, visión e historia
│   │   └── Contactanos.jsx     # Formulario y canales de soporte
│   ├── data/
│   │   └── inventarioData.js   # Datos iniciales del supermercado
│   ├── App.jsx             # Enrutamiento principal con Routes y Route
│   ├── main.jsx            # Punto de entrada y BrowserRouter
│   └── index.css           # Estilos personalizados y utilidades
├── index.html
├── package.json
├── vite.config.js
└── README.md
```
