"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startNaverLogin = exports.startKakaoLogin = exports.startGoogleLogin = exports.finishNaverLogin = exports.finishKakaoLogin = exports.finishGoogleLogin = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _User = _interopRequireDefault(require("../models/User"));

var _userMethod = require("./userMethod");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// 카카오 로그인
var startKakaoLogin = function startKakaoLogin(req, res) {
  var baseUrl = 'https://kauth.kakao.com/oauth/authorize';
  var urlConfig = {
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: 'https://bangba.site/users/kakao/oauth',
    response_type: 'code',
    state: process.env.KAKAO_STATE
  };
  var finalUrl = (0, _userMethod.combineUrlAndParams)(baseUrl, urlConfig);
  res.redirect(finalUrl);
};

exports.startKakaoLogin = startKakaoLogin;

var finishKakaoLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var code, baseUrl, urlConfig, finalUrl, tokenRequest, access_token, userRequest, _userRequest$kakao_ac, email, email_needs_agreement, is_email_valid, is_email_verified, _userRequest$kakao_ac2, nickname, profile_image_url, is_default_image, user, isEmailAvailable;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            code = req.query.code;
            baseUrl = 'https://kauth.kakao.com/oauth/token';
            urlConfig = {
              grant_type: 'authorization_code',
              client_id: process.env.KAKAO_CLIENT_ID,
              redirect_uri: 'https://bangba.site/users/kakao/oauth',
              code: code
            };
            finalUrl = (0, _userMethod.combineUrlAndParams)(baseUrl, urlConfig);
            _context.next = 6;
            return (0, _userMethod.getTokenData)(finalUrl, 'Content-type', 'application/x-www-form-urlencoded;charset=utf-8');

          case 6:
            tokenRequest = _context.sent;

            if (!('access_token' in tokenRequest)) {
              _context.next = 27;
              break;
            }

            access_token = tokenRequest.access_token;
            _context.next = 11;
            return (0, _userMethod.getUserData)('https://kapi.kakao.com/v2/user/me', access_token);

          case 11:
            userRequest = _context.sent;

            if (!('msg' in userRequest)) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.redirect('/login'));

          case 14:
            _userRequest$kakao_ac = userRequest.kakao_account, email = _userRequest$kakao_ac.email, email_needs_agreement = _userRequest$kakao_ac.email_needs_agreement, is_email_valid = _userRequest$kakao_ac.is_email_valid, is_email_verified = _userRequest$kakao_ac.is_email_verified, _userRequest$kakao_ac2 = _userRequest$kakao_ac.profile, nickname = _userRequest$kakao_ac2.nickname, profile_image_url = _userRequest$kakao_ac2.profile_image_url, is_default_image = _userRequest$kakao_ac2.is_default_image;
            _context.next = 17;
            return _User["default"].findOne({
              uid: nickname
            });

          case 17:
            user = _context.sent;

            if (user) {
              _context.next = 23;
              break;
            }

            isEmailAvailable = !email_needs_agreement && is_email_valid && is_email_verified;
            _context.next = 22;
            return _User["default"].create({
              uid: nickname,
              password: process.env.KAKAO_PASSWORD,
              isSocialAccount: true,
              username: nickname,
              email: isEmailAvailable ? email : '',
              avatarUrl: is_default_image ? '' : profile_image_url
            });

          case 22:
            user = _context.sent;

          case 23:
            req.session.loggedIn = true;
            req.session.loggedUser = user;
            _context.next = 28;
            break;

          case 27:
            return _context.abrupt("return", res.redirect('/login'));

          case 28:
            return _context.abrupt("return", res.redirect('/'));

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function finishKakaoLogin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // 구글 로그인


exports.finishKakaoLogin = finishKakaoLogin;

var startGoogleLogin = function startGoogleLogin(req, res) {
  var baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  var urlConfig = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: 'https://bangba.site/users/google/oauth',
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/userinfo.email openid https://www.googleapis.com/auth/userinfo.profile',
    state: process.env.GOOGLE_STATE,
    nonce: '2nk4nsink@amKI1NSKm2m6k9D9F9XCMMnksn43$!dfdkm'
  };
  var finalUrl = (0, _userMethod.combineUrlAndParams)(baseUrl, urlConfig);
  res.redirect(finalUrl);
};

exports.startGoogleLogin = startGoogleLogin;

var finishGoogleLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var code, baseUrl, urlConfig, finalUrl, tokenRequest, access_token, userRequest, id, name, email, verified_email, picture, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            code = req.query.code;
            baseUrl = 'https://www.googleapis.com/oauth2/v4/token';
            urlConfig = {
              client_id: process.env.GOOGLE_CLIENT_ID,
              client_secret: process.env.GOOGLE_CLIENT_SECRET,
              code: code,
              grant_type: 'authorization_code',
              redirect_uri: 'https://bangba.site/users/google/oauth'
            };
            finalUrl = (0, _userMethod.combineUrlAndParams)(baseUrl, urlConfig);
            _context2.next = 6;
            return (0, _nodeFetch["default"])(finalUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            });

          case 6:
            _context2.next = 8;
            return _context2.sent.json();

          case 8:
            tokenRequest = _context2.sent;

            if (!('access_token' in tokenRequest)) {
              _context2.next = 28;
              break;
            }

            access_token = tokenRequest.access_token;
            _context2.next = 13;
            return (0, _nodeFetch["default"])('https://www.googleapis.com/oauth2/v2/userinfo', {
              headers: {
                Authorization: "Bearer ".concat(access_token)
              }
            });

          case 13:
            _context2.next = 15;
            return _context2.sent.json();

          case 15:
            userRequest = _context2.sent;
            id = userRequest.id, name = userRequest.name, email = userRequest.email, verified_email = userRequest.verified_email, picture = userRequest.picture;
            _context2.next = 19;
            return _User["default"].findOne({
              uid: id
            });

          case 19:
            user = _context2.sent;

            if (user) {
              _context2.next = 24;
              break;
            }

            _context2.next = 23;
            return _User["default"].create({
              uid: id,
              password: process.env.GOOGLE_PASSWORD,
              username: name,
              email: verified_email ? email : '',
              avatarUrl: picture ? picture : '',
              isSocialAccount: true
            });

          case 23:
            user = _context2.sent;

          case 24:
            req.session.loggedIn = true;
            req.session.loggedUser = user;
            _context2.next = 29;
            break;

          case 28:
            return _context2.abrupt("return", res.redirect('/login'));

          case 29:
            return _context2.abrupt("return", res.redirect('/'));

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function finishGoogleLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); // 네이버 로그인


exports.finishGoogleLogin = finishGoogleLogin;

var startNaverLogin = function startNaverLogin(req, res) {
  var baseUrl = 'https://nid.naver.com/oauth2.0/authorize';
  var urlConfig = {
    response_type: 'code',
    client_id: process.env.NAVER_CLIENT_ID,
    redirect_uri: 'https://bangba.site/users/naver/oauth',
    state: process.env.NAVER_STATE
  };
  var finalUrl = (0, _userMethod.combineUrlAndParams)(baseUrl, urlConfig);
  res.redirect(finalUrl);
};

exports.startNaverLogin = startNaverLogin;

var finishNaverLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var code, baseUrl, urlConfig, finalUrl, tokenRequest, access_token, userRequest, _userRequest$response, id, nickname, user;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            code = req.query.code;
            baseUrl = 'https://nid.naver.com/oauth2.0/token';
            urlConfig = {
              grant_type: 'authorization_code',
              client_id: process.env.NAVER_CLIENT_ID,
              client_secret: process.env.NAVER_CLIENT_SECRET,
              code: code,
              state: process.env.NAVER_STATE
            };
            finalUrl = (0, _userMethod.combineUrlAndParams)(baseUrl, urlConfig);
            _context3.next = 6;
            return (0, _userMethod.getTokenData)(finalUrl);

          case 6:
            tokenRequest = _context3.sent;

            if (!('access_token' in tokenRequest)) {
              _context3.next = 24;
              break;
            }

            access_token = tokenRequest.access_token;
            _context3.next = 11;
            return (0, _userMethod.getUserData)('https://openapi.naver.com/v1/nid/me', access_token);

          case 11:
            userRequest = _context3.sent;
            _userRequest$response = userRequest.response, id = _userRequest$response.id, nickname = _userRequest$response.nickname;
            _context3.next = 15;
            return _User["default"].findOne({
              uid: id
            });

          case 15:
            user = _context3.sent;

            if (user) {
              _context3.next = 20;
              break;
            }

            _context3.next = 19;
            return _User["default"].create({
              uid: id,
              password: process.env.NAVER_PASSWORD,
              username: nickname,
              isSocialAccount: true
            });

          case 19:
            user = _context3.sent;

          case 20:
            req.session.loggedIn = true;
            req.session.loggedUser = user;
            _context3.next = 25;
            break;

          case 24:
            return _context3.abrupt("return", res.redirect('/login'));

          case 25:
            res.redirect('/');

          case 26:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function finishNaverLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.finishNaverLogin = finishNaverLogin;