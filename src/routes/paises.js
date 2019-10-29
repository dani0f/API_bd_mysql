const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/add',(req,res) => { //Agrega un pais
    res.render('paises/add');
});

router.post('/add', async (req, res) => { //Envia los datos del pais agregado
    const {Nombre} = req.body;
    const newPais = {
        Nombre
    };
    await pool.query('INSERT INTO paises set ?', [newPais]);
    req.flash('mensaje', 'Agregado')
    res.redirect('/paises');
});

router.get('/', async (req, res) => { //home
    const paises = await pool.query('SELECT * FROM  paises');
    res.render('paises/list', { paises });
});

router.get('/delete/:idPais', async (req, res) => { //Elimina el pais
    const { idPais } = req.params;
    await pool.query('DELETE FROM paises WHERE idPais = ?', [idPais]);
    req.flash('mensaje', 'Eliminado')
    res.redirect('/paises');
});

router.get('/edit/:idPais', async (req, res) =>{ //Editar el Pais
    const { idPais } = req.params;
    const paises = await pool.query('SELECT * FROM paises WHERE idPais = ?', [idPais]);
    res.render('paises/edit', {paises: paises[0]});
});

router.post('/edit/:idPais', async (req, res) =>{ //Actualiza datos pais
    const { idPais } = req.params;
    const {Nombre} = req.body;
    const nuevoPais = {
        Nombre
    };
    await pool.query('UPDATE paises set ? WHERE idPais = ?', [nuevoPais, idPais]);
    req.flash('mensaje', 'Editado')
    res.redirect('/paises');
});


module.exports = router ;