function sendEmail(frm, module, e) {
    jQuery('.loader').hide(); 
    jQuery('.messages').html("");

    var form = jQuery(frm).closest('form')[0];
    var elements = document.getElementById(form.id).elements;
    var requiredElems = document.getElementsByClassName('required');
    var errElems = [];
    if (requiredElems.length > 0) {
        for (var i = 0, element; element = requiredElems[i++]; ) {
            if (element.value == '') {
                errElems.push(element);
                element.style.border = '1px solid red';
            } else {
                element.style.border = '2px solid #333333';
            }
        }
    }
    if (errElems.length > 0) {
        showError('Please fill required inputs');
        e.preventDefault();
        return false;
    }
    var alphaElements = document.getElementsByClassName('alphabets');
    var errElems = [];
    if (alphaElements.length > 0) {
        for (var i = 0, element; element = alphaElements[i++]; ) {
            if (element.value != '' && !element.value.match(/^[a-zA-Z\-\s?]+$/)) {
                errElems.push(element);
                element.style.border = '1px solid red';
            } else {
                element.style.border = '2px solid #333333';
            }
        }
    }
    if (errElems.length > 0) {
        showError('Please Enter Alphabets Only');
        e.preventDefault();
        return false;
    }
    if (!isEmail(document.getElementById('email').value)) {
        document.getElementById('email').style.border = '1px solid red';
        showError('Please enter a valid email address');
        e.preventDefault();
        return false;
    } else {
        document.getElementById('email').style.border = '2px solid #333333';
    }
    var numberElements = document.getElementsByClassName('numeric');
    var errElems = [];
    if (numberElements.length > 0) {
        for (var i = 0, element; element = numberElements[i++]; ) {
            if (element.value != '' && !element.value.match(/^[0-9]+$/)) {
                errElems.push(element);
                element.style.border = '1px solid red';
            } else {
                element.style.border = '2px solid #333333';
            }
        }
    }
    if (errElems.length > 0) {
        showError('Please Enter Numerics Only');
        e.preventDefault();
        return false;
    }
    if (document.getElementById('phonenumber')) {
        if (document.getElementById('phonenumber').value.length < 10) {
            document.getElementById('phonenumber').style.border = '1px solid red';
            showError('Phone Number length should be minimum 10');
            e.preventDefault();
            return false;
        } else {
            document.getElementById('phonenumber').style.border = '2px solid #333333';
        }
    }
    if (document.getElementById('password')
            && document.getElementById('cnfpassword')) {
        if (document.getElementById('password').value.length < 8) {
            document.getElementById('password').style.border = '1px solid red';
            showError("Password length should be minimum 8");
            e.preventDefault();
            return false;
        } else {
            document.getElementById('password').style.border = '2px solid #333333';
        }
        if (document.getElementById('password').value != document.getElementById('cnfpassword').value) {
            document.getElementById('password').style.border = '1px solid red';
            document.getElementById('cnfpassword').style.border = '1px solid red';
            showError("Password & Confirm Password doesn't match");
            e.preventDefault();
            return false;
        } else {
            document.getElementById('password').style.border = '2px solid #333333';
            document.getElementById('cnfpassword').style.border = '2px solid #333333';
        }
    }
    var signupTemplate = '';
    jQuery('.loader').show(); 

    jQuery.ajax({
	
        url: targetMailConfig[module]['template'],
        dataType: "html",
        contentType: "text/html",
        success: function(data) {
            signupTemplate = data;
            var post_data = {
                'serviceId': 'od',
                'to': targetMailConfig[module]['email'],
                'subject': targetMailConfig[module]['subject'],
                'body': ""
            };
            var table = "<table border='2' cellspacing='0' cellpadding='10'>";
            for (var i = 0, element; element = elements[i++]; ) {
                //console.log(element.value);
                if (element.type != 'submit' && element.type != 'hidden') {
                    table += "<tr>";
                    table += "<td>" + element.getAttribute('data-name');
                    table += "</td><td>" + element.value;
                    table += "</td></tr>";
                }
            }
            table += "</table>";
            //console.log(table);
            signupTemplate = signupTemplate.replace("__BODY__", table);
            post_data.body = signupTemplate;
            //console.log(post_data);
            jQuery.ajax({
                url: getApiUrl() +'/mail/send',
                type: 'post',
                data: JSON.stringify(post_data),
                contentType: "application/json",
                dataType: 'json',
                success: function(data) {
                    var message = 'Your Request has been sent successfully';
                    
                    if (data.status == 0) {
			for (var i = 0, element; element = elements[i++]; ) {
  	                    if (element.type != 'submit' && element.type != 'hidden') {
				element.value = '';
			    }
			}

                        if (module == 'contactus') {
                            message = 'Thank you for reaching out to us. Our representative will address your query shortly.';
                        }
                        jQuery('.messages').html(message).css('color', 'green');
                    } else {
                        message = 'Something went wrong';
                        jQuery('.messages').html(message).css('color', 'red');
                    }
                    jQuery('.loader').hide();
                }
            });
        }
    });
    e.preventDefault();
    return false;
}

function showError(message) {
    $('.messages').html(message).css('color', 'red');
    $('.loader').hide();
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
