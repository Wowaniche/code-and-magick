var arr = [a, b];
var messageString = function getMessage(a, b) {

	if (a === true) {
		return 'Я попал в' + b ;
	} else {
		return 'Я никуда не попал';
	}

	if (isNan(a)) {
		return 'Я прыгнул на' + a*100 + 'сантиметров';
	}

	if (Array.isArray([a])) {
		var result = arr.reduce(function(sum, current) {
  	return sum + current;
		}, 0);
	}

	if (Array.isArray(arr)) {
		return arr.length[0]*arr.length[1];
	}
}

getMessage(a, b);