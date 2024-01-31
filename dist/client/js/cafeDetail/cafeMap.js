"use strict";

require("regenerator-runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var KAKAO_MAPS = kakao.maps;
var cafeContainer = document.querySelector('.detail__container');
var mapContainer = document.getElementById('map');
var mapOption = {
  center: new KAKAO_MAPS.LatLng(33.450701, 126.570657),
  level: 3
};
var map = new KAKAO_MAPS.Map(mapContainer, mapOption);
var geocoder = new KAKAO_MAPS.services.Geocoder();
var cafeid = cafeContainer.dataset.cafeid;
setMarker();

function setMarker() {
  return _setMarker.apply(this, arguments);
}

function _setMarker() {
  _setMarker = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var _yield$yield$fetch$js, cafe;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("/api/".concat(cafeid, "/getInfo"));

          case 2:
            _context.next = 4;
            return _context.sent.json();

          case 4:
            _yield$yield$fetch$js = _context.sent;
            cafe = _yield$yield$fetch$js.cafe;
            geocoder.addressSearch(cafe.location, function (result, status) {
              if (status === KAKAO_MAPS.services.Status.OK) {
                var coords = new KAKAO_MAPS.LatLng(result[0].y, result[0].x);
                var marker = new KAKAO_MAPS.Marker({
                  map: map,
                  position: coords
                });
                var customOverlay = new KAKAO_MAPS.CustomOverlay({
                  content: "<div class=\"infowindow\">".concat(cafe.name, "</a>"),
                  position: coords
                });
                customOverlay.setMap(map, marker);
                map.setCenter(coords);
              }
            });

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setMarker.apply(this, arguments);
}