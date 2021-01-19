const express = require('express');
const router = express.Router();
const ClientesController = require('../controllers/ClientesController');
const NotasController = require('../controllers/NotasController');
const ProductosController = require('../controllers/ProductosController');
const AuthController = require('../controllers/AuthController');

//INDEX CON NOTAS
router.get('/' , NotasController.index);
router.get('/clientes-generar-nota/:id' , NotasController.generarNota);
router.post('/agregarProductos-notas' , NotasController.agregarProductos);
//FIN INDEX CON NOTAS

//CLIENTES
router.get('/clientes' , ClientesController.index);
router.post('/clientes-create' , ClientesController.create);
router.get('/clientes-delete/:id' , ClientesController.delete);
router.post('/update/cliente' , ClientesController.update);
//FIN CLIENTES

//PRODUCTOS
router.get('/productos' , ProductosController.index);
router.post('/productos-create' , ProductosController.create);
router.get('/productos-delete/:id' , ProductosController.delete);
router.post('/update/productos' , ProductosController.update);
//FIN PRODUCTOS

router.get('/register' , (req,res) => {
    res.render('register');
});

router.get('/login' , (req,res) => {
    res.render('login');
});

router.get('/api' , (req,res) => {
    res.render('api');
});

router.post('/register-user' , AuthController.register);
router.post('/login' , AuthController.login);
router.get('/logout' , AuthController.logout);

module.exports = router;