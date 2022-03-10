
require('dotenv').config();
const express = require('express');
const app = express();
const port =process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');

//Traemos la librería para la conexión
/* const mysql = require('mysql2'); */

//Creamos la configuración de la conexión
/* const conexion =  mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "35639.Lauti",
    database: "prueba",
});

//Conectamos a la DB
conexion.connect((error) =>{
    if(error) throw error;
    console.log('Conexión a la Data Base exitosa!!');
});
 */
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

//Configuramos el Motor de Plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


app.get('/', (req, res) =>{
    res.render('index', {titulo: 'Bienvenidos a la App'})
});

app.get('/carga', (req, res) =>{
    res.render('carga', {titulo: 'Cargar productos en BD'})
});


app.post('/carga', (req, res) =>{

    //Desestructuración de las variables
    const { nombre, precio, descripcion } = req.body;
        
    if(nombre == "" || precio == ""){
        
        let validacion = 'Faltan datos para guardar el Producto';
        
        res.render('carga', {
            titulo: 'carga para Completar',
            validacion
        });

    }else{

        console.log(nombre);
        console.log(precio);
        console.log(descripcion);

        //Insertar datos a la DB
        let data = {
            producto_nombre: nombre, 
            producto_precio: precio,
            producto_descripcion: descripcion
        }

        let sql = 'Insert into productos set ?';

        conexion.query(sql, data, (error, results) =>{
            if(error) throw error;
            res.render('index', {
                titulo: 'Bienvenidos a la App',
            }); 
        })
    }
});

app.post('/update', (req, res) =>{

    //Desestructuración de las variables opcion 2.
    console.log(req.body.producto_nombre);
    console.log(req.body.producto_precio);
    console.log(req.body.producto_ID);

    //Creamos variable con los Datos incluidos
    let sql = "UPDATE productos SET producto_nombre='" + req.body.producto_nombre + 
    "', producto_precio='" + req.body.producto_precio + "'WHERE producto_ID_=" + req.body.producto_ID;

    conexion.query(sql, data, (error, results) =>{
    if(error) throw error;
    res.render('index', {
        titulo: 'Carga exitosa',
        }); 
    })
});


app.get('/productos', (req, res) =>{

    let sql = 'SELECT * FROM productos';

    conexion.query(sql, (error, results) =>{
        if(error) throw error;
        res.render('productos', {
            titulo: 'Productos',
            results: results,        
        })
    })

    

});

app.get('/contacto', (req, res) =>{
    res.render('contacto', {titulo: 'Escríbenos'})
});

app.post('/contacto', (req, res) =>{

    //Desestructuración de las variables
    const { nombre, email } = req.body;
        
    if(nombre == "" || email == ""){
        
        let validacion = 'Faltan tus datos';
        
        res.render('contacto', {
            titulo: 'Escríbenos',
            validacion
        });

    }else{

        console.log(nombre);
        console.log(email);

        res.render('index', {
            titulo: 'Bienvenidos a la App',
        }); 
    }
});





//conexion.end();

app.listen(port, () =>{
    console.log(`Servidor está trabajando en el Puerto ${port}`);
});

app.on('error', (err) =>{
    console.log(`Error en la ejecución del Servidor ${error}`);
})




