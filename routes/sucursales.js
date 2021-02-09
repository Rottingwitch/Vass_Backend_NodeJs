/** 
 * Ruta: /api/sucursales
*/
const { Router } = require('express');
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos')
const {  crearCiudad, borrarImpresora, getImpresorasById } = require('../controllers/sucursales');


const router = Router();


/** */
router.post( 
    '/', 
    [
        check('ciudad', 'La ciudad es obligatorio').not().isEmpty(),
        check('ciudad', 'La ciudad es obligatorio').not().isEmpty(),
        validarCampos

    ] , 
crearCiudad );


/** */
router.delete( '/:id' , borrarImpresora );


/** */
router.get( '/:id' , getImpresorasById );








module.exports = router;