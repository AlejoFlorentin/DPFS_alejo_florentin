require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

// Asegúrate de que la ruta sea correcta

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const methodOverride = require("method-override");
const sessionMiddleware = require("./middlewares/sessionMiddleware");
const cartMiddleware = require("./middlewares/cartMiddleware");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/data", express.static(path.join(__dirname, "data")));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(methodOverride("_method")); // para poder usar el put y el delete en los formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  session({
    secret: "superlative",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: false, //  hace que se elimine al cerrar el navegador
    },
  })
);

app.use(sessionMiddleware);
app.use(cartMiddleware);

app.use("/", indexRouter);
app.use("/usuarios", usersRouter);
app.use("/productos", productsRouter);
app.use("/carrito", cartRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Servidor started on http://localhost:${port}`);
});

module.exports = app;
