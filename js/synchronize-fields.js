'use strict';

window.synchronizeFields = (function () {
  return function (firstField, secondField, firstFieldArray, secondFieldArray, syncFunction) {
    var element = secondField;
    var value = secondField.options[firstField.selectedIndex].value;
    syncFunction(element, value);
  };
})();
