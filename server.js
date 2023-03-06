const express = require('express')
const oracledb = require('oracledb');
const app = express();
const port = 3000;
var password = '1234';



async function selectAllEmployees(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.181.145:1521/ORCL18"
    });

    console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT * FROM employees`);

  } catch (err) {
    //send error message
    return res.send(err.message);
  } finally {
    if (connection) {
      try {
        // Always close connections
        await connection.close();
        console.log('close connection success');
      } catch (err) {
        console.error(err.message);
      }
    }
    if (result.rows.length == 0) {
      //query return zero employees
      return res.send('query send no rows');
    } else {
      //send all employees
      return res.send(result.rows);
    }

  }
}


async function selectEmployeesById(req, res, id) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.181.145:1521/ORCL18"
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
      return res.send(result.rows);
    }
  }
}


//get consulta mostrar info de hospital y fallecidos
app.get('/consulta1', function (req, res) {
  selectAllEmployees(req, res);
})

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

app.get('/eliminarModelo', function (req, res) {
  selectAllEmployees(req, res);
})

app.get('/cargarTemporal', function (req, res) {
  selectAllEmployees(req, res);
})

app.get('/cargarModelo', function (req, res) {
  selectAllEmployees(req, res);
})






app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port))