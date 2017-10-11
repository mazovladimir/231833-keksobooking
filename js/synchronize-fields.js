'use strict';

window.synchronizeFields = (function () {
  return function (firstField, secondField, firstFieldArray, secondFieldArray, syncFunction) {
    var firstFieldIndex = firstFieldArray.indexOf(firstField.value);
    var element = secondField;
    var value = secondFieldArray[firstFieldIndex];
    syncFunction(element, value);
  };
})();
