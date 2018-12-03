$("#btn-registrar").click(function(){

    ////************************************************************ */
    /////**********************Validacion************************** */
    var name =document.getElementById("nombre").value;
    if( name == "" || name.length == 0 || /^\s+$/.test(name) ) {
        document.getElementById('nombre').style.borderColor = "red";
        return false;
    }
    var apellido =document.getElementById("apellido").value;
    if(apellido == "" || apellido.length == 0 || /^\s+$/.test(apellido) ) {
        document.getElementById('apellido').style.borderColor = "red";
        return false;
    }
    if ($("#email").val()==""){
        document.getElementById("email").style.borderColor='red';
        return false;
    }

    var imail = document.getElementById("email").value;
    if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(imail)){
        $("#emailOK").text("correo correcto");
       } else {
        $("#emailOK").text("correo incorrecto");
        return false;
       }

    if ($("#password").val()==""){
        document.getElementById("password").style.borderColor='red';
        return false;
    }
    if ($("#cofpassword").val()==""){
        document.getElementById("cofpassword").style.borderColor='red';
        return false;
    }

    if ($("#password").val()==$("#cofpassword").val() && $("#password").val()!=""){
        document.getElementById("password").style.borderColor='green';
        document.getElementById("cofpassword").style.borderColor='green';
        $("#contra").css("display", "none");
    }else{
        $("#contra").css("display", "block");
        return false;
    }

    var indice = document.getElementById("slg-genero").selectedIndex;
    if(indice == null  || indice == 0) {
        document.getElementById('slg-genero').style.borderColor= "red";
        return false;
    }

//***************************************************************************** */
////***********************registro de usuarios******************************* */
    var parametros=`nombre=${$("#nombre").val()}&apellido=${$("#apellido").val()}&email=${$("#email").val()}&password=${$("#password").val()}&genero=${$("#slg-genero").val()}`;
    var correo= `email=${$("#email").val()}`;
    var correo2=$("#email").val();
    $.ajax({
         url:"/consultausuario",
         method: "POST",
         data: correo,
         dataType: "json",
         success: function (respuesta) {
             console.log(respuesta.length);
             if(respuesta.length==0){
                $.ajax({
                    url: "/registrarUsuario",
                    method: "POST",
                    data: parametros,
                    dataType: "json",
                    success: function (respuesta2) {
                        //console.log(respuesta);
                        location.href="/principal.html";
                    },
                    error: function (error2) {
                        console.error(error2);
                    }
                });
             }
             else{
                $("#usuario-registrado").css("display", "block");
             }
             
         },
         error: function (error) {
             console.error(error);
         }
     });
});
