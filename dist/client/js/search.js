"use strict";

require("regenerator-runtime");

var detailSearch = document.querySelector('.search__header').childNodes[0];
var searchHeaderText = document.querySelector('.search__header span');
var detailedSearchWrap = document.querySelector('.search__detail__wrap');
var detailedCheckBox = document.getElementById('detailedCheckBox');
var isOpened = false;

function handleClickDetailedSearch() {
  isOpened = !isOpened;

  if (isOpened) {
    detailedSearchWrap.classList.remove('hidden');
    detailedSearchWrap.classList.add('show');
    searchHeaderText.innerText = '▲ 상세 검색';
    detailedCheckBox.checked = true;
  } else {
    detailedSearchWrap.classList.remove('show');
    detailedSearchWrap.classList.add('hidden');
    searchHeaderText.innerText = '▼ 상세 검색';
    detailedCheckBox.checked = false;
  }
}

detailSearch.addEventListener('click', handleClickDetailedSearch);