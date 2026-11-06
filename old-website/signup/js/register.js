var preserve = {};

window.fbAsyncInit = function () {
    FB.init({
        appId: social_config.fb.appId,
        status: true,
        cookie: true,
        xfbml: true
    });
};

// FB SDK
(function (d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));

// GP SDK
(function () {
    var po = document.createElement('script');
    po.type = 'text/javascript';
    po.async = true;
    po.src = 'https://apis.google.com/js/client:plusone.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(po, s);
})();

var callbackcalled = false;
$(document).ready(function () {
    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    $("#submit-normal").click(function () {
        $('#frm-register').data('validator', null);
        $("#frm-register").unbind('validate');
        if (!($("#terms_conditions").is(':checked'))) {
            $('#terms_error').slideDown();
            return false;
        } else {
            $('#terms_error').slideUp();
        }
        var validator =  $("#frm-register").validate({
            rules: {
                email_address: {
                    required: true,
                    email: true
                },
                company_name: {
                    required: true
                },
                contact_name: {
                    required: function(element) {
                        if ($('input[name=signup_as]:radio:checked').val().toLowerCase() == 'individual') {
                           return true;
                        }
                        else {
                            return false;
                        }
                    }
                },
                website_url: {
                    required: false,
                    url: true
                },
            },
            errorPlacement: function(error, element) {
                if($(element).prop("id") === "terms_conditions") {     
                    $("#agree").append(error); 
                    return false; 
                }else{
                    error.insertAfter(element);
                }
            }
        });
        if($("#frm-register").valid()){
            $('.loader').show();
            var _signupas = $('input:radio[name=signup_as]:checked').attr('id');
            var _emailid = $('#email_address').val();
            var _skype = $('#skype_id').val();

            var _websiteurl = $('#website_url').val();
            var _companyname = $('#company_name').val();
            var _contactname = $('#contact_name').val();

            var _marketing = getLeadData();
            var post_data = {
                    "signup_as": _signupas,
                    "email_address": _emailid,
                    "name": _contactname,
                    //"contactname": _contactname,
                    "company_name": _companyname,
                    "website_url": _websiteurl,
                    "skype_id": _skype,
                    "at": "Affiliate",
                    "serviceId": "od",
                    "marketing" : _marketing
                }
            register(post_data);  
        }
    });
    
    $("#gp_signin").click(function () {
        $('#frm-register').data('validator', null);
        $("#frm-register").unbind('validate');
        if (!($("#terms_conditions").is(':checked'))) {
            $('#terms_error').slideDown();
            return false;
        } else {
            $('#terms_error').slideUp();
        }
        var validator =  $("#frm-register").validate({
            rules: {
                company_name: {
                    required: true,                 
                },
                website_url: {
                    required: false,
                    url: true
                }
            },
            errorPlacement: function(error, element) {
                if($(element).prop("id") === "terms_conditions") {
                    $("#agree").append(error); return false;
                }else{
                    error.insertAfter(element);
                }
            }
        });
        if($("#frm-register").valid()){
            $('.loader').show();
            var additionalParams = {
            'clientid': social_config.gp.clientId,
            'cookiepolicy': 'single_host_origin',
            'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'callback': signinCallback
            };
            gapi.auth.signIn(additionalParams); 
        }
    }); 
    
    $("#fb_signin").click(function () {
        $('#fb_signin').attr('disabled', true);
        $('#frm-register').data('validator', null);
        $("#frm-register").unbind('validate');
        if (!($("#terms_conditions").is(':checked'))) {
            $('#fb_signin').attr('disabled', false);
            $('#terms_error').slideDown();
            return false;
        } else {
            $('#terms_error').slideUp();
        }
        var validator = $("#frm-register").validate({
            rules: {
                company_name: {
                    required: true
                },
                website_url: {
                    required: false,
                    url: true
                }
            },
            errorPlacement: function(error, element) {
                $('#fb_signin').attr('disabled', false);
                if($(element).prop("id") === "terms_conditions") { 
                     $('#fb_signin').attr('disabled', false);
                    $("#agree").append(error); return false;
                }else{
                    error.insertAfter(element);
                    $('#fb_signin').attr('disabled', false);
                }
            }
        });
        if($("#frm-register").valid()){
            $('#fb_signin').attr('disabled', true);
            $('.loader').show();
            FB.Event.unsubscribe('auth.authResponseChange', fbHandler);
            FB.Event.subscribe('auth.authResponseChange', fbHandler);
            FB.login(function (response) { 
            if(response.status == "unknown" || response.authResponse =='' ){
                $('#fb_signin').attr('disabled',false);
            }
            }, {scope: 'email,public_profile'});
            $('.loader').hide();
        }else{
            $('#fb_signin').attr('disabled', false);
        }
    });  


    var social_login = $.cookie('social_login');
    var social_res = getParameterByName("social_reg");
    if (social_login && social_res) {
        social_login = JSON.parse(social_login);
       
       if(social_login.channel == 'GP') {
            $.removeCookie('social_login', {path: '/'});          
            var authresult = {"access_token":social_login.access_token ,"status":{"signed_in" : true }}
            $('.login-wraper').hide();
            $('#social-signup-step2').show();
            signinCallback(authresult);
         
        }else if (social_login.channel =='FB') { 
            $.removeCookie('social_login', {path: '/'});           
            $('#company_name_social').val(social_login.name);
            $('#email_id_social').val(social_login.email);
            $('#access_token').val(social_login.access_token);
            $('#channel').val(social_login.channel);
            $('.login-wraper').hide();
            $('#social-signup-step2').show();
       }
    }
  
}); //end doc ready

