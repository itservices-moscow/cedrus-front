$(document).ready(function () {
    // product counter
    updateMinusButtonState();

    $('body').on('click', '.product-item__quanti button', function () {
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
        $('.product-item__quanti').each(function () {
            var input = $(this).find('input');
            var minusButton = $(this).find('button:contains("-")');

            if (input.val() <= 1) {
                minusButton.prop('disabled', true);
            } else {
                minusButton.prop('disabled', false);
            }
        });
    }

    // product color
    var originalText = $('.product-color__all').text();

    $('body').on('click', '.product-color__all', function () {
        var link = $(this);
        var productColor = $('.product-color');

        productColor.toggleClass('show-more');

        if (productColor.hasClass('show-more')) {
            link.text(link.attr('data-text'));
        } else {
            link.text(originalText);
        }
    });
});