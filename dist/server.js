"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _path = _interopRequireDefault(require("path"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _db = _interopRequireDefault(require("./db"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _cafeRouter = _interopRequireDefault(require("./routers/cafeRouter"));

var _commentRouter = _interopRequireDefault(require("./routers/commentRouter"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

var _sessionMiddleware = require("./middlewares/sessionMiddleware");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var COOKIE_EXPIRY_TIME = 1000 * 60 * 60 * 24 * 7;
var app = (0, _express["default"])();
app.set('view engine', 'pug');
app.set('views', _path["default"].resolve(process.cwd(), 'src', 'views'));
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: true,
  store: _connectMongo["default"].create({
    mongoUrl: _db["default"]
  }),
  cookie: {
    maxAge: COOKIE_EXPIRY_TIME
  }
}));
app.use((0, _morgan["default"])('dev'));
app.use(_sessionMiddleware.sessionMiddleware);
app.use('/assets', _express["default"]["static"]('assets'));
app.use('/uploads', _express["default"]["static"]('uploads'));
app.use('/dist', _express["default"]["static"]('dist'));
app.use('/', _globalRouter["default"]);
app.use('/users', _userRouter["default"]);
app.use('/cafes', _cafeRouter["default"]);
app.use('/comments', _commentRouter["default"]);
app.use('/api', _apiRouter["default"]);
var _default = app;
exports["default"] = _default;