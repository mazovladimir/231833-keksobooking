'use strict';

window.synchronizeFields = (function () {
  return function (firstField, secondField, firstFieldArray, secondFieldArray, syncFunction) {
    firstField.addEventListener('change', function () {
      var firstFieldIndex = firstFieldArray.indexOf(firstField.value);
      var element = secondField;
      var value = secondFieldArray[firstFieldIndex];
      syncFunction(element, value);
    });
  };
})();
