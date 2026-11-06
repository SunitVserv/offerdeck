/***
 * 
 * New Prototype added:
 * 1) String.prototype.sanitize(); Accepted values name/id/no
 * 
 */
var in_campaign_create = window.parent.campaign_create ? true : false;
$(function () {
///Detect Mobile browser and add a class to the "html" atg
    __usrAgents = navigator.userAgent || navigator.vendor || window.opera;
    _detectMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(__usrAgents) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(__usrAgents.substr(0, 4));
    if (_detectMobile)
        $('body').addClass('mobile');
    $('.details').click(function () {
        if ($(this).parents('dl').children('dd').css('display') == 'none') {
            $(this).text('Hide')
            $(this).parents('dl').addClass('active')
            $(this).parents('dl').children('dd').slideDown();
        } else {
            $(this).text('Details')
            $(this).parents('dl').removeClass('active')
            $(this).parents('dl').children('dd').slideUp();
        }
    })
    $('.filter-mobile a').click(function () {
        $('.filter-inner .type-start-wrap, .filter-inner .filter-sort-wrap').slideToggle();
    })

    $(document).on('click', '.customize-view', function () {
        $('.campaign-customize-view').slideToggle();
        if ($('.search-filter').is(':visible')) {
            $('.search-filter').hide();
        }
        $('.tabHeader').toggleClass('closed');
    });

    //select all
    $('.select-links .select-all').click(function () {
        $('.product-list ul li').children('input[type=checkbox]').attr('checked', 'checked')
    })
    $('.select-links .select-none').click(function () {
        $('.product-list ul li').children('input[type=checkbox]').removeAttr('checked')
    })

    $(document).on("click", ".showur-filed .select-all", function () {
        $('.lst-pop-country li').each(function (i) {
            $(this).find('input[type="checkbox"]')[0].checked = true;
        });
    });

    $(document).on("click", ".showur-filed .select-none", function () {
        $('.lst-pop-country li').find('input[type="checkbox"]').removeAttr('checked');
    });
    // filter menu start
    // $('.filter li a').click(function() {
    // $('.hover-menu').fadeOut();
    // $('.filter li a').removeClass('active');
    // $(this).next('.hover-menu').slideToggle();
    // $(this).addClass('active');
    // });

    $(document).off('click', '.open-hover-menu').on('click', '.open-hover-menu', function (e) {
        e.preventDefault();
        if($(this).hasClass('disabled'))
            return;
        $('.hover-menu').fadeOut();
//        $('.filter li a').removeClass('active');
        $('.filter li a').removeClass('collapse active close-hover-menu').addClass('open-hover-menu');
        $(this).next('.hover-menu').slideDown();
        $(this).addClass('active close-hover-menu collapse').removeClass('open-hover-menu');
//        $(this).addClass('collapse');
    });
    $(document).on('click', '.close-hover-menu', function (e) {
        e.preventDefault();
        $('.hover-menu').fadeOut();
        $(".filter li a").removeClass("collapse active close-hover-menu").addClass('open-hover-menu');
    });
    /*$(document).on('click', '.apply-filters', function () {
        applyFilters();
        $('.hover-menu').fadeOut();
    });*/
    $(document).on('click', '.open-dropdown', function () {
        $(this).next('.dropdown-menu').slideToggle();
    });
    $(document).on('click', '.dropdown-menu a.apply, .dropdown-menu a.close', function (e) {
        e.preventDefault();
        $(this).parents('.dropdown-menu').slideUp();
    });
    //earning history show hide
    $(document).on('click', '.earning-history dl dt h4', function () {
        $(this).parents('dl').children('dd').slideToggle();
        $(this).parents('dl').children('dt').toggleClass('active');
    })
    // filter menu end

    //$('#header').load('header-include.html')
    //$('#account-filter').load('component-account-filter.html')
    //$('#account-filter').html(new EJS({url: 'templates/my-account/account-overview.ejs'}).render(getAccountOverViewStatus()));
    $('#left-nav').load('left-nav.html');

    function showHideSubDiv(ele) {
        var main_div = $(ele).next();
        var dd = $(ele).closest('dd');
        var sub_div = dd.children('.sub-div');
        sub_div.slideToggle();
        dd.toggleClass('open');
        $(ele).toggleClass("expanded");
    }
    function showHideSubDiv2(ele) {
        var dd = $(ele).closest('dd');
        var main_div = dd.find('.sub-div').get(0);
        var sub_div = dd.children('.sub-div');
        sub_div.slideToggle();
        dd.toggleClass('open');
        $(ele).toggleClass("expanded");
    }

    /*$(document).on('click', '.unified-list-cntr a.show-hide', function (e) {
     showHideSubDiv(this);
     });*/
    $(document).on('click', '.analytic-list a.show-hide', function (e) {
        showHideSubDiv2(this);
    });

    $(document).on('click', '.analytic-list a.sub-show-hide', function (e) {
        showHideSubDiv(this);
    });
    /*$(document).on('click', '.unified-list-cntr a.sub-show-hide', function (e) {
     showHideSubDiv(this);
     });
     $(document).on('click', '.unified-list-cntr a.sub-show-hide-nxt', function (e) {
     showHideSubDiv(this);
     });*/


    $(document).on('focus', '#view_data_for', function () {
        $(this).data('previous', this.value);
    });
    $(document).on('blur', '#filter_text', function () {
        var self = this;
        setTimeout(function () {
            var ul = $(self).next();
            ul.hide();
        }, 500);
    });
    $(document).on('keyup', '#filter_text', function () {
        var self = this;
        var ul = $(self).next();
        ul.hide();
        var keyword = self.value.toLowerCase();
        if (keyword.length == 0) {
            return;
        }

        var autocomplete = $(self).data('autocomplete');
        if (!autocomplete)
            return;
        var options = [];
        for (var i = 0; i < autocomplete.length; i += 1) {
            if (~autocomplete[i].name.toLowerCase().indexOf(keyword)) {
                options.push('<li id="' + autocomplete[i].id + '"><a>' + autocomplete[i].name + '</a></li>');
            }
            if (options.length >= 10)
                break;
        }

        ul.attr('objectType', self.getAttribute('objectType'))
        ul.html(options.join(''));
        if (options.length) {
            var posi = $(self).position();
            ul.css({
                top: posi.top + $(self).outerHeight() + 'px'
            });
            ul.show();
        }

    });
    $(document).on('click', '.decline', function () {
        var filter_alert = $('.filter-alert');
        // console.log(filter_alert.data('filters_enabled'));
        // $('#view_data_for').val($('#view_data_for').data('previous')).change();

        $('.patch').slideUp();
        filter_alert.slideUp();
    });
    $(document).on('click', '.apply-change', function () {
        $('.filter-alert,.patch').slideUp();
        applyFilters($('#view_data_for').val());
        // apply filter, call refresh method
    });
    /*$('#filter_text').focus(function(){
     $(this).parents('.campaign-select-filter').addClass('focused')
     })
     $('#filter_text').blur(function(){
     $('.campaign-select-filter').removeClass('focused')
     })*/
    $('.accordion h4').click(function () {
        $(this).next('.formLayout').slideDown();
        $(this).css('cursor', 'default')
    });
    $('.accordion .formLayout .hide').click(function () {
        $(this).parents('.formLayout').slideUp();
        $('.accordion h4').css('cursor', 'pointer')
    });
    $('.existing-audience .accordion h4,.adv-targeting .clumn a').click(function () {
        $('.existing-audience').fadeToggle();
        $('.new-audience').fadeToggle();
    });
    $('.list-audience dt h3 a').click(function () {
        if ($(this).parents('dt').next('dd').children('#' + $(this).attr('data-rel')).css('display') == 'none') {
            $('.list-audience dd').slideUp();
            $('.innerTab').hide();
            $('.list-audience dt h3 a').removeClass('active');
            $(this).parents('dt').next('dd').children('#' + $(this).attr('data-rel')).show();
            $(this).parents('dt').next('dd').slideDown();
            $(this).addClass('active');
        } else {
            $('.list-audience dt h3 a').removeClass('active');
            $('.list-audience dd').slideUp();
            $(this).parents('dt').next('dd').children('#' + $(this).attr('data-rel')).hide();
        }
    });
    $(document).on('click', '.list-audience dd a.show-hide', function () {
        $('.list-audience dt h3 a').removeClass('active');
        $('.list-audience dd').slideUp();
        $('.innerTab').slideUp();
    });
    //*** LEADERBOARD, CORRECT C1 HEIGHT ****//
    function calcHeightC1() {
        if (window.innerWidth < 1024 && window.innerWidth > 480) {
            $('.total-result .col.c1').css('height', (Math.round(
                    $('.total-result .col.c2').height()
                    ) * 3) - 60);
        }
    }

    /*** Resize Iframe inside Campaign create page ***/
    function resizeIframe() {
        var iframe_parent = window.frameElement ? window.frameElement : false;
        var iframe_height = document.body.offsetHeight;
        var in_campaign_create_remove = iframe_parent && window.parent.campaign_create ? true : false;
        if (in_campaign_create_remove) {
            $('#header, #footer, #campign_create_audience_header').remove();
            $('body').addClass('in_campaign_create');
        }
        if (iframe_parent) {
            iframe_parent.style.height = iframe_height + 'px';
        }
    }

    function resizeIframe2() {
        var resizeIframeInterval = setInterval(function () {
            var iframe_parent = window.frameElement ? window.frameElement : false;
            var iframe_height = document.body.offsetHeight;
            if (iframe_parent) {
                iframe_parent.style.height = iframe_height + 'px';
            }
        }, 100);
    }
    /*** End - Resize Iframe inside Campaign create page ***/
    $(window).on('load', function () {
        if (in_campaign_create) {
            resizeIframe2();
        }
    });
    $(window).on('load', function () {
        calcHeightC1();
        alignFooter();
        resizeIframe();
    });
    $(document).ready(function () {
        calcHeightC1();
    }).ajaxComplete(function () {
        setTimeout(function () {
            calcHeightC1();
            resizeIframe();
        }, 150);
    }).ajaxSuccess(function () {
        resizeIframe();
    });
    $('body').on('click change', function () {
        setTimeout(function () {
            resizeIframe();
        }, 150);
    });
    //*************
    /***Support Button re-postioning***/
    _getPositionWebEngage = 0;
    $('body').on('click', '.user-nav, [data-rel="apps-sites2"]', function () {
        if (window.innerHeight < 400 && ($('.sub-nav.user-profile2').css('display') == 'block' || $('.sub-nav.apps-sites2').css('display') == 'block')) {
            _getPositionWebEngage = $('#webklipper-publisher-widget-container-content').css('top');
            $('#webklipper-publisher-widget-container-content').css('top', 300);
        } else {
            $('#webklipper-publisher-widget-container-content').css('top', _getPositionWebEngage);
        }
    });
//    ///On Clicking "more" button for search results
//    $('body').on('click', '.butt-search-more', function(e){
//        e.preventDefault();
//        console.log("HI");
//    });
//		
});
function _pSearch(e, evn) { ////Calling Partial Search - Clicking on more button in search
    evn.preventDefault();
    var entityType = {
        offer: '12',
        myoffer: '12',
        deck: '13'
    };
    arg = $(e).attr('href').split('#');
    _url = api_config.base_url + '/search/search/index';
    $(e).addClass('show');
    _partial_search_data = {
        "term": arg[1],
        "max_results": 48,
        "entityType": entityType[arg[2]],
        "token": $.cookie('token')
    };
    //_results = ajaxRequest(_url, _partial_search_data, 'POST', 1);
    _ajax('/search/search/index', _partial_search_data, 'POST', function (_results) {
        _partialResult = new EJS({url: 'templates/common/header/partial-search.ejs'}).render({'data': eval('_results.search_result.' + arg[2]), 'type': arg[2], 'remaining': eval('_results.' + arg[2] + '_remaining')});
        $(e).removeClass('show');
        $('li.search-container').addClass('all2');
        _doNotRemoveThis = $('li.search-container').index($(e).parents('.search-container'));
        $('li.search-container').each(function (i) {
            if (i !== _doNotRemoveThis)
                $(this).remove();
        });
        $(e).closest('ul').html(_partialResult);
    });
    return false;
}
;
var a;
function counter() {
    $('.selected-parametter li').each(function (i) {
        a = i + 1;
        $(this).children('span').children('span.count').text(a + '.')

        //alert(a)
        if ($('.selected-parametter li:last').index() + 1 == i) {

            $('.selected-parametter').hide();
        }
    })
}

