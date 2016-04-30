'use strict';

(function() {
  var overlayGallery = document.querySelector('.overlay-gallery');
  var overlayGalleryPreview = document.querySelector('.overlay-gallery-preview');
  var photogallery = document.querySelector('.photogallery');
  var imgGallery = photogallery.querySelectorAll('img');
  var spanClose = document.querySelector('.overlay-gallery-close');
  var overlayGalleryControlLeft = document.querySelector('.overlay-gallery-control-left');
  var overlayGalleryControlRight = document.querySelector('.overlay-gallery-control-right');
  var previewNumberCurrent = document.querySelector('.preview-number-current');
  var previewNumberTotal = document.querySelector('.preview-number-total');
  var preview = new Image();
  /** @type {Array.<string>}*/
  var picturesGallery = [
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

  function toggleToLeft(number1) {
    overlayGalleryControlLeft.addEventListener('click', function() {
      if(number1 >= 0) {
        if(number1 === 0) {
          number1 = 6;
        }
        number1--;
        preview.src = picturesGallery[number1];
        previewNumberCurrent.textContent = number1 + 1;
      }
    });
  }

  function toggleToRight(number2) {
    overlayGalleryControlRight.addEventListener('click', function() {
      if(number2 <= 5) {
        if(number2 === 5) {
          number2 = -1;
        }
        number2++;
        preview.src = picturesGallery[number2];
        previewNumberCurrent.textContent = number2 + 1;
      }
    });
  }

  function openPreview() {
    for(var i = 0; i < imgGallery.length; i++) {
      imgGallery[i].addEventListener('click', function() {
        makeVisible();
        preview.setAttribute('height', 580);
        overlayGalleryPreview.appendChild(preview);
        previewNumberTotal.textContent = '6';
      });
    }

    imgGallery[0].addEventListener('click', function() {
      preview.src = picturesGallery[0];
      toggleToLeft(0);
      toggleToRight(0);
      previewNumberCurrent.textContent = '1';
    });

    imgGallery[1].addEventListener('click', function() {
      preview.src = picturesGallery[1];
      preview.setAttribute('width', 500);
      toggleToLeft(1);
      toggleToRight(1);
      previewNumberCurrent.textContent = '2';
    });

    imgGallery[2].addEventListener('click', function() {
      preview.src = picturesGallery[2];
      toggleToLeft(2);
      toggleToRight(2);
      previewNumberCurrent.textContent = '3';
    });

    imgGallery[3].addEventListener('click', function() {
      preview.src = picturesGallery[3];
      toggleToLeft(3);
      toggleToRight(3);
      previewNumberCurrent.textContent = '4';
    });

    imgGallery[4].addEventListener('click', function() {
      preview.src = picturesGallery[4];
      toggleToLeft(4);
      toggleToRight(4);
      previewNumberCurrent.textContent = '5';
    });

    imgGallery[5].addEventListener('click', function() {
      preview.src = picturesGallery[5];
      toggleToLeft(5);
      previewNumberCurrent.textContent = '6';
    });
  }

  openPreview();

  function closePreview() {
    spanClose.addEventListener('click', function() {
      makeInvisible();
    });
  }

  closePreview();

  function _onDocumentKeyDown() {
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
  }

  _onDocumentKeyDown();
})();


