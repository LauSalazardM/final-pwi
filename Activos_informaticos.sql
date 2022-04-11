CREATE DATABASE activos_informaticos;

USE activos_informaticos;

-- creación de la tabla persona_deposito --
CREATE TABLE persona_deposito(
    id_usr int(4) unsigned zerofill not null auto_increment,
    Nombre varchar(80),
    Apellido varchar(80),
    username varchar(80),
    Cel bigint unsigned,
    Interno int unsigned,
    IP varchar(15),
    cod_Gerencia varchar(4),
    id_jefe int unsigned,
    Edificio varchar(20),
    Piso tinyint,
    Sector varchar(50),
    PRIMARY KEY(id_usr),
	FOREIGN KEY(id_jefe) references persona_deposito(id_usr)
);

-- inserto un dato en persona_deposito --
INSERT INTO persona_deposito values (null, 'Lautaro Adrián', 'Salazar de Moya', 'lsalazardemoya', '541569731563', '9258', '130.0.0.0', 'SIS', null, 'Viamonte', '3', 'Computos');

-- creación de la tabla detalles --
CREATE TABLE detalles(
    d_id	int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
    d_AI_tipo	varchar(20),
    d_marca		varchar(30),
    d_modelo	varchar(30),
    d_añoLanz	year,
    d_Pant_inch	varchar(10),
	d_RAM_tipo	varchar(15),
	d_DSK_tipo	varchar(10),
	d_MB_marca	varchar(30),
	d_MB_code	varchar(20),
	d_CORE_Marca varchar(6),
	d_CORE_code	varchar(16),
   	d_CORE_año	year,
    PRIMARY KEY(d_id)
);

-- creación de la tabla AI --
CREATE TABLE AI(
    ai_id			int(5) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
    ai_d_id			int(4) UNSIGNED ZEROFILL NOT NULL,
    ai_id_usr		int(4) UNSIGNED ZEROFILL NOT NULL,
    ai_sn 			varchar(40) not null,
    ai_mac			varchar (17),
    ai_RAM_GB 		int(4) UNSIGNED,
	ai_DSK_GB		int(6) UNSIGNED,
	ai_lugar		varchar(10),
    PRIMARY KEY		(ai_id),
    FOREIGN KEY		(ai_d_id) references detalles(d_id),
	FOREIGN KEY		(ai_id_usr) references persona_deposito(id_usr)
);
