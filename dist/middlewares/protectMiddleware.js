"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protectMiddleware = exports.preventBreakInMiddleware = exports.ownerProtectMiddleware = exports.guestPublicMiddleware = void 0;

var _Cafe = _interopRequireDefault(require("../models/Cafe"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var protectMiddleware = function protectMiddleware(req, res, next) {
  if (!req.session.loggedIn) {
    return res.redirect('/login');
  }

  next();
};

exports.protectMiddleware = protectMiddleware;

var guestPublicMiddleware = function guestPublicMiddleware(req, res, next) {
  if (req.session.loggedIn) {
    return res.redirect('/');
  }

  next();
};

exports.guestPublicMiddleware = guestPublicMiddleware;

var ownerProtectMiddleware = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var cafeId, cafe;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cafeId = req.params.cafeId;
            _context.next = 3;
            return _Cafe["default"].findById(cafeId).populate('owner');

          case 3:
            cafe = _context.sent;

            if (cafe) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", res.status(404).render('404'));

          case 6:
            if (!(cafe.owner.username !== req.session.loggedUser.username)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return", res.redirect("/cafes/".concat(cafe._id)));

          case 8:
            next();

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function ownerProtectMiddleware(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.ownerProtectMiddleware = ownerProtectMiddleware;

var preventBreakInMiddleware = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var userId, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = req.params.userId;
            _context2.next = 3;
            return _User["default"].findById(userId);

          case 3:
            user = _context2.sent;

            if (user) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).render('404'));

          case 6:
            if (!(user.uid !== req.session.loggedUser.uid)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", res.redirect("/users/".concat(user._id)));

          case 8:
            next();

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function preventBreakInMiddleware(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.preventBreakInMiddleware = preventBreakInMiddleware;