$(window).load(function() {
    // http://stackoverflow.com/a/2335554/3841259
    var sliderWidth = 0;
    $('.jq_slider_images img').each(function() { sliderWidth += $(this).width(); });
    $('.jq_slider_images').width(sliderWidth);

    var sliderPosition = 0; //start position
    var sliderLastChildWidth = $('.jq_slider_images li:last-child').width();

    $('.jq_slider_navigation_prev').click(function() {
        sliderPosition = sliderPosition + 800;
        if (sliderPosition > 0) {
            sliderPosition = -(sliderWidth - sliderLastChildWidth);
            $(".jq_slider_images").css('margin-left', -(sliderWidth - sliderLastChildWidth));
        } else {
            $(".jq_slider_images").css('margin-left', sliderPosition);
        }
    });

    $('.jq_slider_navigation_next').click(function() {
        sliderPosition = sliderPosition - 800;
        if (sliderPosition < -(sliderWidth - sliderLastChildWidth)) {
            sliderPosition = 0;
            $(".jq_slider_images").css('margin-left', 0);
        } else {
            $(".jq_slider_images").css('margin-left', sliderPosition);
        }
    });
});
