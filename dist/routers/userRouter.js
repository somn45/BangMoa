"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _multerS = _interopRequireDefault(require("../aws/multerS3"));

var _userController = require("../controllers/userController");

var _socialLoginController = require("../controllers/socialLoginController");

var _protectMiddleware = require("../middlewares/protectMiddleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.get('/:userId([a-z0-9]{24})', _userController.profile);
userRouter.route('/:userId([a-z0-9]{24})/edit').get(_protectMiddleware.protectMiddleware, _protectMiddleware.preventBreakInMiddleware, _userController.getEdit).post(_multerS["default"].single('avatar'), _userController.postEdit);
userRouter.route('/:userId([a-z0-9]{24})/change-password').get(_protectMiddleware.protectMiddleware, _protectMiddleware.preventBreakInMiddleware, _userController.getChangePassword).post(_userController.postChangePassword);
userRouter.get('/:userId([a-z0-9]{24})/signout', _protectMiddleware.protectMiddleware, _protectMiddleware.preventBreakInMiddleware, _userController.signout);
userRouter.get('/kakao/login', _socialLoginController.startKakaoLogin);
userRouter.get('/kakao/oauth', _socialLoginController.finishKakaoLogin);
userRouter.get('/google/login', _socialLoginController.startGoogleLogin);
userRouter.get('/google/oauth', _socialLoginController.finishGoogleLogin);
userRouter.get('/naver/login', _socialLoginController.startNaverLogin);
userRouter.get('/naver/oauth', _socialLoginController.finishNaverLogin);
var _default = userRouter;
exports["default"] = _default;