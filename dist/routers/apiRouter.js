"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _apiController = require("../controllers/apiController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var apiRouter = _express["default"].Router();

apiRouter.get('/:cafeId([0-9a-z]{24})/recommend', _apiController.checkRecommendedUser);
apiRouter.post('/:cafeId([0-9a-z]{24})/recommend/increase', _apiController.increaseRecommendation);
apiRouter.post('/:cafeId([0-9a-z]{24})/recommend/decrease', _apiController.decreaseRecommendation);
apiRouter.post('/addWatchList', _apiController.addWatchList);
apiRouter.get('/search/map', _apiController.findLocation);
apiRouter.get('/:cafeId([0-9a-z]{24})/getInfo', _apiController.getCafeInfo);
var _default = apiRouter;
exports["default"] = _default;