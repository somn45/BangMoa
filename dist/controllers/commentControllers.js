"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modifyComment = exports.deleteComment = exports.createComment = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _Cafe = _interopRequireDefault(require("../models/Cafe"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var createComment = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var cafeId, _req$body, text, score, _req$session, loggedIn, loggedUser, comment, cafe, sumOfUserScore, cafeScore, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cafeId = req.params.cafeId;
            _req$body = req.body, text = _req$body.text, score = _req$body.score;
            _req$session = req.session, loggedIn = _req$session.loggedIn, loggedUser = _req$session.loggedUser;

            if (loggedIn) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.sendStatus(400));

          case 5:
            _context.next = 7;
            return _Comment["default"].create({
              text: text,
              score: score,
              owner: loggedUser._id,
              cafe: cafeId
            });

          case 7:
            comment = _context.sent;
            _context.next = 10;
            return comment.populate('owner');

          case 10:
            comment = _context.sent;
            _context.next = 13;
            return _Cafe["default"].findById(cafeId).populate('comments');

          case 13:
            cafe = _context.sent;
            cafe.comments.push(comment);
            sumOfUserScore = cafe.comments.reduce(function (sum, currentValue) {
              return sum + currentValue.score;
            }, 0);
            cafeScore = (sumOfUserScore / cafe.comments.length).toFixed(1);
            cafe.meta.rating = cafeScore;
            _context.next = 20;
            return cafe.save();

          case 20:
            _context.next = 22;
            return _User["default"].findById(loggedUser._id);

          case 22:
            user = _context.sent;
            user.comments.push(comment);
            _context.next = 26;
            return user.save();

          case 26:
            res.status(201).json({
              comment: comment
            });

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createComment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.createComment = createComment;

var modifyComment = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var commentId, _req$body2, text, score, comment, cafe, sumOfUserScore, cafeScore;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commentId = req.params.commentId;
            _req$body2 = req.body, text = _req$body2.text, score = _req$body2.score;
            _context2.next = 4;
            return _Comment["default"].findByIdAndUpdate(commentId, {
              text: text,
              score: score
            }).populate('cafe');

          case 4:
            comment = _context2.sent;
            _context2.next = 7;
            return _Cafe["default"].findById(comment.cafe._id).populate('comments');

          case 7:
            cafe = _context2.sent;
            sumOfUserScore = cafe.comments.reduce(function (sum, currentValue) {
              return sum + currentValue.score;
            }, 0);
            cafeScore = (sumOfUserScore / cafe.comments.length).toFixed(1);
            cafe.meta.rating = cafeScore;
            _context2.next = 13;
            return cafe.save();

          case 13:
            return _context2.abrupt("return", res.sendStatus(200));

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function modifyComment(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.modifyComment = modifyComment;

var deleteComment = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var commentId, comment, cafe, sumOfUserScore, cafeScore;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            commentId = req.params.commentId;
            _context3.next = 3;
            return _Comment["default"].findById(commentId).populate('cafe');

          case 3:
            comment = _context3.sent;
            _context3.next = 6;
            return _Cafe["default"].findById(comment.cafe._id).populate('comments');

          case 6:
            cafe = _context3.sent;
            _context3.next = 9;
            return _Comment["default"].findByIdAndDelete(commentId);

          case 9:
            sumOfUserScore = cafe.comments.reduce(function (sum, currentValue) {
              return sum + currentValue.score;
            }, 0);
            cafeScore = (sumOfUserScore / cafe.comments.length).toFixed(1);
            cafe.meta.rating = cafeScore;
            _context3.next = 14;
            return cafe.save();

          case 14:
            return _context3.abrupt("return", res.sendStatus(200));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteComment(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteComment = deleteComment;