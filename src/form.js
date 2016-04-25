'use strict';

(function() {
  var cookies = require('browser-cookies');

  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formFieldName = document.querySelector('.review-form-field-name');
  var formFieldText = document.querySelector('.review-form-field-text');
  var formReviewFieldsName = document.querySelector('.review-fields-name');
  var formReviewFieldsText = document.querySelector('.review-fields-text');
  var formReviewSubmit = document.querySelector('.review-submit');
  var fieldsetReview = document.querySelector('.review-form-group-mark');
  var inputReviewMark = fieldsetReview.querySelectorAll('input');

  formFieldName.value = cookies.get('name') || '';
  formFieldText.value = cookies.get('text') || '';

  formOpenButton.onclick = function() {
    formContainer.classList.remove('invisible');
    addDisabledOnSubmit();
  };

  formCloseButton.onclick = function() {
    formContainer.classList.add('invisible');
  };

  if(formFieldName) {
    formFieldName.classList.add('require');
  }

  for (var i = 0; i < 2; i++) {
    inputReviewMark[i].onclick = function() {
      formFieldText.classList.add('require');
    };
  }

  for (i = 2; i < 5; i++) {
    inputReviewMark[i].onclick = function() {
      formFieldText.classList.remove('require');
    };
  }

  function checkRemainedRequiredFields() {
    var name = formFieldName.value;
    var text = formFieldText.value;

    if (!(name === '')) {
      formReviewFieldsName.setAttribute('hidden', true);
    }

    if (!(text === '')) {
      formReviewFieldsText.setAttribute('hidden', true);
    }

    if (name === '' && text === '') {
      formReviewFieldsName.removeAttribute('hidden', true);
      formReviewFieldsText.removeAttribute('hidden', true);
    }
  }

  function addDisabledOnSubmit() {
    var name = formFieldName.value;
    var text = formFieldText.value;

    if (!name) {
      formReviewSubmit.setAttribute('disabled', true);
    } else {
      formReviewSubmit.removeAttribute('disabled', true);
    }

    if (!text) {
      for (i = 0; i < 2; i++) {
        inputReviewMark[i].onclick = function() {
          formReviewSubmit.setAttribute('disabled', true);
        };
      }

      for (i = 2; i < 5; i++) {
        inputReviewMark[i].onclick = function() {
          formReviewSubmit.removeAttribute('disabled', true);
        };
      }
    }
  }

  formFieldName.oninput = function() {
    checkRemainedRequiredFields();
    addDisabledOnSubmit();
  };

  formFieldText.oninput = function() {
    checkRemainedRequiredFields();
    addDisabledOnSubmit();
  };

  function isValidForm() {
    var name = formFieldName.value;
    var text = formFieldText.value;

    for (i = 0; i < 2; i++) {
      inputReviewMark[i].onclick = function() {
        if(!text) {
          return false;
        } else {
          return true;
        }
      };
    }

    if(!name) {
      return false;
    } else {
      return true;
    }
  }

  function calcDayToTheBirthday() {
    var now = new Date();
    var currYear = now.getFullYear();
    var birthday = new Date(currYear, 9, 9);

    return Math.abs(now - birthday);
  }

  function setCookie() {
    var expiresTime = Date.now() + calcDayToTheBirthday();

    cookies.set('name', formFieldName.value, {
      expires: expiresTime
    });

    cookies.set('text', formFieldText.value, {
      expires: expiresTime
    });
  }

  formReviewSubmit.onsubmit = function() {
    if(!isValidForm()) {
      return false;
    } else {
      setCookie();
      this.submit();
      return true;
    }
  };
})();
