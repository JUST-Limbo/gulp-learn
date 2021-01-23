"use strict";

var num = 10;
console.log(num);

if (true) {
  var _num = 100;
  console.log(_num);
}

var _loop = function _loop(index) {
  setTimeout(function () {
    console.log(index);
  }, 100);
};

for (var index = 0; index < 10; index++) {
  _loop(index);
}