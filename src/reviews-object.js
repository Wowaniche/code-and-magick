'use strict';

var getReviewElement = require('./get-review-element.js');

var Review = function(data, container) {
  this.data = data;
  this.element = getReviewElement.getReviewElement(this.data, container);
  this.reviewQuizAnswerYes = this.element.querySelector('.review-quiz-answer-yes');
  this.reviewQuizAnswerNo = this.element.querySelector('.review-quiz-answer-no');

  this.onQuizYesClick = this.onQuizYesClick.bind(this);
  this.onQuizNoClick = this.onQuizNoClick.bind(this);

  this.reviewQuizAnswerYes.addEventListener('click', this.onQuizYesClick);
  this.reviewQuizAnswerNo.addEventListener('click', this.onQuizNoClick);
  container.appendChild(this.element);
};

Review.prototype.onQuizYesClick = function() {
  this.reviewQuizAnswerYes.classList.add('review-quiz-answer-active');
  this.reviewQuizAnswerNo.classList.remove('review-quiz-answer-active');
};

Review.prototype.onQuizNoClick = function() {
  this.reviewQuizAnswerNo.classList.add('review-quiz-answer-active');
  this.reviewQuizAnswerYes.classList.remove('review-quiz-answer-active');
};

Review.prototype.remove = function() {
  this.reviewQuizAnswerYes.removeEventListener('click', this.onQuizYesClick);
  this.reviewQuizAnswerNo.removeEventListener('click', this.onQuizNoClick);
  this.element.parentNode.removeChild(this.element);
};

module.exports = Review;
