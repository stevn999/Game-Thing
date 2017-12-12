var wTypes = [
  'Sword',
  'Mace',
  'Long-sword',
  'Dagger',
  'Bow',
  'Brass knuckles',
  'Gauntlets',
  'Severed fist',
  'Plank, with a nail through it',
  'Club',
  'War pike',
  'Staff',
  'Whip',
  'Lance',
  'Axe',
  'War axe',
  'Sling',
  'Flamingo (animal)',
  'Flamingo (lawn ornament)',
  'Large trout',
  'Q-tip',
  'DSLR camera',
  'Bowling ball (thrown)',
  'Bowling ball (swung)',
  'Bottle of urine',
  'Insulting letter',
  'Rolled up newspaper',
  'POCKET SAND! SHA SHA SHAA!',
  'Lego caltrops',
  'Spoon',
  'Wooden spoon',
  'Fork',
  'Butterknife',
  'Stick of butter',
  'Squash',
  'Fly-swatter',
  'Lighter',
  'Nun-chucks',
  'Purple Binder',
  'Snowballs',
  'Wooden paddle',
  'Trident',
  'Kettle',
  'Pen',
  'Rapier',
  'Dry towel',
  'Wet towel',
  'Bastard sword',
  'Bass (fish)',
  'Katana',
  'Shovel (square)',
  'Shovel (spade)',
  'Scissors',
  'Bottle (wine)',
  'Bottle (water)',
  'Bottle (broken)',
  'Bottle (empty)',
  'Fireplace poker',
  'Love',
  'Mean look',
  'Rock (swung)',
  'Rock (thrown)',
  'Dab'
]
/*
0 damage 1-15
1 di - 1-6
2 speed 100-1000
3 accuracy - 0,50
4 ?
*/
var aTypes = [
  [
    [8, 1, 600, 30, 0], 'Sword'
  ],
  [
    [6, 2, 500, 20, 0], 'Mace'
  ],
  [
    [7, 2, 500, 29, 0], 'Long-sword'
  ],
  [
    [5, 1, 800, 40, 0], 'Dagger'
  ],
  [
    [10, 2, 600, 15, 0], 'Bow'
  ],
  [
    [4, 5, 800, 45, 0], 'Brass knuckles'
  ],
  [
    [8, 4, 800, 45, 0], 'Gauntlets'
  ],
  [
    [2, 1, 810, 30, 0], 'Severed fist'
  ],
  [
    [10, 1, 610, 30, 0], 'Plank, with a nail through it'
  ],
  [
    [7, 2, 500, 20, 0], 'Club'
  ],
  [
    [12, 2, 300, 25, 0], 'War pike'
  ],
  [
    [8, 1, 900, 40, 0], 'Staff'
  ],
  [
    [4, 3, 300, 28, 0], 'Whip'
  ],
  [
    [0, 0, 0, 0, 0], 'Lance'
  ],
  [
    [0, 0, 0, 0, 0], 'Axe'
  ],
  [
    [0, 0, 0, 0, 0], 'War axe'
  ],
  [
    [0, 0, 0, 0, 0], 'Sling'
  ],
  [
    [0, 0, 0, 0, 0], 'Flamingo (animal)'
  ],
  [
    [0, 0, 0, 0, 0], 'Flamingo (lawn ornament)'
  ],
  [
    [0, 0, 0, 0, 0], 'Large trout'
  ],
  [
    [0, 0, 0, 0, 0], 'Q-tip'
  ],
  [
    [0, 0, 0, 0, 0], 'DSLR camera'
  ],
  [
    [0, 0, 0, 0, 0], 'Bowling ball (thrown)'
  ],
  [
    [0, 0, 0, 0, 0], 'Bowling ball (swung)'
  ],
  [
    [0, 0, 0, 0, 0], 'Bottle of urine'
  ],
  [
    [0, 0, 0, 0, 0], 'Insulting letter'
  ],
  [
    [0, 0, 0, 0, 0], 'Rolled up newspaper'
  ],
  [
    [0, 0, 0, 0, 0], 'POCKET SAND! SHA SHA SHAA!'
  ],
  [
    [0, 0, 0, 0, 0], 'Lego caltrops'
  ],
  [
    [0, 0, 0, 0, 0], 'Spoon'
  ],
  [
    [0, 0, 0, 0, 0], 'Wooden spoon'
  ],
  [
    [0, 0, 0, 0, 0], 'Fork'
  ],
  [
    [0, 0, 0, 0, 0], 'Butterknife'
  ],
  [
    [0, 0, 0, 0, 0], 'Stick of butter'
  ],
  [
    [0, 0, 0, 0, 0], 'Squash'
  ],
  [
    [0, 0, 0, 0, 0], 'Fly-swatter'
  ],
  [
    [0, 0, 0, 0, 0], 'Lighter'
  ],
  [
    [0, 0, 0, 0, 0], 'Nun-chucks'
  ],
  [
    [0, 0, 0, 0, 0], 'Purple Binder'
  ],
  [
    [0, 0, 0, 0, 0], 'Snowballs'
  ],
  [
    [0, 0, 0, 0, 0], 'Wooden paddle'
  ],
  [
    [0, 0, 0, 0, 0], 'Trident'
  ],
  [
    [0, 0, 0, 0, 0], 'Kettle'
  ],
  [
    [0, 0, 0, 0, 0], 'Pen'
  ],
  [
    [0, 0, 0, 0, 0], 'Rapier'
  ],
  [
    [0, 0, 0, 0, 0], 'Dry towel'
  ],
  [
    [0, 0, 0, 0, 0], 'Wet towel'
  ],
  [
    [0, 0, 0, 0, 0], 'Bastard sword'
  ],
  [
    [0, 0, 0, 0, 0], 'Bass (fish)'
  ],
  [
    [0, 0, 0, 0, 0], 'Katana'
  ],
  [
    [0, 0, 0, 0, 0], 'Shovel (square)'
  ],
  [
    [0, 0, 0, 0, 0], 'Shovel (spade)'
  ],
  [
    [0, 0, 0, 0, 0], 'Scissors'
  ],
  [
    [0, 0, 0, 0, 0], 'Bottle (wine)'
  ],
  [
    [0, 0, 0, 0, 0], 'Bottle (water)'
  ],
  [
    [0, 0, 0, 0, 0], 'Bottle (broken)'
  ],
  [
    [0, 0, 0, 0, 0], 'Bottle (empty)'
  ],
  [
    [0, 0, 0, 0, 0], 'Fireplace poker'
  ],
  [
    [0, 0, 0, 0, 0], 'Love'
  ],
  [
    [0, 0, 0, 0, 0], 'Mean look'
  ],
  [
    [0, 0, 0, 0, 0], 'Rock (swung)'
  ],
  [
    [0, 0, 0, 0, 0], 'Rock (thrown)'
  ],
  [
    [0, 0, 0, 0, 0], 'Dab'
  ]
]
