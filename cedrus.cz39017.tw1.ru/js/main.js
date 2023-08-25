$(document).ready(function() {
    updateMinusButtonState();

  $('body').on('click', '.product-item__quanti button', function() {
    var input = $(this).siblings('input');
    var currentValue = parseInt(input.val());

    if ($(this).text() === '+') {
      input.val(currentValue + 1);
    } else if ($(this).text() === '-' && currentValue > 1) {
      input.val(currentValue - 1);
    }

    updateMinusButtonState();
  });

  function updateMinusButtonState() {
    var input = $('.product-item__quanti input');
    var minusButton = $('.product-item__quanti button:contains("-")');

    if (input.val() <= 1) {
      minusButton.prop('disabled', true);
    } else {
      minusButton.prop('disabled', false);
    }
  }
  });