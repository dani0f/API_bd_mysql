create database infierno;
use infierno;

CREATE TABLE paises (
    idPais INT(11) NOT NULL, 
    Nombre varchar(45) not null,
    primary key (idPais)
);
ALTER TABLE paises
    MODIFY idPais INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 2;
DESCRIBE paises;

create table piso(
    idPisos int not null,
    Nombre varchar(45) not null,
    Descripcion varchar(255),
    primary key (idPisos)
);

ALTER TABLE pisos
    MODIFY idPisos INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 3;
DESCRIBE pisos;

create table herramientas(
    idHerramienta int not null,
    Nombre varchar(45) not null,
    Tipo varchar(45) not null,
    primary key (idHerramienta)
);
ALTER TABLE herramientas
    MODIFY idHerramienta INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 2;
DESCRIBE herramientas;

create table muertes(
    idMuerte int(11) not null,
    Nombre varchar(45) not null,
    Descripcion varchar(255),
    primary key (idMuerte)
);
ALTER TABLE muertes
    MODIFY idMuerte INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 2;
DESCRIBE muertes;

create table castigos(
    idCastigo int(11) not null,
    Nombre varchar(45) not null,
    Descripcion varchar(255),
    primary key (idCastigo)
);
ALTER TABLE castigos
    MODIFY idCastigo INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 2;
DESCRIBE castigos;

create table guardias(
    idGuardia int not null,
    Nombre varchar(45) not null,
    Pisos_idPiso int not null,
    primary key (idGuardia),
    constraint fk_Piso_Guardia foreign key (Pisos_idPiso) references pisos(idPiso)
);
ALTER TABLE guardias
    MODIFY idGuardia INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 2;
DESCRIBE guardias;
ALTER TABLE guardias DROP FOREIGN KEY fk_Piso_Guardia; 
create table pecados(
    idPecado int not null auto_increment=1,
    Nombre varchar(45) not null,
    Descripcion varchar(255)
    Pisos_idPiso int not null,
    primary key (idPecado),
    constraint fk_Piso_Pecado foreign key (Pisos_idPiso) references pisos(idPiso)
)
ALTER TABLE 
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 2;
DESCRIBE pecados;
create table demonios(
    idDemonio int(11) not null,
    Nombre varchar(45) not null,
    Castigos_idCastigo int(11) not null,
    primary key(idDemonio),
    constraint fk_Castigo_Demonio foreign key (Castigos_idCastigo) references castigos(idCastigo)
);
ALTER TABLE demonios
    MODIFY idDemonio INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 2;
DESCRIBE demonios;
create table pecadores(
    idPecador int not null auto_increment=1,
    Nombre varchar(45) not null,
    Edad int not null,
    Fecha_de_muerte date not null,
    Fecha_de_nacimiento date not null,
    Biografia varchar(255),
    Muertes_idMuerte int not null,
    Pecados_idPecado int not null,
    Paises_idPais int not null,
    primary key (idPecador),
    constraint fk_Muerte_Pecador foreign key (Muertes_idMuerte) references muertes(idMuerte),
    constraint fk_Pecado_Pecador foreign key (Pecados_idPecado) references pecados(idPecado),
    constraint fk_Pais_Pecador foreign key (Paises_idPais) references paises(idPais)
)
ALTER TABLE pecadores 
    MODIFY idPecador INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 2;
DESCRIBE pecadores;
create table castigos_herramientas(
    idCastigo_Herramienta int(11) not null,
    Castigos_idCastigo int(11) not null,
    Herramientas_idHerramienta int(11) not null,
    primary key (idCastigo_Herramienta),
    constraint fk_Castigo_Castigo_Herramienta foreign key (Castigos_idCastigo) references castigos(idCastigo),
    constraint fk_Herramienta_Castigo_Herramienta foreign key (Herramientas_idHerramienta) references herramientas(idHerramienta)
);
ALTER TABLE castigos_herramientas 
    MODIFY idCastigo_Herramienta INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 2;
DESCRIBE castigos_herramientas;
create table pecadores_castigos(
    idPecador_Castigo int(11) not null,
    Pecadores_idPecador int not null,
    Castigos_idCastigo int not null,
    primary key ( idPecador_Castigo),
    constraint fk_Pecador_Pecador_Castigo foreign key (Pecadores_idPecador) references pecadores(idPecador),
    constraint fk_Castigo_Pecador_Castigo foreign key (Castigos_idCastigo) references castigos(idCastigo)
)
ALTER TABLE pecadores_castigos
    MODIFY idPecador_Castigo INT(11) NOT NULL AUTO_INCREMENT , AUTO_INCREMENT = 2;
