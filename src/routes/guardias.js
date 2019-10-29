const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', async (req,res)=> {
    await pool.query('SELECT idPiso AS id, Nombre, "pisos" AS NombreTabla  FROM pisos',(err,result)=>{
        res.render('guardias/add.ejs',{
        elementos: result
        });    
    }); 
 });

router.post('/add', async(req,res) => {  //recibe los datos
    const {Nombre ,  Pisos_idPiso} = req.body;
    const newGuardia={
        Nombre,
        Pisos_idPiso
    };
    await pool.query('INSERT INTO guardias set ?', [newGuardia]);//para guardar en la bd
    req.flash('mensaje','Agregado');
    res.redirect('/guardias');
});

router.get('/', async (req,res)=> {
   const guardias = await pool.query('SELECT * FROM guardias ') 
   res.render('guardias/list', { guardias });
});
   
router.get('/delete/:idGuardia', async (req , res) => {
    const { idGuardia } = req.params;
    await pool.query('DELETE FROM guardias WHERE idGuardia = ?', [idGuardia]);
    req.flash('mensaje','Eliminado');
    res.redirect('/guardias');
});

router.get('/edit/:idGuardia', async (req,res)=> {
    const { idGuardia } = req.params;
    const guardias = await pool.query('SELECT * FROM guardias WHERE idGuardia = ?' , [idGuardia]);
    await pool.query('SELECT idPiso AS id, Nombre, "pisos" AS NombreTabla from pisos',(err,result)=>{
        res.render('guardias/edit.ejs',{elementos: result, guardias: guardias[0]});
    }); 
 });
router.post('/edit/:idGuardia', async (req , res) => {
    const { idGuardia }=req.params;
    const {Nombre , Pisos_idPiso} = req.body;
    const newGuardia={
        Nombre,
        Pisos_idPiso
    };
    await pool.query('UPDATE guardias SET ? WHERE idGuardia = ?',[newGuardia, idGuardia]); 
    req.flash('mensaje','Editado');
    res.redirect('/guardias');
});


module.exports = router;