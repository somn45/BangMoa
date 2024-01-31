"use strict";

var zipcode = document.querySelector('.form__zipcode');
var findZopcode = document.querySelector('.form__find-zipcode');
var addressEl = document.querySelector('.form__address');
var detailedAddress = document.querySelector('.form__detailed-address');

function execDaumPostcode() {
  new daum.Postcode({
    oncomplete: function oncomplete(data) {
      var zonecode = data.zonecode,
          address = data.address;
      zipcode.value = zonecode;
      addressEl.value = address;
    }
  }).open();
}

findZopcode.addEventListener('click', execDaumPostcode);
detailedAddress.addEventListener('change', watchDetailedAddress);