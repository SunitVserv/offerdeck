/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $("#submit-quest").click(function () {
            $("#loadScreen").show();
           var od_questions = {}; var jsonOdquest =''; 
           for(var i=1 ; i <= $('.questions').length; i++){
               var keys = i;var values ='';
               if(i == 1 || i== 2){
                   var val ='';
                   var checkData ='';
                    $('input[name="quest_'+i+'[]"]:checked').each(function(k){
                      if($('#'+'others_'+i).is(":checked") && $(this).val()=='Others'){
                        checkData =  $('#othersval_'+ i).val();
                      }else{
                        checkData = $(this).val();
                    }
                       val += checkData+", ";
                    });
                    val = val.replace(/,\s*$/, "");
                    values = val;
                }else if(i == 5){
                    values =  $('#othersval_'+ i).val();
                }else if(i == 9){
                    var convVal ='';
                    $('.quest_9').each(function(index) {
                        var Ids = this.id;
                        var splitdata= Ids.split("_");
                       // var keys = $('#'+Ids).val();
                        var keys = $('#'+Ids+' :selected').text();
                        var values = $('#conv_'+splitdata[1]+' :selected').text();
                        //var values = $('#conv_'+splitdata[1]).val();
                        if(keys != 'Select' && values != 'Select' ){
                            convVal += keys +" - "+values + ", " ;
                        }
                    });
                    convVal = convVal.replace(/,\s*$/, "");
                    values = convVal;
                }else{
                    if($('#quest_'+i+' :selected').text() != 'Select'){
                        values = $('#quest_'+i+' :selected').text();
                    }
                }
                if(values){
                    if(!od_questions[keys]){
                        od_questions[keys] = [];
                    }
                    od_questions[keys].push(values);
                }
           }
           if(jQuery.isEmptyObject(od_questions) == false){
                jsonOdquest = JSON.stringify(od_questions);
            }

            var post_data = {
                    "od_quest": jsonOdquest,
                    "ref_token": $.cookie('odsessionid')
                }

            userResponse(post_data);
        });
       $(".others").click(function () {
           if($('#' + this.id).is(":checked")){
                $('#'+this.id + '_textbox').css("display","block");
           }else{
               $('#'+this.id + '_textbox').css("display","none");
               $('#'+this.id + '_textbox').val('');
           }
          
       });
       $('#quest_4').change(function(){
            if($('#quest_4 :selected').val() == 'yes'){
                $('#trafficShow').css("display","block");
            }else{
                $('#trafficShow').css("display","none");
                $('#othersval_5').val('');
            }
       });
});
function checkSelectedVal(id,val){
     var selectedData = [];
    $('.quest_9').each(function() {
        var ids =this.id ;
        selectedData.push($('#'+this.id+' :selected').val());
        if(this.id != id){
            if(val != 'select'){
                $("#"+this.id+" option[value='" + val + "']").hide();
            }
        }
    });
    $(".quest_9 option" ).each(function() {
        if($(this).val() != 'select'){
            if(jQuery.inArray($(this).val(), selectedData) == -1){
                $(".quest_9 option[value='" + $(this).val() + "']").show();
            }
        }
    });
}

function userResponse(post_data){

    var url = api_config.base_url + api_config.more_information;
    $.ajax({
        url: url,
        type: 'post',
        data: JSON.stringify(post_data),
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            $('#loadScreen').hide();
            if(data.status == 0){
                //location.href = api_config.thank_you;
                window.parent.window.location.href = api_config.thank_you;
                $.removeCookie('odsessionid');
            }
        }
    });
}
function getRespectiveCookie() {
    obj = {path: '/', domain: '.'+api_config.cookie_domain};
    if (current_host == 'intelliswift.vserv.mobi' || current_host == 'local.intelliswift.vserv.mobi') {
        obj = {path: '/', domain: '.vserv.mobi'};
    }
    return obj;
}