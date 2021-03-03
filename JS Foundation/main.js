function one() {
  var isValid = true;
  two();
}

function two() {
  var isValid = false;
}

var isValid = false;
one();
