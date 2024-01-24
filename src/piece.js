import { board, resetBoard, scoreProperty } from './board'
import { BOARD_WIDTH, COLORS, KEY, PIECES } from './consts'

let indexPiece = 0
let piece = {}
const borderWidth = 1

export const createPiece = () => {
  indexPiece = Math.floor(Math.random() * PIECES.length)
  piece = {
    position: {
      x: 0,
      y: 0
    },
    shape: PIECES[indexPiece],
    colorEl: COLORS[indexPiece],
    rotatePieceRandom
  }
  piece.rotatePieceRandom()
  return piece
}
const rotatePieceRandom = () => {
  const numberRandom = Math.floor(Math.random() * 100)
  if (numberRandom % 2 === 0) {
    rotatePiece()
  }
}
export const drawRandomPieces = (ctx) => {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value >= 1) {
        const xPos = x + piece.position.x
        const yPos = y + piece.position.y
        drawPiece(ctx, xPos, yPos)
      }
    })
  })
}
export const drawPiece = (ctx, x, y, color = piece.colorEl.color, borderColor = piece.colorEl.borderColor) => {
  ctx.fillStyle = color
  ctx.strokeStyle = borderColor
  ctx.fillRect(x, y, borderWidth, borderWidth)
  ctx.lineWidth = borderWidth / 9
  ctx.beginPath()
  ctx.roundRect(x, y, borderWidth, borderWidth, borderWidth / 9, true)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
}

export const movePiece = (direction) => {
  switch (direction) {
    case KEY.LEFT:
      piece.position.x--
      if (checkCollision()) {
        piece.position.x++
      }
      break
    case KEY.RIGHT:
      piece.position.x++
      if (checkCollision()) {
        piece.position.x--
      }
      break
    case KEY.DOWN:
      piece.position.y++
      if (checkCollision()) {
        piece.position.y--
        addPieceToBoard()
        removeFullRows()
      }
      break
    case KEY.UP:
      rotatePiece()
      break
    default:
      break
  }
}

export const checkCollision = () => {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return value !== 0 &&
      (board[y + piece.position.y]?.[x + piece.position.x]) !== 0
    })
  })
}

export const addPieceToBoard = () => {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        board[y + piece.position.y][x + piece.position.x] = value
      }
    })
  })
  createPiece()
  if (checkCollision()) {
    window.alert('Game Over')
    resetBoard()
  }
}

export const removeFullRows = () => {
  board.forEach((row, y) => {
    if (row.every(value => value >= 1)) {
      board.splice(y, 1)
      board.unshift(Array(BOARD_WIDTH).fill(0))
      scoreProperty()
    }
  })
}

export const timePiece = () => {
  if (checkCollision()) {
    piece.position.y--
    addPieceToBoard()
    removeFullRows()
  }
}

export const resetPiece = () => {
  piece.position.x = Math.floor(Math.random() * (BOARD_WIDTH - piece.shape[0].length))
  piece.position.y = 0
  indexPiece = Math.floor(Math.random() * PIECES.length)
  piece.shape = PIECES[indexPiece]
  piece.colorEl = COLORS[indexPiece]
  piece.rotatePieceRandom()
}

export const rotatePiece = () => {
  if (piece) {
    const rotatedPiece = []
    for (let i = 0; i < piece.shape[0].length; i++) {
      const row = []
      for (let j = piece.shape.length - 1; j >= 0; j--) {
        row.push(piece.shape[j][i])
      }
      rotatedPiece.push(row)
    }
    const previousShape = piece.shape
    piece.shape = rotatedPiece
    if (checkCollision()) {
      piece.shape = previousShape
    }
  }
}
