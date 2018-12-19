$("#crear_proyecto").click(function(){
    var parametros=`nombre_proyecto=${$("#txt-proyecto").val()}`;
    //alert(parametros);
 
    $.ajax({
         url:"/cant_proyectos",
         method: "GET",
         //data: correo,
         dataType: "json",
         success: function (respuesta) {
             console.log(respuesta);
             $("#proyecto").modal("toggle");
             if (respuesta[0].PLAN ==0 && respuesta[0].CANT_PROYECTOS<=2) {
                 //alert("plan gratis");
                 if (respuesta[0].CANT_PROYECTOS<=1) {
                    //alert("crear proyecto y redirigir pagina proyecto");
                    $.ajax({
                        url:"/proyectos",
                        method:"POST",
                        data:parametros,
                        dataType:"json",
                        success:function(res){
                            console.log(res);
                            cargar_proyectos();
                            window.location.href = "/editar-codigo.html";
                        },
                        error:function(error){
                            console.error(error);
                        }
                    });
                 } else {
                    window.location.href = "/planes.html";
                 }
             }else if (respuesta[0].PLAN ==1 && respuesta[0].CANT_PROYECTOS<=5) {
                //alert("plan basico");
                if (respuesta[0].CANT_PROYECTOS<=4) {
                    //alert("crear proyecto y redirigir pagina proyecto");
                    $.ajax({
                        url:"/proyectos",
                        method:"POST",
                        data:parametros,
                        dataType:"json",
                        success:function(res){
                            console.log(res);
                            cargar_proyectos();
                            window.location.href = "/editar-codigo.html";
                        },
                        error:function(error){
                            console.error(error);
                        }
                    });
                 } else {
                    window.location.href = "/planes.html";
                 }
            } else if (respuesta[0].PLAN ==2 && respuesta[0].CANT_PROYECTOS<=10) {
                //alert("plan estandar");
                if (respuesta[0].CANT_PROYECTOS<=9) {
                    //alert("crear proyecto y redirigir pagina proyecto");
                    $.ajax({
                        url:"/proyectos",
                        method:"POST",
                        data:parametros,
                        dataType:"json",
                        success:function(res){
                            console.log(res);
                            cargar_proyectos();
                            window.location.href = "/editar-codigo.html";
                        },
                        error:function(error){
                            console.error(error);
                        }
                    });
                 } else {
                    //alert("redirigir comprar plan");
                    window.location.href = "/planes.html";
                 }
            } else if (respuesta[0].PLAN ==3) {
                //alert("plan premiun, crea ployectos ilimitados");
                $.ajax({
                    url:"/proyectos",
                    method:"POST",
                    data:parametros,
                    dataType:"json",
                    success:function(res){
                        console.log(res);
                        cargar_proyectos();
                        window.location.href = "/editar-codigo.html";
                    },
                    error:function(error){
                        console.error(error);
                    }
                });
            }
 
         },
         error: function (error) {
             console.error(error);
         }
     });
});

$(document).ready(function(){
    //alert("hola");
    cargar_carpetas();
    cargar_archivos();
    cargar_proyectos();
    cargar_proyectos_compartidos();

});

function cargar_proyectos() {
    $.ajax({
		url:"/proyectos_creados",
		method:"GET",
		dataType:"json",
		success:function(res){
            //console.log(res);
            for (var i = 0; i < res.length; i++) {
                $("#div_proyectos").append(`
                    <div id="${res[i].COD_PROYECTO}" ondblclick="obtener_cod_proyecto(${res[i].COD_PROYECTO});" style="text-align:center; margin-bottom: 20px" class="separar col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3">
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


function cargar_proyectos_compartidos() {
    $.ajax({
		url:"/proyectos_creados",
		method:"GET",
		dataType:"json",
		success:function(res){
            //console.log(res);
            for (var i = 0; i < res.length; i++) {
                $("#mis_proyectos").append(`
                <option value="${res[i].COD_PROYECTO}">${res[i].NOMBRE}</option>
                `);
            }

            $.ajax({
                url:"/usuarios_registrados",
                method:"GET",
                dataType:"json",
                success:function(res){
                    //console.log(res);
                    for (var i = 0; i < res.length; i++) {
                        $("#usuarios").append(`
                        <option value="${res[i].CODIGO_USUARIO}">${res[i].NOMBRE} ${res[i].APELLIDOS}</option>
                        `);
                    }
                },
                error:function(error){
                    console.error(error);
                }
            });
		},
		error:function(error){
			console.error(error);
		}
	});
}




$("#crear_archivo").click(function(){
    var nombre=$("#txt-archivo").val();
    arregloDeSubCadenas = nombre.split(".");
    //var nombre1=arregloDeSubCadenas[0];
    var extension=arregloDeSubCadenas[1];
    
    var parametros=`nombre_archivo=${$("#txt-archivo").val()}&extension=${extension}`;
    $.ajax({
        url:"/archivos",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(res){
            //console.log(res);
            $("#archivo").modal("toggle");
            //alert("se guardo el archivo");
            $("#div_carpetas").html("");
            cargar_carpetas();
            cargar_archivos();
            //window.location.href = "/editar-codigo.html";
        },
        error:function(error){
            console.error(error);
        }
    });
});


function cargar_archivos() {
    $.ajax({
		url:"/archivos_creados",
		method:"GET",
		dataType:"json",
		success:function(res){
            //console.log(res);
            
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

function obtener_cod_proyecto(id){
    //alert("Obtener codigo carpeta: " + id);
    $.ajax({
        url:`/cookie_proyecto/${id}`,
        method:"GET",
        dataType:"json",
        success:function(res){
            location.href="archivos_proyectos.html"
        },
        error:function(error){
            console.error(error);
        }
    });
}


$("#crear_carpeta").click(function(){
    var parametros=`nombre_carpeta=${$("#txt-carpeta").val()}`;
    $.ajax({
        url:"/carpetas",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(res){
            //console.log(res);
            $("#carpeta").modal("toggle");
            //alert("se guardo la carpeta");
            $("#div_carpetas").html("");
            cargar_carpetas()
            cargar_archivos();
            //window.location.href = "/editar-codigo.html";
        },
        error:function(error){
            console.error(error);
        }
    });
});

function cargar_carpetas() {
    $.ajax({
		url:"/carpetas_creadas",
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


$("#compartir").click(function(){
    var parametros=`cod_proyecto=${$("#mis_proyectos").val()}&cod_usuario_compartir=${$("#usuarios").val()}`;
    alert(parametros);
    $.ajax({
        url:"/compartir_proyectos",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(res){
            document.getElementById("confirmar_com").style.display="block";
        },
        error:function(error){
            console.error(error);
        }
    });
});