function num_format(num, dec) {
    var out = {
        full: 'N/A',
        formatted: '0'
    };
    if (isNaN(num) || num == Number.POSITIVE_INFINITY) {
        return out;
    }

    var reduced;
    var dec = dec || 0;
    var sfx = '';
    if (num > 1000000000000) {

        reduced = num / 1000000000000;
        sfx = ' T';
    } else if (num > 1000000000) {

        reduced = num / 1000000000;
        sfx = ' B';
    } else if (num > 1000000) {

        reduced = num / 1000000;
        sfx = ' M';
    } else if (num > 1000) {
        reduced = num / 1000;
        sfx = ' K';
    } else {
        reduced = num;
        if (num) {
            out.full = parseFloat(num.toFixed(dec)).toLocaleString();
            out.formatted = parseFloat(reduced.toFixed(dec)).toLocaleString();
        }
        return out;
    }
    out.full = parseFloat(num.toFixed(dec)).toLocaleString();
    out.formatted = parseFloat(reduced.toFixed(1)).toLocaleString() + sfx;
    return out;
}

$(window).resize(function () {
    overlayPossition(overlayId);
});
function overlayBox(popUpId) {
    overlayPossition(popUpId)
    overlayId = popUpId
    $('body').append('<div class="forgot-overlay"></div>')
    // $('#'+popUpId).append('<div class="closeBtn">X</div>')
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
    if (marginTB < 0)
    {
        popId.css({
            'top': '30px',
            'left': marginLR,
            'position': 'absolute',
        });
    }
    else
    {
        popId.css({
            'top': marginTB,
            'left': marginLR,
        });
    }
}
$(document).on('click', '.closeBtn', function () {
    $('.overlay-box').fadeOut();
    $('.forgot-overlay').hide();
    $('.forgot-form input').val("");
    $('.notif_messages').html("").hide();
    $('.err_messages').html("").hide();
    $('#forgot_err').html("").hide();
    $('#forgot_msg').html("").hide();
});

