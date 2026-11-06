function getUrlVarsData()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++){
	    hash = hashes[i].split('=');
	    vars.push(hash[0]);
	    vars[hash[0]] = hash[1];
	}
	return vars;
}
var utm_src    = getUrlVarsData()["utm_source"];
var utm_medm    = getUrlVarsData()["utm_medium"];	
var utm_campn  = getUrlVarsData()["utm_campaign"];
var utm_adgrp   = getUrlVarsData()["utm_adgroup"];
var utm_tm 	  = getUrlVarsData()["utm_term"];
var place 	  = getUrlVarsData()["placement"];
var source_url = document.referrer;


var utm_src2=getCookie("utm_source");
if (utm_src2 ==null || utm_src2=="" || utm_src2=="undefined") {
	document.cookie = 'utm_source' +"=" + utm_src + ";domain=.vserv.mobi;path=/";
}
var utm_medm2=getCookie("utm_medium");
if (utm_medm2 ==null || utm_medm2=="" || utm_medm2=="undefined") {
	document.cookie = 'utm_medium' +"=" + utm_medm + ";domain=.vserv.mobi;path=/";
}
var utm_campn2=getCookie("utm_campaign");
if (utm_campn2 == null || utm_campn2=="" || utm_campn2=="undefined") {
	document.cookie = 'utm_campaign' +"=" + utm_campn + ";domain=.vserv.mobi;path=/";
}
var utm_adgrp2=getCookie("utm_adgroup");
if (utm_adgrp2 ==null || utm_adgrp2=="" || utm_adgrp2=="undefined") {
	document.cookie = 'utm_adgroup' +"=" + utm_adgrp + ";domain=.vserv.mobi;path=/";
}
var utm_term2=getCookie("utm_term");
if (utm_term2 ==null || utm_term2=="" || utm_term2=="undefined") {
	document.cookie = 'utm_term' +"=" + utm_tm + ";domain=.vserv.mobi;path=/";
}
var source_url2=getCookie("other_source_url");
if (source_url2 ==null || source_url2=="" || source_url2=="undefined") {
	document.cookie = 'other_source_url' +"=" + source_url + ";domain=.vserv.mobi;path=/";
}
var place2=getCookie("placement");
if (place2 ==null || place2=="" || place2=="undefined") {
	document.cookie = 'placement' +"=" + place + ";domain=.vserv.mobi;path=/";
}


function getCookie(c_name)
{
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1)  {
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1)  {
		c_value = null;
	}else  {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1)  {
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

function getLeadData() {
    var utm_source    = getCookie("utm_source");
    var utm_medium    = getCookie("utm_medium");	
    var utm_campaign  = getCookie("utm_campaign");
    var utm_adgroup   = getCookie("utm_adgroup");
    var utm_term 	  = getCookie("utm_term");
    var placement 	  = getCookie("placement");
    var other_source_url =getCookie("other_source_url");
    var marketingData = {"utm_source":utm_source,
                         "utm_medium":utm_medium,
                         "utm_campaign":utm_campaign,
                         "utm_adgroup":utm_adgroup,
                         "utm_term":utm_term,
                         "placement":placement,
                         "other_source_url":other_source_url
                         };
   return marketingData;
}
