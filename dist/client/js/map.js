"use strict";

require("regenerator-runtime");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var container = document.getElementById('map'); // 지도를 담을 영역

var select = document.querySelector('select');
var KAKAO_MAPS = kakao.maps;
var points = [];
var options = {
  // 지도를 생성할 때 필요한 기본 옵션
  center: new KAKAO_MAPS.LatLng(33.450701, 126.570667),
  // 지도의 중심 좌표
  level: 3 // 지도의 레벨(확대, 축소 정도)

};
var map = new KAKAO_MAPS.Map(container, options); // 지도 생성 및 객체 리턴

var geocoder = new KAKAO_MAPS.services.Geocoder();

function handleChangeSelect(_x) {
  return _handleChangeSelect.apply(this, arguments);
}

function _handleChangeSelect() {
  _handleChangeSelect = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var targetEl, location, response, _yield$response$json, message, results;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            points = [];
            targetEl = event.target;
            location = targetEl.value;
            _context.next = 5;
            return fetch("/api/search/map?location=".concat(location), {
              method: 'get'
            });

          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.json();

          case 8:
            _yield$response$json = _context.sent;
            message = _yield$response$json.message;
            results = _yield$response$json.results;

            if (!(message.length !== 0)) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return");

          case 13:
            results.forEach(function (data) {
              return setLatLng(data, results.length);
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _handleChangeSelect.apply(this, arguments);
}

function setLatLng(data, length) {
  geocoder.addressSearch(data.location, function (result, status) {
    if (status === KAKAO_MAPS.services.Status.OK) {
      var point = {
        y: result[0].y,
        x: result[0].x,
        name: data.name,
        content: "<a href=\"/cafes/".concat(data._id, "\" class=\"infowindow\">").concat(data.name, "</a>")
      };
      points = [].concat(_toConsumableArray(points), [point]);

      if (points.length === length) {
        resetMapRange(points);
      }
    }
  });
}

function resetMapRange(data) {
  var coords = points.map(function (point) {
    return new KAKAO_MAPS.LatLng(point.y, point.x);
  }); // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성

  var bounds = new KAKAO_MAPS.LatLngBounds();
  var i, marker;

  for (i = 0; i < coords.length; i++) {
    // 배열의 좌표들이 잘 보이게 마커를 지도에 추가
    marker = new KAKAO_MAPS.Marker({
      position: coords[i]
    });
    marker.setMap(map); // LatLngBounds 객체에 좌표를 추가

    bounds.extend(coords[i]);
    var customOverlay = new KAKAO_MAPS.CustomOverlay({
      position: marker.getPosition(),
      content: data[i].content
    });
    customOverlay.setMap(map, marker);
  } // LatLngBounds 객체에 추가된 좌표들을 기준으로 지도의 범위를 재설정


  map.setBounds(bounds);
}

select.addEventListener('change', handleChangeSelect);