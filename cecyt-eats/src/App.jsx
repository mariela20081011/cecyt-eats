// src/App.jsx 
// ───────────────────────────────────────────────────────────────────── 
import React, { useState, useEffect } from 'react'; 
  
// Componentes de pantalla 
import PaginaInicio  from './componentes/PaginaInicio/PaginaInicio'; 
import InicioSesion  from './componentes/Autenticacion/InicioSesion'; 
import Registro      from './componentes/Autenticacion/Registro'; 
import Catalogo      from './componentes/Catalogo/Catalogo'; 
import Carrito       from './componentes/Carrito/Carrito'; 
import PanelAdmin    from './componentes/PanelAdmin/PanelAdmin'; 
  
// Servicio de API (MySQL via Node/Express) 
import { crearPedido } from './servicios/api'; 
  
function App() { 
  
  // ── ESTADOS GLOBALES ────────────────────────────────────────────── 
  const [pantallaActual,   setPantallaActual]   = useState('inicio'); 
  const [usuarioActivo,    setUsuarioActivo]    = useState(null); 
  const [elementosCarrito, setElementosCarrito] = useState([]); 
  
  // ── VERIFICAR SESIÓN GUARDADA AL CARGAR LA APP ──────────────────── 
  useEffect(() => {
  const sesionGuardada = localStorage.getItem('usuarioActivo');

  if (
    sesionGuardada &&
    sesionGuardada !== 'undefined' &&
    sesionGuardada !== 'null'
  ) {
    try {
      const usuario = JSON.parse(sesionGuardada);
      setUsuarioActivo(usuario);

      if (usuario.rol === 'administrador') {
        setPantallaActual('adminPanel');
      } else {
        setPantallaActual('catalogo');
      }
    } catch (error) {
      console.error('Error al leer la sesión:', error);
      localStorage.removeItem('usuarioActivo');
    }
  }
}, []);
  
  // ── MANEJO DE SESIÓN ────────────────────────────────────────────── 
  const manejarInicioSesionExitoso = (usuario) => { 
    setUsuarioActivo(usuario); 
    if (usuario.rol === 'administrador') { 
      setPantallaActual('adminPanel'); 
    } else { 
      setPantallaActual('catalogo'); 
    } 
  }; 
  
  const manejarCierreSesion = () => { 
    localStorage.removeItem('usuarioActivo'); 
    setUsuarioActivo(null); 
    setElementosCarrito([]); 
    setPantallaActual('inicio'); 
  }; 
  
  // ── MANEJO DEL CARRITO ──────────────────────────────────────────── 
  const agregarAlCarrito = (producto) => { 
    setElementosCarrito(prev => { 
      const existente = prev.find(i => i.id_producto === 
producto.id_producto); 
      if (existente) { 
        return prev.map(i => 
          i.id_producto === producto.id_producto 
            ? { ...i, cantidad: i.cantidad + 1 } 
            : i 
        ); 
      } 
      return [...prev, { ...producto, cantidad: 1 }]; 
    }); 
  }; 
  
  const cambiarCantidadCarrito = (id_producto, delta) => { 
    setElementosCarrito(prev => 
      prev 
        .map(i => 
          i.id_producto === id_producto 
            ? { ...i, cantidad: i.cantidad + delta } 
            : i 
        ) 
        .filter(i => i.cantidad > 0) 
    ); 
  }; 
  
  const eliminarDelCarrito = (id_producto) => { 
    setElementosCarrito(prev => 
      prev.filter(i => i.id_producto !== id_producto) 
    ); 
  }; 
  
  // Cantidad total de artículos en el carrito (para el badge del botón) 
  const totalEnCarrito = elementosCarrito.reduce( 
    (acc, i) => acc + i.cantidad, 0 
  ); 
  
  // ── FINALIZAR PEDIDO (guarda en MySQL via API) ──────────────────── 
  const finalizarPedido = async () => { 
    const subtotal = elementosCarrito.reduce( 
      (acc, i) => acc + i.precio * i.cantidad, 0 
    ); 
  
    const detalles = elementosCarrito.map(item => ({ 
      id_producto:     item.id_producto, 
      cantidad:        item.cantidad, 
      precio_unitario: item.precio, 
    })); 
  
    const respuesta = await crearPedido({ 
      id_usuario: usuarioActivo.id_usuario, 
      total:      parseFloat(subtotal.toFixed(2)), 
      detalles, 
    }); 
  
    if (respuesta.error) { 
      alert('Error al guardar el pedido: ' + respuesta.error); 
      return; 
    } 
  
    setElementosCarrito([]); 
    alert(`✔️ Pedido #${respuesta.id_pedido} registrado 
correctamente.\nEstado: Pendiente`); 
    setPantallaActual('catalogo'); 
  }; 
  
  // ── ÁRBOL DE PANTALLAS ──────────────────────────────────────────── 
  return ( 
    <div> 
  
      {/* Página de Inicio (Landing Page) */} 
      {pantallaActual === 'inicio' && ( 
        <PaginaInicio 
          alNavegararInicioSesion={() => setPantallaActual('inicioSesion')} 
          alNavegararRegistro={() => setPantallaActual('registro')} 
        /> 
      )} 
  
      {/* Inicio de Sesión */} 
      {pantallaActual === 'inicioSesion' && ( 
        <div style={{ padding: '20px' }}> 
          <button 
            onClick={() => setPantallaActual('inicio')} 
            style={{ margin: '10px', padding: '5px 10px' }} 
          > 
            ← Volver al Inicio 
          </button> 
          <InicioSesion 
            alCambiarARegistro={() => setPantallaActual('registro')} 
            alIniciarSesionExitoso={manejarInicioSesionExitoso} 
          /> 
        </div> 
      )} 
  
      {/* Registro */} 
      {pantallaActual === 'registro' && ( 
        <div style={{ padding: '20px' }}> 
          <button 
            onClick={() => setPantallaActual('inicio')} 
            style={{ margin: '10px', padding: '5px 10px' }} 
          > 
            ← Volver al Inicio 
          </button> 
          <Registro 
            alCambiarAInicioSesion={() => 
setPantallaActual('inicioSesion')} 
          /> 
        </div> 
      )} 
  
      {/* Catálogo — solo alumnos */} 
      {pantallaActual === 'catalogo' && ( 
        <Catalogo 
          usuarioActivo={usuarioActivo} 
          alAgregarAlCarrito={agregarAlCarrito} 
          alVerCarrito={() => setPantallaActual('carrito')} 
          totalEnCarrito={totalEnCarrito} 
          alCerrarSesion={manejarCierreSesion} 
        /> 
      )} 
  
      {/* Carrito de compras */} 
      {pantallaActual === 'carrito' && ( 
        <Carrito 
          elementos={elementosCarrito} 
          usuarioActivo={usuarioActivo} 
          alCambiarCantidad={cambiarCantidadCarrito} 
          alEliminarElemento={eliminarDelCarrito} 
          alFinalizarPedido={finalizarPedido} 
          alSeguirComprando={() => setPantallaActual('catalogo')} 
        /> 
      )} 
  
      {/* Panel de Administrador — solo administradores */} 
      {pantallaActual === 'adminPanel' && ( 
        <PanelAdmin 
          usuarioActivo={usuarioActivo} 
          alCerrarSesion={manejarCierreSesion} 
        /> 
      )} 
  
    </div> 
  ); 
} 
  
export default App;