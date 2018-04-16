var nGrams = {}
var order = 3
var p5 = p5.prototype;
var level = 0;
var active = true;
var activeE = false;
var lives = 3;
var missBase = 200;
var pMiss = 0;
var eMiss = 0;
var lastTime = Date.now();
var shiffmode = false
var volume = 1
var weaponPool = 500
var hitSound = new Howl({
  src: ["engine/sword_1.mp3"]
})
hitSound.volume([0.5])

function clean() {
  txt = txt.toLowerCase()
  txt = txt.replace(/\s/g, '')
  txt = txt
  for (var i = 0; i < txt.length - order; i++) {
    let gram = txt.substring(i, i + order)

    if (!nGrams[gram]) {
      nGrams[gram] = []
    }
    nGrams[gram].push(txt.substring(i + order, i + (order * 2)))
  }
}
async function asClean() {
  clean()
}
asClean()

var contributers = ['Daft Podunk',
  'Willard',
  'Marco',
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
  'E Van',
  'The Dabsmith',
  'Ninnyz'
];

var ling = [
  'al', 'ie', 't', 'ev', 'ic', 'oc', 'so', "k'", 'dal', 'dek', 'der', 'div', 'scov', 'leni', 'leb', 'si', 'to', 'my', 'lobo', 'lin', 'fin', 'son', 's', 'ar', 'er', 'ir', 'or', 'ur', 't', 'p', 's', 'd', 'ba', 'be', 'bi', 'bo', 'bu', 'st', 'ev', 'en', 'qa', 'qe', 'qi', 'qo', 'qu', 'ga', 'ell', 'se', 'ka', 'ris', 'sa', 'zim', 'da', 'de', 'di', 'do', 'du', 'hit', 'dez', 'ler', 'ey', 'ra', 're', 'ri', 'ro', 'ru', 'an', 'wa', 'we', 'wi', 'wo', 'wu', 'wy', 'et', 'han', 'ash', 'esh', 'ish',
  'osh', 'ush', 'ane', 'ca', 'ce', 'ci', 'co', 'cu', 'fa', 'fe', 'fi', 'fo', 'fu', 'ga', 'ge', 'gi', 'go', 'gu'
];

setTimeout(function() {
  activeE = true
}, 4000);

function save() {
  var sav1 = JSON.stringify(player.weapon)
  sav1 = btoa(sav1)
  saveDoc.value = sav1
};

function load() {
  var sav = saveDoc.value
  sav = atob(sav)
  player.weapon = JSON.parse(sav)
  Level = player.weapon.level
};

var weapons = [];

for (var i = 0; i < weaponPool / 2; i++) {
  weapons.push(new Weapon())
};

