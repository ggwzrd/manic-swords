
let SPEED = 0

export default class SwordModel {

  constructor(data, level) {
      SPEED = level.speed
      this._id = data._id
      this.active = data.active
      this.image = data.image
      this.position = {
        x: data.position.x,
        y: data.position.y
      }
      this.radius = data.radius
  }

  isActive(){
    if(this.position.y >= 550){
      this.active = false
      return false
    }

    return true
  }

  update(data){
    this.active = data.active
    this.image = data.image
    this.position = {
      x: data.position.x,
      y: data.position.y
    }
    this.radius = data.radius
  }

  falling(){
    if(this.isActive())
      this.position.y += Math.round(Math.random() * SPEED + 1)
  }



}
