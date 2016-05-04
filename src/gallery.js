'use strict';

var Gallery = function() {
  var overlayGallery = document.querySelector('.overlay-gallery');
  var overlayGalleryPreview = document.querySelector('.overlay-gallery-preview');
  var photogallery = document.querySelector('.photogallery');
  var imgGallery = photogallery.querySelectorAll('img');
  var closer = document.querySelector('.overlay-gallery-close');
  var overlayGalleryControlLeft = document.querySelector('.overlay-gallery-control-left');
  var overlayGalleryControlRight = document.querySelector('.overlay-gallery-control-right');
  var previewNumberCurrent = document.querySelector('.preview-number-current');
  var previewNumberTotal = document.querySelector('.preview-number-total');
  var self = this;

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

  this.makeVisible = function() {
    overlayGallery.classList.remove('invisible');
  };

  this.makeInvisible = function() {
    overlayGallery.classList.add('invisible');
  };

  this.openGallery = function() {
    photogallery.addEventListener('click', function(e) {
      var target = e.target;

      while (target !== self) {

        if(target.nodeName === 'A') {
          self.makeVisible();
          self.showImage(target.id);
          return false;
        }

        if(target.nodeName === 'IMG') {
          self.showNumberOfImage(target.id);
        }

        target = target.parentNode;
      }

    });

    self.showImage = function(id) {
      img.src = id;
    };

    self.showNumberOfImage = function(id) {
      previewNumberCurrent.textContent = id;
    };

    /* предзагрузка */
    for (var i = 0; i < imgGallery.length; i++) {
      var url = imgGallery[i].parentNode.id;
      overlayGalleryPreview.appendChild(img);
      img.setAttribute('height', 500);
      img.src = url;
      previewNumberTotal.textContent = imgGallery.length;
    }
  };

  this.openGallery();

  this._onCloseClick = function() {
    closer.addEventListener('click', function() {
      self.makeInvisible();
    });
  };

  this._onCloseClick();

  this.moveToRight = function() {
    overlayGalleryControlRight.addEventListener('click', function() {
      current++;
      if(current === imgGallery.length) {
        current = 0;
      }

      img.src = picturesArray[current];
      previewNumberCurrent.textContent = current + 1;
    });
  };

  this.moveToRight();

  this.moveToLeft = function() {
    overlayGalleryControlLeft.addEventListener('click', function() {
      current--;
      if(current < 0) {
        current = picturesArray.length - 1;
      }

      img.src = picturesArray[current];
      previewNumberCurrent.textContent = current + 1;
    });
  };

  this.moveToLeft();

  this._onDocumentKeyDown = function() {
    document.body.addEventListener('keydown', function(e) {
      if(e.keyCode === 27) {
        overlayGallery.classList.add('invisible');
      }
    });

    document.body.addEventListener('keyup', function(e) {
      if(e.keyCode === 27) {
        overlayGallery.classList.add('invisible');
      }
    });
  };

  this._onDocumentKeyDown();
};

module.exports = new Gallery();
