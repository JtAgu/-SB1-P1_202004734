const express = require('express');
var exec = require("child_process");
let connection = require('express-myconnection');
const oracledb = require('oracledb');
const app = express();
const port = 3000;
var password = '1234';
const Table = require('cli-table');
const fs = require('fs');



async function consulta1(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.92.50:1521/ORCL18"
    });

    //console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT NOMBRE_HOSPITAL , DIRECCION_HOSPITAL , COUNT(v.ESTADO) AS num_fallecidos
    FROM hospital h INNER JOIN victima v
    ON h.ID_HOSPITAL  = v.id_hospital
    WHERE v.FECHA_MUERTE IS NOT NULL 
    GROUP BY NOMBRE_HOSPITAL, DIRECCION_HOSPITAL`);
    
    

    results = result.rows;
    const table = new Table({
      head: ['HOSPITAL', 'DIRECCION', 'FALLECIDOS'],
      colWidths: [50, 50, 4]
    });

    results.forEach(row => {
      table.push(row);
    });
    
    console.log(table.toString());

    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>CONSULTA 1</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
<center>
<h1><b>CONSULTA 1</b></h1><br>
<table id="mytable" class="table table-success table-striped"><thead><tr><th>HOSPITAL</th><th>DIRECCION</th><th>FALLECIDOS</th></tr></thead><tbody>`

results.forEach(row => {
  html += '<tr>';
  row.forEach(col => {
    html += `<td>${col}</td>`;
  });
  html += '</tr>';
});
html += '</tbody>';

html+=`</table>

</center>
</html>
`;

fs.writeFile('./REPORTES/consulta1.html', html, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('El archivo HTML se ha creado correctamente.');
});
await connection.close();
    return res.send(result.rows);

      
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}

//get /victimas?efectividad>5 en transfuciones>
app.get('/consulta1', function (req, res) {
  //get query param ?id
  consulta1(req,res)
})


async function consulta2(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.92.50:1521/ORCL18"
    });

    //console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT nombre_victima, apellido_victima
    FROM VICTIMA v JOIN VICTIMA_TRATAMIENTO vt  
    ON v.ID_VICTIMA  = vt.id_victima
    JOIN TRATAMIENTO t ON vt.id_tratamiento = t.ID_TRATAMIENTO 
    WHERE t.TRATAMIENTO  = 'Transfusiones de sangre'
    AND vt.EFECTIVIDAD_PACIENTE > 5
    AND v.ESTADO  = 'En cuarentena'`);
    results = result.rows;
    const table = new Table({
      head: ['NOMBRE', 'APELLIDO'],
      colWidths: [50, 50, 4]
    });

    results.forEach(row => {
      table.push(row);
    });
    
    console.log(table.toString());

    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>CONSULTA2</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
<center>
<h1><b>CONSULTA 2</b></h1><br>
<table id="mytable" class="table table-success table-striped"><thead><tr><th>NOMBRE</th><th>APELLIDO</th></tr></thead><tbody>`

results.forEach(row => {
  html += '<tr>';
  row.forEach(col => {
    html += `<td>${col}</td>`;
  });
  html += '</tr>';
});
html += '</tbody>';

html+=`</table>

</center>
</html>
`;

fs.writeFile('./REPORTES/consulta2.html', html, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('El archivo HTML se ha creado correctamente.');
});
await connection.close();
      
return res.send(result.rows);
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}

//get /victimas?efectividad>5 en transfuciones>
app.get('/consulta2', function (req, res) {
  //get query param ?id
  consulta2(req,res)
})

async function consulta3(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.92.50:1521/ORCL18"
    });

    //console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT NOMBRE_VICTIMA , APELLIDO_VICTIMA , DIRECCION_VICTIMA 
    FROM victima
    WHERE ID_VICTIMA IN (
      SELECT ID_VICTIMA 
      FROM VICTIMA_ASOCIADO va 
      GROUP BY id_victima
      HAVING COUNT(ID_VICTIMA) > 3
    ) AND FECHA_MUERTE IS NOT NULL`);
    
    
    results = result.rows;
    const table = new Table({
      head: ['NOMBRE', 'APELLIDO', 'DIRECCION'],
      colWidths: [50, 50, 4]
    });

    results.forEach(row => {
      table.push(row);
    });
    
    console.log(table.toString());

    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>CONSULTA3</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
<center>
<h1><b>CONSULTA 3</b></h1><br>
<table id="mytable" class="table table-success table-striped"><thead><tr><th>NOMBRE</th><th>APELLIDO</th><th>DIRECCION</th></tr></thead><tbody>`

