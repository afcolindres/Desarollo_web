var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var sha1 = require('sha1');
var app = express();
var credenciales = {
    host:"localhost",
    user:"root",
    password:"",
    port:"3306",
    database: "bd_gafe"
};

app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// secret es para generar una cookie en el cliente y esta genera un id e identificar de
// quien son las variables de session 
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));

///****************Rutas de control************************* */



//*************** variables de sesion ******************* */
//Verificar si existe una variable de sesion para poner publica la carpeta public admin
var publicUsuario = express.static("public_usuario");
app.use(
    function(req,res,next){
        if (req.session.correoUsuario){
            //Significa que el usuario si esta logueado
            if (req.session.codigoTipoUsuario == 1)
                publicUsuario(req,res,next);
        }
        else
            return next();
    }
); 
///Para agregar seguridad a una ruta especifica:
function verificarAutenticacion(req, res, next){
	if(req.session.correoUsuario)
		return next();
	else
		res.send("ERROR, ACCESO NO AUTORIZADO");
}

///******************login*********************** */
app.post("/login",function(req, res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`
                    SELECT CODIGO_USUARIO, CORREO, CONTRASEÑA,TIPO_USUARIO
                    FROM tbl_usuarios 
                    WHERE CORREO = ?  and CONTRASEÑA = sha1(?)`,
        [req.body.correo, req.body.contrasenia],
        function(error, data, fields){
             if (error){
                 res.send(error);
                 res.end();
             }else{
                 if (data.length==1){
                     req.session.codigoUsuario = data[0].CODIGO_USUARIO;
                     req.session.correoUsuario = data[0].CORREO;
                     req.session.codigoTipoUsuario = data[0].TIPO_USUARIO;
                 }
                 res.send(data);
                 res.end();
             }
        }
    )
});

/************   obtener sesion************ */
app.get("/obtener-session",function(req,res){
    res.send("Codigo Usuario: " + req.session.codigoUsuario+
            ", Correo: " + req.session.correoUsuario +
            ", Tipo Usuario: " + req.session.codigoTipoUsuario
    );
    res.end();
});


/************  cerrar sesion************ */
app.get("/cerrar-sesion",function(req,res){
    req.session.destroy();
    res.redirect('http://localhost:8008');
    res.end();
});


//*********************** verificando si el usuario esta registrado************************** */
app.post("/consultausuario", function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`SELECT CODIGO_USUARIO, CORREO
                    FROM tbl_usuarios 
                    WHERE lower(correo)=lower(?)`,
        [req.body.email],
        function(error, data, fields){
            console.log(error);
            res.send(data);
            res.end();
            conexion.end();
        }
    );
});

///***************************registro de usuarios************************ */
app.post("/registrarUsuario", function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`INSERT INTO tbl_usuarios(NOMBRE, APELLIDOS, CORREO, CONTRASEÑA, CODIGO_GENERO,TIPO_USUARIO,PLAN) 
                    VALUES (?,?,?,?,?,?,?)`,
        [req.body.nombre,req.body.apellido,req.body.email, sha1(req.body.password),req.body.genero,1,0],
        function(error, data, fields){
            console.log(error);
            req.session.codigoUsuario = data.insertId;
            req.session.correoUsuario = req.body.email;
            req.session.codigoTipoUsuario = 1;
            res.send(data);
            res.end();
            conexion.end();
        }
    );
});

////********************  Perfil ********************** */
app.get("/perfil",verificarAutenticacion,function(req, res){
    var codUsu=req.session.codigoUsuario;
    //console.log(codUsu);
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`SELECT CODIGO_USUARIO, NOMBRE, APELLIDOS, CORREO, CONTRASEÑA, FECHA_NACIMIENTO, BIOGRAFIA, CODIGO_GENERO, CODIGO_LUGAR, SITIO_WEB, TIPO_USUARIO,TELEFONO 
        FROM tbl_usuarios 
        WHERE CODIGO_USUARIO = ?`,
        [codUsu],
        function(error, data, fields){
            //console.log(data);
            res.send(data);
            res.end();
            conexion.end();
        });
});

////********************  Perfil ********************** */
app.get("/actualizarperfil",verificarAutenticacion,function(req, res){
    var codUsu=req.session.codigoUsuario;
    //console.log(codUsu);
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`SELECT CODIGO_USUARIO, NOMBRE, APELLIDOS, CORREO, CONTRASEÑA, FECHA_NACIMIENTO, BIOGRAFIA, CODIGO_GENERO, CODIGO_LUGAR, SITIO_WEB, TIPO_USUARIO,TELEFONO 
        FROM tbl_usuarios 
        WHERE CODIGO_USUARIO = ?`,
        [codUsu],
        function(error, data, fields){
            //console.log(data);
            res.send(data);
            res.end();
            conexion.end();
        });
});

