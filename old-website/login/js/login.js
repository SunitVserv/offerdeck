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

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

if (!navigator.cookieEnabled) {
    $('#login_err').html("Your Browser Cookie is Disabled, Please Enable It to continue.").show();
}
$(document).ready(function () {
    $('.container').show();
    if (getParameterByName('action') == 'up' && getParameterByName('info') == 0) {
        $('.login-wraper').prepend('<div class="responseStatus success">Password updated! Please log in to continue.</div>');
    }

    if (getParameterByName('action') == 'reset') {
        $('.login-wraper').prepend('<div class="responseStatus success">Password reset successful! Please log in to continue.</div>');
    }
    checkLogin();
});

$(document).on('click', '.closeBtn, .forgot-overlay', function () {
    $('.overlay-box').fadeOut();
    $('.forgot-overlay').hide();
});

$(document).ready(function () {
    var account_id = getParameterByName("accountId");
    if (account_id) {
        $.cookie('accountId', account_id, getRespectiveCookie());
    }
    var adminError = getParameterByName("error");
    if (adminError) {
        adminError = decodeURIComponent(adminError.replace(/\+/g, " "));
        $('#login_err').html(adminError).show();
    }

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

    $('#frm-login').submit(function () {
        var frm = this;

        if (!frm.action) {
            return true;
        }

        var post_data = $(frm).serializeObject();
        $('.err_messages').hide();

        // if (!isEmail(post_data.username)) {
        if (post_data.username.length < 1) {
            var message = 'Please enter a valid Email id/Username';
            $('#login_err').html(message).show();
            frm.elements['username'].focus();
            return false;
        }

        if (post_data.password.length < 1) {
            var message = 'Please enter a valid password';
            $('#login_err').html(message).show();
            frm.elements['password'].focus();
            return false;
        }
        if ($.cookie('accountId')) {
            post_data.account_id = $.cookie('accountId')
        }
        post_data.serviceId = "od";
        $('.loader', frm).show();
        var url = api_config.base_url + api_config.login;
        $('button[type=submit], input[type=submit]').attr('disabled', true);
        $('#frm-submit').hide();
        $.ajax({
            url: url,
            type: 'post',
            data: JSON.stringify(post_data),
            contentType: "application/json",
            dataType: 'json',
            crossDomain: true,
            success: function (data) {
                $('#frm-submit').show();
                $('button[type=submit], input[type=submit]').attr('disabled', false);
                if(data.status == 173){
                    var message = 'User doesn\'t belongs to this Interface' ;
                    $('#login_err').html(message).show();
                    $('.loader', frm).hide();
                    return false;  
                } else if (data.status == 0 || data.status == 118) {
                    $.cookie('user-info', JSON.stringify(data), getRespectiveCookie());
                    $.cookie('token', data.token, getRespectiveCookie());
                    $.removeCookie('accountId', getRespectiveCookie());
                    var return_to = getParameterByName('return_to');
                    if (data.account.state == -3) {
                        window.parent.window.location.href = 'my-account.html';
                    } else {
                        if (return_to) {
                            window.parent.window.location = return_to;
                        } else if (data.action['do'] == 'REDIRECT') {

                            // location.href = data.action.url;
                            window.parent.window.location.href = data.action.url;
                        }
                    }
                } else if (data.status == 117) {

                    $(frm).attr('target', '_top');
                    frm.action = data.action.url;
                    frm.submit();
                } else {
                    var message = MSG[data.status] || MSG['default_login'];
                    if (message) {
                        $('#login_err').html(message).show();
                    }

                }
                $('.loader', frm).hide();
            }
        });
        $('#frm-submit').show();
        $('button[type=submit], input[type=submit]').attr('disabled', false);

        return false;
    });

    $('#fb_signin').click(function () {
        FB.Event.unsubscribe('auth.authResponseChange', fbHandler);
        FB.Event.subscribe('auth.authResponseChange', fbHandler);
        FB.login(function (response) {
        }, {
            scope: 'email,public_profile'
        });
    });

    $('#gp_signin').click(function () {
        gapi.auth.signOut();
        var additionalParams = {
            'clientid': social_config.gp.clientId,
            'cookiepolicy': 'single_host_origin',
            'scope': 'https://www.googleapis.com/auth/userinfo.email',
            'callback': signinCallback
        };
        gapi.auth.signIn(additionalParams);
    });

    function signinCallback(authResult) {

        if (authResult['status']['signed_in']) {
            if (authResult['status']['method'] == 'PROMPT') {
                var token = authResult.access_token;
                var channel = 'GP'
                var post_data = {
                    "channel": channel,
                    "access_token": token,
                    "serviceId": 'od'
                }
                login(post_data);
            }
        } else {
            console.log('Sign-in state: ' + authResult['error']);
            return false
        }
    }

    $('#btn-forgot-password').click(function () {
        var email = $('#forgot-email')[0];
        $('.err_messages, .notif_messages').hide();

        if (!isEmail(email.value)) {
            //var message = 'Please enter a valid email address';
            //$('#forgot_err').html(message).show();
            //email.focus();
            //return false;
        }
        var post_data = {
            'email_address': email.value,
            "serviceId": 'od'
        }
        var loader = $(this).next('.loader');
        loader.show();

        var url = api_config.base_url + api_config.password_recovery;
        //$('button[type=button], input[type=submit]').attr('disabled',true);
        $('#btn-forgot-password').attr('disabled', true);
        $('#btn-forgot-password').hide();
        $.ajax({
            url: url,
            type: 'post',
            data: JSON.stringify(post_data),
            contentType: "application/json",
            dataType: 'json',
            success: function (data) {
                $('#btn-fgrggt-password').show();
                $('#btn-forgot-password').attr('disabled', false);
                loader.hide();
                if (data.status == 0) {
                    var message = 'Please check email for instruction on resetting your password.';
                    $('#forgot_msg').html(message).show();
                    $('#forgot-email').val('');
                } else if (data.status == 100) {
                    var message = 'Please enter a valid email address';
                    $('#forgot_err').html(message).show();
                } else if (data.status == 105) {
                    var message = 'Email not registered';
                    $('#forgot_err').html(message).show();
                } else if (data.status == 101) {
                    var message = 'User is Blocked';
                    $('#forgot_err').html(message).show();
                } else if (data.status == 102) {
                    var message = 'User is Inactive';
                    $('#forgot_err').html(message).show();
                } else if (data.status == 159) {
                    var message = 'Can not reset password, you have registered using your social account.';
                    $('#forgot_err').html(message).show();
                } else if (data.status == 173) {
                    var message = 'No account linked to this interface.';
                    $('#forgot_err').html(message).show();
                }
            }
        });
        $('#btn-forgot-password').show();
        $('#btn-forgot-password').attr('disabled', false);
    });

    $('#forgot-email').bind("enterKey", function (e) {
        var email = $('#forgot-email')[0];
        $('.err_messages, .notif_messages').hide();

        if (!isEmail(email.value)) {
            //var message = 'Please enter a valid email address';
            //$('#forgot_err').html(message).show();
            //email.focus();
            //return false;
        }
        var post_data = {
            'email_address': email.value
        }
        var loader = $(this).next('.loader');
        loader.show();

        var url = api_config.base_url + api_config.password_recovery;
        //$('button[type=button], input[type=submit]').attr('disabled',true);
        $('#btn-forgot-password').attr('disabled', true);
        $('#btn-forgot-password').hide();
        $.ajax({
            url: url,
            type: 'post',
            data: JSON.stringify(post_data),
            contentType: "application/json",
            dataType: 'json',
            success: function (data) {
                $('#btn-fgrggt-password').show();
                $('#btn-forgot-password').attr('disabled', false);
                loader.hide();
                if (data.status == 0) {
                    var message = 'Please check email for instruction on resetting your password.';
                    $('#forgot_msg').html(message).show();
                    $('#forgot-email').val('');
                } else if (data.status == 100) {
                    var message = 'Please enter a valid email address';
                    $('#forgot_err').html(message).show();
                } else if (data.status == 105) {
                    var message = 'Email not registered';
                    $('#forgot_err').html(message).show();
                } else if (data.status == 101) {
                    var message = 'User is Blocked';
                    $('#forgot_err').html(message).show();
                } else if (data.status == 102) {
                    var message = 'User is Inactive';
                    $('#forgot_err').html(message).show();
                } else if (data.status == 159) {
                    var message = 'Can not reset password, you have registered using your social account.';
                    $('#forgot_err').html(message).show();
                }
            }
        });
        $('#btn-forgot-password').show();
        $('#btn-forgot-password').attr('disabled', false);
    });
    $('#forgot-email').keyup(function (e) {
        if (e.keyCode == 13)
        {
            $(this).trigger("enterKey");
        }
    });
    // END READY
});

