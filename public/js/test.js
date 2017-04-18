var file;
$(function(){
$("#speechfile").on("submit",function(evt){
	var form = $("#speechfile").get()[0];
	var formData = new FormData(form);
	
//	formData = new FormData();
//	var input_file = $("#audio_file");
//console.log(input_file[0].files[0]);
//	console.log(file[0]);
	
//	formData.append( input_file.attr('name'), input_file[0] );
//	console.log(formData);
	
	
	sendFileToServer(formData);
	evt.preventDefault();
	
});
});

function modalResize(){
     var w = $("#screen").width();
     var h = $("#screen").height();

     var cw = $("#progress-bar").outerWidth();
     var ch = $("#progress-bar").outerHeight();

     $("#progress-bar).css({
          "left": ((w - cw)/2) + "px",
          "top": ((h - ch)/2) + "px"
     });
}

function sendFileToServer(formData)
{
    var uploadURL ="https://mobit-tap-speech2text.mybluemix.net/speechfile"; //Upload URL
    var start = Date.now();
    
    $("body").append('<div id="modal-bg"></div>');
    $("#modal-bg,#progress-bar").fadeIn("slow");
    modalResize();
    
    $("#progress-bar").progressbar({
        value:0,
        max:100
    });
    
    $.ajax({
        async: true,
        xhr : function(){
            XHR = $.ajaxSettings.xhr();
            if(XHR.upload){
                XHR.upload.addEventListener('progress',function(e){
                    var progre = parseInt(e.loaded/e.total*10000)/100 ;
                    $("#progress-bar").progressbar({
                        value:progre
                    });
                    console.log(progre+"%") ;
                    
                 }, false);
             }
            return XHR;
        },
        url: uploadURL,
        type: "POST",
        contentType: false,
        processData: false,
        dataType: 'json',
        cache: false,
        data: formData
    }).done(function(response){
        console.log("success");
        console.log(response.text);
        
        $("#translate").text(response.text);
        $("#translate").show();
        
        var end = Date.now();
        var time = Math.round((end - start)/100)/10;
        
        $("#progress-bar,#modal-bg").fadeOut("slow",function(){
                $('#modal-bg').remove() ;
            });
        
        $("#timeLeft").text(time + "秒");
        
    }).fail(function(jqXHR, textStatus, errorThrown ){
        console.log(jqXHR );
        console.log(textStatus );
        console.log(errorThrown );
    })
    ;
}

