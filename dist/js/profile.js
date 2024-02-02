/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/profile.js":
/*!**********************************!*\
  !*** ./src/client/js/profile.js ***!
  \**********************************/
/***/ (() => {

eval("var cafeListNav = document.querySelector('.profile__nav').firstChild;\nvar commentListNav = document.querySelector('.profile__nav').lastChild;\nvar cafeList = document.querySelector('.profile__posted-cafes');\nvar commentList = document.querySelector('.profile__posted-comment');\n\nfunction handleCafeListNav(event) {\n  cafeListNav.classList.toggle('active');\n  commentListNav.classList.toggle('active');\n  commentList.classList.add('hidden');\n  cafeList.classList.remove('hidden');\n}\n\nfunction handleCommenteListNav(event) {\n  cafeListNav.classList.toggle('active');\n  commentListNav.classList.toggle('active');\n  cafeList.classList.add('hidden');\n  commentList.classList.remove('hidden');\n}\n\ncafeListNav.addEventListener('click', handleCafeListNav);\ncommentListNav.addEventListener('click', handleCommenteListNav);\n\n//# sourceURL=webpack://bangba/./src/client/js/profile.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/profile.js"]();
/******/ 	
/******/ })()
;