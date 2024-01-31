"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increaseRecommendation = exports.getCafeInfo = exports.findLocation = exports.decreaseRecommendation = exports.checkRecommendedUser = exports.addWatchList = void 0;

var _Cafe = _interopRequireDefault(require("../models/Cafe"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var checkRecommendedUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var cafeId, cafe, loggedUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cafeId = req.params.cafeId;
            _context.next = 3;
            return _Cafe["default"].findById(cafeId);

          case 3:
            cafe = _context.sent;
            loggedUser = req.session.loggedUser; // 유저가 이미 카페를 추천했을 경우 상태 코드 200 전송

            if (!(cafe.meta.recommendedUser.indexOf(loggedUser._id) !== -1)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.sendStatus(200));

          case 7:
            res.sendStatus(202);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function checkRecommendedUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.checkRecommendedUser = checkRecommendedUser;

var increaseRecommendation = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var cafeId, cafe, loggedUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cafeId = req.params.cafeId;
            _context2.next = 3;
            return _Cafe["default"].findById(cafeId);

          case 3:
            cafe = _context2.sent;
            // 카페의 추천 수를 하나 올리고 추천한 유저 데이터 저장
            cafe.meta.recommendation += 1;
            loggedUser = req.session.loggedUser;
            cafe.meta.recommendedUser.push(loggedUser._id);
            _context2.next = 9;
            return cafe.save();

          case 9:
            res.sendStatus(200);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function increaseRecommendation(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.increaseRecommendation = increaseRecommendation;

var decreaseRecommendation = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var cafeId, cafe, loggedUser, filter;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cafeId = req.params.cafeId;
            _context3.next = 3;
            return _Cafe["default"].findById(cafeId);

          case 3:
            cafe = _context3.sent;
            cafe.meta.recommendation -= 1;
            loggedUser = req.session.loggedUser;
            filter = cafe.meta.recommendedUser.filter(function (userId) {
              return String(userId) !== String(loggedUser._id);
            });
            cafe.meta.recommendedUser = filter;
            _context3.next = 10;
            return cafe.save();

          case 10:
            return _context3.abrupt("return", res.sendStatus(200));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function decreaseRecommendation(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.decreaseRecommendation = decreaseRecommendation;

var addWatchList = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var themeList, loggedUser, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            themeList = req.body.themeList;
            loggedUser = req.session.loggedUser;

            if (loggedUser) {
              _context4.next = 4;
              break;
            }

            return _context4.abrupt("return", res.sendStatus(404));

          case 4:
            _context4.next = 6;
            return _User["default"].findByIdAndUpdate({
              _id: loggedUser._id
            }, {
              watchlist: themeList
            }, {
              "new": true
            });

          case 6:
            user = _context4.sent;
            req.session.loggedUser = user;
            res.sendStatus(200);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function addWatchList(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.addWatchList = addWatchList;

var findLocation = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var message, location, cafes, results;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            message = '';
            location = req.query.location;
            _context5.next = 4;
            return _Cafe["default"].find();

          case 4:
            cafes = _context5.sent;
            results = cafes.filter(function (cafe) {
              return cafe.location.includes(location);
            });

            if (results.length === 0) {
              message = '찾으시는 지역에 방탈출 카페가 존재하지 않습니다.';
            }

            res.json({
              results: results,
              message: message
            });

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findLocation(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.findLocation = findLocation;

var getCafeInfo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var cafeId, cafe;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            cafeId = req.params.cafeId;
            _context6.next = 3;
            return _Cafe["default"].findById(cafeId);

          case 3:
            cafe = _context6.sent;
            return _context6.abrupt("return", res.json({
              cafe: cafe
            }));

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getCafeInfo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getCafeInfo = getCafeInfo;