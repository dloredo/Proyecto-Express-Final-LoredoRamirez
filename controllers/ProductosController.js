const controller = {};
const db = require('../database');

controller.index = (req,res) => {
    const token = req.cookies.jwt;
    console.log(token);
    if(!token)
    {
        return res.status(401).render('login' , {
            message: 'Debes de iniciar sesion para poder navegar'
        });
    }
    db.query('select * from productos', (err, productos) => {
        res.render('productos', {
            productos: productos
        });
    });
};

controller.create = (req,res) => {
    const datos = req.body;
    db.query('insert into productos set ?', [datos], (err, clientes) => {
        if(err){
            res.send(err)
        }
        res.redirect('/productos');
    });
};

controller.delete = (req,res) => {
    const { id } = req.params;
    db.query('delete from productos where id = ?', [id], (err, productos) => {
        res.redirect('/productos');
    });
};

controller.update = (req,res) => {
    const id = req.body.hidden_id;
    const nombre_new = req.body.nombre_new;
    const precio_new = req.body.precio_new;
    const stock_new = req.body.stock_new;
    db.query('update productos set nombre = ?, precio = ?, stock = ? where id = ?', [nombre_new ,precio_new,stock_new , id], async (error, usuarios) => {
        res.redirect('/productos');
    });
};

module.exports = controller;