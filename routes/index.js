"use strict";
var express = require("express");
exports.indexRouter = express.Router();
/* GET home page. */
exports.indexRouter.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = exports.indexRouter;
//# sourceMappingURL=index.js.map