"use strict";
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var index_1 = require("./routes/index");
var users_1 = require("./routes/users");
exports.app = express();
// view engine setup
exports.app.set('views', path.join(__dirname, 'views'));
exports.app.set('view engine', 'jade');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
exports.app.use(logger('dev'));
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: false }));
exports.app.use(cookieParser());
exports.app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
exports.app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname + 'data')));
//app.use(express.static(path.join(__dirname,'scripts')));
//app.use(express.static(path.join(__dirname,'diagramm')));
exports.app.use('/', index_1.indexRouter);
exports.app.use('/users', users_1.default);
// catch 404 and forward to error handler
this.app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (this.app.get('env') === 'development') {
    this.app.use(function (err, req, res, next) {
        res.status(500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
this.app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.app;
//# sourceMappingURL=app.js.map