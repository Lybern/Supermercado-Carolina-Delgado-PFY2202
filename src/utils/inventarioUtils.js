/**
 * Funciones utilitarias para la gestión del inventario de supermercado.
 * Centraliza reglas de negocio para asegurar consistencia entre KPI, filtros y tabla.
 */

/**
 * Determina si un producto se encuentra en stock crítico o bajo su mínimo.
 * @param {Object} producto
 * @returns {boolean}
 */
export const esStockCritico = (producto) => {
  if (!producto) return false;
  return Number(producto.stock) <= Number(producto.stockMinimo);
};

/**
 * Determina si el stock está en nivel de alerta preventiva (entre mínimo y 1.5x el mínimo).
 * @param {Object} producto
 * @returns {boolean}
 */
export const esStockAlerta = (producto) => {
  if (!producto) return false;
  const stock = Number(producto.stock);
  const stockMin = Number(producto.stockMinimo);
  return stock > stockMin && stock <= stockMin * 1.5;
};

/**
 * Devuelve la etiqueta y variante de color Bootstrap para el estado del stock.
 * @param {Object} producto
 * @returns {{ estado: string, badgeClass: string, nivel: 'critico'|'alerta'|'optimo'|'agotado' }}
 */
export const obtenerEstadoStock = (producto) => {
  if (!producto) {
    return { estado: "Desconocido", badgeClass: "bg-secondary", nivel: "desconocido" };
  }

  const stock = Number(producto.stock);

  if (stock === 0) {
    return { estado: "Agotado", badgeClass: "bg-dark", nivel: "agotado" };
  }
  if (esStockCritico(producto)) {
    return { estado: "Crítico", badgeClass: "bg-danger", nivel: "critico" };
  }
  if (esStockAlerta(producto)) {
    return { estado: "Alerta", badgeClass: "bg-warning text-dark", nivel: "alerta" };
  }
  return { estado: "Óptimo", badgeClass: "bg-success", nivel: "optimo" };
};

/**
 * Formatea un valor numérico a pesos chilenos (CLP).
 * @param {number} valor
 * @returns {string}
 */
export const formatearMoneda = (valor) => {
  return `$${Number(valor || 0).toLocaleString("es-CL")}`;
};
