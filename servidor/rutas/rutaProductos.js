// servidor/rutas/rutaProductos.js 
const express = require('express'); 
const db      = require('../db'); 
const router  = express.Router(); 
  
// GET /api/productos — leer todos 
router.get('/', async (req, res) => { 
  try { 
    const [rows] = await db.query('SELECT * FROM productos'); 
    res.json(rows); 
  } catch (err) { res.status(500).json({ error: err.message }); } 
}); 
  
// POST /api/productos — crear nuevo 
router.post('/', async (req, res) => { 
  const { nombre_producto, descripcion, precio, 
          stock, estado_disponible, imagen } = req.body; 
  try { 
    const [result] = await db.query( 
      'INSERT INTO productos (nombre_producto,descripcion,precio,stock,estado_disponible,imagen) VALUES (?,?,?,?,?,?)', 
      [nombre_producto, descripcion, precio, stock, estado_disponible ? 
1:0, imagen] 
    ); 
    res.status(201).json({ id_producto: result.insertId }); 
  } catch (err) { res.status(500).json({ error: err.message }); } 
}); 
  
// PUT /api/productos/:id — editar 
router.put('/:id', async (req, res) => { 
  const { nombre_producto, descripcion, precio, 
          stock, estado_disponible, imagen } = req.body; 
  try { 
    await db.query( 
      'UPDATE productos SET nombre_producto=?,descripcion=?,precio=?,stock=?,estado_disponible=?,imagen=? WHERE id_producto=?', 
      [nombre_producto, descripcion, precio, stock, estado_disponible ? 
1:0, imagen, req.params.id] 
    ); 
    res.json({ mensaje: 'Producto actualizado.' }); 
  } catch (err) { res.status(500).json({ error: err.message }); } 
}); 
  
// DELETE /api/productos/:id — eliminar 
router.delete('/:id', async (req, res) => { 
  try { 
    await db.query('DELETE FROM productos WHERE id_producto=?',[req.params.id]); 
    res.json({ mensaje: 'Producto eliminado.' }); 
  } catch (err) { res.status(500).json({ error: err.message }); } 
}); 
  
module.exports = router; 