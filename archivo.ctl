OPTIONS (SKIP=1)
    LOAD DATA
    CHARACTERSET UTF8
    INFILE 'DB_EXCEL.csv'
    INTO TABLE temp TRUNCATE
    FIELDS TERMINATED BY ";"
    TRAILING NULLCOLS(
        Nombre_Victima,
        Apellido_Victima,
        Direccion_Victima,
        Fecha_Sospecha DATE 'DD-MM-YYYY HH24.MI',
        Fecha_Confirmacion DATE 'DD-MM-YYYY HH24.MI',
        Fecha_Muerte DATE 'DD-MM-YYYY HH24.MI',
        Estado,
        Nombre_Asociado,
        Apellido_Asociado,
        Fecha_Conocio DATE 'DD-MM-YYYY HH24.MI',
        Contacto,
        Fecha_Inicio_Contacto DATE 'DD-MM-YYYY HH24.MI',
        Fecha_Final_Contacto DATE 'DD-MM-YYYY HH24.MI',
        Nombre_Hospital,
        Direccion_Hospital,
        Ubicacion_Victima,
        Fecha_Llegada DATE 'DD-MM-YYYY HH24.MI',
        Fecha_Retiro DATE 'DD-MM-YYYY HH24.MI',
        Tratamiento,
        Efectividad,
        Fecha_Inicio_Tratamiento DATE 'DD-MM-YYYY HH24.MI',
        Fecha_Final_Tratamiento DATE 'DD-MM-YYYY HH24.MI',
        Efectividad_Paciente
    )