var social_config = {
    "fb": {
        "appId": '432762513599254'
    },
    "gp": {
        "clientId": '349771282344-kd9o2vr52jcb9e6jejmcuofg7067118b.apps.googleusercontent.com'
    },
    "gp_adnetwork": {
        "clientId": '609596649998-bip6hp1tbo9fdvcj0fb23d0nvktn4m2d.apps.googleusercontent.com'
    }
};
var path = {
	"login": {
		"www.offerdeck.com": "http://www.offerdeck.com/login/?user=login",
                "offerdeck.com": "http://www.offerdeck.com/login/?user=login",
                "dashboard.offerdeck.com": "http://www.offerdeck.com/login/?user=login",
                "alpha.offerdeck.com": "http://alpha.offerdeck.com/login/?user=login",

                "stg.offerdeck.com": "http://stg.offerdeck.com/login.html?user=login",
                "local.offerdeck.com" :  "http://local.offerdeck.com/login.html?user=login",

		"intelliswift.vserv.mobi": "http://intelliswift.vserv.mobi/login.html",
		"local.intelliswift.vserv.mobi": "http://local.intelliswift.vserv.mobi/vserv.mobi/trunk/login.html",
		"localhost.vserv.mobi": "http://localhost.vserv.mobi/vserv.mobi/trunk/login.html"
	},
	"register": {
		"www.offerdeck.com": "http://www.offerdeck.com/signup/",
		"offerdeck.com": "http://www.offerdeck.com/signup/",
                "dashboard.offerdeck.com": "http://www.offerdeck.com/signup/",
                "alpha.offerdeck.com": "http://alpha.offerdeck.com/get-started.html",

                "stg.offerdeck.com": "http://stg.offerdeck.com/get-started.html",
                "local.offerdeck.com": "http://local.offerdeck.com/iframe.html",

		"intelliswift.vserv.mobi": "http://intelliswift.vserv.mobi/get-started-copy.html",
		"local.intelliswift.vserv.mobi": "http://local.intelliswift.vserv.mobi/vserv.mobi/trunk/get-started-copy.html",
		"localhost.vserv.mobi": "http://localhost.vserv.mobi/vserv.mobi/trunk/get-started-copy.html"
	},
        "thankyou":{
            "www.offerdeck.com": "http://www.offerdeck.com/thankyou/",
            "offerdeck.com": "http://offerdeck.com/thankyou/",
            "dashboard.offerdeck.com": "http://www.offerdeck.com/thankyou/",
            "alpha.offerdeck.com": "http://alpha.offerdeck.com/thankyou.html",

            "stg.offerdeck.com": "http://stg.offerdeck.com/thankyou.html",
            "local.offerdeck.com" :  "http://local.offerdeck.com/thankyou.html",

            "intelliswift.vserv.mobi": "http://intelliswift.vserv.mobi/thankyou.html",
            "local.intelliswift.vserv.mobi": "http://local.intelliswift.vserv.mobi/vserv.mobi/trunk/thankyou.html",
            "localhost.vserv.mobi": "http://localhost.vserv.mobi/vserv.mobi/trunk/thankyou.html"
        },
        "more_info":{
            "www.offerdeck.com": "http://www.offerdeck.com/more_info/",
            "offerdeck.com": "http://offerdeck.com/more_info/",
            "dashboard.offerdeck.com": "http://www.offerdeck.com/more_info/",
            "alpha.offerdeck.com": "http://alpha.offerdeck.com/more_info.html",

            "stg.offerdeck.com": "http://stg.offerdeck.com/more_info.html",
            "local.offerdeck.com" :  "http://local.offerdeck.com/more_info.html",

            "intelliswift.vserv.mobi": "http://intelliswift.vserv.mobi/more_info.html",
            "local.intelliswift.vserv.mobi": "http://local.intelliswift.vserv.mobi/vserv.mobi/trunk/more_info.html",
            "localhost.vserv.mobi": "http://localhost.vserv.mobi/vserv.mobi/trunk/more_info.html"
        }
};

var valid_interface = ["4"];

var current_host = document.location.hostname;

var api_url = {
	"local": 'http://local.api.vserv.mobi/index.php',
        "staging": 'http://stg.api.vserv.mobi/index.php',
        "alpha": 'http://alpha.api.vserv.mobi/index.php',
	"live": 'https://api.vserv.com/index.php'
}

