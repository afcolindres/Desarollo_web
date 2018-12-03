var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
//var bcrypt = require('bcrypt-nodejs');
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
    conexion.query(`INSERT INTO tbl_usuarios(NOMBRE, APELLIDOS, CORREO, CONTRASEÑA, CODIGO_GENERO,TIPO_USUARIO) 
                    VALUES (?,?,?,?,?,?)`,
        [req.body.nombre,req.body.apellido,req.body.email, sha1(req.body.password),req.body.genero,1],
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

app.listen(8008, function(){ 
    console.log("Servidor iniciado");
});