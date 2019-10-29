const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/add', (req,res) => { //Agrega un castigo
    res.render('castigos/add');
});

router.post('/add', async (req, res) => { //Envia los datos del castigo agregado
    const {Nombre , Descripcion} = req.body;
    const newCastigo= {
        Nombre,
        Descripcion
    };
    await pool.query('INSERT INTO castigos set ?', [newCastigo]);
    req.flash('mensaje', 'Agregado')
    res.redirect('/castigos');
});

router.get('/', async (req, res) => { //home
    const castigos = await pool.query('SELECT * FROM  castigos');
    res.render('castigos/list', { castigos });
});

router.get('/delete/:idCastigo', async (req, res) => { //Elimina el castigo
    const { idCastigo } = req.params;
    await pool.query('DELETE FROM castigos WHERE idCastigo = ?', [idCastigo]);
    req.flash('mensaje', 'Eliminado')
    res.redirect('/castigos'); 
});

router.get('/edit/:idCastigo', async (req, res) =>{ //Editar el Castigo
    const { idCastigo } = req.params;
    const castigo = await pool.query('SELECT * FROM castigos WHERE idCastigo = ?', [idCastigo]);
    res.render('castigos/edit', {castigo: castigo[0]});
});

router.post('/edit/:idCastigo', async (req, res) =>{ //Actualiza datos del castigo
    const { idCastigo } = req.params;
    const {Nombre, Descripcion} = req.body;
    const nuevoCastigo = {
        Nombre,
        Descripcion
    };
    await pool.query('UPDATE castigos set ? WHERE idCastigo = ?', [nuevoCastigo, idCastigo]);
    req.flash('mensaje', 'Editado')
    res.redirect('/castigos');
});

module.exports = router ;
