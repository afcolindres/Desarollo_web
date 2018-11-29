var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var bcrypt = require('bcrypt-nodejs');
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

///****************Rutas de control************************* */
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
    conexion.query(`INSERT INTO tbl_usuarios(NOMBRE, APELLIDOS, CORREO, CONTRASEÑA, CODIGO_GENERO) 
                    VALUES (?,?,?,?,?)`,
        [req.body.nombre,req.body.apellido,req.body.email, bcrypt.hashSync(req.body.password, null, null),req.body.genero],
        function(error, data, fields){
            console.log(error);
            res.send(data);
            res.end();
            conexion.end();
        }
    );
});

app.listen(8008, function(){ 
    console.log("Servidor iniciado");
});