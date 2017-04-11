var file;


function sendFileToServer(formData)
{
    var uploadURL ="https://mobit-tap-speech2text.mybluemix.net/speechfile"; //Upload URL
    
    $.ajax({
        url: uploadURL,
        type: "POST",
        contentType:false,
        dataType: 'json',
        cache: false,
        data: formData
    });
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
  
     $(this).css('border', '2px dotted #0B85A1');
     e.preventDefault();
     file = e.originalEvent.dataTransfer.files;
     
     console.log(file[0]);
     
     $("#filename").text(file[0].name);
     
     $("#files").show();
     
     
     //We need to send dropped files to Server
     //handleFileUpload(files,obj);
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