var localUrl = ["local.offerdeck.com"]
var stgUrl = ["local.intelliswift.vserv.mobi", "localhost.vserv.mobi", "intelliswift.vserv.mobi", "intelliswift.vserv.mobi", "local.intelliswift.vserv.com", "localhost.vserv.com", "intelliswift.vserv.com","stg.offerdeck.com"]
var alphaUrl = ["alpha.offerdeck.com"]

function getApiUrl() {
	var mode = "live";
	if (jQuery.inArray(current_host, localUrl) != -1) {
		mode = "local";
	}else if (jQuery.inArray(current_host, stgUrl) != -1) {
		mode = "staging";
	}else if (jQuery.inArray(current_host, alphaUrl) != -1) {
                mode = "alpha";
        }
	return api_url[mode];
}

function getPage(page){
    url = null;
    if(page=='login'){
        url = 'http://offerdeck.com/login/';
        if(current_host == 'local.offerdeck.com'){
            url = 'http://local.offerdeck.com/login.html';
        }
    }
    return url;
}

var api_config = {
    "base_url": getApiUrl(),
    "redirect_click_url" : 'http://test.offerdeck.com/delivery/pb.php',
    "offer_list": "/offerdeck/offer/list",
	"offer_view": "/offerdeck/offer/view",
	"offer_apply": "/offerdeck/offer/set",
        "offer_macro_set": "/offerdeck/offer/set",
    /*Deck API*/
    "create_deck": "/offerdeck/deck/put",
    "edit_deck": "/offerdeck/deck/set",
    "view_detail_deck": "/offerdeck/deck/view",
    "deck_list": "/offerdeck/deck/list",
    "deck_index": "/offerdeck/deck/index",

	"file_download": "/offerdeck/offer/export",
    "account_view": "/account/account/view",
    "analytics": '/analytics',
    "vmax_analytics": "/Vmaxanalytics",
    "export_csv": '/analytics/download',
    "generate_refresh_token": '/supply/mediationpartner/refreshtoken',
    "adspot_index": '/supply/adspot/index',
    "adspot_list": '/supply/adspot/list',
    "adspot_view": '/supply/adspot/view',
    "adspot_put": '/supply/adspot/put',
    "adspot_set": '/supply/adspot/set',
    "content_index": '/supply/content/index',
    "content_list": '/supply/content/list',
    "content_view": '/supply/content/view',
    "content_set": '/supply/content/set',
    "finance_earning_index": '/finance/earning/index',
    "verify_token": "/account/user/verifytoken",
    "login": "/account/user/login",
    "logout": "/account/user/logout",
    "register": "/account/user/register",
    "block_user_register": "/account/user/registeraccount",
    "password_recovery": "/account/user/passwordrecovery",
    "reset_password": "/account/user/passwordrecovery",
    "dd": "/account/user/verifyddcode",
    "set_user": "/account/user/setprofile",
    "login_url":  path['login'][current_host],
    "thank_you": path['thankyou'][current_host],
    "more_info": path['more_info'][current_host],
    "advertiser_thank_you": "http://www.vserv.com/?page_id=13226&regType=3",
    "check_email_thank_you": "http://www.vserv.com/?page_id=13226&regType=2",
    "invite_campaign": "/account/invitecampaign",
    "refer_friend": "/account/referredemail/put",
            "mediation_partner_view": "/supply/mediationPartner/view",
    "mediation_partner_put": "/supply/mediationpartner/put",
    "ad_partner_put": "/supply/adpartnersetting/put",
    "ad_partner_view": "/supply/adpartnersetting/view",
    "ads_index": "/demand/ad/index",
    "ads_list": "/demand/ad/list",
    "ads_view": "/demand/ad/view",
    "ads_put": "/demand/ad/put",
    "ads_set": "/demand/ad/set",
    "campaign_index": "/demand/campaign/index",
    "campaign_list": "/demand/campaign/list",
    "campaign_view": "/demand/campaign/view",
    "campaign_put": "/demand/campaign/put",
    "campaign_set": "/demand/campaign/set",
    "channel_index": "/demand/channel/index",
    "channel_list": "/demand/channel/list",
    "channel_view": "/demand/channel/view",
    "channel_put": "/demand/channel/put",
    "channel_set": "/demand/channel/set",
    "gadget_index": "/dashboard/gadget/index",
    "gadget_setseq": "/dashboard/gadget/setSeq",
    "gadget_put": "/dashboard/gadget/put",
    "gadget_delete": "/dashboard/gadget/delete",
    "usergroup_list": "/demand/usergroup/list",
    "mis_analytics": "/vservanalytic",
    "mis_viewList": "/vservanalytic/viewlist",
    "cookie_domain": ".offerdeck.com",
    "more_information": "/account/user/more_information",
};

