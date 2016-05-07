'use strict';

var Gallery = function() {
  this.rootNode = document.querySelector('.overlay-gallery');
  this.previewNode = document.querySelector('.overlay-gallery-preview');
  this.photogalleryNode = document.querySelector('.photogallery');
  this.imagesNode = this.photogalleryNode.querySelectorAll('img');
  this.closeNode = document.querySelector('.overlay-gallery-close');
  this.controlLeftNode = document.querySelector('.overlay-gallery-control-left');
  this.controlRightNode = document.querySelector('.overlay-gallery-control-right');
  this.previewNumberCurrent = document.querySelector('.preview-number-current');
  this.previewNumberTotal = document.querySelector('.preview-number-total');

  /** @type {Object} */
  this.img = new Image();

  /** @type {@number} */
  this.current = 0;

  /** @type {Array {string}} */
  this.picturesArray = [
    'img/screenshots/1.png',
    'img/screenshots/2.png',
    'img/screenshots/3.png',
    'img/screenshots/4.png',
    'img/screenshots/5.png',
    'img/screenshots/6.png'
  ];


  this.handleGalleryClick = this.handleGalleryClick.bind(this);
  this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
  this.updateMainImage = this.updateMainImage.bind(this);
  this.openGallery = this.openGallery.bind(this);
  this.closeGallery = this.closeGallery.bind(this);
  this.moveToRight = this.moveToRight.bind(this);
  this.moveToLeft = this.moveToLeft.bind(this);
  // INIT
  this.preloadImages();
  this.bindEvents();
};

Gallery.prototype.bindEvents = function() {
  this.photogalleryNode.addEventListener('click', this.handleGalleryClick);
};

// HANDLERS
Gallery.prototype.handleGalleryClick = function(e) {
  e.preventDefault();

  this.link = e.target;
  this.index = this.link.getAttribute('data-index');
  this.checkHash();
  this.openGallery(this.index);
};

Gallery.prototype.handleDocumentKeyDown = function(e) {
  if(e.keyCode === 27) {
    this.makeInvisible();
  }
};

// METHODS
Gallery.prototype.updateCounter = function(index) {
  this.previewNumberCurrent.textContent = index;
};

Gallery.prototype.updateMainImage = function(index) {
  this.src = this.picturesArray[index - 1];
  this.img.src = this.src;
  location.hash = '#photo/' + this.picturesArray[index - 1];
};

Gallery.prototype.checkHash = function() {
  this.regExp = /#photo\/(\S+)/;
  location.hash.match(this.regExp) ? this.openGallery() : false;
};

Gallery.prototype.openGallery = function() {
  this.closeNode.addEventListener('click', this.closeGallery);
  this.controlLeftNode.addEventListener('click', this.moveToLeft);
  this.controlRightNode.addEventListener('click', this.moveToRight);
  document.addEventListener('keydown', this.handleDocumentKeyDown);
  document.addEventListener('keyup', this.handleDocumentKeyDown);
  window.addEventListener('hashchange', this.rememberHash);
  this.updateMainImage(this.index);
  this.updateCounter(this.index);
  this.makeVisible();
};

Gallery.prototype.closeGallery = function() {
  this.closeNode.removeEventListener('click', this.closeGallery);
  this.controlRightNode.removeEventListener('click', this.moveToRight);
  this.controlLeftNode.removeEventListener('click', this.moveToLeft);
  document.removeEventListener('keydown', this.handleDocumentKeyDown);
  document.removeEventListener('keyup', this.handleDocumentKeyDown);
  this.updateMainImage();
  this.makeInvisible();
};

Gallery.prototype.preloadImages = function() {
  for (var i = 0; i < this.imagesNode.length; i++) {
    this.previewNode.appendChild(this.img);
    this.img.setAttribute('height', 500);
    this.previewNumberTotal.textContent = this.imagesNode.length;
  }
};

Gallery.prototype.makeVisible = function() {
  this.rootNode.classList.remove('invisible');
};

Gallery.prototype.makeInvisible = function() {
  this.rootNode.classList.add('invisible');
  location.hash = '';
};

Gallery.prototype.moveToRight = function() {
  this.current++;

  if(this.current === this.imagesNode.length) {
    this.current = 0;
  }

  this.updateMainImage(this.current + 1);
  this.updateCounter(this.current + 1);
};

Gallery.prototype.moveToLeft = function() {
  this.current--;

  if(this.current < 0) {
    this.current = this.picturesArray.length - 1;
  }

  this.updateMainImage(this.current + 1);
  this.updateCounter(this.current + 1);
};


module.exports = new Gallery();
