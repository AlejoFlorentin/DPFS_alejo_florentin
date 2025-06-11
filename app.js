var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let session = require('express-session');
const fs = require('fs').promises;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
const methodOverride = require('method-override');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(methodOverride('_method')); // para poder usar el put y el delete en los formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use(
  session({
    secret: 'superlative',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: false, //  hace que se elimine al cerrar el navegador
    },
  })
);

app.use(async (req, res, next) => {
  if (!req.session.lastUser && req.cookies.recordame) {
    const filePath = path.join(__dirname, 'data/users.json');
    const data = await fs.readFile(filePath, 'utf8');
    const users = JSON.parse(data);
    console.log(req.cookies.recordame);
    const user = users.find(
      user => user.email === decodeURIComponent(req.cookies.recordame).trim().toLowerCase()
    );
    console.log('🔎 Usuario encontrado por cookie:', user);
    if (user) {
      req.session.lastUser = {
        id: user.id,
        name: user.firstName,
        email: user.email,
        category: user.category,
        image: user.image,
      };
    }
  }
  next();
});

app.use(function (req, res, next) {
  if (req.session.lastUser !== undefined) {
    res.locals.lastUser = req.session.lastUser; // para poder usar los datos en todas las vistas
  }
  return next();
});

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/productos', productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
