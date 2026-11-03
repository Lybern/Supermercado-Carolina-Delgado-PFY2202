import { useContext } from "react";
import InventarioContext from "../context/InventarioContext";

/**
 * Hook personalizado para consumir el estado global del inventario.
 * Lanza un error descriptivo si se intenta invocar fuera del InventarioProvider.
 */
export function useInventario() {
  const contexto = useContext(InventarioContext);

  if (!contexto) {
    throw new Error(
      "useInventario debe utilizarse obligatoriamente dentro de un InventarioProvider."
    );
  }

  return contexto;
}

export default useInventario;
