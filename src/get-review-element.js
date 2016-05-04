'use strict';

module.exports = {
  getReviewElement: function(data, container) {
    var IMAGE_LOAD_TIMEOUT = 10000;
    var templateElement = document.querySelector('template');
    var elementToClone;
    if('content' in templateElement) {
      elementToClone = templateElement.content.querySelector('.review');
    } else {
      elementToClone = templateElement.querySelector('.review');
    }
    var element = elementToClone.cloneNode(true);
    element.querySelector('.review-text').textContent = data.description;
    element.querySelector('.review-rating').textContent = data.rating;
    container.appendChild(element);

    var imageOfUser = new Image();
    var imageOfUserLoadTimeOut;

    imageOfUser.onload = function() {
      clearTimeout(imageOfUserLoadTimeOut);
      element.children[0].setAttribute('src', imageOfUser.src);
      element.children[0].setAttribute('width', 124);
      element.children[0].setAttribute('height', 124);
    };

    imageOfUser.onerror = function() {
      element.classList.add('review-load-failure');
    };

    imageOfUser.src = data.author.picture;

    imageOfUserLoadTimeOut = setTimeout(function() {
      imageOfUser.src = '';
      element.classList.add('review-nophoto');
    }, IMAGE_LOAD_TIMEOUT);

    container.appendChild(element);
    return element;
  }
};
