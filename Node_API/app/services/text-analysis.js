const syllable = require('syllable')
const punctuationRE = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~]/g

// extends Math object
Math.copySign = (x, y) => {
  return x * (y / Math.abs(y))
}
Math.legacyRound = (number, points = 0) => {
  const p = 10 ** points
  // return float(math.floor((number * p) + math.copysign(0.5, number))) / p
  return Math.floor((number * p) + Math.copySign(0.5, number)) / p
}

class Readability {
  charCount (text, ignoreSpaces = true) {
    if (ignoreSpaces) text = text.replace(/ /g, '')
    return text.length
  }
  letterCount (text, ignoreSpaces = true) {
    if (ignoreSpaces) text = text.replace(/ /g, '')
    return this.removePunctuation(text).length
  }
  removePunctuation (text) {
    text = text.replace(punctuationRE, '')
    return text
  }
  static split (text) {
    text = text.split(/,| |\n|\r/g)
    text = text.filter(n => n)
    return text
  }
  lexiconCount (text, removePunctuation = true) {
    if (removePunctuation) text = this.removePunctuation(text)
    text = text.split(/,| |\n|\r/g)
    text = text.filter(n => n)
    return text.length
  }
  lexiconGet (text, removePunctuation = true) {
    if (removePunctuation) text = this.removePunctuation(text)
    text = text.split(/,| |\n|\r/g)
    text = text.filter(n => n)
    return text
  }
  syllableCount (text, lang = 'en-US') {
    text = text.toLocaleLowerCase(lang)
    text = this.removePunctuation(text)
    if (!text) return 0
    // eventually replace syllable
    const count = syllable(text)
    return count 
  }
  sentenceCount (text) {
    let ignoreCount = 0
    let sentences = text.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/g)
    for (let sentence of sentences) {
      if (this.lexiconCount(sentence) <= 2) ignoreCount += 1
    }
    const validSentences = sentences.length - ignoreCount
    return validSentences > 1 ? validSentences : 1
  }
  sentenceGet (text) {
    let sentences = text.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?)\s/g)
    sentences = sentences.filter(n => n)
    return sentences
  }
  paragraphCount (text) {
    let paragraphs = text.split(/\n/g)
    paragraphs = paragraphs.filter(n => n)
    return paragraphs.length
  }
  paragraphGet (text) {
    let paragraphs = text.split(/\n/g)
    paragraphs = paragraphs.filter(n => n)
    return paragraphs
  }
  longParagraphCount (text) {
    let longParagraph = 0
    let paragraphs = this.paragraphGet(text)
    for (let paragraph of paragraphs) {
      if (this.lexiconCount(paragraph) >= 90) longParagraph += 1
    }
    return longParagraph
  }
  longSentencePercentage (text) {
    let longSentence = 0
    let sentences = this.sentenceGet(text)
    for (let sentence of sentences) {
      if (this.lexiconCount(sentence) >= 20) longSentence +=1
    }
    return ( (100 / sentences.length) * longSentence ) 
  }
  averageSentenceLength (text) {
    const asl = this.lexiconCount(text) / this.sentenceCount(text)
    const returnVal = Math.legacyRound(asl, 1)
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  averageSyllablePerWord (text) {
    const syllables = this.syllableCount(text)
    const words = this.lexiconCount(text)
    const syllablePerWord = syllables / words
    const returnVal = Math.legacyRound(syllablePerWord, 1)
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  averageCharacterPerWord (text) {
    const charactersPerWord = this.charCount(text) / this.lexiconCount(text)
    const returnVal = Math.legacyRound(charactersPerWord, 2)
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  averageLetterPerWord (text) {
    const lettersPerWord = this.letterCount(text) / this.lexiconCount(text)
    const returnVal = Math.legacyRound(lettersPerWord, 2)
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  averageSentencePerWord (text) {
    const sentencesPerWord = this.sentenceCount(text) / this.lexiconCount(text)
    const returnVal = Math.legacyRound(sentencesPerWord, 2)
    return !isNaN(returnVal) ? returnVal : 0.0
  }
  fleschReadingEase (text) {
    const sentenceLength = this.averageSentenceLength(text)
    const syllablesPerWord = this.averageSyllablePerWord(text)
    const flesch = 206.835 - (1.015 * sentenceLength) - (84.6 * syllablesPerWord)
    const returnVal = Math.legacyRound(flesch, 2)
    return returnVal
  }
}
const readability = new Readability()
module.exports = readability
