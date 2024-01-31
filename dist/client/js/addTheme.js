"use strict";

require("regenerator-runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var enterModalBtn = document.querySelector('.home__modal-btn');
var modalWrap = document.querySelector('.theme-modal__wrap');
var modalErrorMsg = modalWrap.querySelector('span');
var checkboxList = document.getElementsByName('theme');
var modalForm = modalWrap.querySelector('form');
var modalCloseBtn = modalWrap.querySelector('.theme-modal__close');

function handleClickEnterBtn(event) {
  modalWrap.classList.add('show');
  modalWrap.classList.remove('hidden');
}

function handleSubmit(_x) {
  return _handleSubmit.apply(this, arguments);
}

function _handleSubmit() {
  _handleSubmit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var themeList, url, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();
            themeList = [];
            checkboxList.forEach(function (checkbox) {
              if (checkbox.checked) {
                themeList.push(checkbox.defaultValue);
              }
            });

            if (!(themeList.length <= 0)) {
              _context.next = 6;
              break;
            }

            modalErrorMsg.innerText = '적어도 한가지의 테마를 지정해주셔야 합니다.';
            return _context.abrupt("return");

          case 6:
            url = "/api/addWatchList";
            _context.next = 9;
            return fetch(url, {
              method: 'POST',
              body: JSON.stringify({
                themeList: themeList
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });

          case 9:
            response = _context.sent;

            if (!(response.status === 404)) {
              _context.next = 13;
              break;
            }

            modalErrorMsg.innerText = '로그인 한 유저만 관심테마를 설정할 수 있습니다.';
            return _context.abrupt("return");

          case 13:
            window.location.reload();

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _handleSubmit.apply(this, arguments);
}

function handleClickCloseBtn(event) {
  modalWrap.classList.add('hidden');
  modalWrap.classList.remove('show');
}

enterModalBtn.addEventListener('click', handleClickEnterBtn);
modalForm.addEventListener('submit', handleSubmit);
modalCloseBtn.addEventListener('click', handleClickCloseBtn);