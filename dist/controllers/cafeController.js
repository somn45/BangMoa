"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchMap = exports.search = exports.postRegister = exports.postEdit = exports.home = exports.getRegister = exports.getEdit = exports.detail = exports.deleteCafe = void 0;

var _Cafe = _interopRequireDefault(require("../models/Cafe"));

var _User = _interopRequireDefault(require("../models/User"));

var _validateCafeData = _interopRequireDefault(require("../utils/validateCafeData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var REGISTER_PAGE = 'cafe/register';
var NOT_FOUND_PAGE = '404';

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var cafes, interestedCafes, loggedUser, watchlist, _iterator, _step, theme, interestedCafeCount, interestedCafe;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _Cafe["default"].find();

          case 2:
            cafes = _context.sent;
            interestedCafes = [];
            loggedUser = req.session.loggedUser;

            if (loggedUser) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(200).render('home', {
              cafes: cafes
            }));

          case 7:
            watchlist = loggedUser.watchlist;
            _iterator = _createForOfIteratorHelper(watchlist);
            _context.prev = 9;

            _iterator.s();

          case 11:
            if ((_step = _iterator.n()).done) {
              _context.next = 21;
              break;
            }

            theme = _step.value;
            interestedCafeCount = 0;
            _context.next = 16;
            return _Cafe["default"].find({
              theme: theme
            }).sort({
              'meta.rating': -1
            }).limit(6);

          case 16:
            interestedCafe = _context.sent;
            interestedCafes[interestedCafeCount] = [theme].concat(_toConsumableArray(interestedCafe));
            interestedCafeCount += 1;

          case 19:
            _context.next = 11;
            break;

          case 21:
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](9);

            _iterator.e(_context.t0);

          case 26:
            _context.prev = 26;

            _iterator.f();

            return _context.finish(26);

          case 29:
            res.status(200).render('home', {
              interestedCafes: interestedCafes
            });

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 23, 26, 29]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var getRegister = function getRegister(req, res) {
  res.status(200).render(REGISTER_PAGE);
};

exports.getRegister = getRegister;

