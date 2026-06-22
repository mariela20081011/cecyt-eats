import React from 'react'; 
import './Carrito.css'; 
  
function Carrito({ 
  elementos, 
  usuarioActivo, 
  alCambiarCantidad, 
  alEliminarElemento, 
  alFinalizarPedido, 
  alSeguirComprando 
}) { 
  const TASA_IVA = 0.0; // Cambia a 0.16 si el negocio aplica IVA 
  
  // Calcular totales con reduce (recorre todos los elementos sumando precio x cantidad) 
  
  const subtotal   = elementos.reduce((acc, i) => acc + i.precio * 
i.cantidad, 0); 
  const impuestos  = subtotal * TASA_IVA; 
  const totalFinal = subtotal + impuestos; 
  
  // Si el carrito está vacío, mostrar pantalla alternativa (early return) 
  if (elementos.length === 0) { 
    return ( 
      <div className='carrito-vacio'> 
        <p className='icono-vacio'>🛒</p> 
        <h3>Tu carrito está vacío</h3> 
        <p>Regresa al menú y agrega tus platillos favoritos.</p> 
        <button className='btn-volver-menu' onClick={alSeguirComprando}> 
          ← Ver Menú 
        </button> 
      </div> 
    ); 
  } 
  
  return ( 
    <div className='contenedor-carrito'> 
      <h2 className='titulo-carrito'>Tu Pedido</h2> 
  
      {/* ── LISTA DESGLOSADA (requerimiento UI/UX) ── */} 
      <div className='lista-carrito'> 
        {elementos.map(item => ( 
          <div key={item.id_producto} className='fila-carrito'> 
  
            <div className='info-item'> 
              <span className='nombre-item'>{item.nombre_producto}</span> 
              <span className='precio-unitario-item'> 
                {Number(item.precio).toFixed(2)} c/u 
              </span> 
            </div> 
  
            {/* ── CONTROLES DE CANTIDAD (+/-) (requerimiento UI/UX) ── */} 
            <div className='controles-cantidad'> 
              <button 
                className='btn-control' 
                onClick={() => alCambiarCantidad(item.id_producto, -1)} 
              >−</button> 
              <span className='cantidad-actual'>{item.cantidad}</span> 
              <button 
                className='btn-control' 
                onClick={() => alCambiarCantidad(item.id_producto, +1)} 
              >+</button> 
            </div> 
  
            <span className='subtotal-item'> 
              ${(item.precio * item.cantidad).toFixed(2)} 
            </span> 
  
            <button 
              className='btn-eliminar-item' 
              onClick={() => alEliminarElemento(item.id_producto)} 
              title='Eliminar del carrito' 
            >✕</button> 
          </div> 
        ))} 
      </div> 
  
      {/* ── RESUMEN DE PAGO (requerimiento UI/UX) ── */} 
      <div className='resumen-pago'> 
        <div className='linea-resumen'> 
          <span>Subtotal</span> 
          <span>${subtotal.toFixed(2)}</span> 
        </div> 
        {TASA_IVA > 0 && ( 
          <div className='linea-resumen'> 
            <span>IVA ({(TASA_IVA * 100).toFixed(0)}%)</span> 
            <span>${impuestos.toFixed(2)}</span> 
          </div> 
        )} 
        <div className='linea-resumen linea-total'> 
          <span>TOTAL A PAGAR</span> 
          <span>${totalFinal.toFixed(2)}</span> 
        </div> 
      </div> 
  
      {/* ── BOTONES DE ACCIÓN ── */} 
      <div className='acciones-carrito'> 
        <button className='btn-seguir' onClick={alSeguirComprando}> 
          ← Seguir comprando 
        </button> 
        {/* Botón grande destacado (requerimiento UI/UX) */} 
        <button className='btn-finalizar' onClick={alFinalizarPedido}> 
          ✔ Finalizar Pedido 
        </button> 
      </div> 
    </div> 
  ); 
} 
  
export default Carrito; 