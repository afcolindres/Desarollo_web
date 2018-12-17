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