DESCRIBE pecadores_castigos;


SELECT id,Nombre,NombreTabla  FROM
(SELECT idMuerte as 'id' , Nombre, 'muertes' AS NombreTabla FROM muertes)AS t_muertes
UNION
SELECT id,Nombre,NombreTabla  FROM
(SELECT idPais as 'id', Nombre, 'paises' AS NombreTabla FROM paises)AS t_paises 
UNION 
SELECT id,Nombre,NombreTabla  FROM
(SELECT idPecado as 'id', Nombre, 'pecados' AS NombreTabla FROM pecados)AS t_pecados ;


SELECT pecadores.Nombre,Edad,Fecha_de_muerte,Fecha_de_nacimiento,(muertes.Nombre) as Muerte,(pecados.Nombre)as ,paises.Nombre 
FROM pecadores,pecados,paises,muertes 
where Muertes_idMuerte=idMuerte 
and Pecados_idPecado=idPecado 
and Paises.idPais=idPais


SELECT idPecador,pecadores.Nombre,Edad,Biografia,Fecha_de_muerte,Fecha_de_nacimiento,
muertes.Nombre as Muerte,
pecados.Nombre as Pecado,
paises.Nombre as Pais 
FROM pecadores,muertes,pecados,paises
where Muertes_idMuerte=idMuerte 
and Paises_idPais=idPais and Pecados_idPecado=idPecado;

SELECT id,Nombre,NombreTabla 
FROM (SELECT idMuerte as "id" , Nombre, "muertes" AS NombreTabla FROM muertes)AS t_muertes UNION 
SELECT id,Nombre,NombreTabla  FROM (SELECT idPais as "id", Nombre, "paises" AS NombreTabla 
FROM paises)AS t_paises 
UNION 
SELECT id,Nombre,NombreTabla  
FROM (SELECT idPecado as "id", Nombre, "pecados" AS NombreTabla FROM pecados)AS t_pecados
(SELECT idPecado as 'id', Nombre, 'pecados' AS NombreTabla FROM pecados)AS t_pecados





cons= SELECT * from pecadores where WHERE Pecados_idPecado IN("filtros") ......AND .... 

select idPecador,tab.Nombre,Edad,Biografia,Fecha_de_muerte,Fecha_de_nacimiento,(muertes.Nombre) as 
Muerte,pecados.Nombre as Pecado,paises.Nombre as Pais 
FROM pecados,paises,muertes,("+cons;
cons=cons+")as tab where Muertes_idMuerte=idMuerte and 
Paises_idPais=idPais and Pecados_idPecado=idPecado


SELECT idPecador,pecadores.Nombre,Edad,Biografia,Fecha_de_muerte,Fecha_de_nacimiento,
(muertes.Nombre) as Muerte,pecados.Nombre as Pecado,paises.Nombre as Pais 
FROM pecadores,pecados,paises,muertes 
where Muertes_idMuerte=idMuerte 
and Paises_idPais=idPais 
and Pecados_idPecado=idPecado

SELECT Tabla, Contador FROM ( SELECT "Pecadores" AS Tabla, count(idPecador) AS Contador FROM pecadores) AS c_pecadores 
UNION SELECT Tabla, Contador FROM (SELECT "Pecados" AS Tabla, count(idPecado) AS Contador FROM pecados) AS c_pecados 
UNION SELECT Tabla, Contador FROM (SELECT "Demonios" AS Tabla, count(idDemonio) AS Contador FROM demonios) AS c_demonios 
UNION SELECT Tabla, Contador FROM (SELECT "Guardias" AS Tabla, count(idGuardia) AS Contador FROM guardias) AS c_guardias 
UNION SELECT Tabla, Contador FROM (SELECT "Herramientas" AS Tabla, count(idHerramienta) AS Contador FROM herramientas) AS c_herramientas 
UNION SELECT Tabla, Contador FROM (SELECT "Pisos" AS Tabla, count(idPiso) AS Contador FROM pisos) AS c_pisos 
UNION SELECT Tabla, Contador FROM (SELECT "Castigos" AS Tabla, count(idCastigo)AS Contador FROM castigos) AS c_castigos
UNION SELECT Tabla, Contador FROM (SELECT "Muertes" AS Tabla, count(idMuerte)AS Contador FROM muertes) AS c_muertes UNION SELECT Tabla, Contador FROM (SELECT "Paises" AS Tabla, count(idPais)AS Contador FROM paises) AS c_paises