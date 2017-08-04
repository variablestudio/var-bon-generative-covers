const Crayon = require('../crayons')
const typo = require('../typography')
const utils = require('../utils')

var crayon

function makeCover (book) {
  if (!crayon) {
    crayon = new Crayon(document.getElementById('cover'))
  }

  crayon.clear()
  crayon.style('default')

  crayon.fill('#FAFAF0').rect(0, 0, crayon.canvas.width, crayon.canvas.height)

  var pattern = Math.round(Math.random() * 5)
  switch (pattern) {
        // Pattern selector
    case 0:
      patterns.ChaoticCircles(crayon.context, 0, 0, crayon.canvas.width, crayon.canvas.height, book.sectionCount)
      break
    case 1:
      patterns.MarcinTiles(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, 32, 128)
      break
    case 2:
      patterns.MarcinLines(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height)
      break
    case 3:
      patterns.FractalTree(crayon, 0, 0, crayon.canvas.width, crayon.canvas.height, book.pageCount)
      break
    case 4:
      patterns.Hexagons(crayon.context, crayon.canvas.width, crayon.canvas.height)
      break
    case 5:
      var randMode = Math.round(Math.random() * 2)
      var randCols = 5 + Math.round(Math.random() * 7)
      var randRows = randCols + 2
      var clusterSize = 50 // (crayon.canvas.width-100)/randCols;
      var posx = 50
      var posy = crayon.canvas.height - 50 - randRows * clusterSize
      patterns.PixelGrid(crayon.context, randCols, randRows, posx, posy, clusterSize, randMode)
      break
  }
  crayon.context.fillStyle = 'rgba(255, 255, 255, 0.66)'
  crayon.context.fillRect(40, 0, 328, crayon.canvas.height)

  var fonts = typo.pairSelector(this.name, book.title)
  var author = typo.formatAuthorName(book.author)

  var titleFontSize = crayon.canvas.height * 0.06
  var authorFontSize = titleFontSize * fonts.PairRatio

  var titleX = crayon.canvas.width * 0.13
  var titleY = crayon.canvas.width * 0.08 + titleFontSize
  var titleWidth = crayon.canvas.width * 0.36

  var titleSections = typo.breakTitle(book.title)
  var title = titleSections[0]
  var subTitle = titleSections[1]

  title = typo.addLigatures(title, fonts.titleFamily)

  crayon.translate(titleX, titleY)

  crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize, fonts.titleStyle, 0).fill('#000000').paragraph('left', fonts.titleLine, titleWidth, true).text(title)
  crayon.font(fonts.titleFamily + fonts.titleFont, titleFontSize * 0.75, fonts.titleStyle, 0).fill('#000000').paragraph('left', fonts.titleLine, titleWidth, true).text(subTitle, 0, titleFontSize / 4)

  console.log(fonts.titleFamily)
        // crayon.context.font = 'normal ' + authorFontSize + 'px BenchNine';
        // var randAuthor = Math.round(Math.random());

  if (Math.round(Math.random()) == 0) {
    crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.nameStyle, 0).fill('#000000').paragraph('left', 0.25, titleWidth, false).text(author.name, 0, authorFontSize / 2)
    crayon.context.font = 'normal ' + authorFontSize + 'px' + ' ' + fonts.authorFamily + fonts.authorFont
    crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill('#000000').paragraph('left', -0.25, titleWidth, true).text(author.surname, 0 + crayon.context.measureText(author.name + ' ').width, authorFontSize / 2)
  } else {
    crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.nameStyle, 0).fill('#000000').paragraph('left', -0.5, titleWidth, true).text(author.name, 0, authorFontSize / 2)
    crayon.font(fonts.authorFamily + fonts.authorFont, authorFontSize, author.surnameStyle, 0).fill('#000000').paragraph('left', 0.25, titleWidth, true).text(author.surname, 0, authorFontSize / 2)
  }
  utils.addCover()
}

module.exports = {

  name: 'Circular Chaos II',
  makeCover: makeCover
}
