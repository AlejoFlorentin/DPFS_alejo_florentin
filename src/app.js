//Modulos
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

// Rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

// Rutas API
const apiUsersRouter = require('./routes/api/usersApiRoutes');
const apiProductsRouter = require('./routes/api/productsApiRoutes');

//Middlewares
const methodOverride = require('method-override');
const sessionMiddleware = require('./middlewares/sessionMiddleware');
const cartMiddleware = require('./middlewares/cartMiddleware');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use(logger('dev'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: 'superlative',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: false,
    },
  })
);

app.use(sessionMiddleware);
app.use(cartMiddleware);

app.use('/', indexRouter);
app.use('/usuarios', usersRouter);
app.use('/productos', productsRouter);
app.use('/carrito', cartRouter);
app.use('/api/users', apiUsersRouter);
app.use('/api/products', apiProductsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

module.exports = app;
