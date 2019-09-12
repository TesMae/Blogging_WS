// Speed up calls to hasOwnProperty
var hasOwnProperty = Object.prototype.hasOwnProperty

class Utilities {
    isEmpty(obj) {
        if (obj == null) return true
        if (obj.length > 0) return false
        if (obj.length === 0) return true
        if (typeof obj !== "object") return true
        for (var key in obj) {
            if (hasOwnProperty.call(obj, key)) return false
        }
        return true
    }
    imageExistance(image) {
        if (this.isEmpty(image)) return 0
        else return 1
    }
    titleExistance(title) {
        if (this.isEmpty(title)) return 0
        else return 1
    }
}

const utilities = new Utilities()
module.exports = utilities