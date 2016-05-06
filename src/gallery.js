'use strict';

(function() {
  var rootNode = document.querySelector('.overlay-gallery');
  var previewNode = document.querySelector('.overlay-gallery-preview');
  var photogalleryNode = document.querySelector('.photogallery');
  var imagesNode = photogalleryNode.querySelectorAll('img');
  var closeNode = document.querySelector('.overlay-gallery-close');
  var controlLeftNode = document.querySelector('.overlay-gallery-control-left');
  var controlRightNode = document.querySelector('.overlay-gallery-control-right');
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

// INIT
  preloadImages();
  bindEvents();

  function bindEvents() {
    photogalleryNode.addEventListener('click', handleGalleryClick);
  }

// HANDLERS
  function handleGalleryClick(e) {
    e.preventDefault();

    var link = e.target;
    var index = link.getAttribute('data-index');

    openGallery(index);
  }

  function handleDocumentKeyDown(e) {
    if(e.keyCode === 27) {
      makeInvisible();
    }
  }

// METHODS
  function updateCounter(index) {
    previewNumberCurrent.textContent = index;
  }

  function updateMainImage(index) {
    var src = picturesArray[index - 1];
    img.src = src;
    setHash(index);
    restoreFromHash();
  }

  function setHash(index) {
    location.hash = '#photo/' + picturesArray[index - 1];
  }

  function rememberHash() {
    restoreFromHash();
  }

  function restoreFromHash() {
    location.hash.indexOf('#photo/') === -1 ? openGallery : false;
  }

  function openGallery(index) {
    closeNode.addEventListener('click', closeGallery);
    controlLeftNode.addEventListener('click', moveToLeft);
    controlRightNode.addEventListener('click', moveToRight);
    document.addEventListener('keydown', handleDocumentKeyDown);
    document.addEventListener('keyup', handleDocumentKeyDown);
    window.addEventListener('hashchange', rememberHash);
    updateMainImage(index);
    updateCounter(index);
    makeVisible();
  }

  function closeGallery() {
    closeNode.removeEventListener('click', closeGallery);
    controlRightNode.removeEventListener('click', moveToRight);
    controlLeftNode.removeEventListener('click', moveToLeft);
    document.removeEventListener('keydown', handleDocumentKeyDown);
    document.removeEventListener('keyup', handleDocumentKeyDown);
    updateMainImage();
    makeInvisible();
  }

  function preloadImages() {
    for (var i = 0; i < imagesNode.length; i++) {
      previewNode.appendChild(img);
      img.setAttribute('height', 500);
      previewNumberTotal.textContent = imagesNode.length;
    }
  }

  function makeVisible() {
    rootNode.classList.remove('invisible');
  }

  function makeInvisible() {
    rootNode.classList.add('invisible');
    location.hash = '';
  }

  function moveToRight() {
    current++;

    if(current === imagesNode.length) {
      current = 0;
    }

    updateMainImage(current + 1);
    updateCounter(current + 1);
  }

  function moveToLeft() {
    current--;

    if(current < 0) {
      current = picturesArray.length - 1;
    }

    updateMainImage(current + 1);
    updateCounter(current + 1);
  }
})();