function login(post_data) {
    $('.err_messages').hide();
    var url = api_config.base_url + api_config.login;
    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(post_data),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            if(data.status == 173){
                  var message = 'User doesn\'t belongs to this Interface' ;
                  $('#login_err').html(message).show();
                  $('.loader', frm).hide();
                  return false;  
            } else if (data.status == 0 || data.status == 118 || data.status == 117) {
                /*
                if(data.action['do'] == 'REDIRECT'  || data.action['do'] == 'LOGIN') {
                    var redirectURL = data.action.url;
                    if((data.status == 117 && data.action['do'] == 'LOGIN') || (data.status == 0  && jQuery.inArray(data.user.login_on, valid_interface) === -1)) {
                        var message = 'User doesn\'t belongs to OfferDeck Interface. <a href="'+redirectURL+'" target="_blank"> Click here </a> to login' ;
                        $('#login_err').html(message).show();
                        $('.loader', frm).hide();
                        return false;                            
                    }
                }*/
                $.cookie('user-info', JSON.stringify(data), getRespectiveCookie());
                $.cookie('token', data.token, getRespectiveCookie());
                var return_to = getParameterByName('return_to');
                if (data.account.state == -3) {
                    //location.href = 'my-account.html';
                    window.parent.window.location.href = 'my-account.html';
                } else {
                    if (return_to) {
                        window.parent.window.location = return_to;
                    } else if (data.action['do'] == 'REDIRECT') {
                        window.parent.window.location = data.action.url;
                    }
                }
            } else if (data.status == 114) {
                if (post_data.channel == 'FB') {
                    fbHandlerSocialSignup(post_data.access_token);
                } else {
                    $.cookie('social_login', JSON.stringify(post_data), getRespectiveSocialCookie());

                    //window.parent.window.location = path.register[current_host] ;
                    window.parent.window.location = path.register[current_host] + "?social_reg=1";
                    //var message = 'You are not registered, please click on register';
                    //$('#login_err').html(message).show();
                }
            } else if (data.status == 117) {
                var frm_login = $('#frm-login')[0];
                $(frm_login).attr('target', '_top');
                frm_login.action = data.action.url;
                frm_login.elements['channel'].value = post_data.channel;
                frm_login.elements['access_token'].value = post_data.access_token;
                frm_login.submit();
            } else {
                var message = MSG[data.status] || MSG['default_login'];
                if (message) {
                    $('#login_err').html(message).show();
                }
            }
        }
    });
}

