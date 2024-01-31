"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multerS = _interopRequireDefault(require("../aws/multerS3"));

var _multer = require("../middlewares/multer");

var _cafeController = require("../controllers/cafeController");

var _userController = require("../controllers/userController");

var _protectMiddleware = require("../middlewares/protectMiddleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var globalRouter = _express["default"].Router();

globalRouter.get('/', _cafeController.home);
globalRouter.route('/join').get(_userController.getJoin).post(_multerS["default"].single('avatar'), _protectMiddleware.guestPublicMiddleware, _userController.postJoin);
globalRouter.route('/login').get(_protectMiddleware.guestPublicMiddleware, _userController.getLogin).post(_userController.postLogin);
globalRouter.get('/search', _cafeController.search);
globalRouter.get('/logout', _protectMiddleware.protectMiddleware, _userController.logout);
globalRouter.get('/search/map', _cafeController.searchMap);
var _default = globalRouter;
exports["default"] = _default;