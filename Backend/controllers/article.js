'use strict'

var validator = require('validator');
var Article = require('../models/article');

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
        console.log(params);

        // validar datos (validator)
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }
        if(validate_title && validate_content){
            // crear el objeto a guardar 
            var article = new Article();

            // asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            // guardar el articulo
            article.save((err, articleStored) =>{

                if(err || !articleStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'El articulo no se ha guardado'
                    });
                }

                // devolver respuesta
                return res.status(200).send({
                // message: 'Soy la accion SAVE de mi controlador de articulos'
                status: 'success',
                article: articleStored
            });

        });
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }

    },

    getArticles: (req, res) =>{
        // find
        var query = Article.find({});
        
        var last = req.params.last;
        if(last || last != undefined){
            query.limit(5);
        }


        query.sort('-_id').exec((err, articles) =>  {
            if(err){
            return res.status(500).send({
                status: 'error',
                message: 'error al devolver los articulos'
                });
            }
            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay articulos para mostrar'
                    });
                }
            
            return res.status(200).send({
                status: 'success',
                articles
            });
        });
        
    },
    
    getArticle: (req, res) =>{
        // recoger el id de la url 
        var articleId = req.params.id;

        // comprobar que existe ese id
        if(!articleId || articleId == null){
            return res.status(404).send({
                status: 'error',
                message: 'No existe el articulo !!!'
            });
        }
        // buscar el articulo
        Article.findById(articleId, (err, article) => {
            if(err || !article){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo !!!'
                });
            }

             // devolver el articulo
             return res.status(404).send({
                status: 'success',
                article
            });
        });    
    },

    update: (req, res) => {
        var articleId = req.params.id;

        // recoger los datos que llegan por put
        var params = req.body;

        // validar los datos

        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if(validate_content && validate_title){
                //find update
                Article.findOneAndUpdate({_id: articleId}, params, {new:true},(err, articleUpdated) => {
                    if(err){
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al actualizar'
                        });
                    }

                    if(!articleUpdated){
                        return res.status(404).send({
                            status: 'error',
                            message: 'No existe el articulo'
                        });
                    }

                    // resultado 
                    return res.status(200).send({
                        status: 'success',
                        article: articleUpdated
                    });
                });
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta'
            });
        }
        
        
    },

    delete: (req,res) =>{
        var articleId = req.params.id;
        //find update
        Article.findOneAndDelete({_id: articleId},(err, articleDeleted) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al eliminar'
                });
            }

            if(!articleDeleted){
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el articulo'
                });
            }

            // resultado 
            return res.status(200).send({
                status: 'success',
                article: articleDeleted
            });
        });
    },

    upload: (req,res) => {
        //configurar el modulo multiparty  y router/article,js

        // recoger el fichero 

        // conseguir el nombre y la extension del archivo

        // comprobar la extension , solo imagenes , si no borrar el fichero

        // si todo es valido , buscar el articulo y asignarle el nombre de la imagen y actualizar

        return res.status(404).send({
            status: 'error',
            message: 'No se ha borrado el articulo'
        });
    },

}; // end controller

module.exports = controller;