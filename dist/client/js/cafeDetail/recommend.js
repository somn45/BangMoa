"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var detailContainer = document.querySelector('.detail__container');
var recommendBox = document.querySelector('.detail__recommended-box');
var recommendBtn = recommendBox.querySelector('button');
var cafeid = detailContainer.dataset.cafeid;
checkRecommendation();

function checkRecommendation() {
  return _checkRecommendation.apply(this, arguments);
}

function _checkRecommendation() {
  _checkRecommendation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("/api/".concat(cafeid, "/recommend"), {
              method: 'GET'
            });

          case 2:
            response = _context.sent;

            if (response.status === 200) {
              recommendBtn.classList.add('recommended');
            }

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _checkRecommendation.apply(this, arguments);
}

function handleRecommendBtn(_x) {
  return _handleRecommendBtn.apply(this, arguments);
}

function _handleRecommendBtn() {
  _handleRecommendBtn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(event) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (recommendBtn.classList.contains('recommended')) {
              _context2.next = 6;
              break;
            }

            _context2.next = 3;
            return fetch("/api/".concat(cafeid, "/recommend/increase"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            });

          case 3:
            recommendBtn.classList.add('recommended');
            _context2.next = 9;
            break;

          case 6:
            _context2.next = 8;
            return fetch("/api/".concat(cafeid, "/recommend/decrease"), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            });

          case 8:
            recommendBtn.classList.remove('recommended');

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _handleRecommendBtn.apply(this, arguments);
}

recommendBtn.addEventListener('click', handleRecommendBtn);