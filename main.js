import './style.css'
import { BLOCK_SIZE, BOARD_HEIGHT, BOARD_WIDTH, KEY } from './src/consts'
import { drawBoard } from './src/board'
import { createPiece, drawRandomPieces, movePiece, timePiece } from './src/piece'

const c = document.getElementById('tetrisBoard')
const ctx = c.getContext('2d')

ctx.canvas.width = BLOCK_SIZE * BOARD_WIDTH
ctx.canvas.height = BLOCK_SIZE * BOARD_HEIGHT

ctx.scale(BLOCK_SIZE, BLOCK_SIZE)

let dropCounter = 0
let lasTime = 0

const $container = document.querySelector('section')
$container.addEventListener('click', () => {
  $container.remove()
  if (createPiece()) update()
})

function update (time = 0) {
  const deltaTime = (time - lasTime)
  lasTime = time
  dropCounter += deltaTime
  if (dropCounter > 1000) {
    movePiece(KEY.DOWN)
    dropCounter = 0
    timePiece()
  }
  draw()
  window.requestAnimationFrame(update)
}

function draw () {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, c.width, c.height)
  drawBoard(ctx)
  drawRandomPieces(ctx)
}

document.addEventListener('keydown', (event) => {
  movePiece(event.key)
})