var config = {
    "column_mapping": {
        "adspotId": "Adspot Name",
        "contentId": "App/Site Name",
        "countryId": "Country",
        //"telcoId": "Telco",
        "platformId": "Platform",
        "campaignId": "Campaign",
        //"proxyType": "Proxy / Non-Proxy",
        "adspotSize": "Adspot size",
        "adspotType": "Type: App/Site",
        "ad_type": "Adspot size",
        "contentType": "Type: App/Site",
        "hour": "Hour",
        "week": "Week",
        "month": "Month",
        "year": "Year",
        "dateTime": "Date",
        "adpartnerId": "Ad Partners"
    },
    "analytics_columns": [{
            name: "requests",
            has_sub_cols: 0,
            title: "Requests",
            decimal: 0
        }, {
            name: "ads",
            has_sub_cols: 1,
            title: "Ads",
            decimal: 0,
            sub_cols: [{
                    name: "vserv_ads",
                    title: "Vserv Ads",
                    decimal: 0
                }, {
                    name: "mediation_ads",
                    title: "Mediation Ads",
                    decimal: 0
                }]
        }, {
            name: "fill_rate",
            has_sub_cols: 1,
            title: "Fill Rate",
            decimal: 2,
            sub_cols: [{
                    name: "vserv_fill_rate",
                    title: "Vserv Fill Rate",
                    decimal: 2
                }, {
                    name: "mediation_fill_rate",
                    title: "Mediation Fill Rate",
                    decimal: 2
                }]
        }, {
            name: "impressions",
            has_sub_cols: 0,
            title: "Impressions",
            decimal: 0
        }, {
            name: "clicks",
            has_sub_cols: 0,
            title: "Clicks",
            decimal: 0
        }, {
            name: "ctr",
            has_sub_cols: 0,
            title: "CTR",
            decimal: 2
        }, {
            name: "conversions",
            has_sub_cols: 0,
            title: "Conversions",
            decimal: 0
        }, {
            name: "income",
            has_sub_cols: 1,
            title: "Income",
            decimal: 2,
            sub_cols: [{
                    name: "eipm",
                    title: "eIPM",
                    decimal: 3
                }, {
                    name: "eipc",
                    title: "eIPC",
                    decimal: 3
                }, {
                    name: "eipa",
                    title: "eIPA",
                    decimal: 3
                }]
        }],
    "data_for": [{
            "name": "All Apps",
            "value": "all"
        }, {
            "name": "Single App",
            "value": "contentId"
        }, {
            "name": "Single Adspot",
            "value": "adspotId"
        }/*, {
            "name": "Mediation",
            "value": "mediation"
        }*/],
    "contextual_groups": {
        "all": [{// All
                "id": "adspotId",
                "name": "Adspot"
            }, {
                "id": "contentId",
                "name": "App Name"
            }, {
                "id": "contentType",
                "name": "Type: App"
            }],
        "contentId": [{// Single App
                "id": "contentId",
                "name": "App Name"
            }],
        "mediation": [{// Mediation
                "id": "adpartnerId",
                "name": "Ad Partners"
            }, {// Mediation
                "id": "dateTime",
                "name": "Date"
            }, {// Mediation
                "id": "countryId",
                "name": "Country"
            }, {// Mediation
                "id": "platformId",
                "name": "Platform"
            }],
        "adspotId": [{// Single Adspot
                "id": "contentType",
                "name": "Type: App"
            }]
    },
    "contextual_filters": {
        "mediation": [{// Mediation
                "id": "adpartnerId",
                "name": "Ad Partners"
            }]
    },
    "system_groups": [{
            "id": "countryId",
            "name": "Country"
        },/* {
            "id": "telcoId",
            "name": "Telco"
        },*/ {
            "id": "platformId",
            "name": "Platform"
        },/* {
            "id": "proxyType",
            "name": "Proxy / Non-Proxy"
        }, */{
            "id": "adspotSize",
            "name": "Adspot size"
        }, {
            "id": "week",
            "name": "Week"
        }, {
            "id": "month",
            "name": "Month"
        },
        /*  {
         "id": "year",
         "name": "Year"
         }, */
        {
            "id": "dateTime",
            "name": "Date"
        }
    ],
    "system_filters": [{
            "id": "countryId",
            "name": "Country"
        },/* {
            "id": "telcoId",
            "name": "Telco"
        },*/ {
            "id": "platformId",
            "name": "Platform"
        },/* {
            "id": "proxyType",
            "name": "Proxy / Non-Proxy"
        },*/ {
            "id": "adspotSize",
            "name": "Adspot size"
        }],
    "system_filters_new": [{
            "id": "countryId",
            "name": "Country"
        },/* {
            "id": "telcoId",
            "name": "Telco"
        },*/ {
            "id": "platformId",
            "name": "Platform"
        },/* {
            "id": "proxyType",
            "name": "Proxy / Non-Proxy"
        },*/ {
            "id": "adspotSize",
            "name": "Adspot size"
        }],
    "formulae": {},
    "appsite_columns": {
        "requests": {
            "title": "Requests",
            "percentage": 0
        }
    },
    "month": {
        "January": "1",
        "February": "2",
        "March": "3",
        "April": "4",
        "May": "5",
        "June": "6",
        "July": "7",
        "August": "8",
        "September": "9",
        "October": "10",
        "November": "11",
        "December": "12"
    },
    "user_info": {},
    "referral_campaign": {
        "per_campaign": 5
    },
    "mis": {
        "data_for": [{
                "name": "Supply Side",
                "value": "supply"
            }, {
                "name": "Demand Side",
                "value": "demand"
            }],
        "system_groups": [{
                "id": "supplyAccountId",
                "name": "Accounts",
                "context": "supply"
            }, {
                "id": "demandAccountId",
                "name": "Accounts",
                "context": "demand"
            }, {
                "id": "supplyAccountType",
                "name": "Supply Type",
                "context": "all"
            }, {
                "id": "demandAccountType",
                "name": "Demand Type",
                "context": "all"
            }, {
                "id": "supplyCountryId",
                "name": "Account Country",
                "context": "supply"
            }, {
                "id": "demandCountryId",
                "name": "Account Country",
                "context": "demand"
            }, {
                "id": "supplyManagerId",
                "name": "Account Manager",
                "context": "supply"
            }, {
                "id": "demandManagerId",
                "name": "Account Manager",
                "context": "demand"
            }, {
                "id": "month",
                "name": "Month",
                "context": "all"
            }, {
                "id": "week",
                "name": "Week",
                "context": "all"
            }, {
                "id": "dateTime",
                "name": "Date",
                "context": "all"
            }, {
                "id": "dowdt",
                "name": "Day of the Week",
                "context": "all"
            }, {
                "id": "hour",
                "name": "Date-Hour",
                "context": "all"
            }, {
                "id": "continentId",
                "name": "Region",
                "context": "all"
            }, {
                "id": "countryId",
                "name": "Country",
                "context": "all"
            }, {
                "id": "telcoId",
                "name": "Telco",
                "context": "all"
            }, {
                "id": "platformId",
                "name": "Platform",
                "context": "all"
            }, {
                "id": "platformType",
                "name": "Device Type",
                "context": "all"
            }, {
                "id": "adspotId",
                "name": "Adspot",
                "context": "all"
            }, {
                "id": "adStyle",
                "name": "Adspot Layout",
                "context": "all"
            }, {
                "id": "contentId",
                "name": "In App",
                "context": "all"
            }, {
                "id": "adspotSize",
                "name": "Adspot Size",
                "context": "all"
            }, {
                "id": "contentType",
                "name": "App",
                "context": "all"
            }, {
                "id": "proxyType",
                "name": "Billable/Nonbillable",
                "context": "all"
            }, {
                "id": "audienceId",
                "name": "Audiences",
                "context": "all"
            }, {
                "id": "ioId",
                "name": "Order no",
                "context": "all"
            }, {
                "id": "campaignId",
                "name": "Campaigns",
                "context": "all"
            }, {
                "id": "campaignType",
                "name": "Campaign Objective",
                "context": "all"
            }, {
                "id": "adId",
                "name": "Ads",
                "context": "all"
            }, {
                "id": "adType",
                "name": "Ad Type",
                "context": "all"
            }],
        "actionList": {
            "supplyAccountId": "accountsList",
            "demandAccountId": "accountsList",
            "supplyManagerId": "managersList",
            "demandManagerId": "managersList",
            "adspotId": "adspotList",
            "contentId": "contentList",
            "audienceId": "audienceList",
            "ioId": "orderList",
            "campaignId": "campaignsList",
            "adId": "adsList"
        }
    }
};

var password_complexity = {
    "length": 8
};
