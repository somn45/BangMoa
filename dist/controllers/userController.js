"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signout = exports.profile = exports.postLogin = exports.postJoin = exports.postEdit = exports.postChangePassword = exports.logout = exports.getLogin = exports.getJoin = exports.getEdit = exports.getChangePassword = void 0;

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var JOIN_PAGE = 'user/join';
var LOGIN_PAGE = 'user/login';
var EDIT_PAGE = 'user/edit';
var CHANGE_PASSWORD_PAGE = 'user/change-password';
var NOT_FOUND_PAGE = '404';

var getJoin = function getJoin(req, res) {
  res.render(JOIN_PAGE);
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, uid, password, passwordConfirm, username, email, phoneNumber, location, watchlist, avatarUrl, uidExists, userExists, emailForm, isEmailFormat;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // form의 입력값 받아오기
            _req$body = req.body, uid = _req$body.uid, password = _req$body.password, passwordConfirm = _req$body.passwordConfirm, username = _req$body.username, email = _req$body.email, phoneNumber = _req$body.phoneNumber, location = _req$body.location, watchlist = _req$body.watchlist;
            avatarUrl = req.file ? req.file.path : ''; // 중복된 유저 ID인지 확인

            _context.next = 4;
            return _User["default"].exists({
              uid: uid
            });

          case 4:
            uidExists = _context.sent;

            if (!uidExists) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", res.status(400).render(JOIN_PAGE, {
              uidErrorMsg: '이미 존재하는 아이디입니다.'
            }));

          case 7:
            _context.next = 9;
            return _User["default"].exists({
              username: username
            });

          case 9:
            userExists = _context.sent;

            if (!userExists) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", res.status(400).render(JOIN_PAGE, {
              usernameErrorMsg: '이미 존재하는 유저명입니다.'
            }));

          case 12:
            if (password === passwordConfirm) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(400).render(JOIN_PAGE, {
              passwordErrorMsg: '비밀번호, 비밀번호 확인란이 일치하지 않습니다.'
            }));

          case 14:
            // 이메일 형식(xxx@xxx.xxx)인지 확인
            emailForm = new RegExp(/\w+@\w+.\w+/);
            isEmailFormat = emailForm.test(email);

            if (!(!isEmailFormat && email !== '')) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", res.status(400).render(JOIN_PAGE, {
              emailErrorMsg: 'Email format is not correct'
            }));

          case 18:
            _context.next = 20;
            return _User["default"].create({
              uid: uid,
              password: password,
              passwordConfirm: passwordConfirm,
              username: username,
              email: email,
              phoneNumber: phoneNumber,
              location: location,
              avatarUrl: avatarUrl
            });

          case 20:
            res.redirect('/login');

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  res.render(LOGIN_PAGE);
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, uid, password, confirmUid, user, isMatchPassword;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // form의 입력값 받아오기
            _req$body2 = req.body, uid = _req$body2.uid, password = _req$body2.password; // 유저의 ID가 존재하는지 확인 후 유저의 정보 받아오기

            _context2.next = 3;
            return _User["default"].exists({
              uid: uid
            });

          case 3:
            confirmUid = _context2.sent;

            if (confirmUid) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).render(LOGIN_PAGE, {
              uidErrorMsg: 'ID가 존재하지 않습니다.'
            }));

          case 6:
            _context2.next = 8;
            return _User["default"].findOne({
              uid: uid
            });

          case 8:
            user = _context2.sent;
            _context2.next = 11;
            return _bcrypt["default"].compare(password, user.password);

          case 11:
            isMatchPassword = _context2.sent;

            if (isMatchPassword) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(404).render(LOGIN_PAGE, {
              passwordErrorMsg: '비밀번호가 일치하지 않습니다.'
            }));

          case 14:
            req.session.loggedIn = true;
            req.session.loggedUser = user;
            res.redirect('/');

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var logout = function logout(req, res) {
  req.session.destroy();
  res.redirect('/');
};

exports.logout = logout;

var profile = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var userId, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            userId = req.params.userId;
            _context3.next = 3;
            return _User["default"].findById(userId).populate('registeredCafes').populate({
              path: 'comments',
              populate: {
                path: 'cafe'
              }
            });

          case 3:
            user = _context3.sent;

            if (user) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", res.status(404).render(NOT_FOUND_PAGE));

          case 6:
            res.render('user/profile', {
              user: user
            });

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function profile(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.profile = profile;

var getEdit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var userId, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            userId = req.params.userId;
            _context4.next = 3;
            return _User["default"].findById(userId);

          case 3:
            user = _context4.sent;

            if (user) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(404).render(NOT_FOUND_PAGE));

          case 6:
            res.render(EDIT_PAGE, {
              user: user
            });

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getEdit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getEdit = getEdit;

