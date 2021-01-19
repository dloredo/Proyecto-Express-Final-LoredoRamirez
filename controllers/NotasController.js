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
    db.query('select notas.* , clientes.nombre from notas inner join clientes on notas.id_cliente = clientes.id', (err, notas) => {
        db.query('select * from productos', (err, productos) => {
            res.render('index', {
                notas: notas,
                productos: productos
            });
        });
    });
};

controller.generarNota = (req,res) => {
    const { id } = req.params;
    db.query('insert into notas set impuesto = ? , total = ? , estatus = ? , id_cliente = ?', [0,0,0,id], (err, notas) => {
        if(err){
            res.send(err)
        }
        res.redirect('/');
    });
};

controller.agregarProductos = (req,res) => {
    const id = req.body.id_cliente;
    const id_nota = req.body.id_nota;
    const id_producto = req.body.producto;
    const fecha = Date.now();
    db.query('insert into carrito set id_producto = ? , id_nota = ? , cantidad = 1 , fecha = ?' , [id_producto,id_nota,fecha] , (error, carrito) =>{
        if(error){
            res.send(error);
        }
        db.query('select precio from productos where id = ?' , [id_producto] , (err,result) => {
            if(err){
                res.send(err)
            }
            const precio = result[0].precio;
            const impuesto = precio*.16;
            const total = parseFloat(precio) + parseFloat(impuesto);
            db.query('update notas set impuesto = ? , total = ? where id = ?' , [impuesto,total,id_nota] , (error,result)=>{
                if(error){
                    res.send(error)
                }
                res.redirect('/');
            });
        });
    });
};

module.exports = controller;