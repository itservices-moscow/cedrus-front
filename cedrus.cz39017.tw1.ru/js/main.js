$(document).ready(function () {
    //mobile nav
    $(".header__burger").click(function () {
        $(".menu-mob").addClass('open');
    });
    $(".menu-mob__close").click(function () {
        $(".menu-mob").removeClass('open');
        if ($(".user-nav").length) {
            $(".user-nav").removeClass('active');
        }
    });

    // user nav open 
    if ($(".user-nav").length) {
        $("body").on("click", ".user-nav-open", function(){
            $(".user-nav").toggleClass('active');
            return false;
        });
    }    
    
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

    $('.sort-options li a').on('click', function () {
        $('#catalog-sort span').text($(this).text());
    });

    // telephone mask
    $('input[type=tel]').on('input', function () {
        this.value = this.value
            .replace(/(\+7|\D)/g, '')
            .replace(/(\d{0,10})\d*/, '+7 ($1')
            .replace(/(\d{3})(\d)/, '$1) $2')
            .replace(/(\d{3})(\d)/, '$1-$2')
            .replace(/(-\d{2})(\d)/, '$1-$2');
    });

    $('.contact-places__btn').on('click', function () {
        var list = $(this).siblings('.contact-places__list')[0];
        list.scrollBy({ left: list.offsetWidth });
    });

    $('.user-nav-item-dropdown .user-nav-link').on('click', function () {
        $(this).parents('.user-nav-item-dropdown').toggleClass('open');
        return false;
    });

    $('.filter-price').each(function () {
        var [fromSlider, toSlider] = $(this).find('input[type=range]');
        var [fromInput, toInput] = $(this).find('input[type=text]');

        $(fromSlider).on('input', function () {
            if (+toSlider.value < +this.value)
                this.value = toSlider.value;
            fromInput.value = 'от ' + (+this.value).toLocaleString('ru');

            if (this.value === this.max)
                this.style.zIndex = 5;
            else
                this.style.zIndex = "";
        });

        $(toSlider).on('input', function () {
            if (+this.value < +fromSlider.value)
                this.value = fromSlider.value;
            toInput.value = 'до ' + (+this.value).toLocaleString('ru');
        });

        $(fromInput).on('input', function () {
            var from = Math.min(toSlider.value, this.value.replace(/\D/g, ''));
            fromSlider.value = from;
            this.value = 'от ' + from.toLocaleString('ru');
        });

        $(toInput).on('input', function () {
            var to = Math.min(toSlider.max, this.value.replace(/\D/g, ''));
            toSlider.value = Math.max(fromSlider.value, to);
            this.value = 'до ' + to.toLocaleString('ru');
        });
    });
});
