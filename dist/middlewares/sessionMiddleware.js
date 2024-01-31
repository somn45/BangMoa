"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionMiddleware = void 0;

var sessionMiddleware = function sessionMiddleware(req, res, next) {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedUser = req.session.loggedUser;
  next();
};

exports.sessionMiddleware = sessionMiddleware;