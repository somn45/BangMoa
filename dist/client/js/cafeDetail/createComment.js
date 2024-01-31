"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countFilledScore = countFilledScore;
exports.handleScore = handleScore;

require("regenerator-runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var detailContainer = document.querySelector('.detail__container');
var form = document.getElementById('commentForm');
var addCommentErrorMsg = form.querySelector('span');
var textarea = form.querySelector('textarea');
var button = form.querySelector('button');
var detailComments = document.querySelector('.detail__comments');
var scoreContainer = document.querySelector('.detail__score');

function addComment(comment, score) {
  var _modifyForm$classList;

  // 댓글을 담을 리스트 생성하기
  var newComment = document.createElement('li');
  newComment.setAttribute('data-commentid', comment._id);
  newComment.classList.add('detail__comment'); // 댓글 정보 공간 생성하기

  var commentFirstColumn = document.createElement('div');
  commentFirstColumn.classList.add('detail__comment__column__first');
  var commentScore = document.createElement('div');
  commentScore.classList.add('detail__comment__score');
  fillScore(commentScore, score); // 댓글 수정 버튼을 생성하고 부모에 포함시키기

  var commentBtns = document.createElement('div');
  commentBtns.classList.add('detail__comment__btns');
  var modifyBtn = document.createElement('button');
  modifyBtn.innerText = '수정';
  modifyBtn.classList.add('detail__comment__modify-btn');
  var cancelModifyBtn = document.createElement('button');
  cancelModifyBtn.innerText = '취소';
  cancelModifyBtn.classList.add('detail__comment__modify-cancel');
  cancelModifyBtn.classList.add('hidden');
  commentBtns.appendChild(modifyBtn);
  commentBtns.appendChild(cancelModifyBtn);
  commentFirstColumn.appendChild(commentScore);
  commentFirstColumn.appendChild(commentBtns); // 댓글 텍스트, 작성자가 포함된 공간 생성하기

  var commentSecondColumn = document.createElement('div');
  commentSecondColumn.classList.add('detail__comment__column__second');
  var span = document.createElement('span');
  span.innerText = comment.text;
  var commentOwner = document.createElement('a');
  commentOwner.setAttribute('href', "users/".concat(comment.owner._id));
  commentOwner.innerText = comment.owner.uid;
  commentSecondColumn.appendChild(span);
  commentSecondColumn.appendChild(commentOwner); // 댓글 삭제 버튼 생성하기

  var deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'X';
  deleteBtn.classList.add('detail__comment__delete'); // 댓글 수정, 삭제 기능에 쓰일 정보들 저장하기

  comment = {
    text: comment.text,
    _id: comment._id
  }; // 댓글 수정 시 보여줄 form 추가하기

  var modifyForm = document.createElement('form');
  var modifyFormClassList = ['detail__form--modify', 'hidden'];

  (_modifyForm$classList = modifyForm.classList).add.apply(_modifyForm$classList, modifyFormClassList);

  var modifyTextarea = document.createElement('textarea');
  modifyTextarea.setAttribute('cols', '30');
  modifyTextarea.setAttribute('rows', '5');
  modifyTextarea.placeholder = '수정하고 싶은 방탈출 카페의 후기, 댓글을 입력해주세요';
  modifyForm.appendChild(modifyTextarea); // 댓글 관련 모든 요소 부모와 연결하기

  newComment.appendChild(commentFirstColumn);
  newComment.appendChild(commentSecondColumn);
  newComment.appendChild(modifyForm);
  newComment.appendChild(deleteBtn);
  detailComments.prepend(newComment);
} // 댓글 등록 버튼 클릭 시 일어나는 이벤트


function handleSubmit(_x) {
  return _handleSubmit.apply(this, arguments);
}

function _handleSubmit() {
  _handleSubmit = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
    var text, scoreErrorMsg, score, cafeid, response, _yield$response$json, comment;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            event.preventDefault();
            text = textarea.value;
            scoreErrorMsg = document.querySelector('.detail__score__message');
            score = countFilledScore(scoreContainer); // 텍스트가 비어있을 경우 함수 건너뛰기

            if (!(text === '')) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return");

          case 8:
            if (score) {
              _context.next = 11;
              break;
            }

            scoreErrorMsg.innerText = '댓글 작성 시 평가점수를 입력해야 합니다.';
            return _context.abrupt("return");

          case 11:
            scoreErrorMsg.innerText = ''; // 댓글 텍스트 fetch하기

            cafeid = detailContainer.dataset.cafeid;
            _context.prev = 13;
            _context.next = 16;
            return fetch("/comments/cafes/".concat(cafeid), {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                text: text,
                score: score
              })
            });

          case 16:
            response = _context.sent;
            _context.next = 19;
            return response.json();

          case 19:
            _yield$response$json = _context.sent;
            comment = _yield$response$json.comment;
            textarea.value = '';
            addComment(comment, score);
            _context.next = 29;
            break;

          case 25:
            _context.prev = 25;
            _context.t0 = _context["catch"](13);
            console.error(_context.t0);
            addCommentErrorMsg.innerText = '게스트 유저는 댓글 작성이 불가능합니다.';

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[13, 25]]);
  }));
  return _handleSubmit.apply(this, arguments);
}

function fillScore(scoreContext, score) {
  for (var i = 0; i < score; i++) {
    var _filledScore$classLis;

    var filledScore = document.createElement('i');
    var filledScoreClassList = ['fa-solid', 'fa-star', 'filled'];

    (_filledScore$classLis = filledScore.classList).add.apply(_filledScore$classLis, filledScoreClassList);

    scoreContext.appendChild(filledScore);
  }

  for (var j = score; j < 5; j++) {
    var _score$classList;

    var _score = document.createElement('i');

    var scoreClassList = ['fa-solid', 'fa-star'];

    (_score$classList = _score.classList).add.apply(_score$classList, scoreClassList);

    scoreContext.appendChild(_score);
  }
}

function handleScore(event) {
  var targetEl = event.target;
  var previousTarget = targetEl.previousSibling;
  var nextTarget = targetEl.nextSibling;
  var filledStar = 0;
  targetEl.classList.add('filled');

  for (var i = 0; i < 5; i++) {
    if (previousTarget) {
      previousTarget.classList.add('filled');
      previousTarget = previousTarget.previousSibling;
      filledStar += 1;
    } else {
      break;
    }
  }

  for (var j = filledStar; j < 5; j++) {
    if (nextTarget) {
      nextTarget.classList.remove('filled');
      nextTarget = nextTarget.nextSibling;
    }
  }
}

function countFilledScore(scoreElement) {
  var filledScore = scoreElement.querySelectorAll('.filled');
  return filledScore.length;
}

scoreContainer.addEventListener('click', handleScore);
button.addEventListener('click', handleSubmit);