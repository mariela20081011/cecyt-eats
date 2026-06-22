// src/componentes/Autenticacion/Registro.jsx 
import React, { useState } from 'react'; 
import './Autenticacion.css'; 
import { registrarUsuario } from '../../servicios/api'; 
  
function Registro({ alCambiarAInicioSesion }) { 
  
  const [nombre,     setNombre]     = useState(''); 
  const [correo,     setCorreo]     = useState(''); 
  const [contrasena, setContrasena] = useState(''); 
  const [rol,        setRol]        = useState('alumno'); 
  const [error,      setError]      = useState(''); 
  const [exito,      setExito]      = useState(''); 
  const [cargando,   setCargando]   = useState(false); 
  
  const manejarRegistro = async (e) => { 
    e.preventDefault(); 
    setError(''); setExito(''); 
  
    if (!nombre || !correo || !contrasena) { 
      setError('Por favor, completa todos los campos.'); 
      return; 
    } 
    if (contrasena.length < 6) { 
      setError('La contraseña debe tener al menos 6 caracteres.'); 
      return; 
    } 
  
    setCargando(true); 
    const respuesta = await registrarUsuario({ nombre, correo, contrasena, 
rol }); 
    setCargando(false); 
  
    if (respuesta.error) { 
      setError(respuesta.error); 
      return; 
    } 
  
    setExito('¡Registro exitoso! Ya puedes iniciar sesión.'); 
    setNombre(''); setCorreo(''); setContrasena(''); 
  }; 
  
  return ( 
    <div className='tarjeta-auth'> 
      <h2>Crear Cuenta</h2> 
      <p className='subtitulo-auth'>Regístrate para ordenar en CECyT
Eats</p> 
  
      <form onSubmit={manejarRegistro}> 
  
        <div className='grupo-campo'> 
          <label>Nombre Completo</label> 
          <input 
            type='text' 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder='Ej. Juan Pérez' 
          /> 
        </div> 
  
        <div className='grupo-campo'> 
          <label>Correo Electrónico</label> 
          <input 
            type='email' 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
            placeholder='usuario@correo.com' 
          /> 
        </div> 
  
        <div className='grupo-campo'> 
          <label>Contraseña</label> 
          <input 
            type='password' 
            value={contrasena} 
            onChange={(e) => setContrasena(e.target.value)} 
            placeholder='Mínimo 6 caracteres' 
          /> 
        </div> 
  
        <div className='grupo-campo'> 
          <label>Tipo de Usuario (Rol)</label> 
          <select value={rol} onChange={(e) => setRol(e.target.value)}> 
            <option value='alumno'>Alumno</option> 
            <option value='administrador'>Personal de Cafetería 
(Admin)</option> 
          </select> 
        </div> 
  
        {error && <p className='mensaje-error'>{error}</p>} 
        {exito && <p className='mensaje-exito'>{exito}</p>} 
  
        <button type='submit' className='btn-auth' disabled={cargando}> 
          {cargando ? 'Registrando...' : 'Registrarme'} 
        </button> 
      </form> 
  
      <p className='texto-cambio-auth'> 
        ¿Ya tienes una cuenta?{' '} 
        <span onClick={alCambiarAInicioSesion}>Inicia Sesión aquí</span> 
      </p> 
    </div> 
  ); 
} 
  
export default Registro; 