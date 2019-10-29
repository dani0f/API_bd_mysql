const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', async (req,res)=> {
    await pool.query('SELECT idPiso AS id, Nombre, "pisos" AS NombreTabla  FROM pisos',(err,result)=>{
        res.render('pecados/add.ejs',{
        elementos: result
        });    
    }); 
 }); 

router.post('/add', async(req,res) => {  //recibe los datos
    const {Nombre , Descripcion , Pisos_idPiso} = req.body;
    const newPecado={
        Nombre,
        Descripcion,
        Pisos_idPiso
    };
    await pool.query('INSERT INTO pecados set ?', [newPecado]);//para guardar en la bd
    req.flash('mensaje','Agregado');
    res.redirect('/pecados');
});

router.get('/', async (req,res)=> {
    const pecados = await pool.query('SELECT pecados.idPecado AS idPecado, pecados.Nombre AS NombrePecado, pecados.Descripcion, pecados.Pisos_idPiso, pisos.Nombre AS NombrePiso FROM pecados, pisos WHERE pecados.Pisos_idPiso = pisos.idPiso ') ;
    console.log(pecados);
    res.render('pecados/list', { pecados });
 });
   
router.get('/delete/:idPecado', async (req , res) => {
    const { idPecado } = req.params;
    await pool.query('DELETE FROM pecados WHERE idPecado = ?', [idPecado]);
    req.flash('mensaje','Eliminado');
    res.redirect('/pecados');
});

router.get('/edit/:idPecado', async (req,res)=> {
    const { idPecado } = req.params;
    const pecados = await pool.query('SELECT * FROM pecados WHERE idPecado = ?' , [idPecado]);
    await pool.query('SELECT idPiso AS id, Nombre, "pisos" AS NombreTabla from pisos',(err,result)=>{
        res.render('pecados/edit.ejs',{elementos: result, pecado: pecados[0]});
    }); 
 });

router.post('/edit/:idPecado', async (req , res) => {
    const { idPecado }=req.params;
    const {Nombre,Descripcion,Pisos_idPiso} = req.body;
    const newPecado={Nombre,Descripcion,Pisos_idPiso};
    await pool.query('UPDATE pecados SET ? WHERE idPecado = ?',[newPecado,idPecado]); 
    req.flash('mensaje','Editado');
    res.redirect('/pecados');
});


module.exports = router;