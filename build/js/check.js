var a;
var b;
var arr; 
function getMessage() {
 	
	if (a == true) {
	  return 'Я попал в ' + b;
	} else {
	  return 'Я никуда не попал';
	}

	if (isFinite(a)) {
		return 'Я прыгнул на ' + a*100 + ' сантиметров';
	}

	if (Array.isArray(a)) {
			var result = a.reduce(function(sum, current) {
	    return sum + current;
			}, 0);
		}

	if (Array.isArray(a) && Array.isArray(b)) {
		for (i = 0; i < arr.length; i++) {
			arr = a[i]*b[i];
		}
		return arr;	 
	}
}

getMessage();