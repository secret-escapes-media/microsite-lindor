(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }

  // searches for specific queryString, returns value or true if empty value
  function getQueryStringByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return true;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // mobile nav toggle open & close
  $('.js-toggle-mobile-nav').on('click', function(e) {
    $('.mobile-nav').toggleClass('is-open').toggleClass('is-closed');
  });

  // current page nav highlight
  var currentPage = $('body').data('current-page');
  $('.' + currentPage + ' .site-nav__item--' + currentPage).addClass('site-nav__item--current');


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//    Generic modal - with expert filter
///////////////////////////////////////

  var modal          = $('.js-modal'),
      modalLaunchBtn = $('.js-open-modal'),
      modalCloseBtn  = $('.js-close-modal');

    // opens modal
    function modalOpen(event){
      // make event parameter optional
      var eventVar = event || false;
      if (eventVar) { event.preventDefault(); }
      // disable scrolling on background content (doesn't work iOS)
      $('body').addClass('disable-scroll');

      // get specific expert content on overview
      if (eventVar) {
        var expert = $(event.currentTarget).data('expert');
        if (expert) {
          // hides all but shows current expert content
          $('.modal__expert').hide().filter('.modal__expert--' + expert).show();
        }
      }

      // open modal
      modal.fadeIn('250', function(){
        $(this).removeClass('is-closed').addClass('is-open');
      });

      // reset modal scroll position
      $('.js-modal-scroll').scrollTop(0);

    }

    // launches modal when offer is clicked
    modalLaunchBtn.on('click', function(event) {
      modalOpen(event);
    });

    // launches modal if query string
    var queryString = getQueryStringByName('modal');
    if ( queryString) {
      modalOpen();
    }

    // closes modal
    function modalClose(event){
      event.preventDefault();
      // enable scrolling
      $('body').removeClass('disable-scroll');
      // close modal with fade
      modal.fadeOut('250', function(){
        $(this).removeClass('is-open').addClass('is-closed');
      });
    }

    // closes modal on close icon click
    modalCloseBtn.on('click', function(event) {
      modalClose(event);
    });

    // closes modal on background click
    modal.on('click', function(event) {
      if (event.target !== this){
        return;
      }
      modalClose(event);
    });

    // closes modal on escape key press
    $(document).keyup(function(event) {
       if (event.keyCode == 27) {
         modalClose(event);
        }
    });


///////////////////////////////////////
//    Countdown timer
///////////////////////////////////////

  // neat way to give the css classes to each element of countdown
  function countdownSpanWrap(timeUnit, timeLabel) {
    return '<span class="countdown__unit">' + timeUnit + ' <span class="countdown__label">' + timeLabel + '</span> </span>';
  }

  var ExpiryDate = "2017-02-14";

  // countdown for the competition entry page
  // init countdown plugin - specific structure, format & time labels
  if ( typeof ExpiryDate != 'undefined') {
    $('.js-countdown').countdown(ExpiryDate)
      .on('update.countdown', function(event) {
        var format = countdownSpanWrap('%H', 'hrs') + countdownSpanWrap('%M', 'mins') + countdownSpanWrap('%S', 'sec');
        if(event.offset.daysToWeek > 0) {
          format = countdownSpanWrap('%d', 'day%!d') + " " + format;
        }
        if(event.offset.weeks > 0) {
          format = countdownSpanWrap('%w', 'week%!w') + " " + format;
        }
        format = '<div class="countdown__wrap">' + format + '</div>';
        $(this).html(event.strftime(format));
      });
      // NEED TO MAKE THE FINSHED STATE
      // .on('finish.countdown', function(event) {
      //   // // disables the expired offer
      //   // var parent = $(this).closest('.modal__content');
      //   // // remove last cta button
      //   // var lastButton = $('a.btn--large',parent);
      //   // // add in hr
      //   // lastButton.after('<hr class="row">');
      //   // lastButton.remove();
      //   // // disable cta button
      //   // $('a.btn',parent).text('Offer Expired').attr('class', 'btn btn--disabled').removeAttr('href');
      //   // remove countdown block
      //   $(this).remove();
      //   $('.js-countdown-active').remove();
      //   $('.js-countdown-over').show();
      // });
  }


///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end