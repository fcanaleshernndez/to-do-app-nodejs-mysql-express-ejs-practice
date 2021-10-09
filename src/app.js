const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

//Importando las Rutas
const routes = require('./routes');
const { urlencoded } = require('express');

//Configuraciones de Express
app.set('port', process.env.PORT || 3000);
app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));

//Middleswares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'todolist'
}, 'single'));
app.use(express.urlencoded({ extended: false }));

//Rutas
app.use('/', routes);



//Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));



app.listen(app.get('port'), () => {
    console.log('Escuchando desde el puerto 3000');
});