function register(post_data) {
    $('.err_messages').hide();
    $('#submit-normal').attr('disabled', true);
    var url = api_config.base_url + api_config.register;
    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(post_data),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            $('.loader').hide();
            if (data.status == 112) {
                var message = 'Email already registered';
                $('#reg_err').html(message).slideDown();
            } else if (data.status == 107) {
                var message = 'Social media authentication failed';
                $('#reg_err').html(message).slideDown();
            } else if (data.status == 108) {
                var message = 'Unable to get email address from social service';
                $('#reg_err').html(message).slideDown();
            } else if (data.status == 110) {
                var message = 'Please verify your account on social service';
                $('#reg_err').html(message).slideDown();
            } else if (data.status == 114) {
                var message = 'Account type required';
                $('#reg_err').html(message).slideDown();
            } else {
                
                if (data.action && data.action.intermediatepage) {
                    var redirectURL = data.action.url;
                    if(jQuery.inArray(data.user.login_on, valid_interface) === -1) {
                        var message = 'User doesn\'t belongs to OfferDeck Interface. <a href="'+redirectURL+'" target="_blank"> Click here </a> to login' ;
                        $('#reg_err').html(message).show();
                         //$('#reg_err_social').html(message).show();
                        $('.loader', frm).hide();
                        return false;                            
                    }
                    $.cookie('user-info', JSON.stringify(data), getRespectiveCookie());
                    $.cookie('token', data.token, getRespectiveCookie());
                    $.removeCookie('accountId', getRespectiveCookie());
                    
                    data.channel = post_data.channel;
                    data.access_token = post_data.access_token;
                    $.cookie('vserv_forward', true, {path: '/'});
                    $.cookie('reg_response', JSON.stringify(data), {path: '/'});
                    location.href = data.action.intermediatepage;
                } else if (data.action && data.action['do'] == 'REDIRECT') {
                    var redirectURL = data.action.url;
                    if(jQuery.inArray(data.user.login_on, valid_interface) === -1) {
                        var message = 'User doesn\'t belongs to OfferDeck Interface. <a href="'+redirectURL+'" target="_blank"> Click here </a> to login' ;
                        $('#reg_err').html(message).show();
                        //$('#reg_err_social').html(message).show();
                        $('.loader', frm).hide();
                        return false;                            
                    }
                    $.cookie('user-info', JSON.stringify(data), getRespectiveCookie());
                    $.cookie('token', data.token, getRespectiveCookie());
                    $.removeCookie('accountId', getRespectiveCookie());
                    var return_to = getParameterByName('return_to');

                    if (data.account.state == -3) {                        
                       // location.href = 'my-account.html';
                        window.parent.window.location.href = 'my-account.html';
                    } else {                        
                        if (return_to) {
			    //location.href = decodeURIComponent(return_to);
                            window.parent.window.location.href = decodeURIComponent(return_to);
                        } else if (data.action['do'] == 'REDIRECT') {
                           // location.href = data.action.url;
                           window.parent.window.location.href = data.action.url;
                        }                        
                    }
                   // location.href = data.action.url;
                   window.parent.window.location.href = data.action.url;
                } else {
                    if (data.status == 117) {
                        var frm_login = $('#frm-login')[0];
                        frm_login.action = data.action.url;
                        frm_login.elements['channel'].value = post_data.channel;
                        frm_login.elements['access_token'].value = post_data.access_token;
                        frm_login.submit();
                    } else if (data.status == 0) {
                        //window.parent.window.location.href = api_config.more_info;
			window.parent.window.location.href = "/";
	                $.cookie('odsessionid',data.ref_token);
                      //location.href = api_config.thank_you;
                     // window.parent.window.location.href = api_config.thank_you;
                      //location.href = 'thankyou.html';
                    }
                }
            }
        $('#submit-normal').attr('disabled',false); 
        $('#gp_signin').attr('disabled', false);
        $('#fb_signin').attr('disabled', false);
        }
    });
}

    function signinCallback(authResult) {
        if (authResult['status']['signed_in'] && callbackcalled === false ) {
            var token = authResult.access_token;
            var channel = 'GP';
            var frm  = $('#frm-register')[0];
            var form_data = $(frm).serializeObject();
            var _signupas = $('input:radio[name=signup_as]:checked').attr('id');            
            
            var post_data = {
                "channel": channel,
                "access_token": token,
            };
            post_data.signup_as     = _signupas;
            post_data.email_address = form_data.email_address;
            post_data.company_name = form_data.company_name;
            post_data.name = form_data.contact_name;
            post_data.website_url = form_data.website_url;
            post_data.skype_id = form_data.skype_id;
            post_data.at = 'Affiliate';
            post_data.marketing = getLeadData();
            post_data.serviceId = 'od';
            $('#gp_signin').attr('disabled', true);
            register(post_data);
            callbackcalled = true;
        } else {
            $('#gp_signin').attr('disabled', false);
            $('.loader').hide();
        }
    }