results.forEach(row => {
  html += '<tr>';
  row.forEach(col => {
    html += `<td>${col}</td>`;
  });
  html += '</tr>';
});
html += '</tbody>';

html+=`</table>

</center>
</html>
`;

fs.writeFile('./REPORTES/consulta3.html', html, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('El archivo HTML se ha creado correctamente.');
});
await connection.close();

return res.send(result.rows);
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}


app.get('/consulta3', function (req, res) {
  consulta3(req, res);
})

async function consulta4(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.92.50:1521/ORCL18"
    });

    //console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT v.NOMBRE_VICTIMA, v.APELLIDO_VICTIMA
    FROM VICTIMA v JOIN VICTIMA_ASOCIADO va 
    ON v.ID_VICTIMA = va.ID_VICTIMA 
    JOIN ASOCIADO a 
    ON va.id_asociado = a.id_asociado
    WHERE v.estado = 'Suspendida'
    AND va.CONTACTO = 'Beso'
    GROUP BY v.NOMBRE_VICTIMA, v.APELLIDO_VICTIMA
    HAVING COUNT(DISTINCT va.id_asociado) > 2`);
    
    results = result.rows;
    const table = new Table({
      head: ['NOMBRE', 'APELLIDO'],
      colWidths: [50, 50, 4]
    });

    results.forEach(row => {
      table.push(row);
    });
    
    console.log(table.toString());

    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>CONSULTA4</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
<center>
<h1><b>CONSULTA 4</b></h1><br>
<table id="mytable" class="table table-success table-striped"><thead><tr><th>NOMBRE</th><th>APELLIDO</th></tr></thead><tbody>`

results.forEach(row => {
  html += '<tr>';
  row.forEach(col => {
    html += `<td>${col}</td>`;
  });
  html += '</tr>';
});
html += '</tbody>';

html+=`</table>

</center>
</html>
`;

fs.writeFile('./REPORTES/consulta4.html', html, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('El archivo HTML se ha creado correctamente.');
});
await connection.close();

return res.send(result.rows);
      
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}


app.get('/consulta4', function (req, res) {
  consulta4(req, res);
})

async function consulta5(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.92.50:1521/ORCL18"
    });

    //console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT  v.NOMBRE_VICTIMA , v.APELLIDO_VICTIMA , COUNT(*) AS num_tratamientos 
    FROM Victima v 
    JOIN VICTIMA_TRATAMIENTO vt
    ON v.ID_VICTIMA  = vt.ID_VICTIMA 
    JOIN TRATAMIENTO t
    ON t.ID_TRATAMIENTO  = vt.ID_TRATAMIENTO 
    WHERE t.TRATAMIENTO  = 'Oxigeno'
    GROUP BY v.ID_VICTIMA, v.NOMBRE_VICTIMA , v.APELLIDO_VICTIMA 
    ORDER BY num_tratamientos DESC
    FETCH FIRST 5 ROWS ONLY`);
    
    results = result.rows;
    const table = new Table({
      head: ['NOMBRE', 'APELLIDO', 'TRATAMIENTOS'],
      colWidths: [50, 50, 4]
    });

    results.forEach(row => {
      table.push(row);
    });
    
    console.log(table.toString());

    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>CONSULTA5</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
<center>
<h1><b>CONSULTA 5</b></h1><br>
<table id="mytable" class="table table-success table-striped"><thead><tr><th>NOMBRE</th><th>APELLIDO</th><th>TRATAMIENTOS</th></tr></thead><tbody>`

results.forEach(row => {
  html += '<tr>';
  row.forEach(col => {
    html += `<td>${col}</td>`;
  });
  html += '</tr>';
});
html += '</tbody>';

html+=`</table>

</center>
</html>
`;

fs.writeFile('./REPORTES/consulta5.html', html, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('El archivo HTML se ha creado correctamente.');
});
await connection.close();

return res.send(result.rows);
      
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}

