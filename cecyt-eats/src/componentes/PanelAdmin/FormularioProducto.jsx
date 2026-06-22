import React, { useState } from 'react'; 
function FormularioProducto({ productoInicial, alGuardar, alCancelar }) { 
      // Inicializar el formulario con los datos existentes o con valores vacíos 
       const [form, setForm] = useState({    
         id_producto:      productoInicial.id_producto      || null,     
         nombre_producto:  productoInicial.nombre_producto  || '',     
         descripcion:      productoInicial.descripcion      || '',    
          precio:           productoInicial.precio          || '',     
          stock:            productoInicial.stock           || '',    
           estado_disponible:productoInicial.estado_disponible ?? true,     
           imagen:           productoInicial.imagen          || '', 
            });  
             const [errores, setErrores] = useState({}); 
              // Actualizar cualquier campo del formulario con una sola función   
              const actualizarCampo = (campo, valor) => {    
                 setForm(prev => ({ ...prev, [campo]: valor })); 
                  };   
                   const validar = () => {     
                    const e = {};     
                    if (!form.nombre_producto.trim()) e.nombre_producto = 'El nombre es obligatorio.'; 
                    if (!form.precio || isNaN(form.precio) || form.precio <= 0)      
                         e.precio = 'Ingresa un precio válido mayor a 0.';     
                        if (!form.stock  || isNaN(form.stock)  || form.stock  < 0)      
                             e.stock  = 'Ingresa una cantidad de stock válida (0 o más).';     
                            return e;   
                        }; 
                         const manejarEnvio = (e) => {    
                             e.preventDefault();     
                             const erroresValidacion = validar();    
                              if (Object.keys(erroresValidacion).length > 0) {      
                                 setErrores(erroresValidacion); return;     
                                } 
                                 alGuardar({      
                                     ...form,       
                                     precio: parseFloat(form.precio),      
                                      stock:  parseInt(form.stock, 10),    
                                     });   
                                    }; 
                                     const esEdicion = !!form.id_producto; 
                                      return (    
                                         <div className='formulario-producto'>      
                                          <h3>{esEdicion ? '✏️ Editar Producto' : '➕ Nuevo Producto'}</h3>     
                                            <form onSubmit={manejarEnvio} className='grilla-formulario'> 
                                                 <div className='grupo-form'>           
                                                    <label>Nombre del producto *</label>           
                                                    <input type='text' value={form.nombre_producto}             
                                                    onChange={e => actualizarCampo('nombre_producto', e.target.value)} /> 
                                                     {errores.nombre_producto &&             
                                                     <span className='error-campo'>{errores.nombre_producto}</span>}        
                                                      </div> 
                                                         <div className='grupo-form'>          
                                                             <label>Descripción</label>          
                                                              <input type='text' value={form.descripcion}           
                                                                onChange={e => actualizarCampo('descripcion', e.target.value)} /> 
                                                                 </div>          
                                                                  <div className='grupo-form'>         
                                                                      <label>Precio ($) *</label>         
                                                                        <input type='number' step='0.01' value={form.precio}
                                                                                     onChange={e => actualizarCampo('precio', e.target.value)} /> 
                                                                                      {errores.precio && <span className='error-campo'>{errores.precio}</span>}        
                                                                                       </div> 

                                                                                        <div className='grupo-form'>          
                                                                                             <label>Stock (unidades) *</label>          
                                                                                              <input type='number' value={form.stock}           
                                                                                                onChange={e => actualizarCampo('stock', e.target.value)} />           
                                                                                                {errores.stock && <span className='error-campo'>{errores.stock}</span>}        
                                                                                                 </div> 
                                                                                                  <div className='grupo-form'>           
                                                                                                    <label>URL de imagen</label>           
                                                                                                    <input type='text' value={form.imagen}            
                                                                                                     placeholder='https://...'             
                                                                                                      onChange={e => actualizarCampo('imagen', e.target.value)} />       
                                                                                                        </div> 

                                                                                                         <div className='grupo-form'>          
                                                                                                             <label>             
                                                                                                                <input type='checkbox' checked={form.estado_disponible} 
                                                                                                                              onChange={e => actualizarCampo('estado_disponible', e.target.checked)} />            
                                                                                                                               {' '}Disponible en el menú          
                                                                                                                                </label>       
                                                                                                                                  </div> 
                                                                                                                                   <div className='botones-formulario'>          
                                                                                                                                     <button type='button' className='btn-cancelar' onClick={alCancelar}>            
                                                                                                                                         Cancelar          
                                                                                                                                          </button>           
                                                                                                                                          <button type='submit' className='btn-guardar'>             
                                                                                                                                            {esEdicion ? 'Guardar cambios' : 'Crear producto'}          
                                                                                                                                             </button>        
                                                                                                                                              </div>     
                                                                                                                                                </form>  
                                                                                                                                                   </div>  
                                                                                                                                                    );
                                                                                                                                                 } 
                                                                                                                                                 export default FormularioProducto;