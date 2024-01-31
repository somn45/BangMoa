"use strict";

var cafeListNav = document.querySelector('.profile__nav').firstChild;
var commentListNav = document.querySelector('.profile__nav').lastChild;
var cafeList = document.querySelector('.profile__posted-cafes');
var commentList = document.querySelector('.profile__posted-comment');

function handleCafeListNav(event) {
  cafeListNav.classList.toggle('active');
  commentListNav.classList.toggle('active');
  commentList.classList.add('hidden');
  cafeList.classList.remove('hidden');
}

function handleCommenteListNav(event) {
  cafeListNav.classList.toggle('active');
  commentListNav.classList.toggle('active');
  cafeList.classList.add('hidden');
  commentList.classList.remove('hidden');
}

cafeListNav.addEventListener('click', handleCafeListNav);
commentListNav.addEventListener('click', handleCommenteListNav);