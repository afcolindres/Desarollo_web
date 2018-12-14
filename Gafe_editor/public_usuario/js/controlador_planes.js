var tipo_plan;
$("#btn-cambiar").click(function(){
    if( $("#plan1 input[name='options1']:radio").is(':checked')) {  
        tipo_plan =$('input:radio[name=options1]:checked').val();
    } else{  
        document.getElementById("cambiar").style.color="red"; 
        return; 
        }


    $.ajax({
        url:`/cookie_plan/${tipo_plan}`,
        method:"GET",
        dataType:"json",
        success:function(res){
            window.location.href = "/pago-tarjeta.html";
        },
        error:function(error){
            console.error(error);
        }
    });
});