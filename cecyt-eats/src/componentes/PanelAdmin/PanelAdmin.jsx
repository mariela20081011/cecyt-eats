// src/componentes/PanelAdmin/PanelAdmin.jsx 
import React, { useState, useEffect } from 'react'; 
import TablaOrdenes       from './TablaOrdenes'; 
import FormularioProducto from './FormularioProducto'; 
import './PanelAdmin.css'; 
import { 
  obtenerPedidos, 
  obtenerProductos, 
  crearProducto, 
  editarProducto, 
  eliminarProducto   as apiEliminarProducto, 
  actualizarEstadoPedido as apiActualizarEstado, 
} from '../../servicios/api'; 
  
function PanelAdmin({ usuarioActivo, alCerrarSesion }) { 
  
  const [pestanaActiva,     setPestanaActiva]     = useState('dashboard'); 
  const [pedidos,           setPedidos]           = useState([]); 
  const [productos,         setProductos]         = useState([]); 
  const [productoEditando,  setProductoEditando]  = useState(null); 
  const [cargando,          setCargando]          = useState(true); 
  
  // ── CARGAR DATOS DESDE MYSQL ──────────────────────────────────── 
  useEffect(() => { 
    const cargarDatos = async () => { 
      setCargando(true); 
      const [datosPedidos, datosProductos] = await Promise.all([ 
        obtenerPedidos(), 
        obtenerProductos(), 
      ]); 
      if (Array.isArray(datosPedidos))  setPedidos(datosPedidos); 
      if (Array.isArray(datosProductos)) setProductos(datosProductos); 
      setCargando(false); 
    }; 
    cargarDatos(); 
  }, []); 
  
  // ── MÉTRICAS DEL DASHBOARD ────────────────────────────────────── 
  const pedidosPendientes = pedidos.filter( 
    p => p.estado_pedido === 'Pendiente' 
  ).length; 
  
  const pedidosHoy = pedidos.filter(p => { 
    const fecha = new Date(p.fecha_hora); 
    const hoy   = new Date(); 
    return fecha.toDateString() === hoy.toDateString(); 
  }).length; 
  
  const ingresosTotales = pedidos.reduce( 
    (acc, p) => acc + parseFloat(p.total || 0), 0 
  ); 
  
  const productosAgotados = productos.filter( 
    p => !p.estado_disponible || p.estado_disponible === 0 
  ).length; 
  
  // ── CRUD PRODUCTOS ─────────────────────────────────────────────── 
  const guardarProducto = async (datosProducto) => { 
    let respuesta; 
    if (datosProducto.id_producto) { 
      // EDITAR producto existente 
      respuesta = await editarProducto(datosProducto.id_producto, 
datosProducto); 
    } else { 
      // CREAR producto nuevo 
      respuesta = await crearProducto(datosProducto); 
    } 
    if (respuesta.error) { 
      alert('Error al guardar: ' + respuesta.error); 
      return; 
    } 
    // Recargar lista actualizada desde MySQL 
    const listaActualizada = await obtenerProductos(); 
    if (Array.isArray(listaActualizada)) setProductos(listaActualizada); 
    setProductoEditando(null); 
  }; 
  
  const manejarEliminarProducto = async (id_producto) => { 
    if (!window.confirm('¿Eliminar este producto del inventario?')) return; 
    const respuesta = await apiEliminarProducto(id_producto); 
    if (respuesta.error) { 
      alert('Error al eliminar: ' + respuesta.error); 
      return; 
    } 
    setProductos(prev => prev.filter(p => p.id_producto !== id_producto)); 
  }; 
  
  // ── CAMBIO DE ESTADO DE PEDIDO ─────────────────────────────────── 
  const manejarActualizarEstado = async (id_pedido, nuevoEstado) => { 
    const respuesta = await apiActualizarEstado(id_pedido, nuevoEstado); 
    if (respuesta.error) { 
      alert('Error al actualizar estado: ' + respuesta.error); 
      return; 
    } 
    // Actualizar estado en la lista local sin recargar todo 
    setPedidos(prev => prev.map(p => 
      p.id_pedido === id_pedido 
        ? { ...p, estado_pedido: nuevoEstado } 
        : p 
    )); 
  }; 
  
  // ── RENDERIZADO ───────────────────────────────────────────────── 
  return ( 
    <div className='contenedor-panel'> 
  
      {/* ── BARRA SUPERIOR ── */} 
      <header className='header-panel'> 
        <span className='titulo-panel'> 
          🍽️ CECyT-Eats — Panel de Administrador 
        </span> 
        <div className='info-admin'> 
          <span>👤 {usuarioActivo?.nombre}</span> 
          <button className='btn-salir-admin' onClick={alCerrarSesion}> 
            Cerrar Sesión 
          </button> 
        </div> 
      </header> 
  
      {/* ── PESTAÑAS ── */} 
      <nav className='pestanas-panel'> 
        {['dashboard', 'ordenes', 'inventario'].map(tab => ( 
          <button 
            key={tab} 
            className={`btn-pestana ${pestanaActiva === tab ? 'activa' : 
''}`} 
            onClick={() => setPestanaActiva(tab)} 
          > 
            {{ dashboard: '📊 Dashboard', ordenes: '📋 Órdenes', 
               inventario: '🥗 Inventario' }[tab]} 
          </button> 
        ))} 
      </nav> 
  
      <main className='cuerpo-panel'> 
  
        {cargando && <p style={{ padding: '40px', textAlign: 'center' 
}}>Cargando datos...</p>} 
  
        {/* ── DASHBOARD ── */} 
        {!cargando && pestanaActiva === 'dashboard' && ( 
          <section> 
            <h2 className='subtitulo-seccion'>Resumen del Día</h2> 
            <div className='cuadricula-metricas'> 
              <div className='tarjeta-metrica'> 
                <span className='numero-metrica'>{pedidosHoy}</span> 
                <span className='etiqueta-metrica'>Pedidos hoy</span> 
              </div> 
              <div className='tarjeta-metrica alerta'> 
                <span className='numero-metrica'>{pedidosPendientes}</span> 
                <span className='etiqueta-metrica'>Pendientes</span> 
              </div> 
              <div className='tarjeta-metrica'> 
                <span className='numero
metrica'>${ingresosTotales.toFixed(2)}</span> 
                <span className='etiqueta-metrica'>Ingresos totales</span> 
              </div> 
              <div className='tarjeta-metrica advertencia'> 
                <span className='numero-metrica'>{productosAgotados}</span> 
                <span className='etiqueta-metrica'>Productos 
agotados</span> 
              </div> 
            </div> 
          </section> 
        )} 
  
        {/* ── ÓRDENES ── */} 
        {!cargando && pestanaActiva === 'ordenes' && ( 
          <TablaOrdenes 
            pedidos={pedidos} 
            alActualizarEstado={manejarActualizarEstado} 
          /> 
        )} 
  
        {/* ── INVENTARIO / CRUD ── */} 
        {!cargando && pestanaActiva === 'inventario' && ( 
          <section> 
            <div className='cabecera-inventario'> 
              <h2 className='subtitulo-seccion'>Gestión de Productos</h2> 
              <button 
                className='btn-nuevo-producto' 
                onClick={() => setProductoEditando({})} 
              > 
                + Nuevo producto 
              </button> 
            </div> 
  
            {productoEditando !== null && ( 
              <FormularioProducto 
                productoInicial={productoEditando} 
                alGuardar={guardarProducto} 
                alCancelar={() => setProductoEditando(null)} 
              /> 
            )} 
  
            <table className='tabla-inventario'> 
              <thead> 
                <tr> 
                  <th>ID</th> 
                  <th>Producto</th> 
                  <th>Precio</th> 
                  <th>Stock</th> 
                  <th>Disponible</th> 
                  <th>Acciones</th> 
                </tr> 
              </thead> 
              <tbody> 
                {productos.map(prod => ( 
                  <tr key={prod.id_producto}> 
                    <td>{prod.id_producto}</td> 
                    <td>{prod.nombre_producto}</td> 
                    <td>${parseFloat(prod.precio).toFixed(2)}</td> 
                    <td>{prod.stock}</td> 
                    <td> 
                      <span className={ 
                        prod.estado_disponible && prod.estado_disponible 
!== 0 
                          ? 'badge-disponible' 
                          : 'badge-agotado' 
                      }> 
                        {prod.estado_disponible && prod.estado_disponible 
!== 0 ? 'Sí' : 'No'} 
                      </span> 
                    </td> 
                    <td className='celda-acciones'> 
                      <button 
                        className='btn-editar' 
                        onClick={() => setProductoEditando(prod)} 
                      > 
                        Editar 
                      </button> 
                      <button 
                        className='btn-eliminar' 
                        onClick={() => 
manejarEliminarProducto(prod.id_producto)} 
                      > 
Eliminar 
</button> 
</td> 
</tr> 
))} 
</tbody> 
</table> 
</section> 
)} 
</main> 
</div> 
); 
} 
export default PanelAdmin;