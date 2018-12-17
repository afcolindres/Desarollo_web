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
                    alert("redirigir comprar plan");
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
    cargar_proyectos();

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
                    <div style="text-align:center; margin-bottom: 20px" class="separar col-xl-2 col-lg-2 col-md-2 col-sm-3 col-3">
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

$("#crear_archivo").click(function(){
    var nombre=$("#txt-archivo").val();
    arregloDeSubCadenas = nombre.split(".");
    var nombre1=arregloDeSubCadenas[0];
    var extension=arregloDeSubCadenas[1];
    
    var parametros=`nombre_archivo=${$("#txt-archivo").val()}&extesnsion=${extension}`;
    $.ajax({
        url:"/archivos",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(res){
            console.log(res);
            alert("se guardo el archivo");
            //cargar_proyectos();
            //window.location.href = "/editar-codigo.html";
        },
        error:function(error){
            console.error(error);
        }
    });
});