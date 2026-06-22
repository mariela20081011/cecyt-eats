// servidor/index.js 
require('dotenv').config(); 
const express = require('express'); 
const cors    = require('cors'); 
const app     = express(); 
  
// En producción Render asigna el puerto automáticamente via 
process.env.PORT 
const PUERTO = process.env.PORT || process.env.PUERTO || 3001; 
  
app.use(cors({ 
  // Permitir tanto localhost (desarrollo) como Vercel (producción) 
  origin: [ 
    'http://localhost:5173', 
    'http://localhost:4173', 
    /\.vercel\.app$/,  // cualquier subdominio de vercel.app 
  ], 
  credentials: true, 
})); 
app.use(express.json()); 
  
app.use('/api/usuarios',  require('./rutas/rutaUsuarios')); 
app.use('/api/productos', require('./rutas/rutaProductos')); 
app.use('/api/pedidos',   require('./rutas/rutaPedidos')); 
  
app.get('/', (req, res) => { 
  res.json({ mensaje: 'API CECyT-Eats activa ✔', entorno: 
process.env.NODE_ENV }); 
}); 
  
app.listen(PUERTO, () => { 
  console.log(`Servidor en http://localhost:${PUERTO}`); 
}); 