app.get('/consulta5', function (req, res) {
  consulta5(req, res);
})


async function consulta6(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.92.50:1521/ORCL18"
    });

    //console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT v.NOMBRE_VICTIMA , v.APELLIDO_VICTIMA , v.FECHA_MUERTE 
    FROM Victima v JOIN VICTIMA_UBICACION vu 
    ON v.ID_VICTIMA  = vu.id_victima
    JOIN UBICACION u  ON vu.ID_UBICACION  = u.ID_UBICACION 
    JOIN VICTIMA_TRATAMIENTO vt ON vt.ID_VICTIMA = v.ID_VICTIMA 
    JOIN TRATAMIENTO t  ON t.ID_TRATAMIENTO  = vt.ID_TRATAMIENTO 
    WHERE u.UBICACION_VICTIMA  = '1987 Delphine Well' AND t.TRATAMIENTO = 'Manejo de la presion arterial'
    `);
    results = result.rows;
    const table = new Table({
      head: ['NOMBRE', 'APELLIDO', 'FECHA MUERTE'],
      colWidths: [50, 50, 4]
    });

    results.forEach(row => {
      table.push(row);
    });
    
    //console.log(table.toString());

    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>CONSULTA6</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
<center>
<h1><b>CONSULTA 6</b></h1><br>
<table id="mytable" class="table table-success table-striped"><thead><tr><th>NOMBRE</th><th>APELLIDO</th><th>FECHA MUERTE</th></tr></thead><tbody>`

results.forEach(row => {
  html += '<tr>';
  row.forEach(col => {
    html += `<td>${col}</td>`;
  });
  html += '</tr>';
});
html += '</tbody>';

html+=`</table>

</center>
</html>
`;

fs.writeFile('./REPORTES/consulta6.html', html, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('El archivo HTML se ha creado correctamente.');
});
await connection.close();

return res.send(result.rows);
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}


app.get('/consulta6', function (req, res) {
  consulta6(req, res);
})



async function consulta7(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.92.50:1521/ORCL18"
    });

    //console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT v.NOMBRE_VICTIMA, v.APELLIDO_VICTIMA, v.DIRECCION_VICTIMA
    FROM VICTIMA v 
    JOIN VICTIMA_ASOCIADO va  ON v.ID_VICTIMA = va.id_victima
    JOIN ASOCIADO a ON va.ID_ASOCIADO = a.ID_ASOCIADO
    JOIN VICTIMA_TRATAMIENTO vt ON v.ID_VICTIMA  = vt.ID_VICTIMA 
    JOIN TRATAMIENTO t ON vt.id_tratamiento = t.ID_TRATAMIENTO
    WHERE v.ID_HOSPITAL IS NOT NULL
    GROUP BY v.NOMBRE_VICTIMA, v.APELLIDO_VICTIMA, v.DIRECCION_VICTIMA
    HAVING SELECT COUNT(a.ID_ASOCIADO) < 2 AND SELECT COUNT(vt.ID_TRATAMIENTO) = 2`);
    
    results = result.rows;
    const table = new Table({
      head: ['NOMBRE', 'APELLIDO', 'DIRECCION'],
      colWidths: [50, 50, 4]
    });

    results.forEach(row => {
      table.push(row);
    });
    
    //console.log(table.toString());

    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>CONSULTA 7</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
<center>
<h1><b>CONSULTA 7</b></h1><br>
<table id="mytable" class="table table-success table-striped"><thead><tr><th>NOMBRE</th><th>APELLIDO</th><th>DIRECCION</th></tr></thead><tbody>`

results.forEach(row => {
  html += '<tr>';
  row.forEach(col => {
    html += `<td>${col}</td>`;
  });
  html += '</tr>';
});
html += '</tbody>';

html+=`</table>

</center>
</html>
`;

fs.writeFile('./REPORTES/consulta7.html', html, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('El archivo HTML se ha creado correctamente.');
});
await connection.close();

return res.send(result.rows);
      
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}

app.get('/consulta7', function (req, res) {
  consulta7(req, res);
})



app.get('/consulta8', function (req, res) {
  consulta8(req, res);
})




