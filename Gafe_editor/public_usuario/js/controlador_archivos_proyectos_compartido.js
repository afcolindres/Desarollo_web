
$(document).ready(function(){
    //alert("hola");
    $("#div_carpetas").html("");
    cargar_archivos_proyectos();
    cargar_archivos_proyectos_compartidos();
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


function cargar_archivos_proyectos() {
    $.ajax({
		url:"/archivos_proyectos_creados",
		method:"GET",
		dataType:"json",
		success:function(res){
            for (var i = 0; i < res.length; i++) {
                if(res[i].CODIGO_TIPO_ARCHIVO==1){
                    $("#div_carpetas").append(`
                    
                    <div style="text-align:center; margin-bottom: 20px" class="separar col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3">
                        <div>
                            <img class="mr-3 rounded-circle img-fluid" src="img/html.jpg" height="64px" width="64px">
                        </div>
                        <div>
                            <strong>${res[i].NOMBRE_ARCHIVO}</strong> 
                        </div>
                    </div> <br>`
                );
                }else if(res[i].CODIGO_TIPO_ARCHIVO==2){
                    $("#div_carpetas").append(`
                    
                    <div style="text-align:center; margin-bottom: 20px" class="separar col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3">
                        <div>
                            <img class="mr-3 rounded-circle img-fluid" src="img/css3.jpg" height="64px" width="64px">
                        </div>
                        <div>
                            <strong>${res[i].NOMBRE_ARCHIVO}</strong> 
                        </div>
                    </div> <br>`
                    );
                } else  {
                    $("#div_carpetas").append(`
                    
                    <div style="text-align:center; margin-bottom: 20px" class="separar col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3">
                        <div>
                            <img class="mr-3 rounded-circle img-fluid" src="img/js.jpg" height="64px" width="64px">
                        </div>
                        <div>
                            <strong>${res[i].NOMBRE_ARCHIVO}</strong> 
                        </div>
                    </div> <br>`
                    );
                }
            }
		},
		error:function(error){
			console.error(error);
		}
	});
}

function cargar_archivos_proyectos_compartidos() {
    $.ajax({
		url:"/archivos_proyectos_creados_compartidos",
		method:"GET",
		dataType:"json",
		success:function(res){
            for (var i = 0; i < res.length; i++) {
                if(res[i].CODIGO_TIPO_ARCHIVO==1){
                    $("#div_carpetas").append(`
                    
                    <div style="text-align:center; margin-bottom: 20px" class="separar col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3">
                        <div>
                            <img class="mr-3 rounded-circle img-fluid" src="img/html.jpg" height="64px" width="64px">
                        </div>
                        <div>
                            <strong>${res[i].NOMBRE_ARCHIVO}</strong> 
                        </div>
                    </div> <br>`
                );
                }else if(res[i].CODIGO_TIPO_ARCHIVO==2){
                    $("#div_carpetas").append(`
                    
                    <div style="text-align:center; margin-bottom: 20px" class="separar col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3">
                        <div>
                            <img class="mr-3 rounded-circle img-fluid" src="img/css3.jpg" height="64px" width="64px">
                        </div>
                        <div>
                            <strong>${res[i].NOMBRE_ARCHIVO}</strong> 
                        </div>
                    </div> <br>`
                    );
                } else  {
                    $("#div_carpetas").append(`
                    
                    <div style="text-align:center; margin-bottom: 20px" class="separar col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3">
                        <div>
                            <img class="mr-3 rounded-circle img-fluid" src="img/js.jpg" height="64px" width="64px">
                        </div>
                        <div>
                            <strong>${res[i].NOMBRE_ARCHIVO}</strong> 
                        </div>
                    </div> <br>`
                    );
                }
            }
		},
		error:function(error){
			console.error(error);
		}
	});
}