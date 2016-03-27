var messages = {
	miss:   'Я никуда не попал',
  hit:    'Я попал в {b}',
  jumped: 'Я прыгнул на {value} сантиметров'
};

export function getMessage(a, b) {
 	if (typeof a === 'boolean') {
    if (a) {
      return messages.replace('{b}', b);
    }
    
    return messages.miss;
  }

	if (isNumber(a)) {
		return messages.jumped.replace('{value}', a*100);
	}

	if (Array.isArray(a)) {
  	if (Array.isArray(b)) {
    	return calcSumOfMultiply();	 
    }
    
		let result = calcSumOfItems(a);
    return '';
	}
}

function calcSumOfItems(array:Array):nu {
	return array.reduce();
}

function calcSumOfMultiply() {
	for (i = 0; i < a.length; i++) {
		let Multiply = a[i]*b[i];
	}
	return Multiply;
}

getMessage();