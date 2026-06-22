// src/componentes/Autenticacion/InicioSesion.jsx 
import React, { useState } from 'react'; 
import './Autenticacion.css'; 
import { iniciarSesion } from '../../servicios/api'; 
  
function InicioSesion({ alCambiarARegistro, alIniciarSesionExitoso }) { 
  
  const [correo,     setCorreo]     = useState(''); 
  const [contrasena, setContrasena] = useState(''); 
  const [error,      setError]      = useState(''); 
  const [cargando,   setCargando]   = useState(false); 
  
  const manejarInicioSesion = async (e) => { 
    e.preventDefault(); 
    setError(''); 
  
    if (!correo || !contrasena) { 
      setError('Por favor, llena todos los campos.'); 
      return; 
    } 
  
    setCargando(true); 
    const respuesta = await iniciarSesion({ correo, contrasena }); 
    setCargando(false); 
  
    if (respuesta.error) { 
      setError(respuesta.error); 
      return; 
    } 
  
    // Guardar sesión en localStorage (solo el objeto usuario, sin contraseña) 
    if (respuesta.usuario) {
  localStorage.setItem(
    'usuarioActivo',
    JSON.stringify(respuesta.usuario)
  );

  alIniciarSesionExitoso(respuesta.usuario);
} else {
  console.log('Respuesta recibida:', respuesta);
  setError('No se recibieron datos del usuario.');
}
  }; 
  return ( 
    <div className='tarjeta-auth'> 
      <h2>Iniciar Sesión</h2> 
      <p className='subtitulo-auth'>Ingresa a tu panel de CECyT-Eats</p> 
  
      <form onSubmit={manejarInicioSesion}> 
  
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
            placeholder='Tu contraseña' 
          /> 
        </div> 
  
        <div className='enlaces-ux'> 
          <span className='olvide-contrasena'>¿Olvidaste tu 
contraseña?</span> 
        </div> 
  
        {error && <p className='mensaje-error'>{error}</p>} 
  
        <button type='submit' className='btn-auth' disabled={cargando}> 
          {cargando ? 'Verificando...' : 'Entrar'} 
        </button> 
      </form> 
  
      <p className='texto-cambio-auth'> 
        ¿No tienes cuenta?{' '} 
        <span onClick={alCambiarARegistro}>Regístrate aquí</span> 
      </p> 
    </div> 
  ); 
} 
  
export default InicioSesion;