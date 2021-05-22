$(function () {
    'use strict';

    let sect = window.location.hash;
    if ($(sect).length == 1) {
        $('.section.active').removeClass('active');
        $(sect).addClass('active');
        $('.navbar-nav > li > a.active').removeClass('active');
        $('.navbar-nav a[href="' + sect + '"]').addClass('active');
        $('body, .nav').css('background-color', $(sect).data('bg'));
    }

    let cTimeout = false,
        color,
        timeout;
    $('.navbar-nav > li > a').on('click', function (e) {
        let section = $(this).attr('href');

        if ($(section).length == 1 && !$(section).hasClass('active')) {
            if (cTimeout) {
                clearTimeout(timeout);
                $('body').removeClass('switch');
                $('.ripple').remove();
            }

            color = $(section).data('bg');

            setTimeout(function () {
                $('<div class="ripple" ></div>')
                    .css({
                        background: color,
                        top: e.clientY,
                        left: e.clientX,
                    })
                    .appendTo('body');
            }, 0);

            $('.navbar-nav > li > a.active').removeClass('active');
            $('.navbar-nav a[href="' + section + '"]').addClass('active');

            $('body').addClass('switch');

            cTimeout = true;

            setTimeout(function () {
                $('.section.active').removeClass('active');
                $(section).addClass('active');
            }, 500);

            timeout = setTimeout(function () {
                $('body').removeClass('switch');
                $('body ').css('background', color);
                $('.ripple').remove();
                cTimeout = false;
            }, 1000);
        }
    });
});