async function consulta8(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.92.50:1521/ORCL18"
    });

    //console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT mes_sospecha, NOMBRE_VICTIMA, APELLIDO_VICTIMA, num_tratamientos
    FROM (
        SELECT EXTRACT(MONTH FROM V.FECHA_SOSPECHA) AS mes_sospecha, V.NOMBRE_VICTIMA, V.APELLIDO_VICTIMA, COUNT(*) AS num_tratamientos,
            RANK() OVER (ORDER BY COUNT(*) DESC) AS rnk_desc,
            RANK() OVER (ORDER BY COUNT(*) ASC) AS rnk_asc
        FROM VICTIMA v 
        JOIN VICTIMA_TRATAMIENTO vt ON v.ID_VICTIMA = vt.ID_VICTIMA 
        JOIN TRATAMIENTO t ON t.ID_TRATAMIENTO = vt.ID_TRATAMIENTO
        GROUP BY V.ID_VICTIMA, V.NOMBRE_VICTIMA, V.APELLIDO_VICTIMA, V.FECHA_SOSPECHA
    )subquery
    WHERE rnk_desc = 1 OR rnk_asc = 1
    ORDER BY num_tratamientos DESC`);
    
    results = result.rows;
    const table = new Table({
      head: ['MES SOSPECHA', 'NOMBRE', 'APELLIDO, TRATAMIENTOS'],
      colWidths: [50, 50, 4]
    });

    results.forEach(row => {
      table.push(row);
    });
    
    //console.log(table.toString());

    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>CONSULTA 8</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
<center>
<h1><b>CONSULTA 8</b></h1><br>
<table id="mytable" class="table table-success table-striped"><thead><tr><th>MES SOSPECHA</th><th>NOMBRE</th><th>APELLIDO</th><th>TRATAMIENTOS</th></tr></thead><tbody>`

results.forEach(row => {
  html += '<tr>';
  row.forEach(col => {
    html += `<td>${col}</td>`;
  });
  html += '</tr>';
});
html += '</tbody>';

html+=`</table>

</center>
</html>
`;

fs.writeFile('./REPORTES/consulta8.html', html, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('El archivo HTML se ha creado correctamente.');
});
await connection.close();

return res.send(result.rows);
      
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}


async function consulta9(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.92.50:1521/ORCL18"
    });

    //console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT h.NOMBRE_HOSPITAL , COUNT(*) * 100.0 / (SELECT COUNT(*) FROM VICTIMA v) AS porcentaje_victimas
    FROM HOSPITAL h  
    LEFT JOIN VICTIMA v2  ON h.ID_HOSPITAL  = v2.ID_HOSPITAL 
    GROUP BY h.ID_HOSPITAL , h.NOMBRE_HOSPITAL
    ORDER BY porcentaje_victimas ASC`);
    
    results = result.rows;
    const table = new Table({
      head: ['NOMBRE', 'PORCENTAJE'],
      colWidths: [50, 50, 4]
    });

    results.forEach(row => {
      table.push(row);
    });
    
    //console.log(table.toString());

    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>CONSULTA 9</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
<center>
<h1><b>CONSULTA 9</b></h1><br>
<table id="mytable" class="table table-success table-striped"><thead><tr><th>NOMBRE</th><th>APELLIDO</th></tr></thead><tbody>`

results.forEach(row => {
  html += '<tr>';
  row.forEach(col => {
    html += `<td>${col}</td>`;
  });
  html += '</tr>';
});
html += '</tbody>';

html+=`</table>

</center>
</html>
`;

fs.writeFile('./REPORTES/consulta9.html', html, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('El archivo HTML se ha creado correctamente.');
});
await connection.close();

return res.send(result.rows);
      
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}


app.get('/consulta9', function (req, res) {
  consulta9(req, res);
})



