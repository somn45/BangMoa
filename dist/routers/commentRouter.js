"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _commentControllers = require("../controllers/commentControllers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var commentRouter = _express["default"].Router();

commentRouter.post('/cafes/:cafeId([0-9a-f]{24})', _commentControllers.createComment);
commentRouter.patch('/cafes/:commentId([0-9a-f]{24})/update', _commentControllers.modifyComment);
commentRouter["delete"]('/cafes/:commentId([0-9a-f]{24})/delete', _commentControllers.deleteComment);
var _default = commentRouter;
exports["default"] = _default;