"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadProfile = exports.uploadCafeBg = void 0;

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var uploadProfile = (0, _multer["default"])({
  dest: 'uploads/profile'
});
exports.uploadProfile = uploadProfile;
var uploadCafeBg = (0, _multer["default"])({
  dest: 'uploads/cafeBg'
});
exports.uploadCafeBg = uploadCafeBg;