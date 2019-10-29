const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', async (req,res)=> {
    await pool.query('SELECT id, Nombre, NombreTabla FROM (SELECT idCastigo_Herramienta as "id", "" AS Nombre , "castigos_herramientas" AS NombreTabla FROM castigos_herramientas)AS t_castigos_herramientas UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idCastigo as "id", Nombre, "castigos" AS NombreTabla FROM castigos)AS t_castigos UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idHerramienta as "id", Nombre, "herramientas" AS NombreTabla FROM herramientas)AS t_herramientas',(err,result)=>{
        res.render('castigos_herramientas/add.ejs',{
        elementos: result
        });    
    }); 
 });

 router.get('/edit/:idCastigo_Herramienta', async (req,res)=> {
    const { idCastigo_Herramienta } = req.params;
    const cas_her = await pool.query('SELECT * FROM castigos_herramientas WHERE idCastigo_Herramienta = ?' , [idCastigo_Herramienta]);
    await pool.query('SELECT id, Nombre, NombreTabla FROM (SELECT idCastigo_Herramienta as "id", "" AS Nombre , "castigos_herramientas" AS NombreTabla FROM castigos_herramientas)AS t_castigos_herramientas UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idCastigo as "id", Nombre, "castigos" AS NombreTabla FROM castigos)AS t_castigos UNION SELECT id,Nombre,NombreTabla  FROM (SELECT idHerramienta as "id", Nombre, "herramientas" AS NombreTabla FROM herramientas)AS t_herramientas',(err,result)=>{
        res.render('castigos_herramientas/edit.ejs',{elementos: result, castigos_herramientas: cas_her[0]});
    }); 
 });

router.get('/add',(req,res) => { //asignar un castigo
    res.render('castigos_herramientas/add');
});

router.post('/add', async (req, res) => { //Envia los datos agregado
    const {Castigos_idCastigo, Herramientas_idHerramienta} = req.body;
    const newCastigo_herramienta = {
        Castigos_idCastigo,
        Herramientas_idHerramienta
    };
    await pool.query('INSERT INTO castigos_herramientas set ?', [newCastigo_herramienta]);
    req.flash('mensaje', 'Asignado')
    res.redirect('/castigos_herramientas');
});

router.get('/', async (req, res) => { //home
    const castigos_herramientas = await pool.query('SELECT castigos_herramientas.idCastigo_Herramienta AS idCastigo_Herramienta, herramientas.Nombre AS NombreHerramienta, castigos.Nombre AS NombreCastigo FROM  castigos_herramientas, herramientas, castigos WHERE castigos_herramientas.Herramientas_idHerramienta = herramientas.idHerramienta AND castigos_herramientas.Castigos_idCastigo = castigos.idCastigo');
    res.render('castigos_herramientas/list', { castigos_herramientas });
});

router.get('/delete/:idCastigo_Herramienta', async (req, res) => { //Elimina la herramienta
    const { idCastigo_Herramienta } = req.params;
    await pool.query('DELETE FROM castigos_herramientas WHERE idCastigo_Herramienta = ?', [idCastigo_Herramienta]);
    req.flash('mensaje', 'Eliminado')
    res.redirect('/castigos_herramientas');
});



module.exports = router ;