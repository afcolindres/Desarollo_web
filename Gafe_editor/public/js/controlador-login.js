$("#btn-login").click(function(){
    parametros=`correo=${$("#correo").val()}&contrasenia=${$("#contrasenia").val()}`;
    //alert(parametros);
    $.ajax({
        url:"/login",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(respuesta){
            //alert("excelente");
             console.log(respuesta);
             if (respuesta.length == 1)
                 window.location.href = "/principal.html";
             else 
                 document.getElementById("usuario-registrado").style.display="block";
        },
        error:function(error){
            console.error(error);
        }
    });
});