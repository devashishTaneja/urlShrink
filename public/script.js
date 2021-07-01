function copyToClipboard(){
    var copyText = document.getElementById("shortUrl");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    $("#copy").removeClass("btn-secondary").addClass("btn-success").text("Copied")
    setTimeout(function() {
        $("#copy").addClass("btn-secondary").removeClass("btn-success").text("Copy")
    }, 2000);
}

$(document).ready(function(){
    $("#form1").submit(function(e){
        e.preventDefault();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if(this.readyState == 4){
                if(this.status == 200) {
                    document.getElementById("shortUrl").value = window.location.href + this.responseText;
                    $("#form1").addClass("hidden");
                    $("#form2").removeClass("hidden");
                }
                else{
                    alert('Invlaid Url');
                }
            }
        };
        xhttp.open("POST","/getUrl",true);
        var formElement = document.querySelector("#form1");
        var formData = new FormData(formElement);
        xhttp.send(formData);
    });
});


