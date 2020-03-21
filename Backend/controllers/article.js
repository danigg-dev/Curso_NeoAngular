'use strict'

var controller = {
    datosCurso: (req,res) => {

        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            autor: 'Daniel Gil '
           
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la accion test de mi controlador de articulos'
        });
    },

    save: (req, res) => {
        // recoger los parametros por post
        var params = req.body;
        console.log('params');

        // validar datos (validator)

        // crear el objeto a guardar 

        // asignar valores

        // guardar el articulo

        // devolver respuesta
        return res.status(200).send({
            message: 'Soy la accion SAVE de mi controlador de articulos'
        });
    }

}; // end controller

module.exports = controller;