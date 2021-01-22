/** 
 * Ruta: /api/impresoras
*/
const { Router } = require('express');
const { getImpresoras, crearImpresoras } = require('../controllers/impresoras');


const router = Router();

router.get( '/' , getImpresoras );

router.post( '/' , crearImpresoras );












module.exports = router;