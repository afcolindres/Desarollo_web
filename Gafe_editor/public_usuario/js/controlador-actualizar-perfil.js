$(document).ready(function(){
    //alert("hola");
	$.ajax({
		url:"/actualizarperfil",
		method:"GET",
		dataType:"json",
		success:function(res){
            //console.log(res);
            $("#nombre").val(`${res[0].NOMBRE}`);
            $("#apellido").val(`${res[0].APELLIDOS}`);
            $("#correo").val(`${res[0].CORREO}`);
            $("#slgenero").val(`${res[0].CODIGO_GENERO}`);
            $("#foto").append(
                `<img class="mr-3 rounded-circle img-fluid" src="img/${res[0].CODIGO_USUARIO}.jpg" height="150px" width="120px">
                `);
		},
		error:function(error){
			console.error(error);
		}
    });
});

$("#actualizar").click(function(){
////***********************Atualizar usuario******************************* */
    var parametros=`nombre=${$("#nombre").val()}&apellido=${$("#apellido").val()}&email=${$("#correo").val()}&fecha=${$("#fecha").val()}&genero=${$("#slgenero").val()}&movil=${$("#movil").val()}&biografia=${$("#biografia").val()}&sitio=${$("#sitio").val()}`;
    //alert(parametros);
     $.ajax({
          url:"/actualizarusuario",
          method: "POST",
          data: parametros,
          dataType: "json",
          success: function (respuesta) {
              //console.log(respuesta.length);
              location.href="/perfil.html";
          },
          error: function (error) {
              console.error(error);
          }
      });
});