var postEdit = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body3, username, email, phoneNumber, location, watchlist, file, oldUser, avatarUrl, isExistsUsername, emailForm, isEmailFormat, newUser;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            // form의 입력값, 현재 로그인 되어있는 유저 정보 가져오기
            _req$body3 = req.body, username = _req$body3.username, email = _req$body3.email, phoneNumber = _req$body3.phoneNumber, location = _req$body3.location, watchlist = _req$body3.watchlist;
            file = req.file;
            oldUser = req.session.loggedUser;
            avatarUrl = file ? file.path : oldUser.avatarUrl ? oldUser.avatarUrl : ''; // 중복된 유저인지 확인

            _context5.next = 7;
            return _User["default"].exists({
              username: username
            });

          case 7:
            isExistsUsername = _context5.sent;

            if (!(isExistsUsername && oldUser.username !== username)) {
              _context5.next = 10;
              break;
            }

            return _context5.abrupt("return", res.status(400).render(EDIT_PAGE, {
              usernameErrorMsg: '이미 존재하는 유저명입니다.'
            }));

          case 10:
            // 이메일 형식(xxx@xxx.xxx)인지 확인
            emailForm = new RegExp(/\w+@\w+.\w+/);
            isEmailFormat = emailForm.test(email);

            if (!(!isEmailFormat && email)) {
              _context5.next = 14;
              break;
            }

            return _context5.abrupt("return", res.status(400).render(EDIT_PAGE, {
              emailErrorMsg: '이메일 형식이 아닙니다. xxx@xxx.xxx 형식이여야 합니다.'
            }));

          case 14:
            _context5.next = 16;
            return _User["default"].findByIdAndUpdate(oldUser._id, {
              username: username,
              email: email,
              phoneNumber: phoneNumber,
              location: location,
              avatarUrl: avatarUrl,
              watchlist: watchlist
            }, {
              "new": true
            });

          case 16:
            newUser = _context5.sent;
            req.session.loggedUser = newUser;
            res.redirect("/users/".concat(oldUser._id));
            _context5.next = 24;
            break;

          case 21:
            _context5.prev = 21;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 21]]);
  }));

  return function postEdit(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;

var getChangePassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var userId, user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            userId = req.params.userId;
            _context6.next = 3;
            return _User["default"].findById(userId);

          case 3:
            user = _context6.sent;

            if (user) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.status(404).render(NOT_FOUND_PAGE));

          case 6:
            res.render(CHANGE_PASSWORD_PAGE);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getChangePassword(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var userId, _req$body4, oldPassword, newPassword, newPasswordConfirm, user, isMatchPassword;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            // 유저 정보 가져오기
            userId = req.params.userId;
            _req$body4 = req.body, oldPassword = _req$body4.oldPassword, newPassword = _req$body4.newPassword, newPasswordConfirm = _req$body4.newPasswordConfirm;
            _context7.next = 4;
            return _User["default"].findById(userId);

          case 4:
            user = _context7.sent;
            _context7.next = 7;
            return _bcrypt["default"].compare(oldPassword, user.password);

          case 7:
            isMatchPassword = _context7.sent;

            if (isMatchPassword) {
              _context7.next = 10;
              break;
            }

            return _context7.abrupt("return", res.status(400).render(CHANGE_PASSWORD_PAGE, {
              oldPasswordErrorMsg: '비밀번호가 맞지 않습니다.'
            }));

          case 10:
            if (!(oldPassword === newPassword)) {
              _context7.next = 12;
              break;
            }

            return _context7.abrupt("return", res.status(400).render(CHANGE_PASSWORD_PAGE, {
              newPasswordErrorMsg: '이전 비밀번호와 같아 변경할 수 없습니다.'
            }));

          case 12:
            if (!(newPassword !== newPasswordConfirm)) {
              _context7.next = 14;
              break;
            }

            return _context7.abrupt("return", res.status(400).render(CHANGE_PASSWORD_PAGE, {
              newPasswordErrorMsg: '새로운 비밀번호, 새로운 비밀번호 확인란이 일치하지 않습니다.'
            }));

          case 14:
            user.password = newPassword;
            _context7.next = 17;
            return user.save();

          case 17:
            req.session.destroy();
            res.redirect('/login');

          case 19:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function postChangePassword(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;

var signout = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            user = req.session.loggedUser;
            _context8.next = 3;
            return _User["default"].findByIdAndDelete({
              _id: user._id
            });

          case 3:
            req.session.destroy();
            res.redirect('/');

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function signout(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.signout = signout;