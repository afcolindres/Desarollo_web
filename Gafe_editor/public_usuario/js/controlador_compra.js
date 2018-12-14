$("#btn-plan").click(function(){
    var parametros=`numero_tarjeta=${$("#numTarjet").val()}&cod_tarjeta=${$("#codigoV").val()}`;
    //alert(parametros);

    $.ajax({
        url:"/registrar_compra",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(res){
            window.location.href = "/editar-codigo.html";
        },
        error:function(error){
            console.error(error);
        }
    });
});