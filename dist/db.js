"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var db = _mongoose["default"].connection;
var DB_URL = "mongodb+srv://".concat(process.env.DB_USER_ID, ":").concat(process.env.DB_PASSWORD, "@bangbaclusterfree.4kaagvj.mongodb.net/?retryWrites=true&w=majority");

_mongoose["default"].connect(DB_URL);

db.on('error', function (error) {
  return console.log('❌ DB connect fail. Error : ', error);
});
db.once('open', function () {
  return console.log('✅ DB connect success.');
});
var _default = DB_URL;
exports["default"] = _default;