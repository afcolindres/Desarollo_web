$(document).ready(function(){
    //alert("hola");
	$.ajax({
		url:"/perfil",
		method:"GET",
		dataType:"json",
		success:function(res){
            console.log(res);
            var nombre_completo=`${res[0].NOMBRE} ${res[0].APELLIDOS}`;
            $("#nombre").val(nombre_completo);
            $("#telefono").val(`${res[0].TELEFONO}`);
            $("#contacto").val(`${res[0].CORREO}`);
            $("#cumpleanios").val(`${res[0].FECHA_NACIMIENTO}`);
            $("#foto").append(
                `<img class="mr-3 rounded-circle img-fluid" src="img/${res[0].CODIGO_USUARIO}.jpg" height="150px" width="120px">
            `);
		},
		error:function(error){
			console.error(error);
		}
	});

});



// $(document).ready(function(){
//     //alert("hola");
// 	$.ajax({
// 		url:"/perfil",
// 		method:"GET",
// 		dataType:"json",
// 		success:function(res){
//             console.log(res);
//             $("#formulario-signup").append(
//                 `<div class="form-group col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
//                     <b>Nombre </b><br>
//                     <span style="font-size:20px">${res[0].NOMBRE}</span>    <span style="font-size:20px">${res[0].APELLIDOS}</span>
//                 </div><br>
            
//                 <div class=" form-group col-12">
//                     <b>Numero de telefono </b><br>
//                     <span style="font-size:20px">${res[0].TELEFONO}</span>
//                 </div><br>
//                 <div class="form-group col-12">
//                     <b>Informacion de contacto</b><br>
//                     <span style="font-size:20px">${res[0].CORREO}</span>   
//                 </div><br>
//                 <div class="form-group col-12">
//                     <b>Birthday</b><br>
//                     <span style="font-size:20px">${res[0].FECHA_NACIMIENTO}</span>    
//                 </div><br>
//                 <div class="form-group col-12">
//                     <input class="btn btn-danger" type="button" onclick="location.href='editar-perfil.html'" value="Editar perfil">
//                 </div>
//                 `
//                 );
//                 $("#foto").append(
//                     `<img class="mr-3 rounded-circle img-fluid" src="img/${res[0].CODIGO_USUARIO}.jpg" height="150px" width="120px">
//                     `);
// 		},
// 		error:function(error){
// 			console.error(error);
// 		}
// 	});

// });