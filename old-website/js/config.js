var mail_list = {
    "local": {
        "contactus": 'dipti.p@vserv.com',
        "signup": 'dipti.p@vserv.com'
    },
    "staging": {
        "contactus": 'sushil.j@vserv.com',
        "signup": 'sushil.j@vserv.com'
    },
    "production": {
        "contactus": 'akash.s@offerdeck.com',
        "signup": 'akash.s@offerdeck.com'
    }
}

var current_host = document.location.hostname;

var localUrl = ["local.static.offerdeck.com"];
var stgUrl = ["static.offerdeck.com"];

var api_url = {
    "local": 'http://local.api.vserv.com/index.php',
    "staging": 'http://stg-api.vserv.com/index.php',
    "production": 'https://api.vserv.com/index.php'
}

function getApiUrl() {
    return api_url[globalMode];
}

function getMode() {
    var mode = "production";
    if (jQuery.inArray(current_host, localUrl) != -1) {
        mode = "local";
    } else if (jQuery.inArray(current_host, stgUrl) != -1) {
        mode = "staging";
    }
    return mode;
}

var globalMode = getMode();

function getMailList(module) {
    return mail_list[globalMode][module];
}
