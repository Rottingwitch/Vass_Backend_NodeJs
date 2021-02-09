/** 
 * Ruta: /api/sucursales
*/
const { Router } = require('express');
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos')
const {  crearSede, borrarImpresora, getImpresorasById } = require('../controllers/sede');


const router = Router();


/** */
router.post( 
    '/', 
    [
        check('sede', 'La ciudad es obligatorio').not().isEmpty(),
        check('ubicacion', 'La ciudad es obligatorio').not().isEmpty(),
        check('barrio', 'La ciudad es obligatorio').not().isEmpty(),
        validarCampos

    ] , 
crearSede );


/** */
router.delete( '/:id' , borrarImpresora );


/** */
router.get( '/:id' , getImpresorasById );








module.exports = router;