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
            $this.find('.jq_slider_images img').each(function() { sliderWidth += $(this).width(); }); //TODO - can't use $this variable
            $this.find('.jq_slider_images').width(sliderWidth);

            var sliderPosition = 0; //start position
            var firstImgWidth = $this.find('.jq_slider_images img').width();
            var lastImgWidth = $this.find('.jq_slider_images li:last-child').width();

            //adding styles no matter what class we use for silder
            $this.css({
                position: 'relative',
                width: firstImgWidth
            });

            //navigation option
            if (settings.navigation) {
                $this.append('<ul class="jq_slider_navigation"><li><span class="jq_slider_navigation_prev">Previous</span></li><li><span class="jq_slider_navigation_next">Next</span></li></ul>');
            }

            //pagination option
            if (settings.pagination) {
                var paginationCoords = [0]; //array will always contain 0 as a start position

                //making an array with margin-left coordinates for images
                for (var i = 1; i < $this.find('.jq_slider_images img').length; i++) {
                    paginationCoords[i] = paginationCoords[i - 1] - $($this.find('.jq_slider_images img')[i - 1]).width();
                }
                $this.append('<ul class="jq_slider_pagination"></ul>');
                //adding pagination
                for (var i = 0; i < $this.find('.jq_slider_images img').length; i++) {
                    $this.find('.jq_slider_pagination').append('<li><span class="jq_slider_pagination_dot">' + (i + 1) + '</span></li>');
                }
                $($this.find('.jq_slider_pagination_dot')[0]).addClass('active'); //initial value of first slide
            }
            //autoscroll option
            if (settings.autoScroll) {
                var autoScrollTimer = setInterval(function(){ nextSlide() }, settings.autoScrollSpeed);
            }

            //initial hide of prev button if slider is not perpetual
            if (!settings.perpetual && sliderPosition >= 0 && settings.navigation) {
                $this.find('.jq_slider_navigation_prev').hide();
            }

            //changing slide by clicking on pagination dots
            $this.find('.jq_slider_pagination_dot').each(function(index) {
                $(this).click(function() { //TODO - can't use $this variable
                    sliderPosition = paginationCoords[index];
                    $this.find('.jq_slider_images').css('margin-left', paginationCoords[index]);
                });
            }).click(function() {
                $this.find('.jq_slider_pagination_dot.active').removeClass('active');
                $(this).addClass('active'); //TODO - can't use $this variable
            });

            //methods
            //making active pagination dot
            function paginationActive() {
                if (settings.pagination) {
                    $this.find('.jq_slider_pagination_dot.active').removeClass('active');

                    $($this.find('.jq_slider_pagination_dot')[paginationCoords.indexOf(sliderPosition)]).addClass('active');
                }
            }
            function prevSlide() {
                sliderPosition += firstImgWidth;
                if (sliderPosition > 0) {
                    sliderPosition = -(sliderWidth - lastImgWidth);
                    $this.find('.jq_slider_images').css('margin-left', -(sliderWidth - lastImgWidth));
                } else {
                    $this.find('.jq_slider_images').css('margin-left', sliderPosition);
                }

                // hiding prev button on first slide (if perpetual: false)
                if (!settings.perpetual && sliderPosition >= 0 && settings.navigation) {
                    $this.find('.jq_slider_navigation_prev').hide();
                }

                // showing next button
                if (!settings.perpetual && sliderPosition > -(sliderWidth - lastImgWidth) && settings.navigation) {
                    $this.find('.jq_slider_navigation_next').show();
                }
                paginationActive();
            }
            function nextSlide() {
                sliderPosition -= firstImgWidth;
                if (sliderPosition < -(sliderWidth - lastImgWidth)) {
                    sliderPosition = 0;
                    $this.find('.jq_slider_images').css('margin-left', sliderPosition);
                } else {
                    $this.find('.jq_slider_images').css('margin-left', sliderPosition);
                }

                // hiding next button on last slide (if perpetual: false)
                if (!settings.perpetual && sliderPosition <= -(sliderWidth - lastImgWidth) && settings.navigation) {
                    $this.find('.jq_slider_navigation_next').hide();
                }

                // showing prev button
                if (!settings.perpetual && sliderPosition < 0 && settings.navigation) {
                    $this.find('.jq_slider_navigation_prev').show();
                }
                paginationActive();
            }

            //previuos button
            $this.find('.jq_slider_navigation_prev').click(function() {
                prevSlide();
            });

            //next button
            $this.find('.jq_slider_navigation_next').click(function() {
                nextSlide();
            });
        });
    };

})(jQuery);