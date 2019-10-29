const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/add', (req,res) => { //Agrega una herramienta
    res.render('herramientas/add');
});

router.post('/add', async (req, res) => { //Envia los datos de la herramienta agregada
    const {Nombre , Tipo} = req.body;
    const newHerramienta = {
        Nombre,
        Tipo
    };
    await pool.query('INSERT INTO herramientas set ?', [newHerramienta]);
    req.flash('mensaje', 'Agregado')
    res.redirect('/herramientas');
});

router.get('/', async (req, res) => { //home
    const herramientas = await pool.query('SELECT * FROM  herramientas');
    res.render('herramientas/list', { herramientas });
});

router.get('/delete/:idHerramienta', async (req, res) => { //Elimina la herramienta
    const { idHerramienta } = req.params;
    await pool.query('DELETE FROM herramientas WHERE idHerramienta = ?', [idHerramienta]);
    req.flash('mensaje', 'Eliminado')
    res.redirect('/herramientas'); 
});

router.get('/edit/:idHerramienta', async (req, res) =>{ //Editar la herramienta
    const { idHerramienta } = req.params;
    const herramientas = await pool.query('SELECT * FROM herramientas WHERE idHerramienta = ?', [idHerramienta]);
    res.render('herramientas/edit', {herramientas: herramientas[0]});
});

router.post('/edit/:idHerramienta', async (req, res) =>{ //Actualiza datos de la herramienta
    const { idHerramienta } = req.params;
    const {Nombre, Tipo} = req.body;
    const nuevaHerramienta = {
        Nombre,
        Tipo
    };
    await pool.query('UPDATE herramientas set ? WHERE idHerramienta = ?', [nuevaHerramienta, idHerramienta]);
    req.flash('mensaje', 'actualizado')
    res.redirect('/herramientas');
});


module.exports = router ;
