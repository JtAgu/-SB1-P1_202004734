const express = require('express');
var exec = require("child_process");
let connection = require('express-myconnection');
const oracledb = require('oracledb');
const app = express();
const port = 3000;
var password = '1234';



async function selectAllEmployees(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.16.130.59:1521/ORCL18"
    });

    console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT * FROM TEMP`);
    if (result.rows.length == 0) {
      //query return zero employees
      await connection.close();
      return res.send('query send no rows');
    } else {
      //send all employees
      await connection.close();
      return res.send(result.rows);
    }
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}

app.get('/consulta10', function (req, res) {
  selectAllEmployees(req, res);
})


async function selectEmployeesById(req, res, id) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.16.130.59:1521/ORCL18"
    });
    // run query to get employee with employee_id
    result = await connection.execute(`INSERT `);

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close(); 
      } catch (err) {
        return console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      console.log(result.rows)
      return res.send(result.rows);
    }
  }
}


//get consulta mostrar info de hospital y fallecidos


//get /victimas?efectividad>5 en transfuciones>
app.get('/consulta2', function (req, res) {
  //get query param ?id
  let id = req.query.id;
  // id param if it is number
  if (isNaN(id)) {
    res.send('Query param id is not number')
    return
  }
  selectEmployeesById(req, res, id);
})

app.get('/consulta3', function (req, res) {
  selectAllEmployees(req, res);
})

app.get('/consulta4', function (req, res) {
  selectAllEmployees(req, res);
})

app.get('/consulta5', function (req, res) {
  selectAllEmployees(req, res);
})

app.get('/consulta6', function (req, res) {
  selectAllEmployees(req, res);
})

app.get('/consulta7', function (req, res) {
  selectAllEmployees(req, res);
})

app.get('/consulta8', function (req, res) {
  selectAllEmployees(req, res);
})

app.get('/consulta9', function (req, res) {
  selectAllEmployees(req, res);
})

app.get('/consulta10', function (req, res) {
  selectAllEmployees(req, res);
})


async function EliminarModelo(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.234.117:1521/ORCL18"
    });

    console.log('connected to database');
    // run query to get all employees
    await connection.execute(` DROP TABLE VICTIMA_UBICACION`);

    await connection.execute(`DROP TABLE VICTIMA_TRATAMIENTO`)

    await connection.execute(`DROP TABLE VICTIMA_ASOCIADO`)

    await connection.execute(`DROP TABLE TRATAMIENTO`)

    await connection.execute(`DROP TABLE UBICACION`)

    await connection.execute(`DROP TABLE HOSPITAL`)

    await connection.execute(`DROP TABLE ASOCIADO`)

    await connection.execute(`DROP TABLE VICTIMA`)


      return res.send('QUERY COMPLETE');
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}


app.get('/eliminarModelo', function (req, res) {
  EliminarModelo(req, res);
})

async function cargarTemp(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.234.117:1521/ORCL18"
    });

    //console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`CREATE TABLE TEMP (
                                        Nombre_Victima VARCHAR2(50),
                                        Apellido_Victima VARCHAR2(50),
                                        Direccion_Victima VARCHAR2(100),
                                        Fecha_Sospecha DATE,
                                        Fecha_Confirmacion DATE,
                                        Fecha_Muerte DATE,
                                        Estado VARCHAR2(50),
                                        Nombre_Asociado VARCHAR2(50),
                                        Apellido_Asociado VARCHAR2(50),
                                        Fecha_Conocio DATE,
                                        Contacto VARCHAR2(50),
                                        Fecha_Inicio_Contacto DATE,
                                        Fecha_Final_Contacto DATE,
                                        Nombre_Hospital VARCHAR2(50),
                                        Direccion_Hospital VARCHAR2(100),
                                        Ubicacion_Victima VARCHAR2(100),
                                        Fecha_Llegada DATE,
                                        Fecha_Retiro DATE,
                                        Tratamiento VARCHAR2(50),
                                        Efectividad INT,
                                        Fecha_Inicio_Tratamiento DATE,
                                        Fecha_Final_Tratamiento DATE,
                                        Efectividad_Paciente INT
                                        )`);
      await connection.close();

      exec.exec('sqlldr userid=TEST/1234@34.125.234.117:1521/ORCL18 control=archivo.ctl')
      return res.send('QUERY COMPLETE');

      
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}

app.get('/cargarTemporal', function (req, res) {
  cargarTemp(req, res);
})





async function cargarModelo(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.234.117:1521/ORCL18"
    });

    console.log('connected to database');
    // run query to get all employees
    await connection.execute(`CREATE TABLE VICTIMA (
      Id_Victima INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
          Nombre_Victima VARCHAR2(50),
          Apellido_Victima VARCHAR2(50),
          Direccion_Victima VARCHAR2(100),
          Fecha_Sospecha DATE,
          Fecha_Confirmacion DATE,
          Fecha_Muerte DATE,
          Estado VARCHAR2(50)
      )`)
      
      await connection.execute(`CREATE TABLE ASOCIADO (
        Id_Asociado INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
          Nombre_Asociado VARCHAR2(50),
          Apellido_Asociado VARCHAR2(50)
      )`)
      
      await connection.execute(`CREATE TABLE HOSPITAL (
          Id_Hospital INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
          Nombre_Hospital VARCHAR2(100),
          Direccion_Hospital VARCHAR2(100)
      )`)
      
      await connection.execute(`CREATE TABLE UBICACION (
        Id_Ubicacion INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        Ubicacion_Victima VARCHAR2(100)
      )`)
      
      await connection.execute(`CREATE TABLE TRATAMIENTO (
        Id_Tratamiento INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
          Tratamiento VARCHAR2(100),
          Efectividad INT
      )`)
      
      await connection.execute(`CREATE TABLE VICTIMA_TRATAMIENTO (
        Id_Tratamiento INT,
        CONSTRAINT fk_tratamiento_tratamiento FOREIGN KEY (Id_Tratamiento) REFERENCES TRATAMIENTO(Id_Tratamiento),
        Id_Victima INT,
        CONSTRAINT fk_victima_tratamiento FOREIGN KEY (Id_Victima) REFERENCES VICTIMA(Id_Victima),
            Fecha_Inicio_Tratamiento DATE,
            Fecha_Final_Tratamiento DATE,
            Efectividad_Paciente INTEGER
      )`)
      
      await connection.execute(`CREATE TABLE VICTIMA_ASOCIADO (
        Id_Asociado INT,
        CONSTRAINT fk_asociado_asociado FOREIGN KEY (Id_Asociado) REFERENCES ASOCIADO(Id_Asociado),
        Id_Victima INT,
        CONSTRAINT fk_victima_asociado FOREIGN KEY (Id_Victima) REFERENCES VICTIMA(Id_Victima),
            Fecha_Conocio DATE,
            Contacto VARCHAR2(50),
            Fecha_Inicio_Contacto DATE,
            Fecha_Final_Contacto DATE
      )`)
      
      
      await connection.execute(`CREATE TABLE VICTIMA_UBICACION (
        Id_Ubicacion INT,
        CONSTRAINT fk_ubicacion_ubicacion FOREIGN KEY (Id_Ubicacion) REFERENCES UBICACION(Id_Ubicacion),
        Id_Victima INT,
        CONSTRAINT fk_victima_ubicacion FOREIGN KEY (Id_Victima) REFERENCES VICTIMA(Id_Victima),
            Fecha_Llegada DATE,
            Fecha_Retiro DATE
      )
      `);

      
      await connection.execute(`INSERT INTO ASOCIADO  (Nombre_Asociado , Apellido_Asociado) SELECT DISTINCT Nombre_Asociado , Apellido_Asociado FROM TEMP`);

      
      await connection.close();
      return res.send('QUERY COMPLETE');
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}

app.get('/cargarModelo', function (req, res) {
  cargarModelo(req, res);
})






app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port))