import Styles from './style.scss'
import {BoomBoard} from 'boom.es6'
let boomBoard = new BoomBoard()

window.addEventListener('load', ()=> {
  boomBoard.setup()
  window.boomBoard = boomBoard
});

console.log(Styles)
