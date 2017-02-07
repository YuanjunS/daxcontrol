"use strict";
var express = require("express");
var userRouter = express.Router();
/* GET users listing. */
userRouter.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = userRouter;
//# sourceMappingURL=users.js.map