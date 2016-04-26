(function($) {

    $.fn.jQ_Slider = function(options) {
        var settings = $.extend({
            navigation: true,
            pagination: true,
            autoScroll: false,
            autoScrollSpeed: 2000,
            perpetual: true
        }, options);

        return this.each(function() {
            var $this = $(this);

            // http://stackoverflow.com/a/2335554/3841259
            var sliderWidth = 0;
            $('.jq_slider_images img').each(function() { sliderWidth += $(this).width(); });
            $('.jq_slider_images').width(sliderWidth);

            var sliderPosition = 0; //start position
            var firstImgWidth = $(this).find('.jq_slider_images img').width();
            var lastImgWidth = $(this).find('.jq_slider_images li:last-child').width();

            //adding styles no matter what class we use for silder
            $(this).css({
                position: 'relative',
                width: firstImgWidth
            });

            //navigation option
            if (settings.navigation) {
                $(this).append('<ul class="jq_slider_navigation"><li><span class="jq_slider_navigation_prev">Previous</span></li><li><span class="jq_slider_navigation_next">Next</span></li></ul>');
            }

            //pagination option
            if (settings.pagination) {
                var paginationCoords = [0]; //array will always contain 0 as a start position

                //making an array with margin-left coordinates for images
                for (var i = 1; i < $('.jq_slider_images img').length; i++) {
                    paginationCoords[i] = paginationCoords[i - 1] - $($('.jq_slider_images img')[i - 1]).width();
                }
                $(this).append('<ul class="jq_slider_pagination"></ul>');
                //adding pagination
                for (var i = 0; i < $('.jq_slider_images img').length; i++) {
                    $('.jq_slider_pagination').append('<li><span class="jq_slider_pagination_dot">' + (i + 1) + '</span></li>');
                }
                $($('.jq_slider_pagination_dot')[0]).addClass('active'); //initial value of first slide
            }
            //autoscroll option
            if (settings.autoScroll) {
                var autoScrollTimer = setInterval(function(){ nextSlide() }, settings.autoScrollSpeed);
            }

            //initial hide of prev button if slider is not perpetual
            if (!settings.perpetual && sliderPosition >= 0 && settings.navigation) {
                $('.jq_slider_navigation_prev').hide();
            }

            //changing slide by clicking on pagination dots
            $('.jq_slider_pagination_dot').each(function(index) {
                $(this).click(function() {
                    sliderPosition = paginationCoords[index];
                    $('.jq_slider_images').css('margin-left', paginationCoords[index]);
                });
            }).click(function() {
                $('.jq_slider_pagination_dot.active').removeClass('active');
                $(this).addClass('active');
            });

            //methods
            var prevSlide = function() {
                sliderPosition += 800;
                if (sliderPosition > 0) {
                    sliderPosition = -(sliderWidth - lastImgWidth);
                    $('.jq_slider_images').css('margin-left', -(sliderWidth - lastImgWidth));
                } else {
                    $('.jq_slider_images').css('margin-left', sliderPosition);
                }

                if (!settings.perpetual && sliderPosition >= 0 && settings.navigation) {
                    $('.jq_slider_navigation_prev').hide();
                }

                if (!settings.perpetual && sliderPosition > -(sliderWidth - lastImgWidth) && settings.navigation) {
                    $('.jq_slider_navigation_next').show();
                }

                //making active pagination dot
                if (settings.pagination) {
                    $('.jq_slider_pagination_dot.active').removeClass('active');

                    $($('.jq_slider_pagination_dot')[paginationCoords.indexOf(sliderPosition)]).addClass('active');
                }
            };
            var nextSlide = function() {
                sliderPosition -= 800;
                if (sliderPosition < -(sliderWidth - lastImgWidth)) {
                    sliderPosition = 0;
                    $('.jq_slider_images').css('margin-left', sliderPosition);
                } else {
                    $('.jq_slider_images').css('margin-left', sliderPosition);
                }

                if (!settings.perpetual && sliderPosition <= -(sliderWidth - lastImgWidth) && settings.navigation) {
                    $('.jq_slider_navigation_next').hide();
                }

                if (!settings.perpetual && sliderPosition < 0 && settings.navigation) {
                    $('.jq_slider_navigation_prev').show();
                }

                //making active pagination dot
                if (settings.pagination) {
                    $('.jq_slider_pagination_dot.active').removeClass('active');

                    $($('.jq_slider_pagination_dot')[paginationCoords.indexOf(sliderPosition)]).addClass('active');
                }
            };

            //previuos button
            $('.jq_slider_navigation_prev').click(function() {
                prevSlide();
            });

            //next button
            $('.jq_slider_navigation_next').click(function() {
                nextSlide();
            });
        });
    };

})(jQuery);