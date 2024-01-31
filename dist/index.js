"use strict";

require("regenerator-runtime");

require("dotenv/config");

var _server = _interopRequireDefault(require("./server"));

require("./db");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 4000;

_server["default"].listen(PORT, function () {
  return console.log("\u2705 Server connect success. PORT : ".concat(PORT));
});