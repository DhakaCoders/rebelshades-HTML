(function($) {
var windowWidth = $(window).width();



setTimeout(function() {
    $('.countdown-popup-wrapper').css('display', 'block');
}, 4000)

$('.modal-backdrop-wrp').on('click', function(){
	$('.countdown-popup-wrapper').slideUp();
});
$('.modal-close-con').on('click', function(){
	$('.countdown-popup-wrapper').slideUp();
});

	$('#periodic-timer-countdown').syotimer({
        hour: 0,
        minute: 6,
        second: 30,
        layout: 'smhd',

        headTitle: '<h3>Units of countdown in reverse order</h3>' +
            '<p>Demonstrate layout. ' +
            'Period is equal 2 days and 5 hours.</p>',
        effectType: 'opacity',

        periodic: false,
        periodInterval: 53,
        periodUnit: 'h'
    });

})(jQuery);