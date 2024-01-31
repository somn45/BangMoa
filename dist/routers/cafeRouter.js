"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multerS = _interopRequireDefault(require("../aws/multerS3"));

var _cafeController = require("../controllers/cafeController");

var _multer = require("../middlewares/multer");

var _protectMiddleware = require("../middlewares/protectMiddleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var cafeRouter = _express["default"].Router();

cafeRouter.route('/register').get(_protectMiddleware.protectMiddleware, _cafeController.getRegister).post(_multerS["default"].single('background'), _cafeController.postRegister);
cafeRouter.get('/:cafeId([a-z0-9]{24})', _cafeController.detail);
cafeRouter.route('/:cafeId([a-z0-9]{24})/edit').get(_protectMiddleware.protectMiddleware, _protectMiddleware.ownerProtectMiddleware, _cafeController.getEdit).post(_multerS["default"].single('background'), _cafeController.postEdit);
cafeRouter.get('/:cafeId([a-z0-9]{24})/delete', _protectMiddleware.protectMiddleware, _protectMiddleware.ownerProtectMiddleware, _cafeController.deleteCafe);
var _default = cafeRouter;
exports["default"] = _default;