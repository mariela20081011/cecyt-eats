// src/servicios/api.js 
const URL_BASE = 'http://localhost:3001/api'; 
  
// ── USUARIOS ───────────────────────────────────────────────────────── 
export const registrarUsuario = async (datos) => { 
  const res = await fetch(`${URL_BASE}/usuarios/registro`, { 
    method:  'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body:    JSON.stringify(datos), 
  }); 
  return res.json(); 
}; 
  
export const iniciarSesion = async (datos) => { 
  const res = await fetch(`${URL_BASE}/usuarios/login`, { 
    method:  'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body:    JSON.stringify(datos), 
  }); 
  return res.json(); 
}; 
  
// ── PRODUCTOS ──────────────────────────────────────────────────────── 
export const obtenerProductos = async () => { 
  const res = await fetch(`${URL_BASE}/productos`); 
  return res.json(); 
}; 
export const crearProducto = async (datos) => { 
  const res = await fetch(`${URL_BASE}/productos`, { 
    method:'POST', headers:{'Content-Type':'application/json'}, 
    body: JSON.stringify(datos), 
  }); return res.json(); 
}; 
export const editarProducto = async (id, datos) => { 
  const res = await fetch(`${URL_BASE}/productos/${id}`, { 
    method:'PUT', headers:{'Content-Type':'application/json'}, 
    body: JSON.stringify(datos), 
  }); return res.json(); 
}; 
export const eliminarProducto = async (id) => { 
  const res = await fetch(`${URL_BASE}/productos/${id}`, { method:'DELETE' 
}); 
  return res.json(); 
}; 
  
// ── PEDIDOS ────────────────────────────────────────────────────────── 
export const crearPedido = async (datos) => { 
  const res = await fetch(`${URL_BASE}/pedidos`, { 
    method:'POST', headers:{'Content-Type':'application/json'}, 
    body: JSON.stringify(datos), 
  }); return res.json(); 
}; 
export const obtenerPedidos = async () => { 
  const res = await fetch(`${URL_BASE}/pedidos`); 
  return res.json(); 
}; 
export const actualizarEstadoPedido = async (id, estado_pedido) => { 
  const res = await fetch(`${URL_BASE}/pedidos/${id}/estado`, { 
    method:'PATCH', headers:{'Content-Type':'application/json'}, 
    body: JSON.stringify({ estado_pedido }), 
  }); return res.json(); 
};