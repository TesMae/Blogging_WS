'use strict'
module.exports = function(app) {
  var analysis = require('../controller/appController')

  app.route('/api/search')
    .post(analysis.create_article_analysis)
}