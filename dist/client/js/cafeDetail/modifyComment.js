"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelModifyComment = cancelModifyComment;
exports.finishModifyComment = finishModifyComment;
exports.startModifyComment = startModifyComment;

var _createComment = require("./createComment");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var detailComments = document.querySelector('.detail__comments');
var commentObj;
var toggle = true;

function handleClickModifyBtn(_x) {
  return _handleClickModifyBtn.apply(this, arguments);
}

function _handleClickModifyBtn() {
  _handleClickModifyBtn = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var targetEl, commentEl, commentSecondColumn, text, commentScore, modifyArea, commentFirstColumn, _commentObj, _commentScore, _commentObj2, _commentScore2, _modifyArea, _commentEl, commentList, commentid, response;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            targetEl = event.target;

            if (!(targetEl.classList.contains('detail__comment__modify-btn') && toggle)) {
              _context.next = 14;
              break;
            }

            commentEl = targetEl.parentNode.parentNode.parentNode;
            commentSecondColumn = commentEl.querySelector('.detail__comment__column__second');
            text = commentSecondColumn.firstChild.innerText;
            commentScore = commentEl.querySelector('.detail__comment__score');
            commentScore.addEventListener('click', _createComment.handleScore);
            modifyArea = commentEl.querySelector('.detail__form--modify');
            commentFirstColumn = {
              text: text,
              _id: commentEl.dataset.commentid
            };
            commentObj = {
              commentFirstColumn: commentFirstColumn,
              commentScore: commentScore,
              commentSecondColumn: commentSecondColumn,
              modifyArea: modifyArea
            };
            startModifyComment(commentObj);
            toggle = !toggle;
            _context.next = 36;
            break;

          case 14:
            if (!(targetEl.classList.contains('detail__comment__modify-btn') && !toggle)) {
              _context.next = 21;
              break;
            }

            _commentObj = commentObj, _commentScore = _commentObj.commentScore;

            _commentScore.removeEventListener('click', _createComment.handleScore);

            finishModifyComment(commentObj);
            toggle = !toggle;
            _context.next = 36;
            break;

          case 21:
            if (!targetEl.classList.contains('detail__comment__modify-cancel')) {
              _context.next = 28;
              break;
            }

            _commentObj2 = commentObj, _commentScore2 = _commentObj2.commentScore, _modifyArea = _commentObj2.modifyArea;
            cancelModifyComment(_modifyArea);

            _commentScore2.removeEventListener('click', _createComment.handleScore);

            toggle = !toggle;
            _context.next = 36;
            break;

          case 28:
            if (!targetEl.classList.contains('detail__comment__delete')) {
              _context.next = 36;
              break;
            }

            _commentEl = targetEl.parentNode;
            commentList = _commentEl.parentNode;
            commentid = _commentEl.dataset.commentid;
            _context.next = 34;
            return fetch("/comments/cafes/".concat(commentid, "/delete"), {
              method: 'DELETE'
            });

          case 34:
            response = _context.sent;

            if (response.status === 200) {
              commentList.removeChild(_commentEl);
            }

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _handleClickModifyBtn.apply(this, arguments);
}

function startModifyComment(commentObj) {
  var commentSecondColumn = commentObj.commentSecondColumn,
      modifyArea = commentObj.modifyArea;
  var span = commentSecondColumn.firstChild;
  var modifyTextarea = modifyArea.firstChild;
  var modifyBtn = event.target;
  var cancelModifyBtn = modifyBtn.nextSibling;
  modifyArea.classList.remove('hidden');
  modifyTextarea.innerText = span.innerText;
  modifyBtn.innerText = '수정 완료';
  cancelModifyBtn.classList.remove('hidden');
}

function finishModifyComment(_x2) {
  return _finishModifyComment.apply(this, arguments);
}

function _finishModifyComment() {
  _finishModifyComment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(commentObj) {
    var commentFirstColumn, commentSecondColumn, commentScore, modifyArea, modifyBtn, cancelModifyBtn, span, textarea, text, score;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            commentFirstColumn = commentObj.commentFirstColumn, commentSecondColumn = commentObj.commentSecondColumn, commentScore = commentObj.commentScore, modifyArea = commentObj.modifyArea;
            modifyBtn = event.target;
            cancelModifyBtn = modifyBtn.nextSibling;
            span = commentSecondColumn.firstChild;
            textarea = modifyArea.firstChild;
            text = textarea.value;
            score = (0, _createComment.countFilledScore)(commentScore);
            _context2.next = 9;
            return fetch("/comments/cafes/".concat(commentFirstColumn._id, "/update"), {
              method: 'PATCH',
              body: JSON.stringify({
                text: text,
                score: score
              }),
              headers: {
                'Content-Type': 'application/json'
              }
            });

          case 9:
            span.innerText = text;
            modifyBtn.innerText = '수정';
            modifyArea.classList.add('hidden');
            cancelModifyBtn.classList.add('hidden');

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _finishModifyComment.apply(this, arguments);
}

function cancelModifyComment(modifyTextarea) {
  var cancelModifyBtn = event.target;
  var modifyBtn = cancelModifyBtn.previousSibling;
  modifyBtn.innerText = '수정';
  modifyTextarea.classList.add('hidden');
  cancelModifyBtn.classList.add('hidden');
}

detailComments.addEventListener('click', function (event) {
  return handleClickModifyBtn(event);
});