function fbHandler(response) {
    if (response.status === 'connected') {
        var token = response.authResponse.accessToken;
        var channel = 'FB'
        var post_data = {
            "channel": channel,
            "access_token": token,
            "serviceId": 'od'
        }
        login(post_data);
    }
}

function fbHandlerSocialSignup(accessToken) {
    var token = accessToken;
    var channel = 'FB'
    FB.api('/me',
            {fields: "id,email,name"},
    function (response) {
        console.log('API response', response);
        var post_data = {
            "name": response.name,
            "email": response.email,
            "access_token": token,
            "channel": channel,
            "serviceId": 'od',
        }
        //console.log(JSON.stringify(post_data));
        $.cookie('social_login', JSON.stringify(post_data), getRespectiveSocialCookie());
        window.parent.window.location.href = path.register[current_host] + "?social_reg=1";
    }
    );
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function overlayBox(popUpId) {
    overlayPossition(popUpId);
    overlayId = popUpId;
    $('body').append('<div class="forgot-overlay"></div>');
    $('#' + popUpId).fadeIn();
}
var winWidth, winHeight, popId, boxHeight, boxWidth, marginTB, marginLR, overlayId

function overlayPossition(popUp) {
    winWidth = $(window).width();
    winHeight = $(window).height();
    popId = $('#' + popUp)
    boxHeight = popId.outerHeight();
    boxWidth = popId.outerWidth();
    marginTB = (winHeight - boxHeight) / 2;
    marginLR = (winWidth - boxWidth) / 2;
    if (marginTB < 0) {
        popId.css({
            'top': '30px',
            'left': marginLR,
            'position': 'absolute',
        });
    } else {
        popId.css({
            'top': marginTB,
            'left': marginLR,
        });
    }
}

function getRespectiveCookie() {
     obj = {path: '/', domain: api_config.cookie_domain};
     if (current_host == 'intelliswift.vserv.mobi' || current_host == 'local.intelliswift.vserv.mobi') {
     obj = {path: '/', domain: '.vserv.mobi'};
     }
     return obj; 
}
function getRespectiveSocialCookie() {
    obj = {expires: 1, path: '/', domain: api_config.cookie_domain};
    if (current_host == 'intelliswift.vserv.mobi' || current_host == 'local.intelliswift.vserv.mobi') {
        obj = {expires: 1, path: '/', domain: '.vserv.mobi'};
    }
    return obj;
}

function checkLogin() {
    var token = $.cookie('token');
    config.user_good = false;
    if (token) {
        config.token = token;
        var user_info = $.cookie('user-info');
        var accountnull = false;
        if (user_info) {

            user_info = JSON.parse(user_info);
            if (!user_info.accounts) {
                user_info.accounts = [];

            }
        }
        if (user_info.status == 0 || user_info.status == 118) {
            $.cookie('user-info', JSON.stringify(user_info), getRespectiveCookie());
            $.cookie('token', user_info.token, getRespectiveCookie());
            var return_to = getParameterByName('return_to');
            if (return_to) {
                window.parent.window.location = return_to;
            } else if (user_info.action['do'] == 'REDIRECT') {
                window.parent.window.location = user_info.action.url;
            }
        } else if (user_info.status == 114) {
            $.cookie('social_login', JSON.stringify(post_data), getRespectiveSocialCookie());
            window.parent.window.location = path.register[current_host] + "?social_reg=1";
            //var message = 'You are not registered, please click on register';
            //$('#login_err').html(message).show();
        } else if (user_info.status == 117) {
            var frm_login = $('#frm-login')[0];
            $(frm_login).attr('target', '_top');
            frm_login.action = user_info.action.url;
            frm_login.elements['channel'].value = post_user_info.channel;
            frm_login.elements['access_token'].value = post_user_info.access_token;
            frm_login.submit();
        } else {
            var message = MSG[user_info.status] || MSG['default_login'];
            if (message) {
                $('#login_err').html(message).show();
            }
        }
    }
}
