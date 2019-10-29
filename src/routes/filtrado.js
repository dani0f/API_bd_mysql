const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/filtrado', (req,res) => {
    res.redirect('/filtrado/'+"select * from pecadores");
});
router.get('/filtrado/:sql', async (req,res)=> {
    const { sql } = req.params;
    var cons=sql;
    cons="select idPecador,tab.Nombre,Edad,Biografia,Fecha_de_muerte,Fecha_de_nacimiento,(muertes.Nombre) as Muerte,pecados.Nombre as Pecado,paises.Nombre as Pais FROM pecados,paises,muertes,("+cons;
    cons=cons+")as tab where Muertes_idMuerte=idMuerte and Paises_idPais=idPais and Pecados_idPecado=idPecado";
    console.log(cons);
    
    const pecadores = await pool.query(cons);
    console.log(pecadores);
    await pool.query('SELECT id,Nombre,NombreTabla FROM (SELECT idMuerte as "id" , Nombre, "muertes" AS NombreTabla FROM muertes)AS t_muertes UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idPais as "id", Nombre, "paises" AS NombreTabla FROM paises)AS t_paises UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idPecado as "id", Nombre, "pecados" AS NombreTabla FROM pecados)AS t_pecados',(err,result)=>{
        res.render('filtrado/fil.ejs',{
        elementos: result,
        filtros: pecadores
        });    
    }); 
 });
router.post('/filtrado', async (req, res) => {
    var xa=await pool.query('select count(idPecado)as num from pecados');
    var resultArray = Object.values(JSON.parse(JSON.stringify(xa)))
    const n_pecados=resultArray.map(function(item){ return item.num; })

    const newfiltro=req.body;
    console.log(newfiltro);
    var arreglos=Object.values(newfiltro);
    var a0=arreglos[0];
    var a1=arreglos[1];
    var a2=arreglos[2];

    var pecado=false;
    var muerte=false;
    var pais=false;


    console.log("OBJETO RECIBIDO",arreglos)
    console.log("PECADOS-----------------");

    var largo_pecados=a0.length;
    var largo_muertes=a1.length;
    var largo_paises=a2.length;

    if (largo_pecados > 1){
        pecado=true;
        console.log("hay filtro de pecado id",a0);
    }
    if (largo_muertes > 1){
        muerte=true;
        console.log("hay filtro de muerte id",a1);
    }
    if (largo_paises > 1){
        pais=true;
        console.log("hay filtro de pais id",a2);
    }


var cadena_inicio="SELECT * FROM pecadores"
var cadena_p="";
var cadena_m="";
var cadena_c="";
if(pecado==true){
    cadena_p=" WHERE Pecados_idPecado IN(";
    var p;
    if(largo_pecados==1){
        cadena_p=cadena_p+a0;
        cadena_p=cadena_p+")";}
    else{
        for(p=1 ; p< largo_pecados ; p++ ){
            cadena_p=cadena_p+a0[p];
            if(p+1!=largo_pecados){
                cadena_p=cadena_p+",";}}
        cadena_p=cadena_p+")";}
    console.log(cadena_p);
    }
if(muerte==true){
    if(cadena_p!=""){
        cadena_m=cadena_m+" AND Muertes_idMuerte IN(";
    }
    else{
        cadena_m=cadena_m+" WHERE Muertes_idMuerte IN("
    }
    var m;
    if(largo_muertes==1){
        cadena_m=cadena_m+a1;
        cadena_m=cadena_m+")";}
    else{
        for(m=1 ; m< largo_muertes ; m++ ){
            cadena_m=cadena_m+a1[m];
            if(m+1!=largo_muertes){
                cadena_m=cadena_m+",";}}
        cadena_m=cadena_m+")";}
    console.log(cadena_m);
}
if(pais==true){
    if(cadena_m!="" || cadena_p!=""){
        cadena_c=cadena_c+" AND Paises_idPais IN(";
    }
    else{
        cadena_c=cadena_c+" WHERE Paises_idPais IN("; 
    }
    var c;
    if(largo_paises==1){
        cadena_c=cadena_c+a2;
        cadena_c=cadena_c+")";}
    else{
        for(c=1 ; c< largo_paises ; c++ ){
            cadena_c=cadena_c+a2[c];
            if(c+1!=largo_paises){
                cadena_c=cadena_c+",";}}
        cadena_c=cadena_c+")";}
    console.log(cadena_c);
}


var cadena_final=cadena_inicio+cadena_p+cadena_m+cadena_c;
console.log(cadena_final);
const pecadores=await pool.query(cadena_final);
res.redirect('filtrado/'+cadena_final);
});




module.exports = router;