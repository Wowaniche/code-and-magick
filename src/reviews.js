'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var reviewsSection = document.querySelector('.reviews');
var templateElement = document.querySelector('template');
var elementToClone;

if('content' in templateElement) {
  elementToClone = templateElement.content.querySelector('.review');
} else {
  elementToClone = templateElement.querySelector('.review');
}

/** @constant {number} */
var IMAGE_LOAD_TIMEOUT = 10000;
var PREALOADER_LOAD_TIMEOUT = 5000;

/** @constant {string} */
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

/** @type {Array.<Object>} */
var reviews = [];


/** @enum {number} */
var Filter = {
  ALL: 'reviews-all',
  RECENT: 'reviews-recent',
  GOOD: 'reviews-good',
  BAD: 'reviews-bad',
  POPULAR: 'reviews-popular'
};


/**
 * @param {Object} data
 * @param {HTMLElement} container
 * @return {HTMLElement}
 */
var getReviewElement = function(data, container) {
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
};

/** @param {Array.<Object>} reviews */
var renderReviews = function(reviews) {
  reviewsContainer.innerHTML = '';

  reviews.forEach(function(review) {
    getReviewElement(review, reviewsContainer);
  });
};

/**
 * @param {Array.<Object>} reviews
 * @param {string} filter
 */
var getFilteredReviews = function(reviews, filter) {
  var reviewsToFilter = reviews.slice(0);

  switch(filter) {
    case Filter.RECENT:
      reviewsToFilter.sort(function(a, b) {
        return (new Date(b.date) - new Date(a.date));
      });
      break;
    case Filter.GOOD:
      reviewsToFilter = reviewsToFilter
        .filter(function(item) {
          return item.rating > 2;
        })
        .sort(function(a, b) {
          return b.rating - a.rating;
        });
      break;
    case Filter.BAD:
      reviewsToFilter = reviewsToFilter
        .filter(function(item) {
          return item.rating < 3;
        })
        .sort(function(a, b) {
          return a.rating - b.rating;
        });
      break;
    case Filter.POPULAR:
      reviewsToFilter.sort(function(a, b) {
        return b.review_usefulness - a.review_usefulness;
      });
      break;
  }

  return reviewsToFilter;
};

var setFilterEnabled = function(filter) {
  var filteredReviews = getFilteredReviews(reviews, filter);
  renderReviews(filteredReviews);

};

/** @param {boolean} enabled */
var setFiltersEnabled = function(enabled) {
  var filterForm = document.querySelector('.reviews-filter');
  var filters = filterForm.querySelectorAll('input');
  for (var i = 0; i < filters.length; i++) {
    filters[i].onchange = enabled ? function(evt) {
      setFilterEnabled(evt.target.value);
    } : null;
  }
};
setFiltersEnabled(true);

/** @param {function(Array.<Object>)} callback */
var getReviews = function(callback) {
  var xhr = new XMLHttpRequest();

  reviewsSection.classList.add('reviews-list-loading');

  /** @param {ProgressEvent} */
  xhr.onload = function(evt) {
    reviewsSection = document.querySelector('.reviews');
    var loadedData;
    try {
      loadedData = JSON.parse(evt.target.response);
    } catch (error) {
      console.log('Ошибка в loadedData');
      console.log(error);
      loadedData = null;
    }

    callback(loadedData);
  };

  xhr.onerror = function() {
    reviewsSection.classList.add('reviews-load-failure');
  };

  function removePreloader() {
    reviewsSection.classList.remove('reviews-list-loading');
  }

  setTimeout(removePreloader, PREALOADER_LOAD_TIMEOUT);

  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  renderReviews(reviews);
});

