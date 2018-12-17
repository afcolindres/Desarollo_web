-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2018 a las 14:36:07
-- Versión del servidor: 5.7.14
-- Versión de PHP: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_gafe`
--
CREATE DATABASE IF NOT EXISTS `bd_gafe` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `bd_gafe`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_archivos`
--

CREATE TABLE `tbl_archivos` (
  `CODIGO_ARCHIVO` int(11) NOT NULL,
  `NOMBRE_ARCHIVO` varchar(45) DEFAULT NULL,
  `FECHA_CREACION` date DEFAULT NULL,
  `CODIGO_TIPO_ARCHIVO` int(11) NOT NULL,
  `CODIGO_USUARIO` int(11) NOT NULL,
  `CODIGO_ESTADO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_carpetas`
--

CREATE TABLE `tbl_carpetas` (
  `CODIGO_CARPETA` int(11) NOT NULL,
  `NOMBRE_CARPETA` varchar(45) NOT NULL,
  `FECHA_CREACION` date NOT NULL,
  `CODIGO_ESTADO` int(11) NOT NULL,
  `CODIGO_USUARIO_PROPIETARIO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='INFORMACION DETALLADA DE LAS CARPETAS';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_carpetas_compartidas_x_usuario`
--

CREATE TABLE `tbl_carpetas_compartidas_x_usuario` (
  `CODIGO_CARPETA` int(11) NOT NULL,
  `CODIGO_USUARIO` int(11) NOT NULL,
  `CODIGO_USUARIO_COMPARTIDO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='TABLA QUE NOS PERMITE LLEVAR EL CONTROL DE LOS USUARIOS CON QUE SE HA COMPARTIDO UNA CARPETA';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_estado_carpetas_archivos`
--

CREATE TABLE `tbl_estado_carpetas_archivos` (
  `CODIGO_ESTADO` int(11) NOT NULL,
  `NOMBRE_ESTADO` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ESTA TABLA GUARDA LOS POSIBLES ESTADO DE UNA CARPETA O ARCHIVO COMO SER COMPARTIDO O NO COMPARTIDO';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_generos`
--

CREATE TABLE `tbl_generos` (
  `CODIGO_GENERO` int(11) NOT NULL,
  `NOMBRE_GENERO` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='IDENIFICA EL GENERO DE CADA USUARIO';

--
-- Volcado de datos para la tabla `tbl_generos`
--

INSERT INTO `tbl_generos` (`CODIGO_GENERO`, `NOMBRE_GENERO`) VALUES
(1, 'Masculino'),
(2, 'Femenino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_historial_pago`
--

CREATE TABLE `tbl_historial_pago` (
  `CODIGO_HISTORIAL` int(11) NOT NULL,
  `FECHA_PAGO` date DEFAULT NULL,
  `FECHA_FIN` date DEFAULT NULL,
  `CODIGO_PLAN` int(11) NOT NULL,
  `CODIGO_USUARIO` int(11) NOT NULL,
  `CODIGO_TARGETA` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='LLEVA EL CONTROL DE LOS PAGOS DEL LOS USUARIOS';

--
-- Volcado de datos para la tabla `tbl_historial_pago`
--

INSERT INTO `tbl_historial_pago` (`CODIGO_HISTORIAL`, `FECHA_PAGO`, `FECHA_FIN`, `CODIGO_PLAN`, `CODIGO_USUARIO`, `CODIGO_TARGETA`) VALUES
(1, '2018-12-14', '2019-01-13', 1, 5, 1),
(2, '2018-12-14', '2019-01-13', 3, 5, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_lugares`
--

CREATE TABLE `tbl_lugares` (
  `CODIGO_LUGAR` int(11) NOT NULL,
  `NOMBRE_LUGAR` varchar(50) DEFAULT NULL,
  `LONGITUD` varchar(50) DEFAULT NULL,
  `LATITUD` varchar(45) DEFAULT NULL,
  `CODIGO_TIPO_LUGAR` int(11) NOT NULL,
  `CODIGO_LUGAR_PADRE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ALMACENA LOS LUGARES DE DONDE ES CADA USUARIO';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_mensajes`
--

CREATE TABLE `tbl_mensajes` (
  `CODIGO_MENSAJE` int(11) NOT NULL,
  `CONTENIDO_MENSAJE` varchar(500) DEFAULT NULL,
  `FECHA_MENSAJE` date DEFAULT NULL,
  `HORA_MENSAJE` time DEFAULT NULL,
  `CODIGO_USUARIO` int(11) NOT NULL,
  `CODIGO_USUARIO_AMIGO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='DETALLES DEL MENSAJE';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_planes`
--

CREATE TABLE `tbl_planes` (
  `CODIGO_PLAN` int(11) NOT NULL,
  `NOMBRE_PLAN` varchar(80) NOT NULL COMMENT 'En esta tabla se almacenara los planes disponibles que se ofrecen a los usuarios suscritos en la plataforma',
  `DESCRIPCION` varchar(200) DEFAULT NULL,
  `TAMANIO_ALMACENAMIENTO` int(11) DEFAULT NULL,
  `CANTIDAD_PROYECTOS` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_planes`
--

INSERT INTO `tbl_planes` (`CODIGO_PLAN`, `NOMBRE_PLAN`, `DESCRIPCION`, `TAMANIO_ALMACENAMIENTO`, `CANTIDAD_PROYECTOS`) VALUES
(1, 'Basico', 'Plan basico', 10, 5),
(2, 'Estandar', 'Plan estandar', 15, 10),
(3, 'Premiun', 'Plan premium', 100, 100000);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tarjeta_credito`
--

CREATE TABLE `tbl_tarjeta_credito` (
  `CODIGO_TARGETA` int(11) NOT NULL,
  `NUMERO_TARJETA` int(20) DEFAULT NULL,
  `FECHA_VENCIMIENTO` date DEFAULT '2019-01-30',
  `CODIGO_SEGURIDAD` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tbl_tarjeta_credito`
--

INSERT INTO `tbl_tarjeta_credito` (`CODIGO_TARGETA`, `NUMERO_TARJETA`, `FECHA_VENCIMIENTO`, `CODIGO_SEGURIDAD`) VALUES
(1, 1234456789, '2019-01-30', '1234'),
(2, 1234567890, '2019-01-30', '1221');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tipo_archivos`
--

CREATE TABLE `tbl_tipo_archivos` (
  `CODIGO_TIPO_ARCHIVO` int(11) NOT NULL,
  `NOMBRE_TIPO_ARCHIVO` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ESTA TABLA NOS INDICARA QUE TIPO DE ARCHIVO ES, POR EJEMPLO SI ES  HTML. CSS O JS';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_tipo_lugares`
--

CREATE TABLE `tbl_tipo_lugares` (
  `CODIGO_TIPO_LUGAR` int(11) NOT NULL,
  `NOMBRE_TIPO_LUGAR` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='ESTA TABLA DEFINE SI ES UN DEPARTAMENTO, UN PAIS, UNA PROVINCIA O UN ESTADO';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tbl_usuarios`
--

CREATE TABLE `tbl_usuarios` (
  `CODIGO_USUARIO` int(11) NOT NULL,
  `NOMBRE` varchar(60) NOT NULL,
  `APELLIDOS` varchar(60) NOT NULL,
  `CORREO` varchar(50) NOT NULL,
  `CONTRASEÑA` varchar(2000) NOT NULL,
  `FECHA_NACIMIENTO` date DEFAULT NULL,
  `BIOGRAFIA` varchar(1000) DEFAULT NULL,
  `CODIGO_GENERO` int(11) NOT NULL,
  `CODIGO_LUGAR` int(11) DEFAULT NULL,
  `SITIO_WEB` varchar(100) DEFAULT NULL,
  `TIPO_USUARIO` int(11) NOT NULL,
  `TELEFONO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='TABLA QUE GURDARA LOS DATOS DE LOS USUARIO SUSCRITOS';

--
-- Volcado de datos para la tabla `tbl_usuarios`
--

INSERT INTO `tbl_usuarios` (`CODIGO_USUARIO`, `NOMBRE`, `APELLIDOS`, `CORREO`, `CONTRASEÑA`, `FECHA_NACIMIENTO`, `BIOGRAFIA`, `CODIGO_GENERO`, `CODIGO_LUGAR`, `SITIO_WEB`, `TIPO_USUARIO`, `TELEFONO`) VALUES
(1, 'Arnold', 'Colindres', 'arnold_fcolindres@yahoo.com', 'qwer', NULL, NULL, 1, NULL, NULL, 0, 0),
(2, 'Arnold', 'Colindres', 'arnold_fcolindres@yahoo.es', '$2a$10$ADNVOkWUJGVMssiHvTKYvOLQosp2V85lRgB8BxIVHJwUQ24kZziyy', NULL, NULL, 1, NULL, NULL, 0, 0),
(3, 'Juan', 'Perez', 'juan@yahoo.com', '$2a$10$U9I6XaJRIbCJHR/7C2Jtme.XTKKRlrkehjeCCnUp8PTudokWalOda', NULL, NULL, 1, NULL, NULL, 0, 0),
(4, 'Juan', 'Perez', 'juanp@yahoo.com', '$2a$10$DNhZdvI8/Uh/keHIniOty.M2LqcbzzCF2mCIJ2UQKKnCZzrZ7.W1e', NULL, NULL, 1, NULL, NULL, 0, 0),
(5, 'Pedro', 'Lopez', 'pedro@yahoo.com', '1161e6ffd3637b302a5cd74076283a7bd1fc20d3', '1996-12-12', '', 1, NULL, '', 1, 98675434),
(6, 'Karla', 'Alvarez', 'karla@yahoo.com', '1161e6ffd3637b302a5cd74076283a7bd1fc20d3', NULL, NULL, 1, NULL, NULL, 1, 0),
(7, 'Juana', 'Vaquedano', 'juana@yahoo.com', '1161e6ffd3637b302a5cd74076283a7bd1fc20d3', NULL, NULL, 1, NULL, NULL, 1, 0),
(8, 'Lorenzo', 'Caceres', 'lorenzo@yahoo.com', '1161e6ffd3637b302a5cd74076283a7bd1fc20d3', NULL, NULL, 1, NULL, NULL, 1, 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tbl_archivos`
--
ALTER TABLE `tbl_archivos`
  ADD PRIMARY KEY (`CODIGO_ARCHIVO`),
  ADD KEY `fk_TBL_ARCHIVOS_TBL_TIPO_ARCHIVOS` (`CODIGO_TIPO_ARCHIVO`),
  ADD KEY `fk_TBL_ARCHIVOS_TBL_USUARIOS` (`CODIGO_USUARIO`),
  ADD KEY `fk_TBL_ARCHIVOS_TBL_ESTADO_CARPETAS_ARCHIVOS` (`CODIGO_ESTADO`);

--
-- Indices de la tabla `tbl_carpetas`
--
ALTER TABLE `tbl_carpetas`
  ADD PRIMARY KEY (`CODIGO_CARPETA`),
  ADD KEY `fk_TBL_CARPETAS_TBL_ESTADO_CARPETAS_ARCHIVOS` (`CODIGO_ESTADO`),
  ADD KEY `fk_TBL_CARPETAS_TBL_USUARIOS` (`CODIGO_USUARIO_PROPIETARIO`);

--
-- Indices de la tabla `tbl_carpetas_compartidas_x_usuario`
--
ALTER TABLE `tbl_carpetas_compartidas_x_usuario`
  ADD KEY `fk_TBL_CARPETAS_COMPARTIDAS_X_USUARIO_TBL_CARPETAS` (`CODIGO_CARPETA`),
  ADD KEY `fk_TBL_CARPETAS_COMPARTIDAS_X_USUARIO_TBL_USUARIOS` (`CODIGO_USUARIO`),
  ADD KEY `fk_TBL_CARPETAS_COMPARTIDAS_X_USUARIO_TBL_USUARIOS1` (`CODIGO_USUARIO_COMPARTIDO`);

--
-- Indices de la tabla `tbl_estado_carpetas_archivos`
--
ALTER TABLE `tbl_estado_carpetas_archivos`
  ADD PRIMARY KEY (`CODIGO_ESTADO`);

--
-- Indices de la tabla `tbl_generos`
--
ALTER TABLE `tbl_generos`
  ADD PRIMARY KEY (`CODIGO_GENERO`);

--
-- Indices de la tabla `tbl_historial_pago`
--
ALTER TABLE `tbl_historial_pago`
  ADD PRIMARY KEY (`CODIGO_HISTORIAL`),
  ADD KEY `fk_TBL_HISTORIAL_PAGO_TBL_PLANES` (`CODIGO_PLAN`),
  ADD KEY `fk_TBL_HISTORIAL_PAGO_TBL_USUARIOS` (`CODIGO_USUARIO`),
  ADD KEY `fk_TBL_HISTORIAL_PAGO_TBL_TARJETA_CREDITO` (`CODIGO_TARGETA`);

--
-- Indices de la tabla `tbl_lugares`
--
ALTER TABLE `tbl_lugares`
  ADD PRIMARY KEY (`CODIGO_LUGAR`),
  ADD KEY `fk_TBL_LUGARES_TBL_TIPO_LUGARES` (`CODIGO_TIPO_LUGAR`),
  ADD KEY `fk_TBL_LUGARES_TBL_LUGARES` (`CODIGO_LUGAR_PADRE`);

--
-- Indices de la tabla `tbl_mensajes`
--
ALTER TABLE `tbl_mensajes`
  ADD PRIMARY KEY (`CODIGO_MENSAJE`),
  ADD KEY `fk_TBL_MENSAJES_TBL_USUARIOS` (`CODIGO_USUARIO`),
  ADD KEY `fk_TBL_MENSAJES_TBL_USUARIOS1` (`CODIGO_USUARIO_AMIGO`);

--
-- Indices de la tabla `tbl_planes`
--
ALTER TABLE `tbl_planes`
  ADD PRIMARY KEY (`CODIGO_PLAN`);

--
-- Indices de la tabla `tbl_tarjeta_credito`
--
ALTER TABLE `tbl_tarjeta_credito`
  ADD PRIMARY KEY (`CODIGO_TARGETA`);

--
-- Indices de la tabla `tbl_tipo_archivos`
--
ALTER TABLE `tbl_tipo_archivos`
  ADD PRIMARY KEY (`CODIGO_TIPO_ARCHIVO`);

--
-- Indices de la tabla `tbl_tipo_lugares`
--
ALTER TABLE `tbl_tipo_lugares`
  ADD PRIMARY KEY (`CODIGO_TIPO_LUGAR`);

--
-- Indices de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD PRIMARY KEY (`CODIGO_USUARIO`),
  ADD KEY `fk_TBL_USUARIOS_TBL_GENEROS` (`CODIGO_GENERO`),
  ADD KEY `fk_TBL_USUARIOS_TBL_LUGARES` (`CODIGO_LUGAR`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tbl_archivos`
--
ALTER TABLE `tbl_archivos`
  MODIFY `CODIGO_ARCHIVO` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tbl_carpetas`
--
ALTER TABLE `tbl_carpetas`
  MODIFY `CODIGO_CARPETA` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tbl_estado_carpetas_archivos`
--
ALTER TABLE `tbl_estado_carpetas_archivos`
  MODIFY `CODIGO_ESTADO` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tbl_generos`
--
ALTER TABLE `tbl_generos`
  MODIFY `CODIGO_GENERO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tbl_historial_pago`
--
ALTER TABLE `tbl_historial_pago`
  MODIFY `CODIGO_HISTORIAL` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tbl_lugares`
--
ALTER TABLE `tbl_lugares`
  MODIFY `CODIGO_LUGAR` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tbl_mensajes`
--
ALTER TABLE `tbl_mensajes`
  MODIFY `CODIGO_MENSAJE` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tbl_planes`
--
ALTER TABLE `tbl_planes`
  MODIFY `CODIGO_PLAN` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `tbl_tarjeta_credito`
--
ALTER TABLE `tbl_tarjeta_credito`
  MODIFY `CODIGO_TARGETA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `tbl_tipo_archivos`
--
ALTER TABLE `tbl_tipo_archivos`
  MODIFY `CODIGO_TIPO_ARCHIVO` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tbl_tipo_lugares`
--
ALTER TABLE `tbl_tipo_lugares`
  MODIFY `CODIGO_TIPO_LUGAR` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  MODIFY `CODIGO_USUARIO` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tbl_archivos`
--
ALTER TABLE `tbl_archivos`
  ADD CONSTRAINT `fk_TBL_ARCHIVOS_TBL_ESTADO_CARPETAS_ARCHIVOS` FOREIGN KEY (`CODIGO_ESTADO`) REFERENCES `tbl_estado_carpetas_archivos` (`CODIGO_ESTADO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TBL_ARCHIVOS_TBL_TIPO_ARCHIVOS` FOREIGN KEY (`CODIGO_TIPO_ARCHIVO`) REFERENCES `tbl_tipo_archivos` (`CODIGO_TIPO_ARCHIVO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TBL_ARCHIVOS_TBL_USUARIOS` FOREIGN KEY (`CODIGO_USUARIO`) REFERENCES `tbl_usuarios` (`CODIGO_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_carpetas`
--
ALTER TABLE `tbl_carpetas`
  ADD CONSTRAINT `fk_TBL_CARPETAS_TBL_ESTADO_CARPETAS_ARCHIVOS` FOREIGN KEY (`CODIGO_ESTADO`) REFERENCES `tbl_estado_carpetas_archivos` (`CODIGO_ESTADO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TBL_CARPETAS_TBL_USUARIOS` FOREIGN KEY (`CODIGO_USUARIO_PROPIETARIO`) REFERENCES `tbl_usuarios` (`CODIGO_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_carpetas_compartidas_x_usuario`
--
ALTER TABLE `tbl_carpetas_compartidas_x_usuario`
  ADD CONSTRAINT `fk_TBL_CARPETAS_COMPARTIDAS_X_USUARIO_TBL_CARPETAS` FOREIGN KEY (`CODIGO_CARPETA`) REFERENCES `tbl_carpetas` (`CODIGO_CARPETA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TBL_CARPETAS_COMPARTIDAS_X_USUARIO_TBL_USUARIOS` FOREIGN KEY (`CODIGO_USUARIO`) REFERENCES `tbl_usuarios` (`CODIGO_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TBL_CARPETAS_COMPARTIDAS_X_USUARIO_TBL_USUARIOS1` FOREIGN KEY (`CODIGO_USUARIO_COMPARTIDO`) REFERENCES `tbl_usuarios` (`CODIGO_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_historial_pago`
--
ALTER TABLE `tbl_historial_pago`
  ADD CONSTRAINT `fk_TBL_HISTORIAL_PAGO_TBL_PLANES` FOREIGN KEY (`CODIGO_PLAN`) REFERENCES `tbl_planes` (`CODIGO_PLAN`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TBL_HISTORIAL_PAGO_TBL_TARJETA_CREDITO` FOREIGN KEY (`CODIGO_TARGETA`) REFERENCES `tbl_tarjeta_credito` (`CODIGO_TARGETA`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TBL_HISTORIAL_PAGO_TBL_USUARIOS` FOREIGN KEY (`CODIGO_USUARIO`) REFERENCES `tbl_usuarios` (`CODIGO_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_lugares`
--
ALTER TABLE `tbl_lugares`
  ADD CONSTRAINT `fk_TBL_LUGARES_TBL_LUGARES` FOREIGN KEY (`CODIGO_LUGAR_PADRE`) REFERENCES `tbl_lugares` (`CODIGO_LUGAR`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TBL_LUGARES_TBL_TIPO_LUGARES` FOREIGN KEY (`CODIGO_TIPO_LUGAR`) REFERENCES `tbl_tipo_lugares` (`CODIGO_TIPO_LUGAR`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_mensajes`
--
ALTER TABLE `tbl_mensajes`
  ADD CONSTRAINT `fk_TBL_MENSAJES_TBL_USUARIOS` FOREIGN KEY (`CODIGO_USUARIO`) REFERENCES `tbl_usuarios` (`CODIGO_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TBL_MENSAJES_TBL_USUARIOS1` FOREIGN KEY (`CODIGO_USUARIO_AMIGO`) REFERENCES `tbl_usuarios` (`CODIGO_USUARIO`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tbl_usuarios`
--
ALTER TABLE `tbl_usuarios`
  ADD CONSTRAINT `fk_TBL_USUARIOS_TBL_GENEROS` FOREIGN KEY (`CODIGO_GENERO`) REFERENCES `tbl_generos` (`CODIGO_GENERO`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_TBL_USUARIOS_TBL_LUGARES` FOREIGN KEY (`CODIGO_LUGAR`) REFERENCES `tbl_lugares` (`CODIGO_LUGAR`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
