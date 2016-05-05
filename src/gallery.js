'use strict';

(function() {
  var overlayGallery = document.querySelector('.overlay-gallery');
  var overlayGalleryPreview = document.querySelector('.overlay-gallery-preview');
  var photogallery = document.querySelector('.photogallery');
  var imgGallery = photogallery.querySelectorAll('img');
  var close = document.querySelector('.overlay-gallery-close');
  var overlayGalleryControlLeft = document.querySelector('.overlay-gallery-control-left');
  var overlayGalleryControlRight = document.querySelector('.overlay-gallery-control-right');
  var previewNumberCurrent = document.querySelector('.preview-number-current');
  var previewNumberTotal = document.querySelector('.preview-number-total');

  /** @type {Object} */
  var img = new Image();

  /** @type {@number} */
  var current = 0;

  /** @type {Array {string}} */
  var picturesArray = [
    'img/screenshots/1.png',
    'img/screenshots/2.png',
    'img/screenshots/3.png',
    'img/screenshots/4.png',
    'img/screenshots/5.png',
    'img/screenshots/6.png'
  ];

  function makeVisible() {
    overlayGallery.classList.remove('invisible');
  }

  function makeInvisible() {
    overlayGallery.classList.add('invisible');
  }

  function handler() {
    if(overlayGallery.classList.contains('invisible')) {
      photogallery.removeEventListener('click', openGallery);
      photogallery.removeEventListener('click', intit);
      close.removeEventListener('click', closeGallery);
      overlayGalleryControlRight.removeEventListener('click', moveToRight);
      overlayGalleryControlLeft.removeEventListener('click', moveToLeft);
      document.body.removeEventListener('keydown', keyDown);
      document.body.removeEventListener('keyup', keyDown);
    }
  }

  handler();

  var openGallery = function(e) {
    var target = e.target;

    while (target !== this) {
      makeVisible();
      target = target.parentNode;
    }
  };

  photogallery.addEventListener('click', openGallery);

  var intit = function(e) {
    var target = e.target;

    while (target !== this) {
      if(target.classList.contains('photogallery-image')) {
        showImage(target.dataset.index, target.dataset.number);
      }

      target = target.parentNode;
    }

    function showImage(data, number) {
      img.src = data;
      previewNumberCurrent.textContent = number;
    }

    /* предзагрузка */
    for (var i = 0; i < imgGallery.length; i++) {
      overlayGalleryPreview.appendChild(img);
      img.setAttribute('height', 500);
      previewNumberTotal.textContent = imgGallery.length;
    }
  };

  photogallery.addEventListener('click', intit);

  var closeGallery = function() {
    makeInvisible();
  };

  close.addEventListener('click', closeGallery);

  var moveToRight = function() {
    current++;
    if(current === imgGallery.length) {
      current = 0;
    }

    img.src = picturesArray[current];
    previewNumberCurrent.textContent = current + 1;
  };

  overlayGalleryControlRight.addEventListener('click', moveToRight);

  var moveToLeft = function() {
    current--;
    if(current < 0) {
      current = picturesArray.length - 1;
    }

    img.src = picturesArray[current];
    previewNumberCurrent.textContent = current + 1;
  };

  overlayGalleryControlLeft.addEventListener('click', moveToLeft);

  var keyDown = function(e) {
    if(e.keyCode === 27) {
      overlayGallery.classList.add('invisible');
    }
    if(e.keyCode === 27) {
      overlayGallery.classList.add('invisible');
    }
  };

  document.body.addEventListener('keydown', keyDown);
  document.body.addEventListener('keyup', keyDown);
})();
