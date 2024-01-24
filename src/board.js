import { BOARD_HEIGHT, BOARD_WIDTH, COLORS } from './consts'
import { drawPiece } from './piece'

export const board = createBoard(BOARD_WIDTH, BOARD_HEIGHT)

const $score = document.getElementById('score')
let score = 0

function createBoard (width, height) {
  return Array(height).fill()
    .map(() => Array(width).fill(0))
}

export const drawBoard = (ctx) => {
  board.forEach((row, y) => {
    row.forEach((value, x) => {
      switch (value) {
        case 0:
          drawPiece(ctx, x, y, '#000', '#2b2b29')
          break
        case 1:
          drawPiece(ctx, x, y, COLORS[0].color, COLORS[0].borderColor)
          break
        case 2:
          drawPiece(ctx, x, y, COLORS[1].color, COLORS[1].borderColor)
          break
        case 3:
          drawPiece(ctx, x, y, COLORS[2].color, COLORS[2].borderColor)
          break
        case 4:
          drawPiece(ctx, x, y, COLORS[3].color, COLORS[3].borderColor)
          break
        case 5:
          drawPiece(ctx, x, y, COLORS[4].color, COLORS[4].borderColor)
          break
        case 6:
          drawPiece(ctx, x, y, COLORS[5].color, COLORS[5].borderColor)
          break
        case 7:
          drawPiece(ctx, x, y, COLORS[6].color, COLORS[6].borderColor)
          break
      }
    })
  })
  $score.innerHTML = score
}

export const resetBoard = () => {
  board.forEach((row) => row.fill(0))
}

export function scoreProperty () {
  score += 100
  return score
}
