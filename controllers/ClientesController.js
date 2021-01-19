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
    db.query('select * from clientes', (err, clientes) => {
        db.query('select * from productos', (err, productos) => {
            res.render('clientes', {
                clientes: clientes,
                productos: productos
            });
        });
    });
};

controller.create = (req,res) => {
    const datos = req.body;
    db.query('insert into clientes set ?', [datos], (err, clientes) => {
        if(err){
            res.send(err)
        }
        res.redirect('/clientes');
    });
};

controller.delete = (req,res) => {
    const { id } = req.params;
    db.query('delete from clientes where id = ?', [id], (err, productos) => {
        res.redirect('/clientes');
    });
};

controller.update = (req,res) => {
    const id = req.body.hidden_id;
    const nombre_new = req.body.nombre_new;
    const direccion_new = req.body.direccion_new;
    const telefono_new = req.body.telefono_new;
    db.query('update clientes set nombre = ?, direccion = ?, telefono = ? where id = ?', [nombre_new ,direccion_new,telefono_new , id], async (error, usuarios) => {
        res.redirect('/clientes');
    });
};

module.exports = controller;