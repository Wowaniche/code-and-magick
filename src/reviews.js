'use strict';

var reviewsContainer = document.querySelector('.reviews-list');
var reviewsSection = document.querySelector('.reviews');
var filterForm = document.querySelector('.reviews-filter');
var filters = filterForm.querySelectorAll('input');
var moreMessageButton = document.querySelector('.reviews-controls-more');

/** @constant {string} */
var REVIEWS_LOAD_URL = '//o0.github.io/assets/json/reviews.json';

/** @type {Array.<Object>} */
var reviews = [];

/** @type {Array.<Object>} */
var filteredReviews = [];

/** @constant {number} */
var PAGE_SIZE = 3;

/** type {number} */
var pageNumber = 0;

/** @enum {string} */
var Filter = {
  ALL: 'reviews-all',
  RECENT: 'reviews-recent',
  GOOD: 'reviews-good',
  BAD: 'reviews-bad',
  POPULAR: 'reviews-popular'
};

/** @constant {Filter} */
var DEFAULT_FILTER = Filter.ALL;

var renderedReviews = [];
/**
 * @param {Object} data
 * @param {HTMLElement} container
 * @return {HTMLElement}
 */
var Review = require('./reviews-object.js');
/** @param {Array.<Object>} reviews */
var renderReviews = function(reviews, page, replace) {
  if(replace) {
    pageNumber = 0;
    renderedReviews.forEach(function(review) {
      review.remove();
    });

    renderedReviews = [];
  }

  var from = page * PAGE_SIZE;
  var to = from + PAGE_SIZE;

  reviews.slice(from, to).forEach(function(review) {
    renderedReviews.push(new Review(review, reviewsContainer));
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
  filteredReviews = getFilteredReviews(reviews, filter);
  pageNumber = 0;
  renderReviews(filteredReviews, pageNumber, true);
};

/** @param {boolean} enabled */
var setFiltersEnabled = function() {
  filterForm.addEventListener('click', function(evt) {
    if(filters) {
      setFilterEnabled(evt.target.id);
      localStorage.setItem('filters', '\'' + evt.target.id + '\'');
      localStorage.getItem('filters');
    }
  });
};

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

  xhr.onloadend = function() {
    reviewsSection.classList.remove('reviews-list-loading');
  };

  xhr.open('GET', REVIEWS_LOAD_URL);
  xhr.send();
};

var isNextPageAvailable = function(reviews, page, pageSize) {
  return page < Math.floor(reviews.length / pageSize);
};

var makeVisibleButton = function(page) {
  filterForm.onclick = function() {
    for (var i = 0; i < filters.length; i++) {
      moreMessageButton.classList.remove('invisible');
    }
  };

  if(page >= 4) {
    moreMessageButton.classList.add('invisible');
  }
};

var setButtonEnabled = function() {
  moreMessageButton.classList.remove('invisible');
  moreMessageButton.addEventListener('click', function() {
    if(isNextPageAvailable(reviews, pageNumber, PAGE_SIZE)) {
      makeVisibleButton(pageNumber);
      pageNumber++;
      renderReviews(filteredReviews, pageNumber);
    }
  });
};

getReviews(function(loadedReviews) {
  reviews = loadedReviews;
  setFiltersEnabled(true);
  setFilterEnabled(DEFAULT_FILTER);
  setButtonEnabled();
});

