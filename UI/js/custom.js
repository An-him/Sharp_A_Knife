$(function() {
    'use strict'; // Start of use strict

    $('.odometer').appear(function(e) {
        var odo = $(".odometer");
        odo.each(function() {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });

    $(".btn").click(function(){
        $(".hidden-gallery").slideDown(); // Shows the hidden images
    });

    $(".services-categories li a").click(function(e) {
        e.preventDefault(); // Prevent default link behavior
        
        // Remove active class from all list items
        $(".services-categories li").removeClass("active");
        
        // Add active class to clicked list item
        $(this).parent().addClass("active");

        // Hide all service contents
        $(".more-service-content").hide();

        // Show the content related to clicked link
        $($(this).data('content')).show();

    });

    /*--------------------------
     ScrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    /*--------------------------
     Gallery Popup JS
    ---------------------------- */

    $('.gallery-popup').each(function() {
		$(this).magnificPopup({
			delegate: 'a', 
			type: 'image',
			gallery: {
			  enabled:true
			}
		});
    });

    /*--------------------------
      Countdown
    ---------------------------- */

    function countdown() {
        $('.countdown').each(function () {
          var $this = $(this),
            finalDate = $(this).data('countdown');
          $this.countdown(finalDate, function (event) {
            $(this).html(event.strftime('<li><span>%-D</span><p>Days</p></li>' + '<li><span>%-H</span><p>Hours</p></li>' + '<li><span>%-M</span><p>Minutes</p></li>' + '<li><span>%S</span><p>Seconds</p></li>'));
          });
        });
      };
    
    /*--------------------------
       FAQ Accordion
    ---------------------------- */

    $('.accordion').find('.accordion-title').on('click', function() {
        $(this).toggleClass('active');
        $(this).next().slideToggle('fast');
        $('.accordion-content').not($(this).next()).slideUp('fast');
        $('.accordion-title').not($(this)).removeClass('active');
    });

    /*--------------------------
     Tabs Box
    ---------------------------- */

	if($('.tabs-box').length){
		$('.tabs-box .tab-buttons .tab-btn').on('click', function(e) {
			e.preventDefault();
			var target = $($(this).attr('data-tab'));
			
			if ($(target).is(':visible')){
				return false;
			}else{
				target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
				$(this).addClass('active-btn');
				target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
				target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab animated fadeIn');
				$(target).fadeIn(300);
				$(target).addClass('active-tab animated fadeIn');
			}
		});
	}

    /*--------------------------
     Partners
    ---------------------------- */
    $('.partners').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        smartSpeed: 900,
        autoplayTimeout: 3000,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
			700:{
                items:3
            },
            1000:{
                items:4
            },
			1300:{
                items:5
            },
            1600:{
                items:5
            }
        }
    });

    /*------------------------------------------------------------------
        Testimonials Sec
    ------------------------------------------------------------------*/
    $('.test-active').owlCarousel({
        loop:true,
        margin:30,
        items:1,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        nav:false,
        dots:false,
        responsive:{
            0:{
                items:1,
                margin: 0
            },
            767:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });

    /*--------------------------
        Sticky
    ---------------------------- */
    jQuery(window).on('scroll', function() {
    if ($(this).scrollTop() > 50) {
      $('header').addClass("sticky");
    } else {
      $('header').removeClass("sticky");
    }

    //Check to see if the window is top if not then display button
    if ($(this).scrollTop() > 400) {
      $('.scrollToTop').addClass('show');
    } else {
      $('.scrollToTop').removeClass('show');
    }
});

    /*--------------------------
        Slider
    ---------------------------- */

    function mainSlider() {
	var BasicSlider = $('.slider-active');
	BasicSlider.on('init', function (e, slick) {
		var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
		doAnimations($firstAnimatingElements);
	});
	BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
		var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
		doAnimations($animatingElements);
	});
	BasicSlider.slick({
		autoplay: true,
		autoplaySpeed: 10000,
		dots:true ,
		fade: true,
		arrows: false,
		prevArrow: '<button type="button" class="slick-prev"><i class="icon dripicons-chevron-left"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="icon dripicons-chevron-right"></i></button>',
		responsive: [
			{ breakpoint: 1200, settings: { dots: false, arrows: false } }
		]
	});

	function doAnimations(elements) {
		var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
		elements.each(function () {
			var $this = $(this);
			var $animationDelay = $this.data('delay');
			var $animationType = 'animated ' + $this.data('animation');
			$this.css({
				'animation-delay': $animationDelay,
				'-webkit-animation-delay': $animationDelay
			});
			$this.addClass($animationType).one(animationEndEvents, function () {
				$this.removeClass($animationType);
			});
		});
	}
}
mainSlider();

 
	/*------------------------------------------------------------------
        Year
    ------------------------------------------------------------------*/
	$(function(){
    var theYear = new Date().getFullYear();
    $('#year').html(theYear);
	});
	
	/*------------------------------------------------------------------
       Mobile Menu Active
    ------------------------------------------------------------------*/
     jQuery('.mobile-menu-active').meanmenu({
    meanMenuContainer: '.mobile-menu-container',
    meanScreenWidth: "993"
  });

});

/*------------------------------------------------------------------
 Loader 
------------------------------------------------------------------*/
jQuery(window).on("load scroll", function() {
    'use strict'; // Start of use strict
    // Loader 
     $('#dvLoading').fadeOut('slow', function () {
            $(this).remove();
        });
	$('.google-map').on('click', function() {
            $('.google-map').find('iframe').css("pointer-events", "auto");
        });
    //Animation Numbers	 
    jQuery('.animateNumber').each(function() {
        var num = jQuery(this).attr('data-num');
        var top = jQuery(document).scrollTop() + (jQuery(window).height());
        var pos_top = jQuery(this).offset().top;
        if (top > pos_top && !jQuery(this).hasClass('active')) {
            jQuery(this).addClass('active').animateNumber({
                number: num
            }, 2000);
        }
    });
	  
});
	/*------------------------------------------------------------------
    FAQ
    ------------------------------------------------------------------*/
    $('.panel-heading a').on('click', function() {
        $('.panel-heading').removeClass('active');
        $(this).parents('.panel-heading').addClass('active');
    });