//****************  actualizar perfil usuario ***************** */
app.post("/actualizarusuario",verificarAutenticacion, function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`UPDATE tbl_usuarios 
                    SET 
                        NOMBRE=?,
                        APELLIDOS=?,
                        CORREO=?,
                        FECHA_NACIMIENTO=?,
                        BIOGRAFIA=?,
                        CODIGO_GENERO=?,
                        SITIO_WEB=?,
                        TELEFONO=? 
                    WHERE CODIGO_USUARIO = ?`,
        [req.body.nombre,
            req.body.apellido,
            req.body.email,
            req.body.fecha,
            req.body.biografia,
            req.body.genero,
            req.body.sitio,
            req.body.movil,
            req.session.codigoUsuario],
        function(error, data, fields){
           // console.log(data);
            //console.log(error);
            res.send(data);
            res.end();
            conexion.end();
        }
    );
});


//*************************usando cookies *********************** */

app.get("/cookie_plan/:cod_plan",function(req, res){
    res.cookie("cod_plan",req.params.cod_plan);
    res.send(req.params.cod_plan);
    res.end();
});

app.get("/obtener_cookie_codPlan",function(req, res){
    res.send("La cookie almacenada es : " + req.cookies.cod_plan);
    res.end();
});


///*******************registrar compra de plan******************* */

app.post("/registrar_compra",verificarAutenticacion, function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`INSERT INTO tbl_tarjeta_credito (NUMERO_TARJETA, CODIGO_SEGURIDAD) 
                    VALUES (?,?)`,
        [req.body.numero_tarjeta, req.body.cod_tarjeta],
        function(error, data, fields){
            var cod_tarjeta=data.insertId;
            //console.log(error);
            console.log(cod_tarjeta);
            if(data.insertId!=0){
                conexion.query(`INSERT INTO tbl_historial_pago (FECHA_PAGO, FECHA_FIN, CODIGO_PLAN, CODIGO_USUARIO, CODIGO_TARGETA)
                VALUES (CURDATE(),ADDDATE(CURDATE(), INTERVAL 30 DAY),?,?,?)`,
                    [req.cookies.cod_plan,req.session.codigoUsuario,cod_tarjeta],
                    function(error, data, fields){
                        var cod_regis=data.insertId;
                        //console.log(cod_regis);
                        if(cod_regis!=0){
                            console.log("hola");
                            conexion.query(`UPDATE tbl_usuarios 
                                            SET PLAN = ${req.cookies.cod_plan} 
                                            WHERE CODIGO_USUARIO = ${req.session.codigoUsuario}`,
                                [],
                                function(error, data, fields){
                                    //console.log(data);
                                    console.log(error);
                                    console.log(req.cookies.cod_plan);
                                    console.log(req.session.codigoUsuario);
                                }
                            );
                        }
                    }
                );
            }
            res.send(data);
            res.end();
        }
    );
});


app.get("/cant_proyectos",verificarAutenticacion,function(req, res){
    var codUsu=req.session.codigoUsuario;
    //console.log(codUsu);
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`SELECT b.CODIGO_USUARIO,b.PLAN, COUNT(*) as CANT_PROYECTOS
                    FROM tbl_proyectos a
                    INNER JOIN (SELECT CODIGO_USUARIO, PLAN
                    FROM tbl_usuarios  ) b 
                    on (a.CODIGO_USUARIO=b.CODIGO_USUARIO)
                    WHERE b.CODIGO_USUARIO=?`,
        [codUsu],
        function(error, data, fields){
            //console.log(data);
            res.send(data);
            res.end();
            conexion.end();
        });
});



app.post("/proyectos", function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`INSERT INTO tbl_proyectos(NOMBRE, FECHA_CREACION, CODIGO_USUARIO) 
                    VALUES (?,CURDATE(),?)`,
        [req.body.nombre_proyecto,req.session.codigoUsuario],
        function(error, data, fields){
            //console.log(error);
            res.cookie("nombre_proyecto",req.body.nombre_proyecto);
            console.log(data);
            res.send(data);
            res.end();
            conexion.end();
        }
    );
});

app.get("/proyectos_creados", function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`SELECT COD_PROYECTO, NOMBRE, FECHA_CREACION, CODIGO_USUARIO 
                    FROM tbl_proyectos 
                    WHERE  CODIGO_USUARIO=?`,
        [req.session.codigoUsuario],
        function(error, data, fields){
            //console.log(data);
            res.send(data);
            res.end();
            conexion.end();
        }
    );
});

app.get("/ver_proyecto", function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`SELECT COD_PROYECTO, NOMBRE, FECHA_CREACION, CODIGO_USUARIO 
                    FROM tbl_proyectos 
                    WHERE  NOMBRE=?`,
        [req.cookies.nombre_proyecto],
        function(error, data, fields){
            //console.log(data);
            res.send(data);
            res.end();
            conexion.end();
        }
    );
});

app.post("/archivos", function(req,res){
    var conexion = mysql.createConnection(credenciales);
    conexion.query(`INSERT INTO tbl_proyectos(NOMBRE, FECHA_CREACION, CODIGO_USUARIO) 
                    VALUES (?,CURDATE(),?)`,
        [req.body.nombre_proyecto,req.session.codigoUsuario],
        function(error, data, fields){
            //console.log(error);
            res.cookie("nombre_proyecto",req.body.nombre_proyecto);
            console.log(data);
            res.send(data);
            res.end();
            conexion.end();
        }
    );
});

app.listen(8008, function(){ 
    console.log("Servidor iniciado");
});