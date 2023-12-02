/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */
$(document).ready(function() {

    initFileUploader("#zdrop");

    function initFileUploader(target) {
        var previewNode = document.querySelector("#zdrop-template");
        previewNode.id = "";
        var previewTemplate = previewNode.parentNode.innerHTML;
        previewNode.parentNode.removeChild(previewNode);


        var zdrop = new Dropzone(target, {
            url: '/Home/UploadFile',
            maxFilesize: 20,
            previewTemplate: previewTemplate,
            autoQueue: true,
            previewsContainer: "#previews",
            clickable: "#upload-label"
        });

        zdrop.on("addedfile", function(file) {
            $('.preview-container').css('visibility', 'visible');
        });

        zdrop.on("totaluploadprogress", function(progress) {
            var progr = document.querySelector(".progress .determinate");
            if (progr === undefined || progr === null)
                return;

            progr.style.width = progress + "%";
        });

        zdrop.on('dragenter', function() {
            $('.fileuploader').addClass("active");
        });

        zdrop.on('dragleave', function() {
            $('.fileuploader').removeClass("active");
        });

        zdrop.on('drop', function() {
            $('.fileuploader').removeClass("active");
        });

        var toggle = true;
        /* Preview controller of hide / show */
        $('#controller').click(function() {
            if (toggle) {
                $('#previews').css('visibility', 'hidden');
                $('#controller').html("keyboard_arrow_up");
                $('#previews').css('height', '0px');
                toggle = false;
            } else {
                $('#previews').css('visibility', 'visible');
                $('#controller').html("keyboard_arrow_down");
                $('#previews').css('height', 'initial');
                toggle = true;
            }
        });
        /* Close controller */
        $('#close').click(function() {
            $('.preview-container').css('visibility', 'hidden');
        });
    }

});

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

function sidebarType(a) {
    var parent = a.parentElement.children;
    var color = a.getAttribute("data-class");

    var colors = [];

    for (var i = 0; i < parent.length; i++) {
        parent[i].classList.remove('active');
        colors.push(parent[i].getAttribute('data-class'));
    }

    if (!a.classList.contains('active')) {
        a.classList.add('active');
    } else {
        a.classList.remove('active');
    }

    var sidebar = document.querySelector('.sidenav');

    for (var i = 0; i < colors.length; i++) {
        sidebar.classList.remove(colors[i]);
    }

    sidebar.classList.add(color);
}

(function($) {
    'use strict';

    // navbarDropdown
    if ($(window).width() < 992) {
        $('.navigation .dropdown-toggle').on('click', function() {
            $(this).siblings('.dropdown-menu').animate({
                height: 'toggle'
            }, 300);
        });
    }

    // scroll to top button
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 70) {
            $('.backtop').addClass('reveal');
        } else {
            $('.backtop').removeClass('reveal');
        }
    });
    // scroll-to-top
    $('.scroll-top-to').on('click', function() {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    $('.portfolio-single-slider').slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000
    });

    $('.clients-logo').slick({
        infinite: true,
        arrows: false,
        autoplay: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplaySpeed: 6000,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }

        ]
    });

    $('.testimonial-wrap').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: true,
        vertical: true,
        verticalSwiping: true,
        autoplaySpeed: 6000,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    });

    $('.testimonial-wrap-2').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 6000,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
    });


    // counter
    function counter() {
        var oTop;
        if ($('.counter').length !== 0) {
            oTop = $('.counter').offset().top - window.innerHeight;
        }
        if ($(window).scrollTop() > oTop) {
            $('.counter').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 500,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            });
        }
    }
    $(window).on('scroll', function() {
        counter();
    });


    // Shuffle js filter and masonry
    if ($('.shuffle-wrapper').length !== 0) {
        var Shuffle = window.Shuffle;
        var jQuery = window.jQuery;

        var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
            itemSelector: '.shuffle-item',
            buffer: 1
        });
        jQuery('input[name="shuffle-filter"]').on('change', function(evt) {
            var input = evt.currentTarget;
            if (input.checked) {
                myShuffle.filter(input.value);
            }
        });
    }

})(jQuery);