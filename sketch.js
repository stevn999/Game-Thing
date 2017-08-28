var p5 = p5.prototype;
var level = 0;
var active = true
var activeE = false
var lives = 3
var contributers = ['Daft Podunk',
                    'Willard',
                    'Hugh Morris',
                    'Fwiller',
                    'Dasyayi',
                    'Steven',
                    'Wott',
                    'Vince Delicious',
                    'A giant potato',
                    'Fabian',
                    'Cameron Cisco',
                    'Gabisver',
                    'Fouton',
                    'Dezzy',
                    'Mitch',
                    'E Van'
                ]
var ling = [
  'al','ey','e','ie','t','ev','ou','ic','oc','so'
  ,"k'",'dal','dek','der','div', 'scov','leni'
  ,'leb','si','to','my','lobo','lin','fin','son'
  ,'s','r','t','p','s','d','ba','be','bi','bo'
  ,'bu','st','ev','en','qa','qe','qi','qo','qu'
  ,'ga','ell','se','ka','ris','sa','zim','da'
  ,'de','di','do','du','hit','dez','ler','ey'
  ,'ra','re','ri','ro','ru','an','wa','we','wi'
  ,'wo','wu','wy'
]

setTimeout(function () {
  activeE=true
}, 4000);


var weapons = []

for (var i = 0; i < 20; i++) {
  weapons.push(new Weapon())
}

var game = document.getElementById("game")
var main = document.getElementById('main')
var output = document.getElementById('output')
var attackbtn = document.getElementById("attackBtn")
var enemyDoc = document.getElementById("mainEnemy")
var spawnButton = document.getElementById("newEnemy")
var loot = document.getElementById('Loot')
$( document ).ready(function () {
  $(game).hide()
  $(game).slideDown(500)
})
attackbtn.addEventListener("click" , attackP)
loot.addEventListener("click", lootEnemy)
spawnButton.addEventListener("click" , nextE)
// generate player and enemies
var player = new human()
var enemy = new Enemy()
// make starter sword
player.weapon.name = "Explorer's old rusty sword"
player.weapon.type = "'s starter"
player.weapon.speed = 700
player.weapon.damage = 8
player.weapon.di = 3
//buildpage
enemyDoc.innerHTML = makeHtml(enemy)
main.innerHTML = makeHtml(player)
//

//clocks
var gameClock = setInterval(function () {
  if (player.health <= 0 && lives > 0) {
    lives--
    player.health = player.maxHealth
    activeE = false
    active = true
    output.innerHTML = ("<li class=\"revive heal \">You have been revived to continue your journey! " + lives + " revives remaining! </li>" + output.innerHTML )
    setTimeout(function () {
      activeE = true
    },1000);
  }
  if (enemyDoc.innerHTML != makeHtml(enemy) || main.innerHTML != makeHtml(player)) {
    enemyDoc.innerHTML = makeHtml(enemy)
    main.innerHTML = makeHtml(player)
  }
 if (enemy.health > 0) {
   $(".hideme").hide()
 }else {
   $(".hideme").slideDown(200)
 }

}, 100);
(function($) {
  $.fn.nodoubletapzoom = function() {
      $(this).bind('touchstart', function preventZoom(e) {
        var t2 = e.timeStamp
          , t1 = $(this).data('lastTouch') || t2
          , dt = t2 - t1
          , fingers = e.originalEvent.touches.length;
        $(this).data('lastTouch', t2);
        if (!dt || dt > 500 || fingers > 1) return; // not double-tap
        e.preventDefault(); // double tap - prevent the zoom
        // also synthesize click events we just swallowed up
        $(this).trigger('click').trigger('click');
      });
  };
})(jQuery);
var clock = setInterval(function () {
  if (player.health > 0) {
    player.regen()
    if (enemyDoc.innerHTML != makeHtml(enemy) || main.innerHTML != makeHtml(player)) {
      enemyDoc.innerHTML = makeHtml(enemy)
      main.innerHTML = makeHtml(player)
    }
  }
  }, 200);

