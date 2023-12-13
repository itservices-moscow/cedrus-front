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
            $(".header-center").toggleClass('special-fixed');
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

    $(document).on('click', 'form#complaint_form ul[aria-labelledby="dropdownMenuButton1"] button', function(e){
        let variant_id = $(this).data('id-value');
        let current_form = $(this).closest('form');
        current_form.find("input[name='who']").val(variant_id);
        $(this).closest('.form-error').removeClass('form-error');
    });

    $(document).on('click', 'form#complaint_form ul[aria-labelledby="dropdownMenuButton2"] button', function(e){
        let variant_id = $(this).data('id-value');
        let current_form = $(this).closest('form');
        current_form.find("input[name='reason']").val(variant_id);
        $(this).closest('.form-error').removeClass('form-error');
    });

    $(document).on('input', '.form-error', function(e) {
        $(this).removeClass('form-error');
    });

    $(document).on('click', '#partner_form button, #consult_form button, #complaint_form button.send-form-button', function(e){
        e.preventDefault();
        var current_form = $(this).closest('form');

        current_form.find('input, textarea').each(function () {
            if (!this.value || !this.validity.valid)
                $(this).parent().addClass('form-error');
        });

        if (current_form.find('.form-error').length)
            return;

        var current_data = current_form.serialize();
        if (current_form.attr('id') == 'partner_form')
        {
            var form_sent_url = 'become_partner.php';
            $.fancybox.close();
            $.fancybox.open({ src: '#send-success' });
        }
        if (current_form.attr('id') == 'consult_form')
        {
            var form_sent_url = 'consult_form.php';
            $.fancybox.close();
            $.fancybox.open({ src: '#send-success' });
        }
        if (current_form.attr('id') == 'complaint_form')
        {
            var form_sent_url = 'complaint_form.php';
        }
        $.ajax({
            url: '/local/templates/cedrus/ajax/'+form_sent_url,
            method: 'post',
            dataType: 'json',
            data: current_data,
            success: function(msg){
                if (msg.STATUS == 'OK')
                {
                    current_form.find('.form_message').text(msg.MESSAGE);
                }
                else
                {
                    current_form.find('.form_message').text(msg.MESSAGE);
                }
                current_form.find('.form_message').show();
            }
        });
    });
});
