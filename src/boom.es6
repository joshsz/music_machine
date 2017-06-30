//import MusicBox from "./sounds/9279__eliasheuninck__re-2.aif"
//import Snare from './sounds/439__tictacshutup__prac-snare-2.wav'
//import Piano from './sounds/68441__pinkyfinger__piano-c.wav'

import timbre from 'timbre/timbre.dev'

class BoomButton {
  constructor(element){
    this.el = element
    let freq = element.getAttribute('data-freq')
    this.key = element.getAttribute('data-key')
    this.audio = timbre('pulse', {freq: parseInt(freq), mul:0.5})
    //this.audio = new Audio(Piano)
    //this.audio.preservesPitch = false
    //this.audio.playbackRate = this.rate
    this.playing = false
  }
  play(){
    if(!this.playing) {
      this.playing = true
      //this.audio.currentTime = 0
      this.el.classList.toggle('playing')
      this.audio.play();
      return true
    }
    return false
  }
  pause(){
    this.playing = false
    this.el.classList.toggle('playing')
    this.audio.pause();
  }
}
class Tracker {
  constructor(){
    this.chunks = []
    this.curChunk = []
    this.recording = false
    this.intervalDef = {interval: 'BPM120 L16'}
    var sine1 = timbre("sin", {freq:440, mul:0.5});
    var sine2 = timbre("saw", {freq:880, mul:0.5});
    this.interval = timbre('interval', this.intervalDef, (count) => {
      this.chunks.push(this.curChunk)
      this.curChunk = []

      if(count % 4 == 0){
        timbre("perc", {r:500}, sine1, sine2).on("ended", function() { this.pause(); }).bang().play();
      }

    });
  }
  replay(){
    this.replayer = timbre('interval', this.intervalDef, (count) => {
      let cc = this.chunks[count]
      if(cc){
        for(let e of cc){
          if(e.dn){
            e.dn.play()
          }
          if(e.up){
            e.up.pause()
          }
        }
      }
      if(count > this.chunks.length){
        this.replayer.stop();
        document.getElementById('playback').classList.toggle('playing')
      }
    });
    document.getElementById('playback').classList.toggle('playing')
    this.replayer.start();
  }
  tog(){
    this.recording = !this.recording
    document.getElementById('rec').classList.toggle('recording')
    if(this.recording){
      this.start();
    } else {
      this.stop();
    }
  }
  start() { 
    this.chunks = [];
    this.interval.start();
  }
  stop() {
    this.interval.stop();
  }
  data(k) {
    if(this.recording){
      this.curChunk.push(k)
    }
  }
}
export class BoomBoard {
  constructor() {
    this.buttons = []
    this.tracker = new Tracker();
  }
  setup() {

    let btns = document.getElementsByClassName('sound-button')
    for (let btn of btns) {
      this.buttons.push(new BoomButton(btn))
    }

    window.addEventListener('keydown', (e) => this.keydown(e))
    window.addEventListener('keyup', (e) => this.keyup(e))
  }

  keydown(ev) {
    for (let btn of this.buttons){
      if(btn.key == ev.key){
        if( btn.play() ){
          this.tracker.data({dn: btn})
        }
      }
    }
  }
  keyup(ev) {
    if(ev.key == '`'){
      this.tracker.tog()
    }
    if(ev.key == '1'){
      this.tracker.replay()
    }
    for (let btn of this.buttons){
      if(btn.key == ev.key){
        btn.pause()
        this.tracker.data({up: btn})
      }
    }
  }
}