var postRegister = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body, name, description, location, theme, level, file, imageUrl, validateMessage, user, cafe;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // form의 입력값 받아오기
            _req$body = req.body, name = _req$body.name, description = _req$body.description, location = _req$body.location, theme = _req$body.theme, level = _req$body.level;
            file = req.file;
            imageUrl = file ? file.location : '';
            validateMessage = (0, _validateCafeData["default"])({
              location: location,
              theme: theme,
              level: level
            });

            if (!(validateMessage !== 'ok')) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(400).render(REGISTER_PAGE, validateMessage));

          case 6:
            user = req.session.loggedUser;
            _context2.next = 9;
            return _Cafe["default"].create({
              name: name,
              description: description,
              location: location,
              theme: theme,
              meta: {
                level: level
              },
              imageUrl: imageUrl,
              owner: user._id
            });

          case 9:
            cafe = _context2.sent;
            _context2.next = 12;
            return _User["default"].findByIdAndUpdate(user._id, {
              registeredCafes: [].concat(_toConsumableArray(user.registeredCafes), [cafe._id])
            });

          case 12:
            res.redirect('/');

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postRegister(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postRegister = postRegister;

var detail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var cafeId, cafe, comments;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // 카페의 정보 DB에서 불러오기
            cafeId = req.params.cafeId;
            _context3.next = 3;
            return _Cafe["default"].findById(cafeId).populate('owner').populate({
              path: 'comments',
              populate: {
                path: 'owner'
              }
            });

          case 3:
            cafe = _context3.sent;

            if (cafe) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(404).render(NOT_FOUND_PAGE));

          case 6:
            // 카페의 댓글 불러오기
            comments = cafe.comments;
            res.status(200).render('cafe/detail', {
              cafe: cafe,
              comments: comments ? comments : ''
            });

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function detail(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.detail = detail;

var search = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var cafes, sortBy, _req$query, isDetail, keyword, theme, order, level, searchReg;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // 검색에 필요한 변수 불러오기
            _req$query = req.query, isDetail = _req$query.isDetail, keyword = _req$query.keyword, theme = _req$query.theme, order = _req$query.order;
            level = req.query.level;
            level = Number(level); // order의 값에 따라 sort를 하기 위한 key값 준비

            searchReg = new RegExp(keyword);
            _context4.t0 = order;
            _context4.next = _context4.t0 === 'recommendation' ? 7 : _context4.t0 === 'rating' ? 9 : 11;
            break;

          case 7:
            sortBy = 'meta.recommendation';
            return _context4.abrupt("break", 11);

          case 9:
            sortBy = 'meta.rating';
            return _context4.abrupt("break", 11);

          case 11:
            if (isDetail) {
              _context4.next = 17;
              break;
            }

            _context4.next = 14;
            return _Cafe["default"].find({
              name: searchReg
            }).sort(_defineProperty({}, sortBy, -1));

          case 14:
            cafes = _context4.sent;
            _context4.next = 20;
            break;

          case 17:
            _context4.next = 19;
            return _Cafe["default"].find({
              $and: [{
                name: keyword ? searchReg : {
                  $nin: ''
                }
              }, {
                theme: !theme ? {
                  $nin: ''
                } : {
                  $in: theme
                }
              }, {
                'meta.level': level ? level : {
                  $nin: ''
                }
              }]
            }).sort(_defineProperty({}, sortBy, -1));

          case 19:
            cafes = _context4.sent;

          case 20:
            return _context4.abrupt("return", res.status(200).render('cafe/search', {
              cafes: cafes
            }));

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function search(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.search = search;

var searchMap = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            res.status(200).render('cafe/search-map');

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function searchMap(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.searchMap = searchMap;

var getEdit = /*#__PURE__*/function () {
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

            if (cafe) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.status(404).render(NOT_FOUND_PAGE));

          case 6:
            res.status(200).render('cafe/edit', {
              cafe: cafe
            });

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getEdit(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getEdit = getEdit;

var postEdit = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var cafeId, _req$body2, name, description, location, theme, level, file, _yield$Cafe$findById, imageUrl, validateMessage;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            // form의 입력값 받아오기
            cafeId = req.params.cafeId;
            _req$body2 = req.body, name = _req$body2.name, description = _req$body2.description, location = _req$body2.location, theme = _req$body2.theme, level = _req$body2.level;
            file = req.file;
            _context7.next = 5;
            return _Cafe["default"].findById(cafeId);

          case 5:
            _yield$Cafe$findById = _context7.sent;
            imageUrl = _yield$Cafe$findById.imageUrl;
            imageUrl = file ? file.path : imageUrl ? imageUrl : '';
            validateMessage = (0, _validateCafeData["default"])({
              location: location,
              theme: theme,
              level: level
            });

            if (!(validateMessage !== 'ok')) {
              _context7.next = 11;
              break;
            }

            return _context7.abrupt("return", res.status(400).render(REGISTER_PAGE, validateMessage));

          case 11:
            _context7.next = 13;
            return _Cafe["default"].findByIdAndUpdate(cafeId, {
              name: name,
              description: description,
              location: location,
              theme: theme,
              meta: {
                level: level
              },
              imageUrl: imageUrl
            });

          case 13:
            res.redirect("/cafes/".concat(cafeId));

          case 14:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function postEdit(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;

var deleteCafe = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var cafeId, cafe, comments;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            cafeId = req.params.cafeId;
            _context8.next = 3;
            return _Cafe["default"].findById(cafeId);

          case 3:
            cafe = _context8.sent;
            _context8.next = 6;
            return _Cafe["default"].findById(cafeId).populate('comments');

          case 6:
            comments = _context8.sent;

            if (cafe) {
              _context8.next = 9;
              break;
            }

            return _context8.abrupt("return", res.status(404).render(NOT_FOUND_PAGE));

          case 9:
            _context8.next = 11;
            return _Cafe["default"].findByIdAndUpdate(cafeId, {
              comments: []
            }, {
              "new": true
            });

          case 11:
            _context8.next = 13;
            return _Cafe["default"].findByIdAndDelete(cafeId);

          case 13:
            res.redirect('/');

          case 14:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function deleteCafe(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.deleteCafe = deleteCafe;