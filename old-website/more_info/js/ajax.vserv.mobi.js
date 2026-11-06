function APIAccess(){
	this.LoadScreen = function(){
		var loadScreen = $('#loadScreen');
		if(loadScreen.html() == undefined){
			loadScreen = '<div id="loadScreen" style="display: none;width: 100%; height: 100%; top: 0pt;left: 0pt;">' + 
							 '<div id="loadScr" style="filter: alpha(opacity = 65);  z-index: 150000;border: medium none; margin: 0pt; padding: 0pt; width: 100%; height: 100%; top: 0pt;left: 0pt; background-color: rgb(0, 0, 0); opacity: 0.2; cursor: wait; position: fixed;"></div>' +
							 '<div id="loader"  style="z-index: 200000; position: fixed; padding: 0px; margin: 0px;width: 30%; top: 40%; left: 35%; text-align: center;cursor: wait; ">' +
							 '<img src="img/ajax-loader.gif" alt="loading" /></div></div>';
			$(document.body).append(loadScreen);
		}
	};

	this.APICall = function(url, params, method, callback, callbackfn){
		this.LoadScreen();	
		var postData = null;
		if(params != null){
			postData = JSON.stringify(params);
		}
		if(url.toLowerCase().indexOf("http") < 0){
			url = "http://" + url;
		}	
		$('#loadScreen').show(function(){
			$.ajax({
			  url: url,
			  async: true,
			  type: method,
			  data: postData,
				beforeSend: function(xhr, opts){
					
				},
			  success: function(data, status, xhr){
					//$('#loadScreen').hide();
					callback(data, callbackfn);
			  },
			  error: function(jqXHR, textStatus, errorThrown){
				  //$('#loadScreen').hide();
				  return false;
			  }   
			}); 
		});
	};
	
	this.request = function(callbackfn){
		this.APICall(this.url, this.params, this.method, this.callback, callbackfn);
	};
}

// function Login(usermail, pass){
// 	var domainUrl = getCookie("domain");
// 	if(domainUrl == null){
// 		return false;
// 	}
// 	else{
// 		domainUrl += '/api/login';
// 	}
		
// 	this.url = domainUrl;
// 	this.params = {"email": usermail, "password": pass, "language": "en"};
// 	this.method = 'POST';
// 	this.callback = function(data, fn){
// 		if(typeof fn === 'function'){
// 			fn(data);
// 		}
// 	};
// }
// Login.prototype = new APIAccess;

// function Logout(){
// 	var domainUrl = getCookie("domain");
// 	if(domainUrl == null){
// 		return false;
// 	}
// 	else{
// 		domainUrl += '/api/logout';
// 	}
		
// 	this.url = domainUrl;
// 	this.params = null;
// 	this.method = 'GET';
// 	this.callback = function(data, fn){
// 		if(typeof fn === 'function'){
// 			fn(data);
// 		}
// 	};
// }
// Logout.prototype = new APIAccess;
