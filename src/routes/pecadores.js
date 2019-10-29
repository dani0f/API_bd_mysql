const express = require('express');
const router = express.Router();
const pool = require('../database');
router.get('/add', async (req,res)=> {
    await pool.query('SELECT id,Nombre,NombreTabla FROM (SELECT idMuerte as "id" , Nombre, "muertes" AS NombreTabla FROM muertes)AS t_muertes UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idPais as "id", Nombre, "paises" AS NombreTabla FROM paises)AS t_paises UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idPecado as "id", Nombre, "pecados" AS NombreTabla FROM pecados)AS t_pecados',(err,result)=>{
        res.render('pecadores/add.ejs',{
        elementos: result
        });    
    }); 
 });

 router.post('/add', async (req, res) => {
    const {Nombre,Edad,Fecha_de_nacimiento,Fecha_de_muerte,Muertes_idMuerte,Pecados_idPecado,Paises_idPais,Biografia}=req.body;
    const newPecador = {
        Nombre,
        Edad,
        Fecha_de_nacimiento,
        Fecha_de_muerte,
        Muertes_idMuerte,
        Pecados_idPecado,
        Paises_idPais,        
        Biografia
    };
    await pool.query('INSERT INTO pecadores set ?', [newPecador]);
    req.flash('mensaje', 'Pecador agregado');
    res.redirect('/pecadores');
});

router.get('/', async (req,res)=> {
    const pecadores = await pool.query('SELECT idPecador,pecadores.Nombre,Edad,Biografia,Fecha_de_muerte,Fecha_de_nacimiento,(muertes.Nombre) as Muerte,pecados.Nombre as Pecado,paises.Nombre as Pais FROM pecadores,pecados,paises,muertes where Muertes_idMuerte=idMuerte and Paises_idPais=idPais and Pecados_idPecado=idPecado') ;
    console.log(pecadores);
    res.render('pecadores/list', { pecadores });
 });

 router.get('/delete/:idPecador', async (req , res) => {
    const { idPecador } = req.params;
    await pool.query('DELETE FROM pecadores WHERE idPecador = ?', [idPecador]);
    req.flash('mensaje','Eliminado');
    res.redirect('/pecadores');
});

router.get('/edit/:idPecador', async (req,res)=> {
    const { idPecador } = req.params;
    const pecadores = await pool.query('SELECT * FROM pecadores WHERE idPecador = ?' , [idPecador]);
    await pool.query('SELECT id,Nombre,NombreTabla FROM (SELECT idMuerte as "id" , Nombre, "muertes" AS NombreTabla FROM muertes)AS t_muertes UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idPais as "id", Nombre, "paises" AS NombreTabla FROM paises)AS t_paises UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idPecado as "id", Nombre, "pecados" AS NombreTabla FROM pecados)AS t_pecados',(err,result)=>{
        res.render('pecadores/edit.ejs',{elementos: result, pecador: pecadores[0]});
    }); 
 });

router.post('/edit/:idPecador', async (req , res) => {
    const { idPecador }=req.params;
    const {Nombre,Edad,Fecha_de_muerte,Fecha_de_nacimiento,Biografia,Muertes_idMuerte,Pecados_idPecado,Paises_idPais} = req.body;
    const newPecador={Nombre,Edad,Fecha_de_muerte,Fecha_de_nacimiento,Biografia,Muertes_idMuerte,Pecados_idPecado,Paises_idPais};
    await pool.query('UPDATE pecadores SET ? WHERE idPecador = ?',[newPecador,idPecador]); 
    req.flash('mensaje','Editado');
    res.redirect('/pecadores');
});


module.exports = router ;