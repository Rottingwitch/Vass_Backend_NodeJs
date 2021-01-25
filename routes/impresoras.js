/** 
 * Ruta: /api/impresoras
*/
const { Router } = require('express');
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos')
const { getImpresoras, crearImpresoras, actualizarImpresora, borrarImpresora } = require('../controllers/impresoras');


const router = Router();

/** */
router.get( '/' , getImpresoras );

/** */
router.post( 
    '/', 
    [
        check('serial', 'El serial es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo de la impresora es obligatorio').not().isEmpty(),
        check('ciudad', 'La ciudad es obligatorio').not().isEmpty(),
        check('empresa', 'La empresa es obligatorio').not().isEmpty(),
        check('centro_operacion', 'Este campo tiene que se numerico').not().isEmpty().isNumeric(),
        check('sucursal', 'La sucursal es obligatorio').not().isEmpty(),
        validarCampos

    ] , 
crearImpresoras );

/** */
router.put( 
    '/:id', 
    [
        check('serial', 'El serial es obligatorio').not().isEmpty(),
        check('modelo', 'El modelo de la impresora es obligatorio').not().isEmpty(),
        check('ciudad', 'La ciudad es obligatorio').not().isEmpty(),
        check('empresa', 'La empresa es obligatorio').not().isEmpty(),
        check('centro_operacion', 'Este campo tiene que se numerico').not().isEmpty().isNumeric(),
        check('sucursal', 'La sucursal es obligatorio').not().isEmpty(),
        validarCampos

    ] , 
actualizarImpresora );

/** */
router.delete( '/:id' , borrarImpresora );










module.exports = router;