function stat(index = 0, feat) {
  weapon = aTypes[index]
  temp = 0
  if (feat == "name") {
    temp = weapon[1]
  } else if (feat == 0 || feat == "damage") {
    temp = weapon[0][0]
  } else if (feat == 1 || feat == "di") {
    temp = weapon[0][1]
  } else if (feat == 2 || feat == "speed") {
    temp = weapon[0][2]
  } else if (feat == 3 || feat == "accuracy") {
    temp = weapon[0][3]
  } else if (feat == 4 || feat == "ni") {
    temp = weapon[0][4]
  }
  return temp
}
var saveDoc = document.getElementById('name');
var loadS = document.getElementById("load");
var saveW = document.getElementById("save");
var game = document.getElementById("game");
var main = document.getElementById('main');
var output = document.getElementById('output');
var attackbtn = document.getElementById("attackBtn");
var enemyDoc = document.getElementById("mainEnemy");
var spawnButton = document.getElementById("newEnemy");
var loot = document.getElementById('Loot');
$(document).ready(function() {
  $(game).hide()
  $(game).slideDown(500)
});
attackbtn.addEventListener("click", attackP);
loot.addEventListener("click", lootEnemy);
spawnButton.addEventListener("click", nextE);
saveW.addEventListener("click", save);
loadS.addEventListener("click", load);
// generate player and enemies
var player = new human();
var enemy = new Enemy();
// make starter sword
player.weapon.name = "Explorer's ";
player.weapon.type = "old rusty sword";
player.weapon.speed = 700;
player.weapon.damage = 8;
player.weapon.di = 3;
player.weapon.accuracy = 40;
//buildpage
enemyDoc.innerHTML = makeHtml(enemy);
main.innerHTML = makeHtml(player);
//
hitSound.rate([p5.random(0.8, 1.6)])
hitSound.play()
$(function() {
  $("#progressbar").progressbar({
    value: enemy.maxHealth
  });
});
$(function() {
  $("#player-progressbar").progressbar({
    value: player.maxHealth

  });
});
//clocks
var gameClock = setInterval(function() {
  if (player.health <= 0 && lives > 0) {
    lives--
    player.health = player.maxHealth
    activeE = false
    active = true
    output.innerHTML = ("<li class=\"revive heal \">You have been revived to continue your journey! " + lives + " revives remaining! </li>" + output.innerHTML)
    setTimeout(function() {
      activeE = true
    }, 1000);
  };
  if (enemyDoc.innerHTML != makeHtml(enemy) || main.innerHTML != makeHtml(player)) {
    enemyDoc.innerHTML = makeHtml(enemy)
    main.innerHTML = makeHtml(player)
  }
  if (enemy.health > 0) {
    $(".hideme").hide()
  } else {
    $(".hideme").slideDown(200)
  }
  if ((Date.now() - lastTime) > 400) {
    for (var i = 0; i < ((Date.now() - lastTime) / 100); i++) {
      if (player.health > 0) {
        player.regen()
      }
    }
    if (enemyDoc.innerHTML != makeHtml(enemy) || main.innerHTML != makeHtml(player)) {
      enemyDoc.innerHTML = makeHtml(enemy)
      main.innerHTML = makeHtml(player)
    }
  }
  if (shiffmode == true && enemy.health > 0) {
    attackP()
  }
  lastTime = Date.now();
}, 1000);

function selfTest(x, y) {
  return x + y
}

var clock = setInterval(function() {
  if ($('ul#output li').length > 200) {
    $('#output li:last-child').remove();
  }
  if (player.health > 0) {
    player.regen()
    $(function() {
      $("#player-progressbar").progressbar({
        value: (player.health / player.maxHealth) * 100
      });
    });
    if (enemyDoc.innerHTML != makeHtml(enemy) || main.innerHTML != makeHtml(player)) {
      enemyDoc.innerHTML = makeHtml(enemy)
      main.innerHTML = makeHtml(player)
    }
  }
}, 200);

