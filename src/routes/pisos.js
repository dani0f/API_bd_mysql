const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/add', (req,res) => { //Agrega un piso
    res.render('pisos/add');
});

router.post('/add', async (req, res) => { //Envia los datos del pais agregado
    const {Nombre , Descripcion} = req.body;
    const newPiso = {
        Nombre,
        Descripcion
    };
    await pool.query('INSERT INTO pisos set ?', [newPiso]);
    req.flash('mensaje', 'Agregado')
    res.redirect('/pisos');
});

router.get('/', async (req, res) => { //home
    const pisos = await pool.query('SELECT * FROM  pisos');
    res.render('pisos/list', { pisos });
});

router.get('/delete/:idPiso', async (req, res) => { //Elimina el piso
    const { idPiso } = req.params;
    await pool.query('DELETE FROM pisos WHERE idPiso = ?', [idPiso]);
    req.flash('mensaje', 'Eliminado')
    res.redirect('/pisos'); 
});

router.get('/edit/:idPiso', async (req, res) =>{ //Editar el Piso
    const { idPiso } = req.params;
    const pisos = await pool.query('SELECT * FROM pisos WHERE idPiso = ?', [idPiso]);
    res.render('pisos/edit', {pisos: pisos[0]});
});

router.post('/edit/:idPiso', async (req, res) =>{ //Actualiza datos del piso
    const { idPiso } = req.params;
    const {Nombre, Descripcion} = req.body;
    const nuevoPiso = {
        Nombre,
        Descripcion
    };
    await pool.query('UPDATE pisos set ? WHERE idPiso = ?', [nuevoPiso, idPiso]);
    req.flash('mensaje', 'Editado')
    res.redirect('/pisos');
});


module.exports = router ;
