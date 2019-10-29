const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/add', (req,res) => { //Agrega un tipo de muerte
    res.render('muertes/add');
});

router.post('/add', async (req, res) => { //Envia los datos del pais agregado
    const {Nombre , Descripcion} = req.body;
    const newMuerte = {
        Nombre,
        Descripcion
    };
    await pool.query('INSERT INTO muertes set ?', [newMuerte]);
    req.flash('mensaje', 'Agregado')
    res.redirect('/muertes');
});

router.get('/', async (req, res) => { //home
    const muertes = await pool.query('SELECT * FROM  muertes');
    res.render('muertes/list', { muertes });
});

router.get('/delete/:idMuerte', async (req, res) => { //Elimina la muerte
    const { idMuerte } = req.params;
    await pool.query('DELETE FROM muertes WHERE idMuerte = ?', [idMuerte]);
    req.flash('mensaje', 'ELiminado')
    res.redirect('/muertes'); 
});

router.get('/edit/:idMuerte', async (req, res) =>{ //Editar la muerte
    const { idMuerte } = req.params;
    const muertes = await pool.query('SELECT * FROM muertes WHERE idMuerte = ?', [idMuerte]);
    res.render('muertes/edit', {muertes: muertes[0]});
});

router.post('/edit/:idMuerte', async (req, res) =>{ //Actualiza datos de la muerte
    const { idMuerte } = req.params;
    const {Nombre, Descripcion} = req.body;
    const nuevoMuerte = {
        Nombre,
        Descripcion
    };
    await pool.query('UPDATE muertes set ? WHERE idMuerte = ?', [nuevoMuerte, idMuerte]);
    req.flash('mensaje', 'Editado')
    res.redirect('/muertes');
});


module.exports = router ;
