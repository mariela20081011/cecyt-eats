// servidor/rutas/rutaPedidos.js 
const express = require('express'); 
const db      = require('../db'); 
const router  = express.Router(); 
  
// GET /api/pedidos — todos los pedidos con nombre del alumno 
router.get('/', async (req, res) => { 
  try { 
    const [pedidos] = await db.query( 
      `SELECT p.*, u.nombre AS nombre_alumno 
       FROM pedidos p 
       JOIN usuarios u ON p.id_usuario = u.id_usuario 
       ORDER BY p.fecha_hora DESC` 
    ); 
    for (const pedido of pedidos) { 
      const [detalles] = await db.query( 
        `SELECT dp.*, pr.nombre_producto 
         FROM detalle_pedidos dp 
         JOIN productos pr ON dp.id_producto = pr.id_producto 
         WHERE dp.id_pedido = ?`, [pedido.id_pedido] 
      ); 
      pedido.detalles = detalles; 
    } 
    res.json(pedidos); 
  } catch (err) { res.status(500).json({ error: err.message }); } 
}); 
  
// POST /api/pedidos — crear pedido completo con transacción 
router.post('/', async (req, res) => { 
  const { id_usuario, total, detalles } = req.body; 
  const conn = await db.getConnection(); 
  try { 
    await conn.beginTransaction(); 
  
    // 1) Insertar cabecera del pedido 
    const [result] = await conn.query( 
      'INSERT INTO pedidos (id_usuario, total) VALUES (?,?)', 
      [id_usuario, total] 
    ); 
    const id_pedido = result.insertId; 
  
    // 2) Insertar cada línea de detalle y descontar stock 
    for (const item of detalles) { 
      await conn.query( 
        'INSERT INTO detalle_pedidos (id_pedido,id_producto,cantidad,precio_unitario) VALUES (?,?,?,?)', 
        [id_pedido, item.id_producto, item.cantidad, item.precio_unitario] 
      ); 
      await conn.query( 
        'UPDATE productos SET stock = stock - ? WHERE id_producto = ?', 
        [item.cantidad, item.id_producto] 
      ); 
    } 
  
    await conn.commit(); 
    res.status(201).json({ id_pedido, mensaje: 'Pedido creado correctamente.' }); 
  } catch (err) { 
    await conn.rollback(); // revertir todo si algo falla 
    res.status(500).json({ error: err.message }); 
  } finally { 
    conn.release(); // devolver la conexión al pool 
  } 
}); 
  
// PATCH /api/pedidos/:id/estado — cambiar estado 
router.patch('/:id/estado', async (req, res) => { 
  try { 
    await db.query( 
      'UPDATE pedidos SET estado_pedido=? WHERE id_pedido=?', 
      [req.body.estado_pedido, req.params.id] 
    ); 
    res.json({ mensaje: 'Estado actualizado.' }); 
  } catch (err) { res.status(500).json({ error: err.message }); } 
}); 
  
module.exports = router; 