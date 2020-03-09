(function($) {
var windowWidth = $(window).width();
if( $('#dftTimerCon').length ){
    //declare start time
    var timer1 = "00:10:00";
    //intercal for seconds
    var interval1 = setInterval(function() {
      //timer will be [hour, minute, second]
      var timer = timer1.split(':');
      var hours = timer[0];
      var minutes = parseInt(timer[1], 10);
      var seconds = parseInt(timer[2], 10);
      //reduce second by one
      --seconds;
      //calculate new minute and hours
      minutes = (seconds < 0) ? --minutes : minutes;
      hours = minutes < 0 ? --hours : hours;

      if (hours < 0) {
        clearInterval(interval1);
        return;
      }

      seconds = (seconds < 0) ? 59 : seconds;
      seconds = (seconds < 10) ? '0' + seconds : seconds;
      minutes = (minutes < 0) ? 59 : minutes;
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      timer1 = hours + ':' + minutes + ':' + seconds;
      //$('.countdown').html(timer2);
      $('#dftTimerCon .hours').html(hours);
      $('#dftTimerCon .minutes').html(minutes);
      $('#dftTimerCon .seconds').html(seconds);
    }, 1000);
}

if( $('.countdown-popup-wrapper').length ){
  $("body").one("mouseleave", function() {
      $('#popUpModal').modal('show');
      // countdown

      //declare start time
      var timer2 = "00:08:00";
      //intercal for seconds
      var interval2 = setInterval(function() {
        //timer will be [hour, minute, second]
        var timer = timer2.split(':');
        var hours = timer[0];
        var minutes = parseInt(timer[1], 10);
        var seconds = parseInt(timer[2], 10);
        //reduce second by one
        --seconds;
        //calculate new minute and hours
        minutes = (seconds < 0) ? --minutes : minutes;
        hours = minutes < 0 ? --hours : hours;

        if (hours < 0) {
          clearInterval(interval2);
          return;
        }

        seconds = (seconds < 0) ? 59 : seconds;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        minutes = (minutes < 0) ? 59 : minutes;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        timer2 = hours + ':' + minutes + ':' + seconds;
        //$('.countdown').html(timer2);
        $('#clockdiv1 .hours').html(hours);
        $('#clockdiv1 .minutes').html(minutes);
        $('#clockdiv1 .seconds').html(seconds);
      }, 1000);
  });
}

$('.modal-close-con, a.closePopup').on('click', function(e){
  e.preventDefault();
  $('#popUpModal').modal('hide');
});

/**
Calculate prices -> FREE Night Vision Glasses
*/
var totalPrice = 7.95;
var itemPrice = 7.95;
var ProtectOrder = 2.95;
var SendBonus = 7.95;
var AccessoryPack = 9.95;
var ProtectOrderOutput = '<div id="itemptorder" class="rb-step-item clearfix"><span>Shipping Insurance</span><span class="thisItemPrice">$2.95</span></div>';
var SendBonusOutput = '<div id="itemsbonus" class="rb-step-item clearfix"><span>Hard Cover</span><span class="thisItemPrice">$7.95</span></div>';
var AccessoryPackOutput = '<div id="accpack" class="rb-step-item clearfix"><span>Accessory Pack</span><span class="thisItemPrice">$9.95</span></div>';

$('#ProtectOrder').on('change', function(){
  if(this.checked) {
    totalPrice = totalPrice + ProtectOrder;
    $('#summeryItems').append(ProtectOrderOutput);
    $('#priceTotal').html('$'+totalPrice.toFixed(2));
  }else{
    $('#itemptorder').remove();
    totalPrice = totalPrice - ProtectOrder;
    $('#priceTotal').html('$'+totalPrice.toFixed(2));
  }
});
$('#SendBonus').on('change', function(){
  if(this.checked) {
    totalPrice = totalPrice + SendBonus;
    $('#summeryItems').append(SendBonusOutput);
    $('#priceTotal').html('$'+totalPrice.toFixed(2));
  }else{
    $('#itemsbonus').remove();
    totalPrice = totalPrice - SendBonus;
    $('#priceTotal').html('$'+totalPrice.toFixed(2));
  }
});
$('#AccessoryPack').on('change', function(){
  if(this.checked) {
    totalPrice = totalPrice + AccessoryPack;
    $('#summeryItems').append(AccessoryPackOutput);
    $('#priceTotal').html('$'+totalPrice.toFixed(2));
  }else{
    $('#accpack').remove();
    totalPrice = totalPrice - AccessoryPack;
    $('#priceTotal').html('$'+totalPrice.toFixed(2));
  }
});


/**
Form step 1
*/
$('button.toStep2').on('click', function(e){
  e.preventDefault();
  var valid = true;
  $('#formStep1 input[type="text"]').each(function(){
    var thisVal = $(this).val();
    if( thisVal == '' || thisVal == undefined ){
      valid = false;
      $(this).parent().addClass('hasError');
    }else{
      valid = true;
    }
  });
  $('#formStep1 input[type="email"]').each(function(){
    var thisVal = $(this).val();
    if( thisVal == '' || thisVal == undefined || isEmail(thisVal) != true ){
      valid = false;
      $(this).parent().addClass('hasError');
    }else{
      valid = true;
    }
  });

  $('#formStep1 select').each(function(){
    var thisVal = $(this).find(":selected").val();
    if( thisVal == '' || thisVal == undefined ){
      valid = false;
      $(this).parent().addClass('hasError');
    }else{
      valid = true;
    }    
  });

  if( valid ){
    $('#formStep1').hide();
    $('#formStep2').show();
    $('.order-step-tabs-wrp .order-step-tabs').removeClass('active');
    $('.order-step-tabs-wrp .labelstep2').addClass('active');
  }else{
    goToByScroll('#formStep1 .hasError', 30);
  }

});

/**
Form step 2
*/
$('#orderForm').on('submit', function(e){
  var valid = true;
  $('#formStep2 input[type="text"]').each(function(){
    var thisVal = $(this).val();
    if( thisVal == '' || thisVal == undefined ){
      valid = false;
      $(this).parent().addClass('hasError');
    }else{
      valid = true;
    }
  });
  if( valid ){
    e.preventDefault();
    //process the payment
    console.log(totalPrice);
  }else{
    e.preventDefault();
    goToByScroll('#formStep2 .hasError', 30);
  }
});

$('#goBack').on('click', function(e){
  e.preventDefault();
    $('#formStep1').show();
    $('#formStep2').hide();
    $('.order-step-tabs-wrp .order-step-tabs').removeClass('active');
    $('.order-step-tabs-wrp .labelstep1').addClass('active');
});

/**
Helper functions
*/
$('#orderForm input[type="text"]').keyup(function(){
  var thisVal = $(this).val();
  if( thisVal != '' || thisVal != undefined ){
    $(this).parent().removeClass('hasError');
  }
});
$('#orderForm input[type="email"]').keyup(function(){
  var thisVal = $(this).val();
  if( isEmail(thisVal) == true ){
    $(this).parent().removeClass('hasError');
  }
});

$('#orderForm select').on('change', function(){
  var thisVal = $(this).find(":selected").val();
  if( thisVal != '' || thisVal != undefined ){
    $(this).parent().removeClass('hasError');
  }  
});

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function goToByScroll(id, offset){
  if(id){
      // Remove "link" from the ID
    id = id.replace("link", "");
      // Scroll
    $('html,body').animate(
        {scrollTop: $(id).offset().top - offset},
      500);
  }
}

})(jQuery);