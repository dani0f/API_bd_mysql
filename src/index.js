const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash =require('connect-flash');
const session = require('express-session');
const mysql_store = require('express-mysql-session');
const { database } = require('./keys');
const bodyParser = require('body-parser');
//initializations

const app = express();

//settings

app.set('port',process.env.PORT || 4000 );
app.set('views',path.join(__dirname,'views'));//le dice a node donde esta carpeta views
app.engine('.hbs',exphbs({
    defaultLayout: 'main', //nombre de plantilla principal
    layoutsDir: path.join(app.get('views'),'layouts'),//dice que layouts esta dentro de views
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs', //modificar la extension
    helpers: require('./lib/handlebars')
    
}));
app.set('view engine', '.hbs');
//middlewares
app.use(session({
    secret: 'faztmysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new mysql_store(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//global variables
app.use((req, res, next) => {
    app.locals.mensaje = req.flash('mensaje');
    next();
});

//routes
app.use(require('./routes/principal'));
app.use(require('./routes/moderar'));
app.use(require('./routes/filtrado'));
app.use('/pecados', require('./routes/pecados'));
app.use('/paises', require('./routes/paises'));
app.use('/pisos', require('./routes/pisos'));
app.use('/herramientas', require('./routes/herramientas'));
app.use('/muertes', require('./routes/muertes'));
app.use('/castigos', require('./routes/castigos'));
app.use('/guardias', require('./routes/guardias'));
app.use('/pecadores',require('./routes/pecadores'));
app.use('/demonios',require('./routes/demonios'));
app.use('/pecadores_castigos',require('./routes/pecadores_castigos'));
app.use('/castigos_herramientas',require('./routes/castigos_herramientas'));
//public
app.use(express.static(path.join(__dirname, 'public')));
//starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port',app.get('port'));
});