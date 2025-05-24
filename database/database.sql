create table area_productiva
(
    id     integer primary key AUTOINCREMENT,
    nombre varchar(45) not null,
    unique (nombre)
);

create table especialidad
(
    id                 integer primary key AUTOINCREMENT,
    nombre             varchar(32) not null,
    modular            boolean     not null default false,
    escudo             varchar(50),
    area_productiva_id int         not null,
    unique (nombre),
    foreign key (area_productiva_id) references area_productiva (id)
);

create table unidad_educativa
(
    id          integer primary key AUTOINCREMENT,
    sie         varchar(15) not null,
    nombre      varchar(30) not null,
    dependencia varchar(8)  not null,
    escudo      varchar(50),
    unique (sie)
);

create table director
(
    id          integer primary key AUTOINCREMENT,
    apellidos   varchar(50) not null,
    nombres     varchar(50) not null,
    celular     varchar(15) not null,
    correo      varchar(50) not null
);

create table director_unidad_educativa
(
    id                  integer primary key AUTOINCREMENT,
    gestion             smallint not null default CURRENT_DATE,
    director_id         int      not null,
    unidad_educativa_id int      not null,
    unique (unidad_educativa_id, gestion),
    foreign key (director_id) references director (id),
    foreign key (unidad_educativa_id) references unidad_educativa (id)
);

create table curso
(
    id          integer primary key AUTOINCREMENT,
    grado       varchar(1) not null,
    nombre      varchar(6) not null,
    paralelo    varchar(2) not null,
    unique (grado, paralelo)
);

create table curso_especialidad
(
    id              integer primary key AUTOINCREMENT,
    curso_id        int     not null,
    especialidad_id int     not null,
    unique (curso_id, especialidad_id),
    foreign key (curso_id) references curso (id),
    foreign key (especialidad_id) references especialidad (id)
);

create table docente
(
    id                integer primary key AUTOINCREMENT,
    prefijo_formacion varchar(5)  not null default 'LIC.',
    apellidos         varchar(50) not null,
    nombres           varchar(50) not null,
    genero            varchar(1)  not null,
    celular           varchar(15) not null,
    direccion         varchar(100),
    especialidad_id   int         not null,
    foreign key (especialidad_id) references especialidad (id)
);

create table docente_tutor
(
    id                    integer primary key AUTOINCREMENT,
    gestion               smallint not null default CURRENT_DATE,
    docente_id            int      not null,
    curso_especialidad_id int      not null,
    unique (curso_especialidad_id, gestion),
    foreign key (docente_id) references docente (id),
    foreign key (curso_especialidad_id) references curso_especialidad (id)
);

create table estudiante
(
    id               integer primary key AUTOINCREMENT,
    registro         varchar(8),
    apellidos        varchar(50) not null,
    nombres          varchar(50) not null,
    genero           varchar(1),
    especialidad_id  int         not null,
    unique (registro),
    foreign key (especialidad_id) references especialidad (id)
);

create table matricula
(
    id                    integer primary key AUTOINCREMENT,
    gestion               smallint   not null default CURRENT_DATE,
    estado                varchar(1) not null default 'A', -- Activo, Retirado,
    curso_paralelo_origen varchar(1) not null,
    estudiante_id         int        not null,
    unidad_educativa_id   int        not null,
    curso_especialidad_id int        not null,
    foreign key (estudiante_id) references estudiante (id),
    foreign key (unidad_educativa_id) references unidad_educativa (id),
    foreign key (curso_especialidad_id) references curso_especialidad (id)
);

create table boletin_centralizador
(
    id              integer primary key AUTOINCREMENT,
    ser1            smallint not null default 0,
    saber1          smallint not null default 0,
    hacer1          smallint not null default 0,
    decidir1        smallint not null default 0,
    autoevaluacion1 smallint not null default 0,
    promedio1       smallint not null default 0,

    ser2            smallint not null default 0,
    saber2          smallint not null default 0,
    hacer2          smallint not null default 0,
    decidir2        smallint not null default 0,
    autoevaluacion2 smallint not null default 0,
    promedio2       smallint not null default 0,

    ser3            smallint not null default 0,
    saber3          smallint not null default 0,
    hacer3          smallint not null default 0,
    decidir3        smallint not null default 0,
    autoevaluacion3 smallint not null default 0,
    promedio3       smallint not null default 0,

    matricula_id    int      not null,
    unique (matricula_id),
    foreign key (matricula_id) references matricula (id)
);
