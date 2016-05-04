'use strict';

var reviewQuizAnswerYes = document.querySelector('.review-quiz-answer-yes');
var reviewQuizAnswerNo = document.querySelector('.review-quiz-answer-yes');

var getReviewElement = require('./get-review-element.js');

var Review = function(data, container) {
  this.data = data;
  this.element = getReviewElement.getReviewElement(this.data, container);

  this.onQuizYesClick = function(evt) {
    reviewQuizAnswerYes.classList.add('.review-quiz-answer-active');
  };

  this.onQuizNoClick = function(evt) {
    reviewQuizAnswerNo.classList.add('.review-quiz-answer-active');
  };

  this.remove = function() {
    this.element.removeEventListener('click', this.onQuizYesClick);
    this.element.removeEventListener('click', this.onQuizNoClick);
    this.element.parentNode.removeChild(this.element);
  };

  this.element.addEventListener('click', this.onQuizYesClick);
  this.element.addEventListener('click', this.onQuizNoClick);
  container.appendChild(this.element);

};

module.exports = Review;
