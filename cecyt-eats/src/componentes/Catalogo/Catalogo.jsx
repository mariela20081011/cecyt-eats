// src/componentes/Catalogo/Catalogo.jsx 
import React, { useState, useEffect } from 'react'; 
import TarjetaProducto from './TarjetaProducto'; 
import './Catalogo.css'; 
import { obtenerProductos } from '../../servicios/api'; 
  
function Catalogo({ 
  usuarioActivo, 
  alAgregarAlCarrito, 
  alVerCarrito, 
  totalEnCarrito, 
  alCerrarSesion 
}) { 
  
  const [productos,     setProductos]     = useState([]); 
  const [textoBusqueda, setTextoBusqueda] = useState(''); 
  const [cargando,      setCargando]      = useState(true); 
  const [errorCarga,    setErrorCarga]    = useState(''); 
  
  // Cargar productos desde MySQL via API al montar el componente 
  useEffect(() => { 
    const cargar = async () => { 
      setCargando(true); 
      const datos = await obtenerProductos(); 
      if (Array.isArray(datos)) { 
        setProductos(datos); 
      } else { 
        setErrorCarga('No se pudieron cargar los productos. Verifica el servidor.'); 
      } 
      setCargando(false); 
    }; 
    cargar(); 
  }, []); 
  
  // Filtrar en tiempo real por nombre o descripción 
  const productosFiltrados = productos.filter(p => 
    p.nombre_producto.toLowerCase().includes(textoBusqueda.toLowerCase()) 
|| 
    (p.descripcion && 
p.descripcion.toLowerCase().includes(textoBusqueda.toLowerCase())) 
  ); 
  
  return ( 
    <div className='contenedor-catalogo'> 
  
      {/* ── ENCABEZADO ── */} 
      <header className='encabezado-catalogo'> 
        <div> 
          <h1>Menú del Día</h1> 
          <p className='saludo-usuario'> 
            Hola, <strong>{usuarioActivo?.nombre}</strong> 👋 
          </p> 
        </div> 
        <div className='acciones-catalogo'> 
          <button className='btn-carrito' onClick={alVerCarrito}> 
            🛒 Carrito ({totalEnCarrito}) 
          </button> 
          <button className='btn-cerrar-sesion' onClick={alCerrarSesion}> 
            Salir 
          </button> 
        </div> 
      </header> 
  
      {/* ── BUSCADOR ── */} 
      <div className='contenedor-buscador'> 
        <input 
          type='text' 
          className='buscador' 
          placeholder='🔍  Buscar alimento...' 
          value={textoBusqueda} 
          onChange={(e) => setTextoBusqueda(e.target.value)} 
        /> 
      </div> 
  
      {/* ── ESTADOS DE CARGA ── */} 
      {cargando && ( 
        <p className='sin-resultados'>Cargando productos...</p> 
      )} 
  
      {errorCarga && ( 
        <p className='mensaje-error' style={{ textAlign: 'center', margin: 
'30px' }}> 
          {errorCarga} 
        </p> 
      )} 
  
      {/* ── CUADRÍCULA DE TARJETAS ── */} 
      {!cargando && !errorCarga && ( 
        productosFiltrados.length === 0 ? ( 
          <p className='sin-resultados'> 
            {textoBusqueda 
              ? `Sin resultados para "${textoBusqueda}".` 
              : 'No hay productos disponibles por el momento.'} 
          </p> 
        ) : ( 
          <div className='cuadricula-catalogo'> 
            {productosFiltrados.map(prod => ( 
              <TarjetaProducto 
                key={prod.id_producto} 
                producto={prod} 
                alAgregarAlCarrito={alAgregarAlCarrito} 
              /> 
            ))} 
          </div> 
        ) 
      )} 
    </div> 
  ); 
} 
  
export default Catalogo; 