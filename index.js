
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
        index: true
    })
});

app.get('/carga_m', (req, res) =>{
    res.render('carga_m', {
        titulo: 'Seleccione un tipo de dispositivo',
        width: 50,
        carga: true,
        carga_m: true
    })
});


app.get('/cpu', (req, res) =>{
    res.render('carga_m', {
        titulo: 'CPU',
        width: 75,
        cpu: true,
        post: 'cpu'
    })
});
app.post('/cpu', (req, res) =>{
    const { marca, modelo, fecha_mercado, ram_tipo, dsk_tipo, mb_marca, mb_cod, core_marca, core_cod, core_año } = req.body;

    if(marca == '' || modelo == '' || fecha_mercado == ''){
        let validacion = 'Por favor, ingrese todos los datos obligatorios';
        res.render('carga_m', {
            titulo: 'error',
            width: 75,
            validacion
        });
    }else{
//Insertar datos a la DB
        let ai_tipo = "cpu"
        let data = {
        d_AI_tipo: ai_tipo, 
        d_marca: marca,
        d_modelo: modelo,
        d_añoLanz: fecha_mercado,
        d_RAM_tipo: ram_tipo,
        d_DSK_tipo: dsk_tipo,
        d_MB_marca: mb_marca,
        d_MB_code: mb_cod,
        d_CORE_Marca: core_marca,
        d_CORE_code: core_cod,
        d_CORE_año: core_año
        }

        let sql = 'Insert into detalles set ?';
        
        conexion.query(sql, data, (error, results) =>{
            if(error) throw error;
            res.render('carga_m', {
                titulo: 'Seleccione un tipo de dispositivo',
                width: 50,
                carga: true,
                validacion: 'la carga fue exitosa'
            })
        })
        
    }
});


app.get('/notebook', (req, res) =>{
    res.render('carga_m', {
        titulo: 'Notebook',
        width: 75,
        ntb: true,
        post: 'notebook'
    })
});
app.post('/notebook', (req, res) =>{
    //Desestructuración de las variables
        const { marca, modelo, fecha_mercado, pant_inch, ram_tipo, dsk_tipo, core_marca, core_cod, core_año } = req.body;
    
        if(marca == '' || modelo == '' || fecha_mercado == ''){
            let validacion = 'Por favor, ingrese todos los datos obligatorios';
            res.render('carga_m', {
                titulo: 'error',
                width: 75,
                validacion
            });
        }else{
    //Insertar datos a la DB
            let ai_tipo = "notebook"
            let data = {
                d_AI_tipo: ai_tipo, 
                d_marca: marca,
                d_modelo: modelo,
                d_añoLanz: fecha_mercado,
                d_Pant_inch: pant_inch,
                d_RAM_tipo: ram_tipo,
                d_DSK_tipo: dsk_tipo,
                d_CORE_Marca: core_marca,
                d_CORE_code: core_cod,
                d_CORE_año: core_año
            }
    
            let sql = 'Insert into detalles set ?';
            
            conexion.query(sql, data, (error, results) =>{
                if(error) throw error;
                res.render('carga_m', {
                    titulo: 'Seleccione un tipo de dispositivo',
                    width: 50,
                    carga: true,
                    validacion: 'la carga fue exitosa'
                })
            })
            
        }
});


app.get('/monitor', (req, res) =>{
    res.render('carga_m', {
        titulo: 'Monitor',
        width: 75,
        disp: true,
        post: 'monitor'
    })
});
app.post('/monitor', (req, res) =>{
    //Desestructuración de las variables
        const { marca, modelo, fecha_mercado, pant_inch } = req.body;
    
        if(marca == '' || modelo == '' || fecha_mercado == ''){
            let validacion = 'Por favor, ingrese todos los datos obligatorios';
            res.render('carga_m', {
                titulo: 'error',
                width: 75,
                validacion
            });
        }else{
    //Insertar datos a la DB
            let ai_tipo = "monitor"
            let data = {
                d_AI_tipo: ai_tipo, 
                d_marca: marca,
                d_modelo: modelo,
                d_añoLanz: fecha_mercado,
                d_Pant_inch: pant_inch,
            }

            let sql = 'Insert into detalles set ?';
            
            conexion.query(sql, data, (error, results) =>{
                if(error) throw error;
                res.render('carga_m', {
                    titulo: 'Seleccione un tipo de dispositivo',
                    width: 50,
                    carga: true,
                    validacion: 'la carga fue exitosa'
                })
            })
            
        }
});


app.get('/carga_p', (req, res) =>{
    res.render('carga_p', {
        titulo: 'Alta de persona/deposito',
        width: 75,
        post: 'carga_p',
        carga_p: true
    })
});
app.post('/carga_p', (req, res) =>{
    const { Nombre, Apellido, username, Cel, Interno, IP, cod_Gerencia, id_jefe, Edificio, Piso, Sector } = req.body;

    if(Nombre == '' || username == ''){
        let validacion = 'Por favor, ingrese todos los datos obligatorios';
        res.render('carga_p', {
            titulo: 'error',
            width: 75,
            validacion
        });
    }else{
//Insertar datos a la DB
        let data = {
            Nombre:  Nombre,
            Apellido: Apellido,
            username: username,
            Cel: Cel,
            Interno: Interno,
            IP: IP,
            cod_Gerencia: cod_Gerencia,
            // id_jefe: id_jefe,
            Edificio: Edificio,
            Piso: Piso,
            Sector: Sector
        }

        let sql = 'Insert into persona_deposito set ?';

        conexion.query(sql, data, (error, results) =>{
            if(error) throw error;
            res.render('index', {
                titulo: 'Inventario informatico',
                width: 50,
                carga: true,
                validacion: 'la carga a sido exitosa'
            })
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


app.get('/listado', (req, res) =>{
    
    let sql = 'SELECT * FROM detalles';
    
    conexion.query(sql, (error, results) =>{
        if(error) throw error;
        res.render('listado', {
            titulo: 'listado',
            width: 100,
            listado: true,
            results: results
        })
    })
});

app.post('/listado', (req, res) => {
    const { d_id } = req.body;
    console.log( d_id );
    res.render('listado', {
        titulo: 'Listado',
        width: 100,
        validacion: 'Los datos del registro Nro ' + d_id + ' se han eliminado'
    })

    const sql = "DELETE FROM detalles WHERE d_id =" + d_id + "";
    conexion.query(sql, (error, results) =>{
        if(error) throw error;
        res.render('index', {
            titulo: 'Bienvenidos a la App',
        }); 
    })
})

//conexion.end();


app.listen(port, () =>{
    console.log(`Servidor está trabajando en el Puerto ${port}`);
});

app.on('error', (err) =>{
    console.log(`Error en la ejecución del Servidor ${error}`);
})