"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserData = exports.getTokenData = exports.combineUrlAndParams = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var combineUrlAndParams = function combineUrlAndParams(url, paramObj) {
  var option = new URLSearchParams(paramObj).toString();
  return "".concat(url, "?").concat(option);
};

exports.combineUrlAndParams = combineUrlAndParams;

var getTokenData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, headersKey, headersValue) {
    var jsonData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _nodeFetch["default"])(url, {
              method: 'POST',
              headers: {
                headersKey: headersValue
              }
            });

          case 2:
            _context.next = 4;
            return _context.sent.json();

          case 4:
            jsonData = _context.sent;
            return _context.abrupt("return", jsonData);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getTokenData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTokenData = getTokenData;

var getUserData = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(url, access_token) {
    var userData;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _nodeFetch["default"])(url, {
              headers: {
                Authorization: "Bearer ".concat(access_token)
              }
            });

          case 2:
            _context2.next = 4;
            return _context2.sent.json();

          case 4:
            userData = _context2.sent;
            return _context2.abrupt("return", userData);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUserData(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserData = getUserData;