async function consulta10(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.92.50:1521/ORCL18"
    });

    //console.log('connected to database');
    // run query to get all employees
    result = await connection.execute(`SELECT nombre_hospital, nombre_tratamiento, CONCAT(ROUND((cantidad_tratamiento / cantidad_total) * 100, 2), '%') AS PORCENTAJE
    FROM (
    SELECT h2.nombre_hospital AS nombre_hospital, t.TRATAMIENTO AS nombre_tratamiento,
   COUNT(*) AS cantidad_tratamiento,
   SUM(COUNT(*)) OVER (PARTITION BY h2.id_hospital) AS cantidad_total
    FROM HOSPITAL h2 
    JOIN VICTIMA v ON h2.id_hospital = v.ID_HOSPITAL  
    JOIN VICTIMA_TRATAMIENTO a ON v.ID_VICTIMA = a.ID_VICTIMA 
    JOIN TRATAMIENTO t ON a.ID_TRATAMIENTO = t.ID_TRATAMIENTO 
    GROUP BY h2.nombre_hospital, t.TRATAMIENTO , h2.id_hospital
    ) subquery
    WHERE cantidad_total > 0
    ORDER BY nombre_hospital`);
    
    results = result.rows;
    const table = new Table({
      head: ['HOSPITAL', 'TRATAMIENTO', 'PORCENTAJE'],
      colWidths: [50, 50, 4]
    });

    results.forEach(row => {
      table.push(row);
    });
    
    //console.log(table.toString());

    let html = `
<!DOCTYPE html>
<html>
<head>
  <title>CONSULTA 10</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
</head>
<body>
<center>
<h1><b>CONSULTA 10</b></h1><br>
<table id="mytable" class="table table-success table-striped"><thead><tr><th>HOSPITAL</th><th>TRATAMIENTO</th><th>PORCENTAJE</th></tr></thead><tbody>`

results.forEach(row => {
  html += '<tr>';
  row.forEach(col => {
    html += `<td>${col}</td>`;
  });
  html += '</tr>';
});
html += '</tbody>';

html+=`</table>

</center>
</html>
`;

fs.writeFile('./REPORTES/consulta10.html', html, err => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('El archivo HTML se ha creado correctamente.');
});
await connection.close();

return res.send(result.rows);
      
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}



app.get('/consulta10', function (req, res) {
  consulta10(req, res);
})


async function EliminarTemp(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.92.50:1521/ORCL18"
    });

    console.log('connected to database');
    // run query to get all employees
    await connection.execute(`DROP TABLE TEMP`);

    await connection.close()

    return res.send('QUERY COMPLETE');
    
  } catch (err) {
    //send error message
    await connection.close();
    return res.send(err.message);
  } 
}


app.get('/eliminarTemporal', function (req, res) {
  EliminarTemp(req, res);
})

