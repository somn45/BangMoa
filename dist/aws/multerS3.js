"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var s3 = new _awsSdk["default"].S3({
  region: 'ap-northeast-2',
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
var awsUpload = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    bucket: 'bangba-storage',
    ACL: 'public-read',
    key: function key(req, file, cb) {
      cb(null, "".concat(Date.now(), "_").concat(_path["default"].basename(file.originalname)));
    }
  })
});
var _default = awsUpload;
exports["default"] = _default;