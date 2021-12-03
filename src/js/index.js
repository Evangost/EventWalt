import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/effect';
import 'jquery-ui/ui/widgets/tabs';
import 'bootstrap';
import 'popper.js';
import 'select2';
import Swiper from 'swiper/swiper-bundle.min';

const header = document.querySelector('header.header');
var lastScrollPosition = 0;

$(window).on('load', function () {
    let b = $('body');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        b.addClass('ios');
    } else {
        b.addClass('web');
    }

    b.removeClass('loaded');

    headerPosition();
});

$(function () {
    window.addEventListener('scroll', headerPosition);

    (function() {
        const headerMenu = $('.header__menu');

        $('.header__menu-toggle').on('click', function (e) {
            $('body').toggleClass('no-scroll');
            $(this).toggleClass('opened');
            headerMenu.toggleClass('opened');
            e.stopPropagation();
        });

        headerMenu.on('click', function (e) {
            e.stopPropagation();
        });

        $(document).on('click', function () {
            $('body').removeClass('no-scroll');
            headerMenu.removeClass('opened');
            $('.header__menu-toggle').removeClass('opened');
        });
    })();

    // Swiper slider
    (function() {
        if ($('.swiper-container').length) {
            /* default slider */
            /*let slider;
            let slide = document.querySelectorAll('.swiper-container .swiper-slide').length;
            if (slide > 1) {
                slider = new Swiper('.swiper-container', {
                    observer: true,
                    observeParents: true,
                    loop: true,
                    autoplay: true,
                    spaceBetween: 25,
                    slidesPerView: 'auto',
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    scrollbar: {
                        el: '.swiper-scrollbar',
                    },
                    dynamicBullets: true,
                });
            }*/

            /* partners slider */
            let sliderPartners;
            let slidePartners = document.querySelectorAll('.partners-slider .swiper-slide').length;
            if (slidePartners > 7) {
                sliderPartners = new Swiper('.partners-slider', {
                    observer: true,
                    observeParents: true,
                    loop: true,
                    autoplay: true,
                    spaceBetween: 25,
                    slidesPerView: 3,
                    breakpoints: {
                        576: {
                            slidesPerView: 5,
                        },
                        992: {
                            slidesPerView: 7,
                        }
                    }
                });
            }

            /* platform slider */
            let sliderPlatform;
            let slidePlatform = document.querySelectorAll('.partners-slider .swiper-slide').length;
            if (slidePlatform > 3) {
                sliderPartners = new Swiper('.platform-slider', {
                    observer: true,
                    observeParents: true,
                    loop: true,
                    autoplay: false,
                    spaceBetween: 20,
                    slidesPerView: 1,
                    breakpoints: {
                        576: {
                            slidesPerView: 2,
                        },
                        992: {
                            slidesPerView: 3,
                        }
                    }
                });
            }

            /* reviews slider */
            let sliderReview;
            let slideReview = document.querySelectorAll('.reviews-slider .swiper-slide').length;
            if (slideReview > 1) {
                slideReview = new Swiper('.reviews-slider', {
                    observer: true,
                    observeParents: true,
                    loop: true,
                    autoplay: true,
                    spaceBetween: 25,
                    slidesPerView: 1,
                    centeredSlides: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    dynamicBullets: true,
                });
            }
        }
    })();

    // Platform tabs
    (function() {
        if ($('.platform-tabs').length) {
            $('.platform-tabs').tabs({
                event: 'mouseover',
            }).addClass('ui-tabs-vertical ui-helper-clearfix');
            $('.platform-tabs li').removeClass('ui-corner-top').addClass('ui-corner-left');
        }

        if ($('.pricing-tabs').length) {
            $('.pricing-tabs').tabs({
                event: 'mouseover',
            });
        }
    })();

    // Select2
    /*(function() {
        const select = $('.select-js');

        if (select) {
            select.each(function(e, n) {
                e.select2({
                    minimumResultsForSearch: -1,
                    dropdownParent: $(this).nextAll('.select-js-dropdown'),
                    width: '100%',
                });
            })
        }
    })();*/

    // Lazy load observer
    const imagesAll = document.querySelectorAll('img[data-src]');
    let imgObserve = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.intersectionRatio >= 0 && entry.target.hasAttribute('data-src')) {
                let current = entry.target;
                let source = current.getAttribute('data-src');

                current.setAttribute('src', source);
                current.removeAttribute('data-src');
            }
        });
    });
    if (imagesAll.length > 0) {
        imagesAll.forEach(function (image) {
            imgObserve.observe(image);
        });
    }
});

function headerPosition() {
    const offsetY = window.pageYOffset;

    if (offsetY >= 1 && offsetY < 300) {
        header.classList.remove('scrollable');
        if (offsetY > lastScrollPosition) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScrollPosition = offsetY;
    }
    else if (offsetY > 300) {
        header.classList.add('scrollable');
        if (offsetY > lastScrollPosition) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScrollPosition = offsetY;
    }
    else {
        header.classList.remove('hide');
        header.classList.remove('scrollable');
    }

    /*if (offsetY > 300) {
        header.classList.add('scrollable');
        if (offsetY > lastScrollPosition) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScrollPosition = offsetY;
    } else {
        header.classList.remove('scrollable');
    }*/
}