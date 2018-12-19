

$(document).ready(function(){

    cargar_proyectos();


});

function cargar_proyectos() {
    $.ajax({
		url:"/proyectos_compartidos",
		method:"GET",
		dataType:"json",
		success:function(res){
            //console.log(res);
            for (var i = 0; i < res.length; i++) {
                $("#div_proyectos_compartidos").append(`
                    <div id="${res[i].CODIGO_PROYECTO}" ondblclick="obtener_cod_proyecto(${res[i].CODIGO_PROYECTO},${res[i].CODIGO_USUARIO});" style="text-align:center; margin-bottom: 20px" class="separar col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3">
                        <div>
                            <img class="mr-3  img-fluid" src="img/proyectoss.jpg" height="86px" width="86px">
                        </div>
                        <div>
                            <strong>${res[i].NOMBRE}</strong> 
                        </div>
                    </div>`
                );
            }
		},
		error:function(error){
			console.error(error);
		}
	});
}


function obtener_cod_proyecto(id,codigo_usuario){
    alert("Obtener codigo proyecto: " + id + codigo_usuario);
    $.ajax({
        url:`/cookie_compartios/${id}/${codigo_usuario}`,
        method:"GET",
        dataType:"json",
        success:function(res){
            location.href="archivos_proyectos_compartidos.html"
        },
        error:function(error){
            console.error(error);
        }
    });
}