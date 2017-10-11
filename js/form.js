'use strict';

(function () {
  var roomType = document.querySelector('#type');
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var roomPrice = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');

  var CAPACITY_MAP = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  selectRoomCapacity();

  timeIn.addEventListener('change', function () {
    window.synchronizeFields(timeIn, timeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  });

  timeOut.addEventListener('change', function () {
    window.synchronizeFields(timeOut, timeIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  });

  roomType.addEventListener('change', function () {
    window.synchronizeFields(roomType, roomPrice, ['bungalo', 'flat', 'house', 'palace'], [0, 1000, 5000, 10000], syncValueWithMin);
  });

  roomNumber.addEventListener('change', function () {
    selectRoomCapacity();
  });

  function syncValues(element, value) {
    element.value = value;
  }

  function syncValueWithMin(element, value) {
    element.min = value;
    element.value = value;
  }

  function selectRoomCapacity() {
    var numberSelected = roomNumber.options[roomNumber.selectedIndex];
    if (numberSelected.selected) {
      disableRoomCapacity(CAPACITY_MAP[numberSelected.value]);
    }
  }

  function disableRoomCapacity(values) {
    for (var i = 0; i < roomCapacity.options.length; i++) {
      var optionCapacity = roomCapacity.options[i];
      if (values.indexOf(optionCapacity.value) === -1) {
        optionCapacity.disabled = true;
      } else {
        optionCapacity.disabled = false;
        optionCapacity.selected = true;
      }
    }
  }
})();