/////MY ACCOUNT -  FORM SUBMIT
$(document).ready(function () {


    $('form#change-password-form').submit(function (e) {
        e.preventDefault(); ///Stop form from submitting. Also pervent default events.
        $('.responseStatus').slideUp(100); ///Slide up response div if its open
        //If user has logged in via social
        if (config.user_info.isSocial) {
            $('.responseStatus').slideUp(100).text('You cannot change password from here, as you have logged in via Facebook/Google!').addClass('error').slideDown(100);
            return false;
        }
        _err = 0; //Initialize error to 0
        $(this).find('input[type=password]').each(function () { ///Check first if any Password fields are empty
            $(this).next().text('').slideUp(100);
            $(this).parents('dl').css('marginTop', 10);
            if ($.trim($(this).val()) === '') {
                $('.responseStatus').text("").slideUp(100);
                $(this).next().text('Field is empty!').slideDown(100);
                $(this).parents('dl').css('marginTop', 18);
                _err++;
            } else if (this.id !== 'old' && $.trim($(this).val()).length < password_complexity.length) {
                $(this).next().text('Password should contain atleast ' + password_complexity.length + ' characters!').slideDown(100);
                $(this).parents('dl').css('marginTop', 18);
                _err++;
            }
        });
        ///Next check if New and confirm password field macth?
        if (!_err && $('#new').val() !== $('#new2').val()) {
            $('#new2').next().text('New and confirm password fields do not match!').slideDown(100);
            $('#new2').parents('dl').css('marginTop', 18);
        }
//If everything is okay, then submit the form
        if (!_err) {
            _token = storage.get('token');
            post_data = {
                'token': _token,
                'user': {
                    'oldpassword': $('#old').val(),
                    'newpassword': $('#new').val(),
                    'confirmpassword': $('#new2').val()
                }
            };
            $('.responseStatus').text('Updating ...').removeClass('error success').slideDown(100);
            _ajax("/account/user/changepassword", post_data, 'POST', function (data) {
                if (data.status === 119) { ///If the OLD password does not match, throw an error
                    $('#old').next().text('Wrong password entered!! Please enter correct password.').slideDown(100);
                    $('#old').parents('dl').next().css('marginTop', 18);
                    $('.responseStatus').text("").slideUp(100);
                } else if (data.status === 153) { ///If everything is good, display "Updated!" message
                    $('.responseStatus').slideUp(100).text('Password updated! Please re-login, to continue!').addClass('success').slideDown(100);
                    $.removeCookie('token', {path: '/', domain: '.vserv.mobi'});
                    /*$.cookie('user-info', null);*/
                    setTimeout(function () {
                        window.location.replace("login.html?action=up&info=0");
                    }, 500);
                } else if (data.status === 124) { ///If new and old password are same.
                    $('.responseStatus').slideUp(100).text('Old and New Password are Same!!').addClass('error').slideDown(100);
                } else if (data.status === 202) { ///If everything is good, display "Updated!" message
                    $('.responseStatus').slideUp(100).text('Please re-login, to update password!').addClass('error').slideDown(100);
                } else if (data.status === 120) {
                    $('#new2').next().text('New and confirm password fields do not match!').slideDown(100);
                    $('#new2').parents('dl').css('marginTop', 18);
                    $('.responseStatus').slideUp(100).text('');
                } else if (data.status === 176) {
                    $('.responseStatus').slideUp(100).text('Password should contain atleast '+ password_complexity.length + ' characters!').addClass('error').slideDown(100);
                } else if (data.status === 177) {
                    $('.responseStatus').slideUp(100).text('Password should contain atleast one alphabet, one digit & one special character!').addClass('error').slideDown(100);
                } else if (data.status === 0) { ///If everything is good, display "Updated!" message
                    $('.responseStatus').slideUp(100).text('Updated!').addClass('success').slideDown(100);
                }
            });
        }
    });
    $('form#change-password-form input[type=reset]').on('click', function () {
        $('.responseStatus, .err_messages').slideUp(100);
    });
});
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function () {
    if ($('body').hasClass('mobile')) {
        $('input[type=text], select, [type=number], [type=email]').on('focus', function () {
// replace CSS font-size with 16px to disable auto zoom on iOS
            $(this).data('fontSize', $(this).css('font-size')).css('font-size', '16px');
        }).on('blur', function () {
// put back the CSS font-size
            $(this).css('font-size', $(this).data('fontSize'));
        });
    }

///On Iphone/Ipad rotate, retain zoom
    (function (doc) {

        var addEvent = 'addEventListener',
                type = 'gesturestart',
                qsa = 'querySelectorAll',
                scales = [1, 1],
                meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
        function _rotateFix() {
            meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
            doc.removeEventListener(type, _rotateFix, true);
        }

        if ((meta = meta[meta.length - 1]) && addEvent in doc) {
            _rotateFix();
            scales = [.25, 1.6];
            doc[addEvent](type, _rotateFix, true);
        }

    }(document));
});
function toTitleCase(str) {
    if (str == 'CTR' || str == 'eIPM') {
        return str;
    }
    if (str == 'ctr') {
        return 'CTR';
    }
    if (str == 'eipm') {
        return 'eIPM';
    }
    str = str.replace(/_/g, ' ');
    return str.replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}

