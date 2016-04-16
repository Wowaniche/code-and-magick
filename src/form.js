// Кнопка disable по-умолчанию
// Повесить обработчик oninput на поля
//    - вызываем проверку формы
//    - вызваем проверку незаполненных полей
// Сделать функцию записи куки
//
'use strict';

(function() {
  var cookies = require('browser-cookies');

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
  var formReviewFieldsName = document.querySelector('.review-fields-name');
  var formReviewFieldsText = document.querySelector('.review-fields-text');
  var formReviewSubmit = document.querySelector('.review-submit');

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

  function checkRemainedRequiredFields() {
    var name = formFieldName.value;
    var text = formFieldText.value;
    var isNameValid = name != 0;
    var isTextValid = text != 0;

    if (isNameValid) {
      formReviewFieldsName.setAttribute('hidden', true);
    }

    if (isTextValid) {
      formReviewFieldsText.setAttribute('hidden', true);
    }

    if (!isNameValid && !isTextValid) {
      formReviewFieldsName.removeAttribute('hidden', true);
      formReviewFieldsText.removeAttribute('hidden', true);
    }
  }

  function addDisabledOnSubmit() {
    var name = formFieldName.value;
    var text = formFieldText.value;
    var isNameInValid = name === '';
    var isTextInValid = text === '';

    if (isNameInValid) {
      formReviewSubmit.setAttribute('disabled', true);
    } else {
      formReviewSubmit.removeAttribute('disabled', true);
    }

    if (isTextInValid) {
      formReviewMarkOne.onclick = function() {
        formReviewSubmit.setAttribute('disabled', true);
      };
      formReviewMarkTwo.onclick = function() {
        formReviewSubmit.setAttribute('disabled', true);
      };
      formReviewMarkThree.onclick = function() {
        formReviewSubmit.removeAttribute('disabled', true);
      };
      formReviewMarkFour.onclick = function() {
        formReviewSubmit.removeAttribute('disabled', true);
      };
      formReviewMarkFive.onclick = function() {
        formReviewSubmit.removeAttribute('disabled', true);
      };
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

    formReviewMarkOne.onclick = function() {
      if(!text) {
        return false;
      } else {
        return true;
      }
    };

    formReviewMarkTwo.onclick = function() {
      if(!text) {
        return false;
      } else {
        return true;
      }
    };

    if(!name) {
      return false;
    } else {
      return true;
    }
  }

  function calcDayToTheBirthday() {
    var now      = new Date();
    var currYear = now.getFullYear();
    var birthday = new Date(currYear, 9, 9);

    return Math.abs(now - birthday);
  }

  function setCookie() {
    var text = cookies.get('text') || formFieldText.value;
    var name = cookies.get('name') || formFieldName.value;
    var expiresTime = Date.now() + calcDayToTheBirthday();

    cookies.set('text', text, {
      expires: expiresTime
    });
    cookies.set('name', name, {
      expires: expiresTime
    });
  }

  formReviewSubmit.onsubmit = function() {
    isValidForm();
    setCookie();
    this.submit();
  };
})();