function fbHandler(response) {
    if (response.status === 'connected') {        
        var frm  = $('#frm-register')[0];
        var form_data = $(frm).serializeObject();
        var _signupas = $('input:radio[name=signup_as]:checked').attr('id');

        var token = response.authResponse.accessToken;
        var channel = 'FB';

        var post_data = {
            "channel": channel,
            "access_token": token
        };
        post_data.signup_as     = _signupas;
        post_data.name = form_data.contact_name;
        post_data.company_name = form_data.company_name;
        post_data.website_url = form_data.website_url;
        post_data.skype_id = form_data.skype_id;
        post_data.at = 'Affiliate';
        post_data.marketing = getLeadData();
        post_data.serviceId = 'od';
        register(post_data);
      
    }else{
        $('.loader').hide();
        $('#fb_signin').attr('disabled',false);
    }
}

function redirectToThankyou(url, email, at) {
    var redirect_url = url;
    if (email) {
        redirect_url = redirect_url + "&email_address=" + email;
    }
    if (at) {
        redirect_url = redirect_url + "&at=" + at;
    }
    window.parent.window.location.href = redirect_url;
}

function getRespectiveCookie() {
    obj = {path: '/', domain: '.'+api_config.cookie_domain};
    if (current_host == 'intelliswift.vserv.mobi' || current_host == 'local.intelliswift.vserv.mobi') {
        obj = {path: '/', domain: '.vserv.mobi'};
    }
    return obj;
}
function getRespectiveSocialCookie() {
    obj = {expires: 1, path: '/', domain: '.'+api_config.cookie_domain};
    if (current_host == 'intelliswift.vserv.mobi' || current_host == 'local.intelliswift.vserv.mobi') {
        obj = {expires: 1, path: '/', domain: '.vserv.mobi'};
    }
    return obj;
}