var enemyClock = setInterval(function () {
  if (enemy.health > 0) {
    enemy.regen()
    if (activeE) {
      setTimeout(function () {
        attackE()
        activeE = true
      },1000 - enemy.weapon.speed);
    }
    activeE = false
    if (enemyDoc.innerHTML != makeHtml(enemy) || main.innerHTML != makeHtml(player)) {
      enemyDoc.innerHTML = makeHtml(enemy)
      main.innerHTML = makeHtml(player)
    }
  }
  if (player.weapon === undefined) {
    weapons.push(new Weapon())
    player.weapon = weapons[0]
  }
}, 400);
//
//Display
function makeHtml(char) {
  if (char.health <=0 ) {
    char.health = 0
  }
  var tmp = ""
  tmp += ("<div class=\"container col-lg-12\"><p>" + char.name + " at Level: "+ level +"</p>")
  tmp += ("<ul class=\"tall\">")
  tmp += ("<li>" + (+(char.health/ char.maxHealth).toFixed(4)*100).toFixed(2) + "% health. " + char.health.toFixed(1) +" /"+char.maxHealth.toFixed(0)+ " points </li>")
  tmp += ("<li> Wielding " + char.weapon.name + " :<br><em>Level " + char.weapon.level + "</em><br>speed: " + (char.weapon.speed/10).toFixed(0) + "</li>")
  if (char.weapon.di >=2) {

    tmp += ("<li> rolling " + char.weapon.di + " D" + char.weapon.damage + "s</li>")
  }else {
    tmp += ("<li> rolling " + char.weapon.di + " D" + char.weapon.damage + "</li>")
  }
    tmp += ("<li>" + (char.stamina).toFixed(1) + " stamina</li></div>")
  return tmp
}
main.innerHTML = makeHtml(player)
//
//Generate Names
function makeName(t) {
  var len = Math.round(p5.random(2,7))
  var name = ""
  for (var i = 0;name.length < len; i++) {
    name += p5.random(ling)
  }
  name = name.toLowerCase()
  var fl = name.charAt(0)
  fl = fl.toUpperCase()
  name = name.slice(1)
  name = fl+name
  if (p5.random(0,100)<40 && t != 'weapon') {
    name = p5.random(contributers)
  }
  return name
}
// Players attack
function attackP() {
  if (active == true) {


    if (player.stamina <= 1) {
      if (player.stamina <= 0) {
        player.stamina = 0
      }
      main.innerHTML = makeHtml(player)
      output.innerHTML = ("<li>You cannot attack now: <strong>Not enough stamina</strong> <br></li>" + output.innerHTML )

    } else if (player.health == 0 || enemy.health == 0) {
        main.innerHTML = makeHtml(player)
    }else{
      var dam = player.attack()
      enemy.health -= dam
      enemyDoc.innerHTML = makeHtml(enemy)

      main.innerHTML = makeHtml(player)
      output.innerHTML = ("<li> Attacked for: " + dam + "<br></li>" + output.innerHTML )
    }
    active = false
    setTimeout(function () {
      active = true
    }, 1000 -player.weapon.speed);
  }
}
//Enemies attack
function attackE() {
  var dam = enemy.attack()
  if (enemy.stamina < 1 && player.health !== 0 && enemy.health > 0) {
    if (enemy.stamina < 0) {
      enemy.stamina = 0
    }
    enemyDoc.innerHTML = makeHtml(enemy)

  }else if (player.health == 0 || enemy.health == 0) {
      enemyDoc.innerHTML = makeHtml(enemy)
  }else{
    player.health -= dam
    enemy.stamina = +(enemy.stamina-1).toFixed(2);
    enemyDoc.innerHTML = makeHtml(enemy)
    output.innerHTML = ("<li class='hit damage'> Took " + dam + " Damage! You are at " + player.health.toFixed(0) + " health.<br></li>" + output.innerHTML )
  }
}
//On next level
function nextE() {
  if (active == true) {


    var playerDamage = (player.weapon.damage*player.weapon.di)/(1000-player.weapon.speed)
    var enemyDamage = (enemy.weapon.damage*enemy.weapon.di)/(1000-enemy.weapon.speed)
    for (var i = 0; i < 10; i++) {
        weapons.push(new Weapon())
    }
    if (weapons.length > 100) {
      while (weapons.length > 100) {
          weapons.shift()
      }
    }
    main.innerHTML = makeHtml(player)
    enemyDoc.innerHTML = makeHtml(enemy)
    // if (enemyDamage > playerDamage) {
    //   enemy.weapon.name = enemy.name + enemy.weapon.type
    //   if (enemy.weapon.legendary == true) {
    //     enemy.weapon.name = enemy.weapon.name + " @"
    //   }
    //   player.weapon = enemy.weapon
    //
    // }

    player.levelUp()
    enemy = new Enemy()
    level += 1
    active = false
    setTimeout(function () {
      active = true
    }, 100);
  }
}
function lootEnemy() {
  //
  // enemy.weapon.name = enemy.name + enemy.weapon.type
  // player.weapon.name = player.name + player.weapon.type
    var tmp = player.weapon
  //   if (enemy.weapon.legendary == true) {
  //     enemy.weapon.name = enemy.weapon.name + " @"
  //   }
  //   if (player.weapon.legendary == true) {
  //     player.weapon.name = player.weapon.name + " @"
  //   }

    player.weapon = enemy.weapon
    enemy.weapon = tmp
}
