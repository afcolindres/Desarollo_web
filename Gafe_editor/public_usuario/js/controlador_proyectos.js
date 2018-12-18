function modalRegistro(){
	$("#archivo").modal("show");
}
function modalRegistro1(){
	$("#archivo1").modal("show");
}
function modalRegistro2(){
	$("#archivo2").modal("show");
}

$(document).ready(function(){
    //alert("hola");
	$.ajax({
		url:"/ver_proyecto",
		method:"GET",
		dataType:"json",
		success:function(res){
            console.log(res);
            var nombre_proyecto=`${res[0].NOMBRE}`;
            $("#nomProyecto").val(nombre_proyecto);
		},
		error:function(error){
			console.error(error);
		}
	});

});

$("#crear_archivo").click(function(){
    var nombre=$("#txt-archivo").val();
    arregloDeSubCadenas = nombre.split(".");
    //var nombre1=arregloDeSubCadenas[0];
    var extension=arregloDeSubCadenas[1];
    
    var parametros=`nombre_archivo=${$("#txt-archivo").val()}&extension=${extension}&contenido=${$("#valor").val()}`;
	alert(parametros);
	$.ajax({
        url:"/archivos_proyectos",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(res){
            //console.log(res);
            $("#archivo").modal("toggle");
            alert("se guardo el archivo");
            //$("#div_carpetas").html("");
            //cargar_carpetas();
            //cargar_archivos();
            //window.location.href = "/editar-codigo.html";
        },
        error:function(error){
            console.error(error);
        }
    });
});

$("#crear_archivo1").click(function(){
    var nombre=$("#txt-archivo1").val();
    arregloDeSubCadenas = nombre.split(".");
    //var nombre1=arregloDeSubCadenas[0];
    var extension=arregloDeSubCadenas[1];
    
    var parametros=`nombre_archivo=${$("#txt-archivo1").val()}&extension=${extension}&contenido=${$("#valor1").val()}`;
	alert(parametros);
	$.ajax({
        url:"/archivos_proyectos",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(res){
            //console.log(res);
            $("#archivo1").modal("toggle");
            alert("se guardo el archivo");
            //$("#div_carpetas").html("");
            //cargar_carpetas();
            //cargar_archivos();
            //window.location.href = "/editar-codigo.html";
        },
        error:function(error){
            console.error(error);
        }
    });
});

$("#crear_archivo2").click(function(){
    var nombre=$("#txt-archivo2").val();
    arregloDeSubCadenas = nombre.split(".");
    //var nombre1=arregloDeSubCadenas[0];
    var extension=arregloDeSubCadenas[1];
    
    var parametros=`nombre_archivo=${$("#txt-archivo2").val()}&extension=${extension}&contenido=${$("#valor2").val()}`;
	alert(parametros);
	$.ajax({
        url:"/archivos_proyectos",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(res){
            //console.log(res);
            $("#archivo2").modal("toggle");
            alert("se guardo el archivo");
            //$("#div_carpetas").html("");
            //cargar_carpetas();
            //cargar_archivos();
            //window.location.href = "/editar-codigo.html";
        },
        error:function(error){
            console.error(error);
        }
    });
});



