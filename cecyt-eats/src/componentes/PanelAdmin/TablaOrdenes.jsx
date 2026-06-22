import React from 'react'; 
  
const ESTADOS = ['Pendiente','Preparando','Listo para entrega','Entregado']; 
  
function TablaOrdenes({ pedidos, alActualizarEstado }) { 
  
  const obtenerNombreUsuario = (id_usuario) => { 
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 
    const u = usuarios.find(u => u.id_usuario === id_usuario); 
    return u ? u.nombre : `Usuario #${id_usuario}`; 
  }; 
  
  const formatearFecha = (isoString) => { 
    const d = new Date(isoString); 
    return d.toLocaleTimeString('es-MX', { hour:'2-digit', minute:'2-digit' 
}) 
         + ' — ' + d.toLocaleDateString('es-MX'); 
  }; 
  
  if (pedidos.length === 0) { 
    return <p style={{textAlign:'center',padding:'40px',color:'#888'}}> 
      Sin pedidos registrados todavía.</p>; 
  } 
  
  return ( 
    <section> 
      <h2 className='subtitulo-seccion'>Tabla de Órdenes 
({pedidos.length})</h2> 
      <table className='tabla-ordenes'> 
        <thead> 
          <tr> 
            <th># Pedido</th> 
            <th>Alumno</th> 
            <th>Hora</th> 
            <th>Total</th> 
            <th>Estado</th> 
          </tr> 
        </thead> 
        <tbody> 
          {pedidos.map(pedido => ( 
            <tr key={pedido.id_pedido}> 
              <td>#{pedido.id_pedido}</td> 
              <td>{obtenerNombreUsuario(pedido.id_usuario)}</td> 
              <td>{formatearFecha(pedido.fecha_hora)}</td> 
              <td>${Number(pedido.total).toFixed(2)}</td> 
              <td> 
                <select 
                  className={`selector-estado estado-${pedido.estado_pedido.replace(/ /g,'-').toLowerCase()}`} 
                  value={pedido.estado_pedido} 
                  onChange={(e) => 
                    alActualizarEstado(pedido.id_pedido, e.target.value) 
                  } 
                > 
                  {ESTADOS.map(est => ( 
                    <option key={est} value={est}>{est}</option> 
                  ))} 
                </select> 
              </td> 
            </tr> 
          ))} 
        </tbody> 
      </table> 
    </section> 
  ); 
} 
  
export default TablaOrdenes; 