async function EliminarModelo(req, res) {
  try {
    connection = await oracledb.getConnection({
      user: "TEST",
      password: password,
      connectString: "34.125.92.50:1521/ORCL18"
    });

    console.log('connected to database');
    // run query to get all employees
    await connection.execute(` DROP TABLE VICTIMA_UBICACION`);

    await connection.execute(`DROP TABLE VICTIMA_TRATAMIENTO`)

    await connection.execute(`DROP TABLE VICTIMA_ASOCIADO`)

    await connection.execute(`DROP TABLE VICTIMA`)

    await connection.execute(`DROP TABLE TRATAMIENTO`)

    await connection.execute(`DROP TABLE UBICACION`)

    await connection.execute(`DROP TABLE HOSPITAL`)

    await connection.execute(`DROP TABLE ASOCIADO`)

    await connection.execute(`DROP TABLE ARREGLO`)
    
    await connection.close()

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
      connectString: "34.125.92.50:1521/ORCL18"
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

      exec.exec('sqlldr userid=TEST/1234@34.125.92.50:1521/ORCL18 control=archivo.ctl')
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
      connectString: "34.125.92.50:1521/ORCL18"
    });

    console.log('connected to database');
    // run query to get all employees
    
      
      

      await connection.execute(`CREATE TABLE ASOCIADO (
        Id_Asociado INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
          Nombre_Asociado VARCHAR2(50),
          Apellido_Asociado VARCHAR2(50)
      )`)

      await connection.execute(`INSERT INTO ASOCIADO (Nombre_Asociado , Apellido_Asociado) SELECT DISTINCT Nombre_Asociado , Apellido_Asociado FROM TEMP WHERE NOMBRE_ASOCIADO IS NOT NULL`);
      
      await connection.execute(`CREATE TABLE HOSPITAL (
          Id_Hospital INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
          Nombre_Hospital VARCHAR2(100),
          Direccion_Hospital VARCHAR2(100)
      )`)
      
      await connection.execute(`INSERT INTO HOSPITAL (NOMBRE_HOSPITAL, DIRECCION_HOSPITAL)
      SELECT DISTINCT NOMBRE_HOSPITAL, DIRECCION_HOSPITAL
      FROM TEMP
      WHERE NOMBRE_HOSPITAL IS NOT NULL`);
      

      await connection.execute(`CREATE TABLE UBICACION (
        Id_Ubicacion INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        Ubicacion_Victima VARCHAR2(100)
      )`)
      
      await connection.execute(`INSERT INTO UBICACION (UBICACION_VICTIMA)
      SELECT DISTINCT UBICACION_VICTIMA
      FROM TEMP
      WHERE UBICACION_VICTIMA IS NOT NULL`);

      await connection.execute(`CREATE TABLE TRATAMIENTO (
        Id_Tratamiento INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
          Tratamiento VARCHAR2(100),
          Efectividad INT
      )`)


      await connection.execute(`INSERT INTO TRATAMIENTO (TRATAMIENTO , EFECTIVIDAD)
      SELECT DISTINCT TRATAMIENTO , EFECTIVIDAD
      FROM TEMP
      WHERE TRATAMIENTO IS NOT NULL`);
      
      await connection.execute(`CREATE TABLE VICTIMA(
        Id_Victima INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
            Nombre_Victima VARCHAR2(50),
            Apellido_Victima VARCHAR2(50),
            Direccion_Victima VARCHAR2(100),
            Fecha_Sospecha DATE,
            Fecha_Confirmacion DATE,
            Fecha_Muerte DATE,
            Id_Hospital INT,
          CONSTRAINT fk_hospital_victima FOREIGN KEY (Id_Hospital) REFERENCES HOSPITAL(Id_Hospital),
            Estado VARCHAR2(50)
        )`)


        await connection.execute(`INSERT INTO VICTIMA (NOMBRE_VICTIMA, APELLIDO_VICTIMA,DIRECCION_VICTIMA,FECHA_SOSPECHA,FECHA_CONFIRMACION,FECHA_MUERTE,Id_Hospital,ESTADO)
        SELECT DISTINCT NOMBRE_VICTIMA, APELLIDO_VICTIMA,DIRECCION_VICTIMA,FECHA_SOSPECHA,FECHA_CONFIRMACION,FECHA_MUERTE,Id_Hospital,ESTADO
        FROM TEMP v INNER JOIN HOSPITAL h
        ON v.NOMBRE_HOSPITAL  = h.NOMBRE_HOSPITAL`);

        await connection.execute(`INSERT INTO VICTIMA (NOMBRE_VICTIMA, APELLIDO_VICTIMA,DIRECCION_VICTIMA,FECHA_SOSPECHA,FECHA_CONFIRMACION,FECHA_MUERTE,ESTADO)
        SELECT DISTINCT NOMBRE_VICTIMA, APELLIDO_VICTIMA,DIRECCION_VICTIMA,FECHA_SOSPECHA,FECHA_CONFIRMACION,FECHA_MUERTE,ESTADO
        FROM TEMP t 
        WHERE t.NOMBRE_HOSPITAL is NULL`);


      await connection.execute(`CREATE TABLE VICTIMA_TRATAMIENTO (
        Id_Tratamiento INT,
        CONSTRAINT fk_tratamiento_tratamiento FOREIGN KEY (Id_Tratamiento) REFERENCES TRATAMIENTO(Id_Tratamiento),
        Id_Victima INT,
        CONSTRAINT fk_victima_tratamiento FOREIGN KEY (Id_Victima) REFERENCES VICTIMA (Id_Victima),
            Fecha_Inicio_Tratamiento DATE,
            Fecha_Final_Tratamiento DATE,
            Efectividad_Paciente INTEGER
      )`)

      await connection.execute(`INSERT INTO VICTIMA_TRATAMIENTO (Id_Tratamiento,Id_Victima,Fecha_Inicio_Tratamiento, Fecha_Final_Tratamiento, Efectividad_Paciente)
      SELECT DISTINCT ID_TRATAMIENTO, ID_VICTIMA, FECHA_INICIO_TRATAMIENTO, FECHA_FINAL_TRATAMIENTO, EFECTIVIDAD_PACIENTE
      FROM VICTIMA v INNER JOIN (SELECT DISTINCT ID_TRATAMIENTO, FECHA_INICIO_TRATAMIENTO, FECHA_FINAL_TRATAMIENTO, EFECTIVIDAD_PACIENTE, NOMBRE_VICTIMA,APELLIDO_VICTIMA 
      FROM TEMP t2  INNER JOIN TRATAMIENTO t
      ON T.TRATAMIENTO  =T2.TRATAMIENTO) c
      ON v.NOMBRE_VICTIMA = c.NOMBRE_VICTIMA AND v.APELLIDO_VICTIMA  = c.APELLIDO_VICTIMA`)
      
      await connection.execute(`CREATE TABLE VICTIMA_ASOCIADO (
        Id_Asociado INT,
        CONSTRAINT fk_asociado_asociado FOREIGN KEY (Id_Asociado) REFERENCES ASOCIADO (Id_Asociado),
        Id_Victima INT,
        CONSTRAINT fk_victima_asociado FOREIGN KEY (Id_Victima) REFERENCES VICTIMA(Id_Victima),
            Fecha_Conocio DATE,
            Contacto VARCHAR2(50),
            Fecha_Inicio_Contacto DATE,
            Fecha_Final_Contacto DATE
      )`)
      
      await connection.execute(`INSERT INTO VICTIMA_ASOCIADO (ID_ASOCIADO,ID_VICTIMA,FECHA_CONOCIO, CONTACTO, FECHA_INICIO_CONTACTO,FECHA_FINAL_CONTACTO)
      SELECT DISTINCT ID_ASOCIADO, ID_VICTIMA, FECHA_CONOCIO, CONTACTO, FECHA_INICIO_CONTACTO,FECHA_FINAL_CONTACTO
      FROM VICTIMA v INNER JOIN (SELECT DISTINCT ID_ASOCIADO, FECHA_CONOCIO, CONTACTO, FECHA_INICIO_CONTACTO,FECHA_FINAL_CONTACTO,NOMBRE_VICTIMA,APELLIDO_VICTIMA
      FROM TEMP t2  INNER JOIN ASOCIADO a
      ON a.NOMBRE_ASOCIADO  =T2.NOMBRE_ASOCIADO AND a.APELLIDO_ASOCIADO  = T2.APELLIDO_ASOCIADO) c
      ON v.NOMBRE_VICTIMA = c.NOMBRE_VICTIMA AND v.APELLIDO_VICTIMA  = c.APELLIDO_VICTIMA`)
      

      
      await connection.execute(`CREATE TABLE VICTIMA_UBICACION (
      Id_Ubicacion INT,
      CONSTRAINT fk_ubicacion_ubicacion FOREIGN KEY (Id_Ubicacion) REFERENCES UBICACION (Id_Ubicacion),
      Id_Victima INT,
      CONSTRAINT fk_victima_ubicacion FOREIGN KEY (Id_Victima) REFERENCES VICTIMA(Id_Victima),
          Fecha_Llegada DATE,
          Fecha_Retiro DATE
      )`);

      await connection.execute(`INSERT INTO VICTIMA_UBICACION (ID_UBICACION,ID_VICTIMA,FECHA_LLEGADA, FECHA_RETIRO)
                                SELECT DISTINCT ID_UBICACION, ID_VICTIMA, FECHA_LLEGADA, FECHA_RETIRO
                                FROM VICTIMA v INNER JOIN (SELECT DISTINCT ID_UBICACION, FECHA_LLEGADA, FECHA_RETIRO, NOMBRE_VICTIMA,APELLIDO_VICTIMA 
                                FROM TEMP t2  INNER JOIN UBICACION u
                                ON u.UBICACION_VICTIMA  =T2.UBICACION_VICTIMA) c
                                ON v.NOMBRE_VICTIMA = c.NOMBRE_VICTIMA AND v.APELLIDO_VICTIMA  = c.APELLIDO_VICTIMA`)
    


      await connection.execute(`CREATE TABLE arreglo (
      Id_Ubicacion INT
      )`);

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

app.get('/cargarDatos', function (req, res) {
  insertar(req, res);
})




app.listen(port, () => console.log("nodeOracleRestApi app listening on port %s!", port))