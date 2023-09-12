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

    $('body').on('click', '.form-password-btn', function () {
        var passwordInput = $(this).prev('.form-control');

        if (passwordInput.attr('type') === 'password') {
            passwordInput.attr('type', 'text');
            $(this).addClass('slash')
        } else {
            passwordInput.attr('type', 'password');
            $(this).removeClass('slash')
        }
    });

    $('.dropdown-item').on('click', function () {
        $(this).closest('.dropdown').find('.dropdown-toggle span').text($(this).text());
    });

    // telephone mask
    $('input[type=tel]').on('input', function() {
        this.value = this.value
            .replace(/(\+7|\D)/g, '')
            .replace(/(\d{0,10})\d*/, '+7 ($1')
            .replace(/(\d{3})(\d)/, '$1) $2')
            .replace(/(\d{3})(\d)/, '$1-$2')
            .replace(/(-\d{2})(\d)/, '$1-$2');
    });

    $('.contact-places__btn').on('click', function() {
        var list = $(this).siblings('.contact-places__list')[0];
        list.scrollBy({left: list.offsetWidth});
    });

    $('.user-nav-item-dropdown .user-nav-link').on('click', function() {
        $(this).parents('.user-nav-item-dropdown').toggleClass('open');
        return false;
    });
});
