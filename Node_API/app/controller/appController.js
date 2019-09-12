'use strict'
var Article = require('../model/appModel.js')

exports.create_article_analysis = function(req, res) {
    var urlObject = req.body
    if(!urlObject.url) res.status(400).send({ error:true, message: 'Please provide an url'})
    Article.verifyArticleExistance(urlObject, function(exist) {
        if (!exist) {
            console.log("Boucle false")
            Article.createArticle(urlObject, function(err, article) {
                if (err) res.send(err)
                res.json(article)
            })
        }
        else if (exist) {
            console.log("Boucle true")   
            Article.getArticleByUrl(urlObject, function(err, article) {
                if (err) res.send(err)
                res.json(article)
            })
        }
    })
}