var messages = {
  miss:   'Я никуда не попал',
  hit:    'Я попал в {b}',
  jumped: 'Я прыгнул на {value} сантиметров'
};

function getMessage(a, b) {
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

    let result = calcSumOfItems();
  }
}

function isNumber(a) {
  return isFinite(a);
}

function calcSumOfItems() {
  return a.reduce(function(first, current) {
    return first + current;
  }, 0);
}

function calcSumOfMultiply() {
  var multiply;
  for (i = 0; i < a.length; i++) {
    multiply = a[i]*b[i];
  }
  return multiply;
}

getMessage(20, 24);
getMessage([20, 23], 123);
getMessage([20, 23], [24, 32, 3]);