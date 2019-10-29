const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', async (req,res)=> {
    await pool.query('SELECT id, Nombre, NombreTabla FROM (SELECT idPecador_Castigo as "id", "" AS Nombre , "pecadores_castigos" AS NombreTabla FROM pecadores_castigos)AS t_pecadores_castigos UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idCastigo as "id", Nombre, "castigos" AS NombreTabla FROM castigos)AS t_castigos UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idPecador as "id", Nombre, "pecadores" AS NombreTabla FROM pecadores)AS t_pecador',(err,result)=>{
        res.render('pecadores_castigos/add.ejs',{
        elementos: result
        });    
    }); 
 });

 router.get('/edit/:idPecador_Castigo', async (req,res)=> {
    const { idPecador_Castigo } = req.params;
    const peca_cas = await pool.query('SELECT * FROM pecadores_castigos WHERE idPecador_castigo = ?' , [idPecador_Castigo]);
    await pool.query('SELECT id, Nombre, NombreTabla FROM (SELECT idPecador_Castigo as "id", "" AS Nombre , "pecadores_castigos" AS NombreTabla FROM pecadores_castigos)AS t_pecadores_castigos UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idCastigo as "id", Nombre, "castigos" AS NombreTabla FROM castigos)AS t_castigos UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idPecador as "id", Nombre, "pecador" AS NombreTabla FROM pecadores)AS t_pecador',(err,result)=>{
        res.render('guardias/edit.ejs',{elementos: result, pecador_castigo: peca_cas[0]});
    }); 
 });

router.get('/add',(req,res) => { //asignar un castigo
    res.render('pecadores_castigos/add');
});

router.post('/add', async (req, res) => { //Envia los datos del pais agregado
    const {Pecadores_idPecador, Castigos_idCastigo} = req.body;
    const newPecador_castigo = {
        Pecadores_idPecador,
        Castigos_idCastigo
    };
    await pool.query('INSERT INTO pecadores_castigos set ?', [newPecador_castigo]);
    req.flash('mensaje', 'Asignado')
    res.redirect('/pecadores_castigos');
});

router.get('/', async (req, res) => { //home
    const pecadores_castigos = await pool.query('SELECT pecadores_castigos.idPecador_Castigo AS idPecador_Castigo, pecadores.Nombre AS NombrePecador, castigos.Nombre AS NombreCastigo FROM  pecadores_castigos, pecadores, castigos WHERE pecadores_castigos.Pecadores_idPecador = pecadores.idPecador AND pecadores_castigos.Castigos_idCastigo = castigos.idCastigo');
    res.render('pecadores_castigos/list', { pecadores_castigos });
});

router.get('/delete/:idPecador_Castigo', async (req, res) => { //Elimina el castigo
    const { idPecador_Castigo } = req.params;
    await pool.query('DELETE FROM pecadores_castigos WHERE idPecador_Castigo = ?', [idPecador_Castigo]);
    req.flash('mensaje', 'Eliminado')
    res.redirect('/pecadores_castigos');
});



module.exports = router ;