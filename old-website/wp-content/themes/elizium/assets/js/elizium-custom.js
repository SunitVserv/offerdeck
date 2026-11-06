/**
 * Elizium options
 *
 * @scince elizium 1.0.0
 * 
 */

(function($){
/**
     *Contact Form 7
     */
    var EliziumCF7={
        init: function(){
            this.events();
            this.inputAnimation();
            
        },
        events: function(){
            var self=this;
            $(document).on("click", "#submit", function(){
                return  self.cf7Validation(this);
            });
            $(document).on("blur", "form.wpcf7-form #name, form.wpcf7-form #site, form.wpcf7-form #email, form.wpcf7-form #msg", function(){
                return  self.cf7Blur(this);
            });
        },
        
        cf7Blur: function($this){
            var $val=$($this).val();
            
            if($val == ""){
                $($this).parents(".form-group").addClass('error');
            }
            else{
                $($this).parents(".form-group").removeClass('error');
            }
            
            return false;
        },
        
        cf7Validation: function ($this){
            var $flag = true;
            
            var $form=$($this).parents("form.wpcf7-form");
            
            this.cf7Reset($form); // reset form
            
            var $name=$form.find("#name").val();
            var $site=$form.find("#site").val();
            var $email=$form.find("#email").val();
            var $msg=$form.find("#msg").val();

            if ($name == "") {
                $form.find("#name").parents(".form-group").addClass('error');
                $flag = false;
            }
            if ($site == "") {
                $form.find("#site").parents(".form-group").addClass('error');
                $flag = false;
            }
            
            var $emailRgx = /^([a-zA-Z.0-9])+@([a-zA_Z0-9])+\.([a-zA-Z])/;
            if ($email == "" || !$emailRgx.test($email)) {
                $email=$form.find("#email").parents(".form-group").addClass('error');
                $flag = false;
            }
            
            if ($msg == "") {
                $form.find("#msg").parents(".form-group").addClass('error');
                $flag = false;
            }
            return $flag;
        },
        
        cf7Reset: function($form){
            
            $form.find(".form-group").removeClass('error');
        },
        inputAnimation: function() {
            var d;
            //animation time
            $(".form-group input, .form-group textarea").focus(function() {
                // var tm = $(this).outerHeight() / 2.1 * -1.1 + "px";
                var tm = '-30px';
                $(this).parent().prev('.label-text').addClass("focussed").children().stop(true).each(function(i) {
                    d = i * 50;
                    //delay
                    $(this).delay(d).animate({
                        top: tm
                    }, 200, 'easeOutBack');
                })
            })
            $(".form-group input, .form-group textarea").blur(function() {
                //animate the label down if content of the input is empty
                if ($(this).val() == "") {
                    $(this).parent().prev('.label-text').removeClass("focussed").children().stop(true).each(function(i) {
                        d = i * 50;
                        $(this).delay(d).animate({
                            top: 0
                        }, 500, 'easeInOutBack');
                    })
                }
            })
        },
        
    };
    
    
    if($('form.wpcf7-form').length> 0){
    	EliziumCF7.init();
    }
    
    var EliziumCommentForm={
            init: function(){
                this.events();
                
            },
            events: function(){
                var self=this;
                $(document).on("click", "#comment-submit", function(){
                    return  self.validation(this);
                });
                $(document).on("blur", "form#commentform #name, form#commentform #site, form#commentform #email, form#commentform #msg", function(){
                    return  self.cfBlur(this);
                });
            },
            
            cfBlur: function($this){
                var $val=$($this).val();
                
                if($val == ""){
                    $($this).parents(".form-group").addClass('error');
                }
                else{
                    $($this).parents(".form-group").removeClass('error');
                }
                
                return false;
            },
            
            validation: function ($this){
                var $flag = true;
                
                var $form=$($this).parents("form#commentform");
                
                this.reset($form); // reset form
                
                var $name=$form.find("#name").val();
                var $site=$form.find("#site").val();
                var $email=$form.find("#email").val();
                var $msg=$form.find("#msg").val();

             if($form.find("#name").length > 0){		
                if ($name == "") {
                    $form.find("#name").parents(".form-group").addClass('error');
                    $flag = false;
                }
                if ($site == "") {
                    $form.find("#site").parents(".form-group").addClass('error');
                    $flag = false;
                }
                
                var $emailRgx = /^([a-zA-Z.0-9])+@([a-zA_Z0-9])+\.([a-zA-Z])/;
                if ($email == "" || !$emailRgx.test($email)) {
                    $email=$form.find("#email").parents(".form-group").addClass('error');
                    $flag = false;
                }
             } 
                
                if ($msg == "") {
                    $form.find("#msg").parents(".form-group").addClass('error');
                    $flag = false;
                }
                return $flag;
            },
            
            reset: function($form){
                
                $form.find(".form-group").removeClass('error');
            }
    		
    }
    
    if($('form#commentform').length> 0){
    	EliziumCommentForm.init();
    }
    

    
    
 })(jQuery);    