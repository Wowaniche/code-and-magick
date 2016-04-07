'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formFieldName = document.querySelector('.review-form-field-name');
  var formReviewMarkOne = document.querySelector('.review-mark-label-1');
  var formReviewMarkTwo = document.querySelector('.review-mark-label-2');
  var formReviewMarkThree = document.querySelector('.review-mark-label-3');
  var formReviewMarkFour = document.querySelector('.review-mark-label-4');
  var formReviewMarkFive = document.querySelector('.review-mark-label-5');
  var formFieldText = document.querySelector('.review-form-field-text');
  var formReviewSubmit = document.querySelector('.review-submit');
  var cookies = require('browser-cookies');

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  if(formFieldName) {
    formFieldName.classList.add('require');
  }

  formReviewMarkOne.onclick = function() {
    formFieldText.classList.add('require');
  };

  formReviewMarkTwo.onclick = function() {
    formFieldText.classList.add('require');
  };

  formReviewMarkThree.onclick = function() {
    formFieldText.classList.remove('require');
  };

  formReviewMarkFour.onclick = function() {
    formFieldText.classList.remove('require');
  };

  formReviewMarkFive.onclick = function() {
    formFieldText.classList.remove('require');
  };

  var mark = formReviewMarkOne.onclick() ||
             formReviewMarkTwo.onclick() ||
             formReviewMarkThree.onclick() ||
             formReviewMarkFour.onclick() ||
             formReviewMarkFive.onclick();

  var name = formFieldName;

  function calcDayToTheBirthday() {
    var days;

    days = new Date(2016, 9, 9).valueOf() - Date.now();
    if(days <= 0) {
      for (var n = 2017; n < 3000; n++) {
        days = (new Date(n, 9, 9).valueOf()) - Date.now();
      }
    }
    return days;
  }

  formReviewSubmit.onsubmit = function(evt) {
    evt.preventDefault();

    cookies.set('mark', mark, {
      expires: Date.now() + calcDayToTheBirthday()
    });
    cookies.set('name', name, {
      expires: Date.now() + calcDayToTheBirthday()
    });

    if(formFieldName === '') {
      return false;
    } else if(formReviewMarkOne.onclick() || formReviewMarkTwo.onclick()) {
      if(formFieldText === '') {
        return false;
      }
    } else {
      return true;
    }

    return formReviewSubmit.onsubmit();
  };

})();


