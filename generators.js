function human() {
  this.name = markovGen(txt)
  this.healthMod = 0
  this.stamMod = 0
  this.health = 100 + Math.round(p5.random(-2, 10))
  this.regenSpeed = 10
  this.weapon = p5.random(weapons)
  this.levelUp = function() {
    // player health scaling
    this.maxStam += Math.round(p5.random(1, 2 + (level / 5)))
    this.maxHealth += Math.round(p5.random(1, 1 + (level / 7)))
    this.weapon.damage += +p5.random(0,0.5+(this.healthMod/10)).toFixed(0)
    this.health += 20
    this.stamina += 10
  }
  // regen, called once per update for Player
  this.regen = function() {
    if (this.stamina < this.maxStam) {
      this.stamina = +(this.stamina + (this.regenSpeed + (level + (this.maxStam / 10) / 50)) / 15).toFixed(3)
    } else if (this.stamina > this.maxStam) {
      this.stamina = this.maxStam
    }

    if (this.health < this.maxHealth) {
      this.health = +(this.health + (this.regenSpeed + (level / 5) + (this.maxHealth / 40)) / 50).toFixed(2)
    } else if (this.health > this.maxHealth) {
      this.health = this.maxHealth
    }


  }
  this.attack = function() {
    var damage = 0
    if (p5.random(0, missBase + this.weapon.accuracy) >= 50) {
      this.stamina = +(this.stamina - ((this.weapon.damage * this.weapon.di) / 20)).toFixed(0);
      for (var i = 0; i < this.weapon.di; i++) {
        damage += Math.round(p5.random(1, this.weapon.damage))
      }
    }
    return damage;
  }
  this.stamina = 50 + Math.round(p5.random(-5, 5))
  this.maxHealth = this.health
  this.maxStam = this.stamina
}





// enemy generator
function Enemy() {
  this.legendary = false

  this.name = markovGen(txt,"weapon") + " " + markovGen(txt,"weapon")
  // enemy health scaling
  this.health = Math.round(p5.random(player.maxHealth * 0.8, player.maxHealth * 1.2))
  // enemy damage scaling
  this.regenSpeed = 1
  this.weapon = p5.random(weapons)
  this.regen = function() {
    this.regenSpeed = 1 + (level / 1.5)
    if (this.stamina < this.maxStam) {
      this.stamina = +(this.stamina + this.regenSpeed / 10).toFixed(3)
    } else if (this.stamina > this.maxStam) {
      this.stamina = this.maxStam
    }

    if (this.health < this.maxHealth) {
      this.health = +(this.health + this.regenSpeed / 100).toFixed(3)
    } else if (this.health > this.maxHealth) {
      this.health = this.maxHealth
    }
  }

  this.attack = function() {
    var damage = 0
    if (p5.random(0, missBase + this.weapon.accuracy) >= 50) {
      for (var i = 0; i < this.weapon.di; i++) {
        damage += Math.round(p5.random(1, this.weapon.damage))
      }
    }
    return damage;
  }
  this.stamina = 50 + Math.round(p5.random(-5, 5))
  this.maxStam = this.stamina
  this.maxHealth = this.health
  if (p5.random(0, 400 - level * 2) <= 10) {
    this.legendary = true
    this.maxHealth *= 1.5
    this.health = this.maxHealth
    this.name = "The Legendary " + this.name
    this.weapon.damage += Math.round(p5.random(1, 7 + (level / 2)))
    this.weapon.di += Math.round(p5.random(0, 1 + (level / 20)))
    this.weapon.accuracy += Math.round(p5.random(0, 1 + (level / 20)))
    this.weapon.speed -= 300
    this.weapon.speed = +(this.weapon.speed).toFixed(2)
    if (this.weapon.speed <= 0) {
      this.weapon.speed = 1
    }
  }

}

// weapon generator
function Weapon() {
  this.index = Math.round(p5.random(0,aTypes.length)- 0.5)
  this.level = level + 1
  this.speed = p5.random(1000-(1000/(1+(level/100)+0.6)), 1000-(1000/(1+(level/100)+0.4)))
  this.damage = Math.round(p5.random(2 + (level / 6) * 2, 3 + (level / 6) * 2)) //old damage
  this.type = aTypes[this.index][1]
  this.dType = aTypes[this.index][0]
  this.name = markovGen(txt,'weapon')
  this.di = Math.round(p5.random(1 + (level / 50), 3 + (level / 50)))
  this.legendary = false
  this.accuracy = +(p5.random(101-(101/(1+(level/100)+1)), 101-(101/(1+(level/100)+1.1))))
  // if legendary
  if (p5.random(0, 100) <= 10) {
    this.legendary = true
    this.damage += Math.round(p5.random(0+ (level / 5), 5 + (level / 1.1)))
    this.di += Math.round(p5.random(1+ (level / 50), 1 + (level / 50)))
    this.accuracy += Math.round(p5.random(0+(level/50), 1 + (level / 60)))
    this.speed += p5.random(50, 100)
    this.level += +p5.random(1,5).toFixed(0)
    if (this.speed >= 1000) {
      this.speed = p5.random(800, 999)
    }
  }
  if (this.legendary) {
    this.name = this.name + "'s legendary "
  }else {
    this.name = this.name + "'s "
  }

  this.speed = +(this.speed).toFixed(2)
}

// armor
function Armor() {
  this.level = level + Math.round(p5.random(-5, 1))
  if (this.level < 0) {
    this.level = 0
  }

  this.type = p5.random(Atypes)
  this.name = markovGen(txt)
  this.legendary = false
  if (p5.random(0, 100) <= 10) {
    this.legendary = true
    this.name = this.name + "'s Legendary "
  }
  this.name = this.name + this.type
}