function closePop() {
    $('.overlay-box').fadeOut();
    $('.forgot-overlay').hide();
}

function closePopDuplicateBox() {
    $('.overlay-box').fadeOut(function () {
        $(this).find('.container').html('');
    });
    $('.forgot-overlay').hide();
}

function alignFooter() {
    $('body').css('min-height', $(window).height())
    //var docHeight = $(document).height();
//    var scrHeight = screen.height;
//    if (docHeight < scrHeight) {
//        $('#footer').addClass('fixed_footer');
//    } else {
//        $('#footer').removeClass('fixed_footer');
//    }
}

setInterval(function () {
    alignFooter();
}, 200);


//Pagination
_ctrPagination = 1;
_chkSize = _chkSets = _currentPageSelected = 0;
_displayAmt = 10;
_animatePagination = 1; //Flag to check on double checking
function _applyPaginationSets() {
    _ctrPagination = Math.ceil($('.pagination > div > ul li').index($('.pagination > div > ul li a.active').parent()) / _displayAmt);


    //hide/show prev & next buttons
    setTimeout(function () {
        if ($('.pagination > div > ul li').index($('.pagination > div > ul li a.active').parent()) > 2) {
            $('.pagination .next_prev.prev').parent().show();
        } else {
            $('.pagination .next_prev.prev').parent().hide();
        }
        if ($('.pagination > div > ul li').index($('.pagination > div > ul li a.active').parent()) <= (_chkSize - 2)) {
            $(this).find('.next_prev.next').parent().show();
        } else {
            $(this).find('.next_prev.next').parent().hide();
        }
    }, 100);


    $('.pagination').each(function () {
        ///Check size to activate
        _chkSize = $(this).find(' > div > ul li').size() - 2;
        // if (_chkSize == 0) {

        //     $('.pagination .next_prev.next').addClass('hide');
        // }
        if (_chkSize <= _displayAmt) {
            //hide/show prev & next buttons
            setTimeout(function () {
                if ($('.pagination > div > ul li').index($('.pagination > div > ul li a.active').parent()) > 1) {
                    $('.pagination .next_prev.prev').parent().show();
                } else {
                    $('.pagination .next_prev.prev').parent().hide();
                }
                if ($('.pagination > div > ul li').index($('.pagination > div > ul li a.active').parent()) <= (_chkSize - 1)) {
                    $('.pagination .next_prev.next').parent().show();
                } else {
                    $('.pagination .next_prev.next').parent().hide();
                }
            }, 100);
        } else {
            _chkSets = (_chkSize / _displayAmt);
            _currentPageSelected = $('.pagination > div > ul li').index($('.pagination > div > ul li a.active').parent());
            if (_chkSize > _displayAmt) {
                ///Insert/delete Prev Next buttons here
                if ($(this).find(' > div > ul li > a.prev_set').length == 0)
                    $('<li class="desktop-only"><a href="#" class="prev_set prev fa"></a></li>').insertAfter($(this).find(' > div > ul li:first'));
                if ($(this).find(' > div > ul li > a.next_set').length == 0)
                    $('<li class="desktop-only"><a href="#" class="next_set next fa"></a></li>').insertBefore($(this).find(' > div > ul li:last'));
            } else {
                if ($(this).find(' > div > ul li > a.prev_set').length > 0)
                    $(this).find(' > div > ul li > a.prev_set').remove();
                if ($(this).find(' > div > ul li > a.next_set').length > 0)
                    $(this).find(' > div > ul li > a.next_set').remove();
            }
            _chkSize = $(this).find(' > div > ul li').size() - 2;
            //Show first 10 li's and hide others
            $(this).find(' > div > ul li').each(function (i) {
                $(this).hide();
                if (Math.ceil((i - 1) / _displayAmt) == _ctrPagination && i > 1)
                    $(this).show();
            });
            $(this).find(' > div > ul').find('li:eq(0), li:last').show();
            //Check where pagination position is and apply appropriate filters
            //Hide/show prev & next sets
            if (_ctrPagination <= Math.floor(_chkSets)) {
                ///Since 1 no. shall be highlighted, hide the prev button
                $(this).find('.next_set').parent().show();
            } else {
                $(this).find('.next_set').parent().hide();
            }
            if (_ctrPagination > 1) {
                $(this).find('.prev_set').parent().show();
            } else {
                $(this).find('.prev_set').parent().hide();
            }
            //hide/show prev & next buttons
            setTimeout(function () {
                if ($('.pagination > div > ul li').index($('.pagination > div > ul li a.active').parent()) > 2) {
                    $('.pagination .next_prev.prev').parent().show();
                } else {
                    $('.pagination .next_prev.prev').parent().hide();
                }
                if ($('.pagination > div > ul li').index($('.pagination > div > ul li a.active').parent()) <= (_chkSize - 2)) {
                    $(this).find('.next_prev.next').parent().show();
                } else {
                    $(this).find('.next_prev.next').parent().hide();
                }
            }, 100);
            /*** End Applying Filters ***/
        }

    });


}
//Now on click of prev & next sets
$(document).on('click', '.pagination .next_set', function (e) {
    e.preventDefault();
    if (!_animatePagination)
        return;
    _animatePagination = 0; //Make the Flag false
    _ctrPagination++;
    _parent = $(this).parent().parent();
    if (_ctrPagination <= Math.ceil(_chkSets)) {
        _parent.find('li > a').not('.next, .prev').each(function () {
            if ($(this).parent().css('display') != 'none')
                $(this).parent().hide(150);
        });
        ///Display other set
        for (i = 2; i < 12; i++) {
            _parent.find('li').eq(((_ctrPagination - 1) * _displayAmt) + i).show(150);
        }
        _currentlyDisplayed = (_ctrPagination - 1) * _displayAmt;
        _parent.find('li').eq(_currentlyDisplayed + 2).find('a').click();
//            Enable Flag(_animatePagination) after animation
        setTimeout(function () {
            _animatePagination = 1;
        }, 150);
    }
});
$(document).on('click', '.pagination .prev_set', function (e) {
    e.preventDefault();
    if (!_animatePagination)
        return;
    _animatePagination = 0; //Make the Flag false
    _ctrPagination--;
    _parent = $(this).parent().parent();
    if (_ctrPagination > 0) {
        _parent.find('li > a').not('.next, .prev').each(function () {
            if ($(this).parent().css('display') != 'none')
                $(this).parent().hide(150);
        });
        ///Display other set
        for (i = 2; i < 12; i++) {
            _parent.find('li').eq(((_ctrPagination - 1) * _displayAmt) + i).show(150);
        }
        _currentlyDisplayed = (_ctrPagination - 1) * _displayAmt;
        _parent.find('li').eq(_currentlyDisplayed + 2).find('a').click();
        //Enable Flag(_animatePagination) after animation
        setTimeout(function () {
            _animatePagination = 1; //Make the Flag true
        }, 150);
    }
});
$(document).ready(_applyPaginationSets);
$(document).ajaxComplete(_applyPaginationSets);

