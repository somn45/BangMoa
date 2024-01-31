"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var validateCafeData = function validateCafeData(_ref) {
  var location = _ref.location,
      theme = _ref.theme,
      level = _ref.level;
  if (!location) return {
    locationErrorMsg: '카페 주소는 반드시 입력해야 합니다.'
  };else if (!theme) return {
    themeErrorMsg: '카페의 테마는 적어도 하나 이상 등록해야 합니다.'
  }; // 카페의 난이도가 1~5 사이인지 확인
  else if (level && level <= 0 || level > 5) return {
    levelErrorMsg: '카페의 난이도는 1에서 5 사이입니다.'
  };else return 'ok';
};

var _default = validateCafeData;
exports["default"] = _default;