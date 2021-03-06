import * as express from "express";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as logger from "morgan";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import {indexRouter} from "./routes/index";
import userRouter from "./routes/users";
import * as socketio from"socket.io";

export let app = express();
export let port = process.env.PORT || 8080;
export let io = socketio().listen(app.listen(port));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname + 'data')));
//app.use(express.static(path.join(__dirname,'scripts')));
//app.use(express.static(path.join(__dirname,'diagramm')));
app.use('/', indexRouter);
app.use('/users', userRouter);

io.on("connection",function(socket){

  // socket.broadcast.emit('welcome', data);
  socket.on('pie_reset1', function (data) {
    console.log(data.message);
    socket.broadcast.emit('pie_reset2',data.message);
    socket.emit('pie_reset2', data.message);
  });
  // socket.broadcast.emit('welcome',{message:'Welcome!',id:socket.id});

  socket.on('i am a client',function(data){
    console.log(data);

  });
});
// catch 404 and forward to error handler
this.app.use(function (req, res, next) {
  let err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (this.app.get('env') === 'development') {
  this.app.use(function (err: any, req, res, next) {
    res.status(500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
this.app.use(function (err: any, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



export default app;
