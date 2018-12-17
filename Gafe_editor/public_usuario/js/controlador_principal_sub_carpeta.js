
$(document).ready(function(){
    //alert("hola");
    $("#div_carpetas").html("");
    cargar_carpetas();
});

function obtener_cod_carpeta(id){
    //alert("Obtener codigo carpeta: " + id);
    $.ajax({
        url:`/cookie_carpeta/${id}`,
        method:"GET",
        dataType:"json",
        success:function(res){
            location.href="principal-Sub-carpeta.html"
        },
        error:function(error){
            console.error(error);
        }
    });
}


$("#crear_carpeta").click(function(){
    var parametros=`nombre_carpeta=${$("#txt-carpeta").val()}`;
    $.ajax({
        url:"/sub_carpetas",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(res){
            //console.log(res);
            $("#carpeta").modal("toggle");
            //alert("se guardo la carpeta");
            $("#div_carpetas").html("");
            cargar_carpetas();
            //window.location.href = "/editar-codigo.html";
        },
        error:function(error){
            console.error(error);
        }
    });
});

function cargar_carpetas() {
    $.ajax({
		url:"/sub_carpetas_creadas",
		method:"GET",
		dataType:"json",
		success:function(res){
            for (var i = 0; i < res.length; i++) {
                $("#div_carpetas").append(`
                <div id="${res[i].CODIGO_CARPETA}" ondblclick="obtener_cod_carpeta(${res[i].CODIGO_CARPETA});" style="text-align:center; margin-bottom: 20px" class="separar col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3">
                    <div>
                        <img class="mr-3 rounded-circle img-fluid" src="img/folder.jpg" height="64px" width="64px">
                    </div>
                    <div>
                        <strong>${res[i].NOMBRE_CARPETA}</strong> 
                    </div>
                </div> <br>
                    `
                );
            }
		},
		error:function(error){
			console.error(error);
		}
	});
}