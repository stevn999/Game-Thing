function human() {
  this.name = makeName("weapon")
  this.health = 100 + Math.round(p5.random(-2,10))
  this.damage = Math.round(p5.random(2,4)*2)
  this.di =  Math.round(p5.random(1,3))
  this.regenSpeed = 5
  this.weapon = p5.random(weapons)

  this.levelUp = function () {
    // player health scaling
    this.maxStam += Math.round(p5.random(1 , 2+(level/5)))
    this.maxHealth += Math.round(p5.random(1 , 1+(level/7)))
    this.health += 20
    this.stamina += 10
  }
  // regen, called once per update for Player
  this.regen = function () {
    if (this.stamina < this.maxStam) {
      this.stamina = +(this.stamina + (this.regenSpeed+(level+(this.maxStam/10)/50))/15).toFixed(3)
    }else if (this.stamina > this.maxStam) {
      this.stamina = this.maxStam
    }

    if (this.health < this.maxHealth) {
      this.health = +(this.health + (this.regenSpeed+(level/5)+(this.maxHealth/40))/50).toFixed(2)
    }else if (this.health > this.maxHealth) {
      this.health = this.maxHealth
    }


  }
  this.attack = function () {
    var damage = 0
    if (p5.random(this.weapon.accuracy,100)>30) {
      this.stamina = +(this.stamina-((this.weapon.damage*this.weapon.di)/20)).toFixed(0);
      for (var i = 0; i < this.weapon.di; i++) {
        damage += Math.round(p5.random(1,this.weapon.damage))
      }
    }
      return damage;
    }
  this.stamina = 50 + Math.round(p5.random(-5,5))
  this.maxHealth = this.health
  this.maxStam = this.stamina
}





// enemy generator
function Enemy() {
  this.legendary = false

  this.name = makeName("weapon") + " " + makeName("weapon")
  // enemy health scaling
  this.health = Math.round(p5.random(player.maxHealth*0.8,player.maxHealth*1.2))
  // enemy damage scaling
  this.regenSpeed = 1
  this.weapon = p5.random(weapons)

  this.regen = function () {
    this.regenSpeed = 1+(level/1.5)
    if (this.stamina < this.maxStam) {
      this.stamina = +(this.stamina + this.regenSpeed/10).toFixed(3)
    }else if (this.stamina > this.maxStam) {
      this.stamina = this.maxStam
    }

    if (this.health < this.maxHealth) {
      this.health = +(this.health + this.regenSpeed/100).toFixed(3)
    }else if (this.health > this.maxHealth) {
      this.health = this.maxHealth
    }
  }

  this.attack = function () {
    var damage = 0
    if (p5.random(this.weapon.accuracy,100)>50) {
      for (var i = 0; i < this.weapon.di; i++) {
        damage += Math.round(p5.random(1,this.weapon.damage))
      }
    }
      return damage;
    }
  this.stamina = 50 + Math.round(p5.random(-5,5))
  this.maxStam = this.stamina
  this.maxHealth = this.health
  if (p5.random(0,400-level*2)<=10) {
    this.legendary = true
    this.maxHealth *= 1.5
    this.health = this.maxHealth
    this.name = "The Legendary " + this.name
    this.weapon.damage += Math.round(p5.random(1,7+(level/2)))
    this.weapon.di += Math.round(p5.random(0,1+(level/20)))
    this.weapon.accuracy += Math.round(p5.random(0,1+(level/20)))
    this.weapon.speed -= 300
    this.weapon.speed = +(this.weapon.speed).toFixed(2)
    if (this.weapon.speed <=0) {
      this.weapon.speed = 1
    }
  }

}

// weapon generator
function Weapon() {
  this.level = level+1
  this.speed = p5.random(100,1000)
  this.damage = Math.round(p5.random(2,4 + (level/4))*2)
  this.type = "'s " + p5.random(wTypes)
  this.name = makeName()
  this.di =  Math.round(p5.random(1,3 + (level/10)))
  this.legendary = false
  this.accuracy = +(p5.random(0,50 + (level)).toFixed(2))
  // if legendary
  if (p5.random(0,100)<=10) {
    this.legendary = true
    this.name = this.name + "'s Legendary "
    this.type = this.type.slice(3)
    this.damage += Math.round(p5.random(1,7+(level/2)))
    this.di += Math.round(p5.random(1,1+(level/40)))
    this.accuracy += Math.round(p5.random(1,1+(level/10)))
    this.speed += p5.random(10,400)
    if (this.speed >= 1000) {
      this.speed = p5.random(800,999)
    }
  }
  this.name = this.name + this.type
  this.speed = +(this.speed).toFixed(2)
}

// armor
function Armor() {
  this.level = level+ Math.round(p5.random(-5,1))
  if (this.level <0) {
    this.level = 0
  }

  this.type = p5.random(Atypes)
  this.name = makeName()
  this.legendary = false
  if (p5.random(0,100)<=10) {
    this.legendary = true
    this.name = this.name + "'s Legendary "
  }
  this.name = this.name + this.type
}
