import { randomNumBetween } from '../helpers/game-helper'


export default class SwordModel {

  constructor(data) {
      this._id = data._id
      this.active = data.active
      this.image = data.image
      this.position = {
        x: data.position.x,
        y: data.position.y
      }
      this.radius = data.radius
  }
  updateSpeed(){
    SPEED
  }
  isActive(){
    if(this.position.y >= 550){
      return false
    }

    return true
  }

  falling(speed){
    if(this.isActive())
      this.position.y += Math.round(Math.random() * speed + 1)
    else
      this.position.y = randomNumBetween(-50, -(50 * 25))
  }



}
