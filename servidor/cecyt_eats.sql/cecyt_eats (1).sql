-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 22-06-2026 a las 16:35:24
-- Versión del servidor: 10.1.38-MariaDB
-- Versión de PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cecyt_eats`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedidos`
--

CREATE TABLE `detalle_pedidos` (
  `id_detalle` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `detalle_pedidos`
--

INSERT INTO `detalle_pedidos` (`id_detalle`, `id_pedido`, `id_producto`, `cantidad`, `precio_unitario`) VALUES
(1, 1, 3, 1, '12.00'),
(2, 2, 2, 1, '25.00'),
(3, 3, 2, 1, '25.00'),
(4, 3, 3, 1, '20.00'),
(5, 3, 6, 1, '28.00'),
(6, 4, 3, 1, '20.00'),
(7, 4, 6, 1, '28.00'),
(8, 5, 2, 1, '25.00'),
(9, 5, 3, 1, '20.00'),
(10, 6, 2, 1, '25.00'),
(11, 6, 1, 1, '35.00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(10,2) NOT NULL,
  `estado_pedido` enum('Pendiente','Preparando','Listo para \r\nentrega','Entregado') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `id_usuario`, `fecha_hora`, `total`, `estado_pedido`) VALUES
(1, 2, '2026-06-20 22:14:30', '12.00', 'Entregado'),
(2, 1, '2026-06-20 22:46:22', '25.00', 'Pendiente'),
(3, 1, '2026-06-20 23:06:52', '73.00', ''),
(4, 1, '2026-06-20 23:18:41', '48.00', 'Pendiente'),
(5, 1, '2026-06-21 23:54:22', '45.00', 'Pendiente'),
(6, 1, '2026-06-22 07:15:14', '60.00', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `precio` decimal(8,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT '0',
  `estado_disponible` tinyint(1) NOT NULL DEFAULT '1',
  `imagen` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre_producto`, `descripcion`, `precio`, `stock`, `estado_disponible`, `imagen`) VALUES
(1, 'Sándwich', 'Con jitomate, lechuga y crema.', '35.00', 59, 1, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800'),
(2, 'Quesadilla de Queso', 'Tortilla de maíz, queso Oaxaca.', '25.00', 26, 0, 'https://images.unsplash.com/photo-1615870216519-2f9fa575fa5c?w=600'),
(3, 'Arroz con Leche', 'Postre tradicional con canela.', '20.00', 7, 1, 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600'),
(4, 'Agua de Limon', 'Bebida natural, sin azúcar.', '15.00', 20, 1, 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600'),
(5, 'Tacos de Guisado', '3 tacos con salsa verde.', '35.00', 8, 1, 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600'),
(6, 'Ensalada César', 'Lechuga, crutones y aderezo.', '28.00', 1, 1, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600'),
(7, 'Torta de Jamón', 'Con jitomate, lechuga y crema.', '25.00', 10, 1, ''),
(8, 'Quesadilla de Queso', 'Tortilla de maíz, queso Oaxaca.', '18.00', 0, 0, ''),
(9, 'Arroz con Leche', 'Postre tradicional con canela.', '12.00', 5, 1, ''),
(10, 'Agua de Jamaica', 'Bebida natural, sin azúcar.', '10.00', 20, 1, ''),
(11, 'Tacos de Guisado', '3 tacos con salsa verde.', '35.00', 8, 1, ''),
(12, 'Ensalada César', 'Lechuga, crutones y aderezo.', '28.00', 3, 1, ''),
(13, 'coca cola', 'entre más fría mejor', '22.00', 50, 1, 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29jYSUyMGNvbGF8ZW58MHx8MHx8fDA%3D');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasena` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol` enum('alumno','administrador') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'alumno'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `correo`, `contrasena`, `rol`) VALUES
(1, 'mary', 'mary@gmail.com', '$2b$10$240.63yd9NHRnXdRUYmqM.VYoSCB.XPSySMQAKzlHqGZjoLxZEE/W', 'alumno'),
(2, 'jenny', 'jenny@gmail.com', '$2b$10$swOJN7uFLD/WkRn4TJdZsOTecoOzXgHeGidmxVyHso/pLp1mchd2m', 'alumno'),
(3, 'mariela suarez', 'suarez@gmail.com', '$2b$10$FwzcwDcNqRD3EeXbtxL5ueB57SnfFV7uPxL28G7EfeeXpEmMbTia.', 'administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle_pedidos`
--
ALTER TABLE `detalle_pedidos`
  ADD CONSTRAINT `detalle_pedidos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE CASCADE,
  ADD CONSTRAINT `detalle_pedidos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
