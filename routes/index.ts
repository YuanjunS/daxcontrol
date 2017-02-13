import * as express from "express";
export let indexRouter = express.Router();

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
indexRouter.get('/remote', function(req, res, next) {
  res.render('remote_menu', { title: 'Remote' });
});
export default indexRouter;
