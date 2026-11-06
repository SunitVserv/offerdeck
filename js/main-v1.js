jQuery(document).ready(function ($) {


    // $(document).ready(function () {
    //     $(document).on("click", ".mobile_nav", function () {
    //         $(".navbardropdown").addClass("navopen");
    //     });
    //     $(document).on("click", ".navopen", function () {
    //         $(".navbardropdown").removeClass("navopen");
    //     });

    // });
});

// wow = new WOW({
//     boxClass: "wow", // default
//     animateClass: "animated", // default
//     offset: 50, // default
//     mobile: true, // default
//     live: true, // default
// });
// wow.init();


jQuery(document).ready(function ($) {
    // Start script here
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $(".header-sticky").addClass("sticky");
        } else {
            $(".header-sticky").removeClass("sticky");
        }

    });
    $(document).ready(function () {
        $(document).on("click", ".mobile_nav_icon-close", function () {
            $(".navbarResponsive2").removeClass("navbaropen");
        });
        $(document).on("click", ".mobile_nav_icon", function () {
            $(".navbarResponsive2").addClass("navbaropen");
        });

        // loading for main pages
        try{
            $("#get-cookie-section").load("cookie-popup.html");  // cookie-pop code by riya
            $(".footer").load("footer.html");
            $('.navbar-block-id').load("header.html");
        }catch(error){
            console("error");
        }
        
        try{
            $(".case-cookie").load("../cookie-popup.html");
            $(".footercase").load("../footer.html");
        }catch(error){
            console.log('err');
        }
        
    });

    $('.home_sec1 .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: 3000, // time for slides changes
        smartSpeed: 1000,
        autoplayTimeout:3500,
        autoplayHoverPause:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })

    $('.home_sec2 .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: false,
        autoplay: 3000, // time for slides changes
        smartSpeed: 1000,
        autoplayTimeout:3500,
        autoplayHoverPause:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    
    $('.home_sec5 .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        nav: true,
        autoplay: 3000, // time for slides changes
        smartSpeed: 2000,
        autoplayTimeout:3500,
        autoplayHoverPause:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })



    $('.stdy_section_t .owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        dots: false,
        nav: true,
        autoplay: 3000, // time for slides changes
        smartSpeed: 1000,
        autoplayTimeout:3500,
        autoplayHoverPause:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })






    $('.stdy_case5 .owl-carousel').owlCarousel({
        loop: true,
        margin: 30,
        dots: true,
        nav: false,
        autoplay: 3000, // time for slides changes
        smartSpeed: 1000,
        autoplayTimeout:3500,
        autoplayHoverPause:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    })
    $('3 .row3 .owl-carousel').owlCarousel({
        loop: true,
        margin: 42,
        dots: true,
        nav: false,
        autoplay: 3000, // time for slides changes
        smartSpeed: 2000,
        autoplayTimeout:3500,
        autoplayHoverPause:true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    })
    // $('.home_sec4 .owl-carousel').owlCarousel({
    //     loop: true,
    //     margin: 0,
    //     dots: false,
    //     nav: false,
    //     autoplay: 8000,
    //     autoplaySpeed: 30000,
    //     autoplayHoverPause: false,
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         600: {
    //             items: 1
    //         },
    //         1000: {
    //             items: 1
    //         }
    //     }
    // })

    



   
        jQuery('#slick').owlCarousel({
            stagePadding: 0,
            loop:true,
            margin:0,
            nav: false,
            dots:false,
            autoplay: true,
            slideTransition: 'linear',
            // autoplayTimeout: 3000,
            autoplaySpeed: 3000,
            autoplayHoverPause: true,
            responsive:{
                0:{
                    items:4
                },
                600:{
                    items:6
                },
                1000:{
                    items:12
                }
            }
        });
    
    
        jQuery('#slick').trigger('play.owl.autoplay',[2000]);
    
        function setSpeed(){
            jQuery('#slick').trigger('play.owl.autoplay',[2000]);
        }
    
        setTimeout(setSpeed, 500);
 



    

//      $(function(){
//     $('.home_sec4 .slick-carousel').slick({
//         slidesToShow: 12,
//         slidesToScroll: 1,         
//         autoplay: true,
//         autoplaySpeed: 500, 
//         speed: 5000,
//         cssEase: 'linear',
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 12,
//                     slidesToScroll: 1, 
//                 }
//             },
//             {
//                 breakpoint: 800,
//                 settings: {
//                     slidesToShow: 6,
//                     slidesToScroll: 1, 

//                 }
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 4,
//                     slidesToScroll: 1, 

//                 }
//             }]
//     });
// });
    function count($this) {
        var current = parseInt($this.html(), 10);
        current = current + 10; // Increment before checking
        $this.html(current);
        if (current < $this.data('count')) {
            setTimeout(function () { count($this) }, 25);
        }
    }
    $('.count-number').each(function () {
        $(this).data('count', parseInt($(this).attr('data-count'), 10));
        $(this).html('0'); // Reset to 0 before starting count
        count($(this));
    });

    function count3($this) {
        var current = parseInt($this.html(), 10);
        current = current + 10; // Increment before checking
        $this.html(current);
        if (current < $this.data('count3')) {
            setTimeout(function () { count3($this) }, 50);
        }
    }
    $('.count-number3').each(function () {
        $(this).data('count3', parseInt($(this).attr('data-count3'), 10));
        $(this).html('0'); // Reset to 0 before starting count
        count3($(this));
    });


    function count2($this) {
        var current = parseInt($this.html(), 0);
        current = current +1; // Increment before checking
        $this.html(current);
        if (current < $this.data('count2')) {
            setTimeout(function () { count2($this) }, 40);
        }
    }
    $('.count-number2').each(function () {
        $(this).data('count2', parseInt($(this).attr('data-count2'), 10));
        $(this).html('0'); // Reset to 0 before starting count
        count2($(this));
    });



    function count4($this) {
        var current = parseInt($this.html(), 0);
        current = current +3; // Increment before checking
        $this.html(current);
        if (current < $this.data('count4')) {
            setTimeout(function () { count4($this) }, 40);
        }
    }
    $('.count-number4').each(function () {
        $(this).data('count4', parseInt($(this).attr('data-count4'), 10));
        $(this).html('0'); // Reset to 0 before starting count
        count4($(this));
    });

function count5($this) {
        var current = parseInt($this.html(), 0);
        current = current +1; // Increment before checking
        $this.html(current);
        if (current < $this.data('count5')) {
            setTimeout(function () { count5($this) }, 40);
        }
    }
    $('.count-number5').each(function () {
        $(this).data('count5', parseInt($(this).attr('data-count5'), 10));
        $(this).html('0'); // Reset to 0 before starting count
        count5($(this));
    });

function count6($this) {
        var current = parseInt($this.html(), 0);
        current = current +0.5; // Increment before checking
        $this.html(current);
        if (current < $this.data('count6')) {
            setTimeout(function () { count6($this) }, 40);
        }
    }
    $('.count-number6').each(function () {
        $(this).data('count6', parseInt($(this).attr('data-count6'), 10));
        $(this).html('0'); // Reset to 0 before starting count
        count6($(this));
    });

    AOS.init({
        offset: 120,
        duration: 1500,
        once: true,
    });

    window.addEventListener('load',AOS.refresh);

// riya code

    
	
    
    var start=false;
    var device_width=window.innerWidth;
    var section_done=[false,false,false,false,false];
	function execute($this){

        if($this.attr('isfloat')==='1'){
            let inc=+$this.attr('point-decimal');
            // console.log("inc,,"+inc);
            var duration=60, num=1;
            if(inc===0.01){
                duration=7;
                num=2;
            }
            setTimeout(()=>{
                let counts = setInterval(updated,duration);
                let upto = 0.0;
                
                let atrr=+$this.attr('data-content');
                function updated() {
                upto=upto+inc;
                $this.html(upto.toFixed(num));
                if (upto >= atrr) {
                    clearInterval(counts);
                }
            }
            },200);
        }else{
            setTimeout(()=>{
                if($this.attr('data-deci')==="1"){
                    var duration=200;
                }
                    if($this.attr('data-deci')==="2"){
                        var duration=60;
                    }
                    if($this.attr('data-deci')==="3"){
                        var duration=5;
                    }
                    let counts = setInterval(updated,duration);
                    let upto = 0;
                    function updated() {
                    let atrr=parseInt($this.attr('data-content'));
                    $this.html(++upto);
                    if (upto === atrr) {
                        clearInterval(counts);
                    }
                    
                }
            },200);
        }
            
            
    }
		
	
             
	function currentScrollPercentage()
	{
		return ((document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight) * 100);
	}

	function getScrollPercent(){
        
	    var per=Math.ceil(currentScrollPercentage());
		// console.log(per);
        if(device_width>480){
            if(per>=58){

                if(!start){
                    $('#ctn-1').each(function(){
                        execute($(this));
                    });
    
                    $('#ctn-2').each(function(){
                        execute($(this));
                    });
    
                    $('#ctn-3').each(function(){
                        execute($(this));
                    });
    
                    $('#ctn-4').each(function(){
                        execute($(this));
                    });

                    $('#ctn-5').each(function(){
                        execute($(this));
                    });
                    start=true;
                }
               
            }
            
           
        }else{
           if(!start){
                if(per>=45 && per<=55 && !section_done[0]){
                    $('#ctn-1').each(function(){
                        execute($(this));
                        section_done[0]=true;
                    });
                }else if(per>55 && per<=60 && !section_done[1]){
                    $('#ctn-2').each(function(){
                        execute($(this));
                        section_done[1]=true;
                    });
                }else if(per>60 && per<=65 && !section_done[2]){
                    $('#ctn-3').each(function(){
                        execute($(this));
                        section_done[2]=true;
                    });
    
                }else if(per>65 && per<=70 && !section_done[3]){

                    $('#ctn-4').each(function(){
                        execute($(this));
                        section_done[3]=true;
                    });
                }else if(per>70 && per<=80 && !section_done[4]){
                    $('#ctn-5').each(function(){
                        execute($(this));
                        section_done[4]=true;
                    });
                }else if(per>80 ){
                    start=true;
                }
           }
        }
		
	}

    function isElementInViewport(el) {
        try {
            var rect = el.getBoundingClientRect();
    
            return (
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
            );
        } catch (error) {
            return false;
        }
        
      }
	// Event listener for scroll event
	window.addEventListener("scroll", getScrollPercent);

    // evenet listener for loading page.
    var el=document.getElementById('result-section');
    if (isElementInViewport(el)) {
        console.log('Bottom div is visible');
        if(!start){
            $('#ctn-1').each(function(){
                execute($(this));
            });

            $('#ctn-2').each(function(){
                execute($(this));
            });

            $('#ctn-3').each(function(){
                execute($(this));
            });

            $('#ctn-4').each(function(){
                execute($(this));
            });

            $('#ctn-5').each(function(){
                execute($(this));
            });
            start=true;
        }
    }
    
    //js for policy-page
    try {
        var scrollLinks = document.querySelectorAll('.item-link');

        // Add click event listener to each scroll link
        scrollLinks.forEach(function(scrollLink) {
            scrollLink.addEventListener('click', function(event) {
            // Prevent default link behavior
            event.preventDefault();
    
            // Get the target section id from the href attribute of the clicked link
            var targetId = this.getAttribute('href').substring(1);
    
            // Get the target section element by its id
            var targetElement = document.getElementById(targetId);
            var elementTop = targetElement.getBoundingClientRect().top;
            // Set focus to the target element
            window.scrollTo({
                top: elementTop-70,
                behavior: 'smooth' // You can use 'auto' for immediate scrolling
              });
            });
        });
    } catch (error) {
        console.log("error");
    }
   
    // End script here
});