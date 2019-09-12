var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function imageExistance(image) {
    if (isEmpty(image)) return 0
    else return 1
}

function titleExistance(title) {
    if (isEmpty(title)) return 0
    else return 1
}

/***********************************************/

function text_analysis(getdata) {
    const rs = require('text-readability');
    console.log(typeof getdata.title)

    //console.log(rs.fleschReadingEase(getdata.text)); //1
    //console.log(imageExistance(getdata.image)); //2
    //console.log(titleExistance(getdata.title)); //3
    //console.log(rs.lexiconCount(getdata.text, removePunctuation=true)); //4
    //console.log(rs.longParagraphCount(getdata.text)) //5
    //console.log(rs.longSentencePercentage(getdata.text)); //6
} 

// Convert HTML to text and do some cleaning
function parse_my_awesome_html(getHtml){
    extractor = require('unfluff');

    data = extractor(getHtml, 'en');
    console.log(data.videos);
    text_analysis(data);
}

// Get the web page 
var request = require("request");
request({
    uri: "https://seths.blog/2019/08/politics-vs-governance/"
    }, function(error, response, body) { // Nzid nged el error ouel response
        //console.log(body);
        parse_my_awesome_html(body);
    });   