/******
 * CONFIRM DIALOG
 */
function confirm_dialog() {
    _a = arguments[0];
    if (!_a)
        alert('Config is not properly defined!');
    $('#confirmation_dialog_overlay').remove();
    $html = '<div id="confirmation_dialog_overlay">\
	<div id="confirm_dialog">\
		<div class="content">\
			<h2>%title%</h2>\
			<p>%text%</p>\
                        %dontshowagain%<p>&nbsp;</p><p><input type="checkbox" id="chk_dontshow" data-bind="%var_dontshow%" value="yes"><label for="chk_dontshow">Don\'t show this again</label></p>%dontshowagain%\
			<div class="buttons"><button id="butt_confirmation_dialog_yes">%yes_text%</button> <button id="butt_confirmation_dialog_no">%no_text%</button></div>\
		</div>\
	</div>\
</div>';
    _dontshowagain = (_a['dontshowagain'] && $.cookie(_a['dontshowagain'])) ? $.cookie(_a['dontshowagain']) : false;

    $html = $html.replace('%title%', _a['title'] ? _a['title'] : 'Title');
    $html = $html.replace('%text%', _a['text'] ? _a['text'] : 'No text');
    $html = $html.replace('%yes_text%', _a['yes_text'] ? _a['yes_text'] : 'Ok');
    $html = $html.replace('%no_text%', _a['no_text'] ? _a['no_text'] : 'Cancel');
    $html = (_a['dontshowagain']) ? $html.replace(/\%dontshowagain\%/gi, '') : $html.replace(/\%dontshowagain\%.*\%dontshowagain\%/gi, '');
    $html = (_a['dontshowagain']) ? $html.replace('%var_dontshow%', _a['dontshowagain']) : $html;
    if ((!_dontshowagain || _dontshowagain == 'no')) {
        $('body').append($html);
        //$html = $('#confirmation_dialog_overlay').html().replace();
        $('#confirmation_dialog_overlay').fadeIn(300);
    }
    var yes = function () {
        if (_a['yes']) {
            _a['yes']();
        }
        if (_a['dontshowagain'] && (!_dontshowagain || _dontshowagain == 'no')) {
            _chk_dontshowagain = $('#chk_dontshow')[0].checked;
            $.cookie(_a['dontshowagain'], _chk_dontshowagain ? 'yes' : 'no');
        }
        $('#confirmation_dialog_overlay').fadeOut(300);
    };
    var no = function () {
        if (_a['no']) {
            _a['no']();
        }
        if (_a['dontshowagain'] && (!_dontshowagain || _dontshowagain == 'no')) {
            _chk_dontshowagain = $('#chk_dontshow')[0].checked;
            $.cookie(_a['dontshowagain'], _chk_dontshowagain ? 'yes' : 'no');
        }
        $('#confirmation_dialog_overlay').fadeOut(300);
    };
//    var dontshowagain =
    var esc = function (e) {
        if (e.keyCode === 27)
            $('#confirmation_dialog_overlay').fadeOut(300);
    };

    var clickOutsideDialog = function (e) {
        if ($(e.target).closest('#confirmation_dialog_overlay').length > 0) {
            if ($(e.target).closest('#confirm_dialog').length == 0) {
                $('#confirmation_dialog_overlay').fadeOut(300);
            }
        }
    };

    $('body').off('click', '#butt_confirmation_dialog_yes');
    $('body').off('click', '#butt_confirmation_dialog_no');
    $('body').off('click', clickOutsideDialog);
    $('body').off('keyup', esc);
    $('body').on('click', '#butt_confirmation_dialog_yes', yes);
    $('body').on('click', '#butt_confirmation_dialog_no', no);
    $('body').on('keyup', esc);
    $('body').on('click', clickOutsideDialog);
}

