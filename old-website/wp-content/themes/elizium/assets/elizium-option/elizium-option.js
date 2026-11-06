/**
 * Elizium options
 *
 * @version elizium 1.0.0
 * 
 */﻿

(function($){
    
    var EliziumOptions={
        init: function(){
            var optionURL= elizium.template_url + "/assets/elizium-option";
            this.loadSkin(optionURL);
            this.loadLess(optionURL);
            this.stickyHeader();
            this.layoutStyle();
            
        },
        
        loadSkin: function(optionURL){
        	//rel="stylesheet/less" type="text/css"
            $("head").append($('<link rel="stylesheet" type="text/less">').attr("href", optionURL + "/css/skin.less"));
        },
        loadLess: function(optionURL){
            var self=this;
            $.getScript(optionURL + "/less.js", function(data, textStatus, jqxhr) {
            	
                self.setLessValue();
            });
        },
        
        setLessValue: function(){
            less.modifyVars({
                skinColor : elizium.color,
                fontFamily : elizium.global_font
            }); 
        },
        
        stickyHeader: function(){
            var self=this;
            var sticky=elizium.sticky_header;
            var menuType=elizium.menu_type;
            
            self.fixedNav(sticky, menuType);
            self.navPosition(menuType);
            
        },
       layoutStyle : function() {
			var layout=elizium.layout;
			if (layout == 'fullWidth') {
				$('#wrapper').removeClass('boxed')
				$('#layout .layout-column').removeClass('radio-active')
				$('#full-width').addClass('radio-active')
			} else {
				$('#wrapper').addClass('boxed')
				$('#layout .layout-column').removeClass('radio-active')
				$('#boxed').addClass('radio-active')
			}

			
			if ($('.main-banner').length) {
				$('.main-banner .tp-rightarrow ').trigger('click')
			}
		},        
        fixedNav: function($sticky, $navPosition){
			// Fixed Header JS
			var initScroll = $(window).scrollTop();
			var headerHeight = $('#header').height()
			var fixedNav = function() {

				var $HeaderNav = $('#header').find('.navbar')
				var currentScroll = $(window).scrollTop()
				function inteligent() {
					if (currentScroll > initScroll) {
						//console.log('up')
						$HeaderNav.removeClass('down')
						$HeaderNav.addClass('up')
						if (currentScroll == $(document).height() - $(window).height()) {
							$HeaderNav.removeClass('up')
							$HeaderNav.addClass('down')
						}
						initScroll = currentScroll
					} else {
						//console.log('down')
						$HeaderNav.removeClass('up')
						$HeaderNav.addClass('down')
						initScroll = currentScroll
					}
				}

				if ($navPosition == "top") {
					$HeaderNav.addClass('navbar-fixed-top')
					if ($sticky == "yes") {
						inteligent()
					} else {
						$HeaderNav.removeClass('up')
						$HeaderNav.addClass('Down')
					}
				} else {
					if ($sticky == "yes") {
						if (currentScroll > $('#header').offset().top + $('#header').height()) {
							$HeaderNav.addClass('navbar-fixed-top')
							$('#header').css("padding-top", headerHeight)
							inteligent()
						} else {
							$HeaderNav.removeClass('navbar-fixed-top up down')
							$('#header').css("padding-top", "0")
						}
					} else {
						if (currentScroll > $('#header').offset().top) {
							$('#header').css("padding-top", headerHeight)
							$HeaderNav.addClass('navbar-fixed-top')
						} else {
							$HeaderNav.removeClass('navbar-fixed-top up down')
							$('#header').css("padding-top", "0")
						}
					}
				}
			}
			if ($('#header').length) {
				fixedNav();
			}
			$(window).scroll(function() {
				if ($('#header').length) {
					fixedNav();
				}
			});
        	
        },
		navPosition : function(navPosition) {
			if (navPosition == "top") {
				$('#header').find('.navbar').addClass('navbar-fixed-top')
				$('#header-position .layout-column').removeClass('radio-active')
				$('#header-top').addClass('radio-active')
			} else if (navPosition == "bottom") {
				$('#header').find('.navbar').removeClass('navbar-fixed-top')
				$('#header-position .layout-column').removeClass('radio-active')
				$('#header-bottom').addClass('radio-active')
			} else {
				$('#header').find('.navbar').removeClass('navbar-fixed-top')
				$('#header-position .layout-column').removeClass('radio-active')
				$('#header-default').addClass('radio-active')
			}
		},
        
    };
    
    EliziumOptions.init();
    
})(jQuery); 
