import { createContext } from "react";

/**
 * Contexto global de Inventario para Supermercado Don Ahorro.
 * Se define en un archivo separado para soportar React Fast Refresh y buenas prácticas modulares.
 */
const InventarioContext = createContext(null);

export default InventarioContext;