String.prototype.sanitize = function () {
    /***
     * Accepted Arguments
     * default: Shall be converted to proper case, "_" underscores, shall be converted to spaces
     * id: spaces shall be converted to "_" underscores. letters shall be converted to lowercase.
     */
    var _v = this;
    if (/id/.test(arguments[0])) {
        //alert(this);
        _v = _v.toLowerCase();
        _v = _v.replace(' ', '_');
        return _v;
    } else if (/no|number|rs|rupee/i.test(arguments[0])) {
        return _v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        _v = _v.replace(/_|-/i, ' ');
        _v = _v.replace(/\w\S*/g, function (a) {
            return a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
        });
        return _v;
    }
};

Number.prototype.sanitize = function () {
    var _v = this;
    return _v.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

Array.prototype.sortBy = function () {
    var _sortBy = arguments[0];
    if (!_sortBy)
        return;
    if (_sortBy == 'id') {
        this.sort(function (a, b) {
            if (a[_sortBy] > b[_sortBy]) {
                return -1;
            } else if (a[_sortBy] < b[_sortBy]) {
                return 1;
            } else {
                return 0;
            }
        });
    } else {
        this.sort(function (a, b) {
            if (a[_sortBy] < b[_sortBy]) {
                return -1;
            } else if (a[_sortBy] > b[_sortBy]) {
                return 1;
            } else {
                return 0;
            }
        });
    }
};

function sortOn(arr, prop) {
    arr.sort(
            function (a, b) {
                if (a[prop] < b[prop]) {
                    return -1;
                } else if (a[prop] > b[prop]) {
                    return 1;
                } else {
                    return 0;
                }
            }
    );
}

//for converting Nan into zeo in Array
Array.prototype.convertNaNToZero = function () {
    for (i = 0; i < this.length; i++) {
        var val = (typeof this[i] === "object") ? this[i].value : this[i];

        if (isNaN(parseInt(val))) {
            this[i] = 0;
        }
    }
    return this;
}

Array.prototype.dataGraphEmpty = function () {
    var _empty = 0;
    var _zeros = 0;
    if (this.length == 0) {
        return true;
    }
    for (i = 0; i < this.length; i++) {
        _empty = (this[i] && this[i] != 'NaN') ? _empty + 1 : _empty;
        _zeros = (!this[i] && this[i] == 0) ? _zeros + 1 : _zeros;
    }
    if (!_empty || (_zeros == this.length)) {
        return true;
    } else {
        return false;
    }
};

Array.prototype.dataGraphEmpty_inStack = function () {
//    console.log("Calling .....");
//    var _empty = 0;
    var _zeros = 0;
    var _total_length = 0;
    if (this.length == 0) {
        return true;
    }
    for (i in this) {
        if (this[i].data) {
            var _data = this[i].data;
            var _seekPos = (/Agency Campaigns/gi.test(this[i].name)) ? 0 :
                    (/RTB/gi.test(this[i].name)) ? 1 :
                    (/Remnant/gi.test(this[i].name)) ? 3 : 2;
            for (i = 0; i < this.length; i++) {
                _total_length++;
//                console.log(_data[_seekPos]);
//                console.log(">>"+_zeros);
                //_empty = (_data[_seekPos] && _data[_seekPos] != 'NaN') ? _empty + 1 : _empty;
                _zeros = (!_data[_seekPos] || (_data[_seekPos] == 0 || _data[_seekPos] == 'NaN')) ? _zeros + 1 : _zeros;
//                console.log("++"+_zeros);
            }
        }
    }
//    console.log(_zeros+":"+_total_length);
    if (_zeros == _total_length) {
//        console.log('true');
        return true;
    } else {
//        console.log('false');
        return false;
    }
};

String.prototype.domName = function(){
    return this
            .toString()
            .toLowerCase()
            .replace(/\s/gi, '_')
            .replace(/\&amp\;/gi, '_')
           .replace(/^[ ~!@#$%^&*()_+<>?:"{}|,./;'[]\"-=]$/gi, '_');
}

String.prototype.toProperName = function(){
    return formatString(this
            .toString()
            .replace(/_/gi, ' '));
}

Array.prototype.removeDuplicates = function() {
    var temp = {};
    for (var i = 0; i < this.length; i++)
        temp[this[i]] = true;
    var r = [];
    for (var k in temp)
        r.push(k);
    return r;
}
