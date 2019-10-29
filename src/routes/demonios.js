const express = require('express');
const router = express.Router();
const pool = require('../database');
router.get('/add', async (req,res)=> {
    await pool.query('SELECT idCastigo AS id, Nombre, "castigos" AS NombreTabla  FROM castigos',(err,result)=>{
        res.render('demonios/add.ejs',{
        elementos: result
        });    
    }); 
 });
router.post('/add', async(req,res) => {  //recibe los datos
    const {Nombre ,  Castigos_idCastigo} = req.body;
    const newDemonio={
        Nombre,
        Castigos_idCastigo
    };
    await pool.query('INSERT INTO demonios set ?', [newDemonio]);//para guardar en la bd
    req.flash('mensaje','agregado');
    res.redirect('/demonios');
});

router.get('/', async (req,res)=> {
   const demonios = await pool.query('SELECT * FROM demonios ') 
   res.render('demonios/list', { demonios });
});
   
router.get('/delete/:idDemonio', async (req , res) => {
    const { idDemonio } = req.params;
    await pool.query('DELETE FROM demonios WHERE idDemonio = ?', [idDemonio]);
    req.flash('mensaje','Despediste a un demonio');
    res.redirect('/demonios');
});

router.get('/edit/:idDemonio', async (req,res)=> {
    const { idDemonio } = req.params;
    const demonios = await pool.query('SELECT * FROM demonios WHERE idDemonio = ?' , [idDemonio]);
    await pool.query('SELECT idCastigo AS id, Nombre, "castigos" AS NombreTabla from castigos',(err,result)=>{
        res.render('demonios/edit.ejs',{elementos: result, demonios: demonios[0]});
    }); 
 });
router.post('/edit/:idDemonio', async (req , res) => {
    const { idDemonio }=req.params;
    const {Nombre , Castigos_idCastigo} = req.body;
    const newDemonio={
        Nombre,
        Castigos_idCastigo
    };
    await pool.query('UPDATE demonios SET ? WHERE idDemonio = ?',[newDemonio, idDemonio]); 
    req.flash('mensaje','Datos actualizados');
    res.redirect('/demonios');
});


module.exports = router;