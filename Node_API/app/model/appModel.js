'user strict';
var sql = require('./db.js')
const rs = require('../services/text-analysis.js')
const utilities = require('../services/utilities.js')

//Article object constructor
var Article = function(url, title, text_body, FRE_score, img_exist, title_exist, words, long_paragraphs, long_sentences){
    this.url = url
    this.title = title
    this.text_body = text_body
    this.FRE_score = FRE_score
    this.img_exist = img_exist
    this.title_exist = title_exist
    this.words = words
    this.long_paragraphs = long_paragraphs
    this.long_sentences = long_sentences
}
Article.verifyArticleExistance = function(urlObject, result) {
    sql.query("Select * from articles where url = ? LIMIT 1", urlObject.url, function (err, res) {             
        if (err) console.log("error: ", err)
        else if (utilities.isEmpty(res)) result(false)
        else result(true);
    })
}
Article.createArticle = function(urlObject, result) {
    // Get the web page 
    var request = require("request")

    request({
        uri: urlObject.url,
        }, function(error, response, body) {
            if (error) console.log("error: ", error)
            else parse_my_awesome_html(body)
        })
    // Convert HTML page to text 
    function parse_my_awesome_html(getHtml){
        extractor = require('unfluff')
        data = extractor(getHtml)
        //console.log(data.text)
        create_article(data)
    }
    function create_article(getData) {
        // Analyse the data using the rs methods (the text analysis library)
        let newArticle = new Article(urlObject.url, getData.title, getData.text, rs.fleschReadingEase(getData.text), utilities.imageExistance(getData.image), utilities.titleExistance(getData.title), rs.lexiconCount(getData.text, removePunctuation=true), rs.longParagraphCount(getData.text), rs.longSentencePercentage(getData.text))       
        sql.query("INSERT INTO articles set ?", newArticle, function (err, res) {                
            if (err) console.log("error: ", err) 
            else result(null, newArticle)
        })
    } 
}
Article.getArticleByUrl = function(urlObject, result) {
    sql.query("Select * from articles where url = ? LIMIT 1", urlObject.url, function (err, res) {             
        if (err) {
            console.log("error: ", err)
            result(err, null)
        }
        else result(null, res)       
    })
}

module.exports = Article