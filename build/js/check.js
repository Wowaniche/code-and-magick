var messages = {
  miss:   'Я никуда не попал',
  hit:    'Я попал в {b}',
  jumped: 'Я прыгнул на {value} сантиметров',
  sum:    'Я прошел {meter} шагов',
  step:   'Я прошел {pace} метров'
};

function getMessage(a, b) {
  if (typeof a === 'boolean') {
    if (a) {
      return messages.hit.replace('{b}', b);
    } else {
      return messages.miss;
    }
  }
  
  if (isNumber(a)) { 
    return messages.jumped.replace('{value}', a*100);
  }

  if (Array.isArray(a)) {
    if (Array.isArray(b)) {
      return messages.step.replace('{pace}', calcSumOfMultiply(a, b));
    }

    return messages.sum.replace('{meter}', calcSumOfItems(a));
  }
}

function isNumber(a) {
  return isFinite(a);
}

function calcSumOfItems(a) {
  return a.reduce(function(first, current) {
    return first + current;
  }, 0);
}

function calcSumOfMultiply(a, b) {
  var multiply = 0;
  for (i = 0; i < a.length; i++) {
    multiply += a[i]*b[i];
  }
  return multiply;
}

getMessage(1, 1);