var enemyClock = setInterval(function() {
  if (enemy.health > 0) {
    enemy.regen()
    if (activeE) {
      setTimeout(function() {
        attackE()
        $(function() {
          $("#player-progressbar").progressbar({
            value: player.health
          });
        });
        setTimeout(function() {
          activeE = true
          eMiss = 0
        }, eMiss);
      }, (1000) - enemy.weapon.speed);
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

  if (char.health <= 0) {
    char.health = 0
  }
  var tmp = ""
  tmp += ("<div class=\"col-lg-12 col-md-12 inline-block\"><p>" + char.name + " at Level: " + level + "</p>")
  tmp += ("<ul id=\"oot\"class=\"tall\">")
  tmp += ("<li>" + (+(char.health / char.maxHealth).toFixed(4) * 100).toFixed(2) + "% health. " + char.health.toFixed(1) + " /" + char.maxHealth.toFixed(0) + " points </li>")
  tmp += ("<li> Wielding " + char.weapon.name + char.weapon.type + " :<br><em>Level " + char.weapon.level + "</em><br>speed: " + (char.weapon.speed / 10).toFixed(0) + "</li>")
  tmp += ("<li>Accuracy: " + (char.weapon.accuracy).toFixed(1) + "</li>")
  if (char.weapon.di >= 2) {

    tmp += ("<li> rolling " + char.weapon.di + " D" + char.weapon.damage + "s</li>")
  } else {
    tmp += ("<li> rolling " + char.weapon.di + " D" + char.weapon.damage + "</li>")
  }
  tmp += ("<li>" + ((char.weapon.damage * char.weapon.di) * (char.weapon.speed / 1000) * (char.weapon.accuracy / 100)).toFixed(3) + " DPS</li></div>")
  tmp += ("<li>" + (char.stamina).toFixed(1) + " stamina</li></div>")
  return tmp
}
main.innerHTML = makeHtml(player)
//
//Generate Names
function makeName(t) {
  var len = Math.round(p5.random(2, 10))
  var name = ""
  for (var i = 0; name.length < len; i++) {
    name += p5.random(ling)
  }
  name = name.toLowerCase()
  var fl = name.charAt(0)
  fl = fl.toUpperCase()
  name = name.slice(1)
  name = fl + name
  if (p5.random(0, 100) < 40 && t != 'weapon') {
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
      output.innerHTML = ("<li>You cannot attack now: <strong>Not enough stamina</strong> <br></li>" + output.innerHTML)

    } else if (player.health == 0 || enemy.health == 0) {
      main.innerHTML = makeHtml(player)

    } else {
      let dam = player.attack()
      if (dam == 0) {
        enemyDoc.innerHTML = makeHtml(enemy)
        main.innerHTML = makeHtml(player)
        output.innerHTML = ("<li> You've missed! <br></li>" + output.innerHTML)
        pMiss = 500
      } else {
        enemy.health -= dam

        hitSound.rate([p5.random(0.8, 1.6)])
        hitSound.play()
        $(function() {
          $("#progressbar").progressbar({
            value: (enemy.health / enemy.maxHealth) * 100
          });
        });
        enemyDoc.innerHTML = makeHtml(enemy)
        main.innerHTML = makeHtml(player)
        output.innerHTML = ("<li> Attacked for: " + dam + "<br></li>" + output.innerHTML)
      }
    }
    active = false
    setTimeout(function() {
      setTimeout(function() {
        active = true
        pMiss = 0
      }, pMiss);
    }, (1000) - player.weapon.speed);
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

  } else if (player.health == 0 || enemy.health == 0) {
    enemyDoc.innerHTML = makeHtml(enemy)
  } else if (dam == 0) {
    enemy.stamina = +(enemy.stamina - 1).toFixed(2);
    enemyDoc.innerHTML = makeHtml(enemy)
    output.innerHTML = ("<li class='hit damage'>Enemy missed! Strike now while they recover!</li>" + output.innerHTML)
    eMiss = 1000
  } else {
    player.health -= dam
    player.healthMod += (0.01 * level)
    hitSound.rate([p5.random(0.8, 1.6)])
    hitSound.play()

    enemy.stamina = +(enemy.stamina - 1).toFixed(2);
    enemyDoc.innerHTML = makeHtml(enemy)
    output.innerHTML = ("<li class='hit damage'> Took " + dam + " Damage! You are at " + player.health.toFixed(0) + " health.<br></li>" + output.innerHTML)
  }
}
//On next level
function nextE() {
  if (active == true) {
    for (var i = 0; i < weaponPool; i++) {
      weapons.push(new Weapon())
    }
    if (weapons.length > weaponPool) {
      while (weapons.length > weaponPool) {
        weapons.shift()
      }
    }
    main.innerHTML = makeHtml(player)
    enemyDoc.innerHTML = makeHtml(enemy)
    player.levelUp()
    enemy = new Enemy()
    level += 1
    active = false
    setTimeout(function() {
      active = true
    }, 100);
  }
}

function lootEnemy() {
  var tmp = player.weapon
  player.weapon = enemy.weapon
  enemy.weapon = tmp
}

// namegen


function markovGen(src, t = "") {
  var start = (p5.random(src.length))
  var currentGram = src.substring(start, start + order)
  var result = currentGram
  for (var i = 0; i <= (p5.random(order / 4)); i++) {
    var possible = nGrams[currentGram]
    if (!possible) {
      break
    }
    var next = p5.random(possible)
    result += next
    currentGram = result.substring(result.length - order, result.length)
  }
  if (result.length <= 3 || !hasV(result)) {
    markovGen(src)
  } else if (p5.random(0, 100) < 10 && t != 'weapon') {
    return p5.random(contributers)
  } else {
    return (ucf(result));
  }
}


function ucf(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function hasV(str) {
  var vow = "aeiou"
  con = false
  for (var i = 0; i < str.length; i++) {
    for (var j = 0; j < vow.length; j++) {
      if (str.charAt(i) === vow.charAt(j)) {
        con = true
      }
    }
  }
  return con
}
