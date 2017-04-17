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

function sendFileToServer(formData)
{
    var uploadURL ="https://mobit-tap-speech2text.mybluemix.net/speechfile"; //Upload URL
    
    $.ajax({
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
    }).fail(function(jqXHR, textStatus, errorThrown ){
        console.log(jqXHR );
        console.log(textStatus );
        console.log(errorThrown );
    })
    ;
}











function handleFileUpload(files,obj)
{
   for (var i = 0; i < files.length; i++)
   {
        var fd = new FormData();
        fd.append('file', files[i]);
        sendFileToServer(fd);
   }
}
$(document).ready(function()
{
var obj = $("#ddhandler");
obj.on('dragenter', function (e)
{
    e.stopPropagation();
    e.preventDefault();
    $(this).css('border', '2px solid #0B85A1');
});
obj.on('dragover', function (e)
{
     e.stopPropagation();
     e.preventDefault();
});
obj.on('drop', function (e)
{
  
     e.preventDefault();
     file = e.originalEvent.dataTransfer.files;
     
});
$(document).on('dragenter', function (e)
{
    e.stopPropagation();
    e.preventDefault();
});
$(document).on('dragover', function (e)
{
  e.stopPropagation();
  e.preventDefault();
  obj.css('border', '2px dotted #0B85A1');
});
$(document).on('drop', function (e)
{
    e.stopPropagation();
    e.preventDefault();
});
  
});
