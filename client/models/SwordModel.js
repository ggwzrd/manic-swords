
let SPEED = 0

export default class SwordModel {

  constructor(data, level) {
      SPEED = level.speed
      this.active = data.active
      this.image = data.image
      this.position = {
        x: data.position.x,
        y: data.position.y
      }
      this.radius = data.radius
  }

  falling(){
    this.position.y += Math.round(Math.random() * SPEED + 1)
  }



}
