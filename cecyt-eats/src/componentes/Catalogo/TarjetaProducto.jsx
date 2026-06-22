import React from 'react';

function TarjetaProducto({ producto, alAgregarAlCarrito }) {
  const {
    nombre_producto,
    descripcion,
    precio,
    stock,
    imagen
  } = producto;

  const disponible = stock > 0;

  return (
    <div className="tarjeta-producto">
      <img
        src={imagen || null}
        alt={nombre_producto}
        className="imagen-producto"
      />

      <div className="cuerpo-tarjeta">
        <h3 className="nombre-producto">
          {nombre_producto}
        </h3>

        <p className="descripcion-producto">
          {descripcion}
        </p>

        <div className="fila-precio-stock">
          <span className="precio-producto">
            ${Number(precio).toFixed(2)}
          </span>

          <span
            className={`etiqueta-stock ${
              disponible ? 'stock-disponible' : 'stock-agotado'
            }`}
          >
            {disponible
              ? `✔️ En existencia (${stock})`
              : '✖️ Agotado'}
          </span>
        </div>

        <button
          className="btn-agregar"
          disabled={!disponible}
          onClick={() => alAgregarAlCarrito(producto)}
        >
          {disponible
            ? '+ Añadir al carrito'
            : 'Sin existencias'}
        </button>
      </div>
    </div>
  );
}

export default TarjetaProducto;