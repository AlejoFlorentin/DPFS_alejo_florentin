var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
const methodOverride = require("method-override");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "src", "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(methodOverride("_method")); // para poder usar el put y el delete en los formularios
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/data", express.static(path.join(__dirname, "data")));
app.use(
  session({ secret: "superlative", resave: false, saveUninitialized: true })
);
app.use(function (req, res, next) {
  //console.log(req.cookies.user); obtener la cookie que queremos conseguir
  if (req.session.lastUser !== undefined) {
    res.locals.lastUser = req.session.lastUser; // esto es para poder usar lo guardado en la session en todas las vistas
  }

  return next(); // para agregar en el medio de req y res
}); //middleware= eslabon entre el req y el res de ahi el termino middleware

app.use("/", indexRouter);
app.use("/usuarios", usersRouter);
app.use("/productos", productsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
