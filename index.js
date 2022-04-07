
require('dotenv').config();
const express = require('express');
const app = express();
const port =process.env.PORT || 3000;
const path = require('path');
const hbs = require('hbs');

//Traemos la librería para la conexión
const mysql = require('mysql2');

//Creamos la configuración de la conexión
const conexion =  mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.USR,
    password: process.env.PASS,
    database: process.env.DB,
});

//Conectamos a la DB
conexion.connect((error) =>{
    if(error) throw error;
    console.log('Conexión a la Data Base exitosa!!');
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));

//Configuramos el Motor de Plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

//Páginas

app.get('/', (req, res) =>{
    res.render('index', {
        titulo: 'Inventario informatico',
    })
});

app.get('/carga', (req, res) =>{
    res.render('carga', {
        titulo: 'Seleccione un tipo de dispositivo',
        width: 50,
        carga: true
    })
});

app.get('/cpu', (req, res) =>{
    res.render('carga', {
        titulo: 'CPU',
        width: 75,
        cpu: true,
        post: 'cpu'
    })
});
app.post('/cpu', (req, res) =>{
    //Desestructuración de las variables

    const { marca, modelo, fecha_mercado, ram_tipo, dsk_tipo, mb_marca, mb_cod, core_marca, core_cod, core_año } = req.body;

    if(marca == '' || modelo == '' || fecha_mercado == ''){
        let validacion = 'Por favor, ingrese todos los datos obligatorios';
        res.render('carga', {
            titulo: 'error',
            width: 75,
            validacion
        });
    }else{
        console.log('Marca '+ marca);
        console.log('Modelo ' + modelo);
        console.log('Lanzamiento ' + fecha_mercado);
        console.log('Tipo de RAM '+ ram_tipo);
        console.log('Tipo de DSK ' + dsk_tipo);
        console.log('Marca MB ' + mb_marca);
        console.log('Codigo MB '+ mb_cod);
        console.log('marca CPU ' + core_marca);
        console.log('Codigo CPU ' + core_cod);
        console.log('Lanzamiento CPU ' + core_año);

        res.render('carga', {titulo: 'Los datos fueron ingresados correctamente'})

        //Insertar datos a la DB
/*         let data = {
            producto_nombre: nombre, 
            producto_precio: precio,
            producto_descripcion: descripcion
        }

        let sql = 'Insert into productos set ?';
 */
/*         conexion.query(sql, data, (error, results) =>{
            if(error) throw error;
            res.render('index', {
                titulo: 'Bienvenidos a la App',
            }); 
        })
 */    
    }
});


app.get('/notebook', (req, res) =>{
    res.render('carga', {
        titulo: 'Notebook',
        width: 75,
        ntb: true,
        post: 'notebook'
    })
});
app.post('/notebook', (req, res) =>{
    //Desestructuración de las variables

    const { marca, modelo, fecha_mercado, ram_tipo, dsk_tipo, mb_marca, mb_cod, core_marca, core_cod, core_año } = req.body;

    if(marca == '' || modelo == '' || fecha_mercado == ''){
        let validacion = 'Por favor, ingrese todos los datos obligatorios';
        res.render('carga', {
            titulo: 'error',
            width: 75,
            validacion
        });
    }else{
        console.log('Marca '+ marca);
        console.log('Modelo ' + modelo);
        console.log('Lanzamiento ' + fecha_mercado);
        console.log('Tipo de RAM '+ ram_tipo);
        console.log('Tipo de DSK ' + dsk_tipo);
        console.log('Marca MB ' + mb_marca);
        console.log('Codigo MB '+ mb_cod);
        console.log('marca CPU ' + core_marca);
        console.log('Codigo CPU ' + core_cod);
        console.log('Lanzamiento CPU ' + core_año);

        res.render('carga', {titulo: 'Los datos fueron ingresados correctamente'})

        //Insertar datos a la DB
/*         let data = {
            producto_nombre: nombre, 
            producto_precio: precio,
            producto_descripcion: descripcion
        }

        let sql = 'Insert into productos set ?';
 */
/*         conexion.query(sql, data, (error, results) =>{
            if(error) throw error;
            res.render('index', {
                titulo: 'Bienvenidos a la App',
            }); 
        })
 */    
    }
});


app.get('/monitor', (req, res) =>{
    res.render('carga', {
        titulo: 'Monitor',
        width: 75,
        disp: true,
        post: 'monitor'
    })
});
app.post('/monitor', (req, res) =>{
    //Desestructuración de las variables

    const { marca, modelo, fecha_mercado, ram_tipo, dsk_tipo, mb_marca, mb_cod, core_marca, core_cod, core_año } = req.body;

    if(marca == '' || modelo == '' || fecha_mercado == ''){
        let validacion = 'Por favor, ingrese todos los datos obligatorios';
        res.render('carga', {
            titulo: 'error',
            width: 75,
            validacion
        });
    }else{
        console.log('Marca '+ marca);
        console.log('Modelo ' + modelo);
        console.log('Lanzamiento ' + fecha_mercado);
        console.log('Tipo de RAM '+ ram_tipo);
        console.log('Tipo de DSK ' + dsk_tipo);
        console.log('Marca MB ' + mb_marca);
        console.log('Codigo MB '+ mb_cod);
        console.log('marca CPU ' + core_marca);
        console.log('Codigo CPU ' + core_cod);
        console.log('Lanzamiento CPU ' + core_año);

        res.render('carga', {titulo: 'Los datos fueron ingresados correctamente'})

        //Insertar datos a la DB
/*         let data = {
            producto_nombre: nombre, 
            producto_precio: precio,
            producto_descripcion: descripcion
        }

        let sql = 'Insert into productos set ?';
 */
/*         conexion.query(sql, data, (error, results) =>{
            if(error) throw error;
            res.render('index', {
                titulo: 'Bienvenidos a la App',
            }); 
        })
 */    
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


app.get('/listado', (req, res) =>{

    let sql = 'SELECT * FROM AI';

    conexion.query(sql, (error, results) =>{
        if(error) throw error;
        res.render('listado', {
            titulo: 'listado',
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




