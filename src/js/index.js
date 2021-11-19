import '../scss/main.scss';
import 'intersection-observer';
import $ from 'jquery';
import 'jquery-ui';
import 'jquery-ui/ui/effect';
import 'jquery-ui/ui/widgets/tabs';
import 'bootstrap';
import 'popper.js';
import Swiper from 'swiper/swiper-bundle.min';

const header = document.querySelector('header.header');
var lastScrollPosition = 0;
function headerPosition() {
    const offsetY = window.pageYOffset;

    if (offsetY > 0) {
        header.classList.add('scrollable');
        if (offsetY > lastScrollPosition) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
        lastScrollPosition = offsetY;
    } else {
        header.classList.remove('scrollable');
    }
}

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

    // Swiper slider
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
                slidesPerView: 7,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                /*scrollbar: {
                    el: '.swiper-scrollbar',
                },*/
                dynamicBullets: true,
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
                slidesPerView: 3,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                /*scrollbar: {
                    el: '.swiper-scrollbar',
                },*/
                dynamicBullets: true,
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

    // Platform tabs
    if ($('.platform-tabs').length) {
        $('.platform-tabs').tabs({
            event: 'mouseover',
        }).addClass('ui-tabs-vertical ui-helper-clearfix');
        $('.platform-tabs li').removeClass('ui-corner-top').addClass('ui-corner-left');
    }

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