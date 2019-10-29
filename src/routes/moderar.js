const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/moderar', async (req,res)=> {
    await pool.query('SELECT Tabla, Contador FROM ( SELECT "Pecadores" AS Tabla, count(idPecador) AS Contador FROM pecadores) AS c_pecadores UNION SELECT Tabla, Contador FROM (SELECT "Pecados" AS Tabla, count(idPecado) AS Contador FROM pecados) AS c_pecados UNION SELECT Tabla, Contador FROM (SELECT "Demonios" AS Tabla, count(idDemonio) AS Contador FROM demonios) AS c_demonios UNION SELECT Tabla, Contador FROM (SELECT "Guardias" AS Tabla, count(idGuardia) AS Contador FROM guardias) AS c_guardias UNION SELECT Tabla, Contador FROM (SELECT "Herramientas" AS Tabla, count(idHerramienta) AS Contador FROM herramientas) AS c_herramientas UNION SELECT Tabla, Contador FROM (SELECT "Pisos" AS Tabla, count(idPiso) AS Contador FROM pisos) AS c_pisos UNION SELECT Tabla, Contador FROM (SELECT "Castigos" AS Tabla, count(idCastigo) AS Contador FROM castigos) AS c_castigos UNION SELECT Tabla, Contador FROM (SELECT "Muertes" AS Tabla, count(idMuerte)AS Contador FROM muertes) AS c_muertes UNION SELECT Tabla, Contador FROM (SELECT "Paises" AS Tabla, count(idPais)AS Contador FROM paises) AS c_paises',(err,result)=>{
        res.render('moderar/mod.ejs',{
        elementos: result
        });    
    }); 
 });
router.get('/moderar/asig',(req , res ) =>{
    res.render('moderar/asig');
});
module.exports = router;