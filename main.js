let canva = document.getElementById("canva")

let hsize = window.innerWidth * 0.95
let vsize = window.innerHeight * 0.9

canva.width = hsize
canva.height = vsize

let running = 0
let c = canva.getContext("2d")


let money = 0
let personalBest=0
let pbon=0
let amountOfItems = 16
let itemsOwned=[0]
let skinEquiped=-1
let shopButtonsStates = []
let animatedskins=[3, 7, 9, 10, 11, 12, 13, 14]
let animationTimes=[7, 10, 9, "speed", 4, "speed", 10, 10]
let animationFrames=[5, 9, 5, 12, 18, 4, 4, 7]
let specialcolorsskin=[2,4,5,6, 3, 9, 10, 12, 13]
let specialcolors=["green", "yellow", "blue","orange", "purple","rand", "yellow", "brown", "purple"]

for(let i=0; i<amountOfItems; i++){
    shopButtonsStates.push("buy")
    itemsOwned.push(0)
}

let coolParticlesOdds = 0.05
//   1/coolParticlesOdds must be whole
let rng = 0
let gamemode = 2
let skin=3
let overwriteSkin=1
let player2 = 0
let borderDamage = 0
let parameters = 0
let pw = 20
let pwMult = 1.5
let pl = 20
let pa = 40
let qq=10
let wingsLength=pl+2
let stroke1 = 0
let stroke2 = 0
let stroke3 = 1
let players = []
let bots = []
let ammos = []
let bulletSpeedMult = 0.5
let slowdown1 = 1
let bslowdown1 = 0.8
let slowdown2 = 1
let bslowdown2 = 0.8
let recoilMult = 0.2
let bulletsShot1 = 0
let bulletsShot2 = 0
let bw = 10
let barSize1 = pw * 4
let fsa = 3
let op = 0
//^^^^ 1:none, 2:twice as aaccurate
//name, cd, dmg, speed, slowdown(range), 5:playerSlowdown, lifespan(range), ammo size, 8:initial Speed, //dmg falloff, 10:spread, slowdown Time, bullet amount, interval, recoil, aim, penetration

let weapons = [["Spreader", 60 * 0.1, 6, 1, 0.995, 0.95, 60 * 2, 4, 18, 0.4, 5, 60 * 0.1, 1, 0, 0.3, 0, 0, 0],
["Ranger", 60 * 1, 28, 0.9, 0.997, 0.9, 60 * 2.2, 7, 30, 0.18, 1, 60 * 0.2, 1, 0, 0.8, 0, 0, 0],
["Astro-Ray", 60 * 0.04, 2.7, 0.9, 0.999, 0.85, 60 * 2, 3, 20, 0.19, 0, 60 * 0.1, 1, 0, 0.02, 0, 0, 0],
["Shredder", 60 * 0.2, 10, 0.91, 0.997, 0.9, 60 * 2.4, 5, 22, 0.15, 1.8, 60 * 0.1, 1, 0, 0.5, 0, 0, 0],
["Crippler", 60*0.8, 7.5, 0.96, 0.995, 0.9, 60 * 2, 4.5, 21, 0.38, 1, 60 * 0.4, 20, 60*0.14, 0.38, 0, 0, 0],
//5:
["Waster", 60 * 0.5, 24, 0.98, 0.98, 0.95, 60 * 1.5, 5, 30, 0.6, 2, 60 * 0.8, 1, 0, 0.6, 0, 0, 0],
["Blaster", 60 * 0.48, 26.5, 0.92, 0.98, 0.95, 60 * 1.3, 8, 28, 0.99, 1, 60 * 0.8, 1, 0, 0.8, 0, 0, 0],
["Triple shot", 60 * 0.7, 18, 0.88, 0.99, 0.96, 60 * 2, 6, 30, 0.15, 1, 60, 3, 7, 0.3, 0, 0, 0],
["Scraper", 60 * 0.8, 11, 0.9, 0.98, 0.96, 60 * 2.2, 5, 27, 0.3, 4, 60, 5, 5, 0.18, 0, 0, 0],
["Obliterator", 60 * 0.6, 5.3, 0.92, 0.97, 0.96, 60 * 1.5, 6, 25, 0.7, 7, 60, 12, -1, 0.02, 0, 0, 0],
//10:
["Sniper", 60 * 1.4, 9.5, 0.8, 0.998, 0.7, 60 * 2, 7, 36, 0.25, 0.5, 60 * 0.8, 1, 0, 2, 0, 0.97, 0],
["BAS-3C", 60 * 0.6, 2.3, 0.93, 0.987, 0.97, 60 * 1.3, 5, 30, 0.65, 3, 60, 18, -1, 0.03, 0, 0, 0],
["Sprayer", 60 * 0.3, 2, 0.92, 0.98, 0.92, 60 * 1.7, 6, 22, 0.85, 5, 60, 15, -1, 0.02, 0, 0, 0],
["T418", 60*1, 8.5, 0.92, 0.995, 0.92, 60 * 2.2, 5, 24, 0.25, 3.5, 60 * 0.3, 16, 60 * 0.11, 0.4, 0, 0, 0],
["PL100", 60 * 0.08, 4.2, 0.75, 0.995, 0.88, 60 * 2.2, 6, 24, 0.28, 1.5, 60 * 0.2, 1, 0, 0.4, 0, 0, 0],
//15:
["Pinner", 60 * 1.2, 14, 0.98, 0.995, 0.95, 60 * 2, 6, 26, 0.35, 4.2, 60 * 0.4, 10, 60 * 0.18, 0.4, 0, 0, 0],
["Flamethrower", 60 * 0.9, 0.27, 0.92, 0.96, 0.95, 60 * 5, 8, 40, 0.3, 5, 60 * 0.8, 40, 0, 0.12, 0, 0.92, 0],
["Missile laucher", 60 * 0.9, 25.1, 0.9, 1.01, 0.6, 60 * 1.6, 10, 14, 0.4, 3.2, 60 * 0.8, 1, 0, 2.2, 0.012, 0, 0],
["Rocket launcher", 60 * 1.2, 20, 0.9, 1.025, 0.6, 60 * 1.3, 10, 8, 0.3, 3, 60 * 0.8, 1, 0, 1.2, 0.018, 0, 0],
["Grenade Launcher", 60 * 0.8, 0, 0.9, 0.955, 0.75, 60 * 1.1, 10.1, 50, 0.3, 3, 60 * 0.6, 1, 0, 1.5, 0, 1, 24],
    //["none", Infinity,0,1,0,1,0,0,0,0,0,0,0,0,0,0],
    //["Dash", 60*0.9, 58, 1, 0.99, 1, 60*1.2, 8, 15, 0.6, 2, 0, 1, 0, -26, 0, 0],
]
let weapon1 = 0
let weapon2 = 0
let showWeaponNames = 1
let autoFire = 0
let persistOutsideWall = 0
let penetrationSlowness=0.018
let botsForbiddenWeapons=-1

let dmgMult = 2
let regen = 0.01
let mxh = 100
let hp = mxh
let hp2 = mxh
let cdq = true
let cdm = true
let cdq2 = true
let cdm2 = true
let changeCd = 0.3 //in seconds
let textcd = 0

console.log("Press r, press t or select a gamemode to start")
console.log("Press P to change settings")

let controls = 0
let keyorder = ['w', 's', 'd', 'a', ' ', 'r', 'q', 'p', 'e', 't', 'y', 'f','g','h', "Escape"]
let keysPressed = [false, false, false, false, false, false]
//Player 1: q to change weapon, space to shoot, e to change weapon the other way

let keyorder2 = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', 'l', 'm', 'k', '.', 'é']
let keysPressed2 = [false, false, false, false, false, false]

//Player 2: l to change weapon, m or é or period (.) to shoot, k to change weapon the other way
if (controls == 0) {
    keyorder = ['w', 's', 'd', 'a', ' ', 'r', 'q', 'p', 'e', 't', 'y', 'f', 'g','h', "Escape"]
    keysPressed = [false, false, false, false, false, false]

    keyorder2 = ['i', 'k', 'l', 'j', 'o', 'ArrowDown', 'u', '.', 'é']
    keysPressed2 = [false, false, false, false, false, false]
}


let F = 0.99
let horizontalMovement = 0
let verticalMovement = 0
let horizontalMovement2 = 0
let verticalMovement2 = 0
let cd = 0
let cd2 = 0
let vstart = 0
let playersDeadRequired = 1
let player1Alive = 1
let player2Alive = 1

let botOdds = 0.003
botOdds = 0
let rounds = 1
let BotDmgMult = 0.3
let ai = 1
let spawnDistance = Math.min(350, (Math.min(vsize - 30, hsize - 30)))
let regenPerRound = 10
let regenPerKill = 1
let bossF = 0
let botWeapon = -1
//14 for flamethrower
//-1 for random

let particles=[]
let particleVisibility = 0.5
let coolParticles = 1
let coolParticlesColor="purple"
let oldcdtip = 0

let xs1 = []
let ys1=[]
let xs2=[]
let ys2=[]
let xs3=[]
let ys3=[]
let xs4=[]
let ys4=[]

let initialcoordinates=[50, vsize/2]
class LEVEL{
    constructor(Title, Xs, Ys, OP, pro, boss, size, speed, core, Weapons, Regen, horizontal, vertical, regenpk, regenpr, roundsAmount, roundsLengths, dmg, playerWeapons, hps, motherShips, playerSpeed, reward){
        this.xs=Xs
        this.ys=Ys
        this.op = OP
        this.pro = pro
        this.boss=boss
        this.size = size
        this.speed=speed
        this.core=core
        this.regen=Regen
        this.h=horizontal
        this.v=vertical
        this.rpk=regenpk
        this.rpr=regenpr
        this.ra=roundsAmount
        this.dmg=dmg
        this.w=Weapons
        this.rls=roundsLengths
        this.playerWeapons=playerWeapons
        this.title=Title
        this.hps=hps
        this.motherShips=motherShips
        this.playerSpeed=playerSpeed
        this.reward = reward
    }
}

let gotReward = 0
let level = 0
let levels=[]

levels.push(new LEVEL("Weakling",[0.9*hsize], [0.5*vsize], [0], [0], 0, [60], [0.08], [1], [0], 0.04, hsize, vsize, 10, 10, 1, [1], 0.5, [0,1,5], [100], [0,0,0], 0.8, 5))
levels.push(new LEVEL("Mugged",[0.9*hsize, 0.9*hsize, 0.9*hsize], [0.5*vsize, 0.25*vsize, 0.75*vsize], [0,0,0], [0,0,0], 0, [60, 60, 60], [0.08, 0.08, 0.08], [1,1,1], [12,14,13], 0, hsize, vsize, 5, 10, 1, [3], 0.5, [10,11], [100,100,100], [0,0,0], 0.8, 15))
levels.push(new LEVEL("Pirates",[0.9*hsize, 0.9*hsize, 0.9*hsize, 0.9*hsize, 0.9*hsize, 0.9*hsize], [0.2*vsize, 0.5*vsize, 0.8*vsize, 0.2*vsize, 0.5*vsize, 0.8*vsize], [0,0,0, 0 ,0, 0], [0,0,0, 0, 1, 0], 0, [60, 60, 60, 60, 75,60], [0.08, 0.08, 0.08, 0.1, 0.1, 0.1], [1,1,1, 1, 1, 1], [0,17,0, 12, 0, 5], 0, hsize, vsize, 15, 20, 2, [3, 3], 0.3, [17, 18, 19], [100,100,100, 100,150,100], [0,0,0,0,0,0], 1, 60))
levels.push(new LEVEL("Superhero",[0.9*hsize, 0.9*hsize, 0.9*hsize, 0.9*hsize, 0.75*hsize, 0.75*hsize, 0.9*hsize,0.9*hsize, 0.9*hsize, 0.9*hsize], [0.1*vsize, 0.2*vsize, 0.3*vsize, 0.4*vsize, 0.4*vsize, 0.6*vsize, 0.6*vsize, 0.7*vsize, 0.8*vsize, 0.9*vsize], [0,0,0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0,0,0], 0, [60, 60, 60, 60, 60, 60, 60, 60, 60, 60], [0.08, 0.08, 0.08,0.08, 0.08, 0.08,0.08, 0.08, 0.08,0.08], [1,1,1, 1, 1, 1, 1, 1, 1, 1], [0,0,14, 13,15,16,18,3, 4, 6], 0, hsize, vsize, 3, 10, 1, [10], 0.07, [10,11], [100,100,100, 100,100,100, 100, 100, 100, 100], [0,0,0,0,0,0,0,0,0,0], 1, 50))
//5:
levels.push(new LEVEL("Spacestation",[0.9*hsize, 0.9*hsize, 0.9*hsize, 0.9*hsize, 0.5*hsize, 0.9*hsize], [0.2*vsize, 0.5*vsize, 0.8*vsize, 0.2*vsize, 0.5*vsize, 0.8*vsize], [0,0,0, 0 ,0, 0], [0,0,0, 0, 0, 0], 0, [60, 60, 60, 60,90,60], [0.1, 0.1, 0.1, 0.1, 0, 0.1], [1,1,1, 1, 1, 1], [13,13,13, 13, 14, 13], 0, hsize, vsize, 15, 20, 2, [3, 3], 0.46, [13], [100,100,100, 100,100,100], [0,0,0,0,0,0], 0.8, 65))
levels.push(new LEVEL("Hello?",[0.9*hsize], [0.75*vsize], [1], [1], 0, [60], [0.08], [1], [0], 0, hsize, vsize, 5, 10, 1, [1], 2, [16,14], [100], [0,0,0,0,0,0], 0.8, 15))
levels.push(new LEVEL("Duel",[0.9*hsize], [0.35*vsize], [1], [2], 0, [50], [0.12], [1], [0], 0, hsize, vsize, 0, 0, 1, [1], 2, [12, 13, 14, 15], [100], [0,0,0,0,0,0], 1, 15))
levels.push(new LEVEL("A lost battle",[0.9*hsize, 0.9*hsize, 0.9*hsize], [0.2*vsize, 0.35*vsize, 0.8*vsize], [0,0,0], [1,2,1], 0, [60,60,60], [0.08, 0.08, 0.08], [1,1,1, 1, 1], [0,0,0], 0, hsize, vsize, 8, 0, 1, [3], 1.5, [14,15,16, 3], [100,100,100], [0,0,0], 0.8, 60))
levels.push(new LEVEL("The swarm",[0.9*hsize, 0.9*hsize, 0.9*hsize, 0.9*hsize, 0.9*hsize], [0.2*vsize, 0.35*vsize, 0.5*vsize, 0.65*vsize, 0.8*vsize], [0,0,0,0,0], [0,0,1, 0,0], 0, [30, 30, 30, 30, 30], [0.1, 0.1, 0.1, 0.1, 0.1], [1,1,1, 1, 1], [14,3,0,17,7], 0, hsize, vsize, 8, 10, 1, [5], 0.5, [9,11,12], [100,100,100, 100,100], [0,0,0,0,0,0], 1, 65))
//10:
levels.push(new LEVEL("Flash",[0.9*hsize], [0.75*vsize], [1], [1], 0, [60], [0.08], [1], [0], 0, hsize, vsize, 5, 10, 1, [1], 1.2, [2], [200], [0],0.8, 55))
levels.push(new LEVEL("Wanted",[0.9*hsize, 0.95*hsize, 0.9*hsize, 0.95*hsize, 0.95*hsize],[0.2*vsize, 0.35*vsize, 0.5*vsize, 0.65*vsize, 0.8*vsize], [0,0,0, 0, 0], [0,0,1, 0, 0], 0, [60,60,60, 60, 60], [0.1, 0.1, 0.1, 0.1,0.1], [1,1,1, 1, 1], [10,10,0,10,10], 0, hsize, vsize, 5, 0, 1, [5], 0.24, [14,3], [100,100,100, 100,100], [0,0,0,0,0,0], 0.8, 50))
levels.push(new LEVEL("Villains",[0.9*hsize, 0.9*hsize], [0.2*vsize, 0.8*vsize], [0,0], [1,2], 0, [60,60], [0.1, 0.1], [1,1], [0,0], 0, hsize, vsize, 10, 0, 1, [2], 1.4, [4,6], [100,100], [0,0,0], 0.8, 40))
levels.push(new LEVEL("Mercenaries",[0.9*hsize, 0.9*hsize, 0.9*hsize], [0.2*vsize, 0.8*vsize, 0.5*vsize], [1,1, 1], [1,1, 2], 0, [60,60, 60], [0.1, 0.1, 0.1], [1,1, 1], [0,0, 0], 0, hsize, vsize, 5, 10, 2, [2, 1], 1, [4,8], [100,100,100], [0,0,0], 0.8, 50))
levels.push(new LEVEL("Turrets",[0.9*hsize, 0.9*hsize, 0.9*hsize], [0.2*vsize, 0.35*vsize, 0.8*vsize], [0,1,0], [1,2,1], 0, [35,60,35], [0, 0.1,0], [1,1,1], [0,0,0], 0, hsize, vsize, 10, 0, 1, [3], 1.5, [15,16,5], [100,100,100], [0,0,0], 0.8, 100))
//15:
levels.push(new LEVEL("Star Cruiser",[0.9*hsize, 0.9*hsize], [0.2*vsize, 0.8*vsize], [0,0], [1,0], 1, [100,40], [0.1, 0.1], [1,0], [0,14], 0, hsize, vsize, 1, 10, 1, [2], 0.3, [0,1,2], [400,400], [1,0], 0.85, 150))
levels.push(new LEVEL("Glitch",[0.9*hsize], [0.75*vsize], [1], [1], 0, [60], [0.08], [1], [0], 0, hsize, vsize, 5, 10, 1, [1], 0.75, [2], [200], [0,0,0], 0.8, 65))
levels.push(new LEVEL("Lightspeed",[0.9*hsize, 0.9*hsize, 0.9*hsize, 0.9*hsize, 0.75*hsize, 0.75*hsize, 0.9*hsize,0.9*hsize, 0.9*hsize, 0.9*hsize], [0.1*vsize, 0.2*vsize, 0.3*vsize, 0.4*vsize, 0.4*vsize, 0.6*vsize, 0.6*vsize, 0.7*vsize, 0.8*vsize, 0.9*vsize], [0,0,0,0,1,1,0,0,0,0], [0,0,0,1,1,1,1,0,0,0], 0, [50, 60, 60, 60, 60, 60, 60, 60, 60, 50], [0.105, 0.105, 0.105, 0.105, 0.105, 0.105,0.105, 0.105, 0.105,0.105], [1,1,1, 1, 1, 1, 1, 1, 1, 1], [15,1,3, 0,0,0,0, 0, 4, 15], 0, hsize, vsize, 3, 10, 1, [10], 0.09, [10,11], [100,100,100, 150,150,100, 100, 100, 100, 100], [0,0,0,0,0,0,0,0,0,0], 1.12, 55))
levels.push(new LEVEL("Destroyer",[0.9*hsize, 0.9*hsize], [0.4*vsize, 0, 0], [0,0, 0], [0,0, 0], 1, [110,40, 40], [0.1, 0.1, 0.1], [1,0, 0], [14,2,17], 0.015, hsize, vsize, 1, 10, 1, [3], 0.25, [6,7], [600,600, 600], [1,0,0], 0.8, 180))
levels.push(new LEVEL("Toxic Squad",[0.9*hsize, 0.9*hsize, 0.9*hsize,0.9*hsize,], [0.2*vsize,0.4*vsize,0.6*vsize,0.8*vsize], [0, 1, 1, 0], [2, 2, 2, 2], 1, [70,70, 70, 70], [0.08, 0.08, 0.08, 0.08], [1, 1, 1, 1], [0,0,0, 0], 0, hsize, vsize, 8, 25, 1, [4], 0.6, [4, 11], [250, 250, 250, 250], [0,0, 0, 0], 0.9, 140))
levels.push(new LEVEL("The last fleet",[0.9*hsize, 0.9*hsize, 0, 0.9*hsize, 0.9*hsize,0.9*hsize, 0.9*hsize, 0.9*hsize], [0.4*vsize, 0, 0, 0.2*vsize,0.3*vsize,0.5*vsize,0.7*vsize,0.8*vsize], [1,0, 0, 1, 1, 1, 1, 1], [2,0, 0, 1, 1, 2, 1, 1], 1, [120,40, 40, 70, 70, 70, 70, 70], [0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07], [1,0, 0, 1, 1, 1, 1, 1], [14,2,7, 14, 9, 13, 0,0 ], 0, hsize, vsize, 4, 40, 2, [3,5], 0.15, [0,12], [800,400, 400, 150, 150 , 150, 150, 150, 150], [1,0,0, 0,0,0, 0, 0], 0.8, 250))


let slowerRsMinions=["Star Cruiser", "Destroyer","The last fleet"]
let summoners=["Star Cruiser", "Destroyer","The last fleet"]
let halfbossnames=["Star Cruiser", "Destroyer","The last fleet"]
let roundsReset=["Spacestation", "The last fleet"]
let levelsDone=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
let lastGm=2
let lastVar = 0

let tips=["Variables such as your health, your speed or your damage may vary depending on the level",
    "The higher the level, the harder it is",
    "The weapons you can use are restricted in the campaign",
    "If you are stuck, find a better strategy",
    "Some weapons are more useful in certain situations",
    "Stay safe!",
    "You are slower when you shoot",
    "You will go at a different speed depending on the weapon you are using",
    "You get recoil when you shoot",
    "Flamethrowers slow you down",
    "The sniper bullets penetrate ennemies",
    "Some weapons have a limited amount of bullets they can shoot before having to be reloaded",
    "In some levels, eleminating an ennemy ship will grant you a little bit of extra health",
    "Read tips!",
    "The Grenade launcher is an experimental weapon, bugs might occur",
    "You can damage yourself with the Grenade launcher, be careful",
    "The Missile Launcher's bullets and the Rocket Launcher's bullets are self-propelled."
]
start()
Game()

function start() {
    requestAnimationFrame(start)
    if (vstart < 2) { return }
    hsize = window.innerWidth * 0.95
    vsize = window.innerHeight * 0.9
    canva.width = hsize
    canva.height = vsize
    gotReward = 0
    bslowdown1 = 0.9
    bslowdown2 = 0.9
    vstart = 0
    deleteTitle()
    ammos = []
    players = []
    player1Alive = 1
    player2Alive = 1
    bots = []
    spawnDistance = Math.min(hsize/2-120, (Math.min(vsize - 30, hsize - 30)))
    rounds=1
    if (gamemode == 2) {
        players.push(new PLAYER(50, vsize / 2, 0.1, -0.04))
        player2 = 1
        hp = mxh
        hp2 = mxh
    }
    else {
        players.push(new PLAYER(50, vsize / 2, 0.1, -0.04))
        hp = mxh
        hp2 = mxh
        regen = 0
    }
    if (player2 == 1) {
        players.push(new PLAYER2(hsize - 50, vsize / 2, 0.1, -0.04))
    }
    if (bossF == 1) {
        spawnDistance = Math.min(475, (Math.min(vsize - 30, hsize - 30)))
        BotDmgMult = 0.2
    }
    else if(op==1){
        spawnDistance = Math.min(hsize/2-20, (Math.min(vsize - 30, hsize - 30)))
        BotDmgMult = 2
    }
    else {
        BotDmgMult = 0.3
    }
    bulletSpeedMult=0.5
    if(level!=0){
        bslowdown1 = levels[level-1].playerSpeed
        bslowdown2 = levels[level-1].playerSpeed
        regen=levels[level-1].regen
        regenPerKill=levels[level-1].rpk
        regenPerRound=levels[level-1].rpr
        BotDmgMult=levels[level-1].dmg
        bossF=levels[level-1].boss
        rounds=1
        if(levels[level-1].title=="Lightspeed"){
            bulletSpeedMult=0.58
        }
        for(let i =0; i<weapons.length; i++){
            if (weapon1 > weapons.length - 1) {
                weapon1 = 0
            }
            if(levels[level-1].playerWeapons.includes(weapon1)){
                break
            }
            weapon1++
        }
        for(let i =0; i<weapons.length; i++){
            if (weapon2 > weapons.length - 1) {
                weapon2 = 0
            }
            if(levels[level-1].playerWeapons.includes(weapon2)){
                break
            }
            weapon2++
        }
    }
    running = 1
}
function Slowgame(ticks){
    if (running == 1&&rng%ticks==0) {
        if (parameters == 1&&level==0) {
            let speed = document.getElementById("speed").value
            bslowdown1 = speed
            bslowdown2 = speed
            let bullSpeed = document.getElementById("bspeed").value
            bulletSpeedMult = bullSpeed
            let dmge = document.getElementById("dmg").value
            dmgMult = dmge
            let reg = document.getElementById("regen").value
            regen = reg / 100
            let autof = document.getElementById("autoF").value
            autoFire = autof
            recoilMult = document.getElementById("rec").value
            F = document.getElementById("Fri").value
            borderDamage = document.getElementById("BD").value
            BotDmgMult = document.getElementById("botD").value
            playersDeadRequired = document.getElementById("PDR").value
        }
        if(coolParticles==1){
            if(rng%Math.pow(coolParticlesOdds*ticks,-1)==0){
                let green = 0
                let red = 0
                let blue = 0
                let color = 0
                let cpc = coolParticlesColor
                if(coolParticlesColor=="rand1"){
                    if(Math.random()>0.66666){
                        cpc="green"
                    }
                    else if(Math.random()>=0.5){
                        cpc="red"
                    }
                    else{
                        cpc="blue"
                    }
                }
                if(coolParticlesColor=="rand2"){
                    if(Math.random()>=0.25){
                        cpc="white"
                    }
                    else if(Math.random()>0.66666){
                        cpc="green"
                    }
                    else if(Math.random()>=0.5){
                        cpc="red"
                    }
                    else{
                        cpc="blue"
                    }
                }
                if(cpc=="purple"){
                    red = 100+Math.random()*55
                    green=Math.random()*20
                    color = "rgb("+red+", "+green+",180)"
                }
                else if(cpc=="golden"||cpc=="brown"){
                    red = 100+Math.random()*55
                    green=red-40
                    color = "rgb("+red+", "+green+",20)"
                }
                else if(cpc=="red"){
                    red = 120+Math.random()*75
                    green=20
                    color = "rgb("+red+", "+green+",20)"
                }
                else if(cpc=="yellow"){
                    red = 100+Math.random()*55
                    green=red-10
                    color = "rgb("+red+", "+green+",20)"
                }
                else if(cpc=="green"){
                    red = 0
                    green= 100+Math.random()*55
                    color = "rgb("+red+", "+green+",20)"
                }
                else if(cpc=="blue"){
                    red = 30
                    green= 40
                    blue=110+Math.random()*55
                    color = "rgb("+red+", "+green+","+blue+")"
                }
                else if(cpc=="orange"){
                    red = 100+Math.random()*55
                    green= red-100
                    color = "rgb("+red+", "+green+",20)"
                }
                else if(cpc=="white"){
                    red = 200+Math.random()*55
                    green= red
                    blue=red
                    color = "rgb("+red+", "+green+","+blue+")"
                }
                else{
                    red = 100+Math.random()*55
                    green=Math.random()*20
                    color = "rgb("+red+", "+green+",180)"
                }
                let Mx = Math.random()*hsize
                let My = Math.random()*vsize
                let dir = Math.atan((My-vsize/2)/(Mx-hsize/2))+0.5*Math.PI
                if(dir<0){
                    dir = 2*Math.PI+dir
                }
                if (hsize/2 < Mx){
                    dir = dir + Math.PI
                }
                particles.push(new COOLPARTICLE(Mx, My, 4+Math.random()*6, color, 200, dir))
            }
            
        }
    }  
}
function Game() {
    for(let i=0; i<levelsDone.length; i++){
        if(levelsDone[i]==1){
            let levelID = "l"+i
            document.getElementById(levelID).style.color="rgb(90,90,90)"
        }
    }
    if(level==0){
        document.getElementById("restart").style.display="none"
    }
    else{
        document.getElementById("restart").style.display="initial"
    }
    requestAnimationFrame(Game)
    
    if (running == 0) {
        if (vstart == 1) {
            vstart++
        }
        return
    }
    hp = hp + regen
    hp2 = hp2 + regen
    if (hp > mxh) {
        hp = mxh
    }
    if (hp2 > mxh) {
        hp2 = mxh
    }
    if (hp <= 0 && player1Alive == 1) {
        let skip = 0
        hp = 0
        player1Alive = 0
        if (player2 == 1 && gamemode == 1 && player2Alive == 1 && playersDeadRequired == 2) {
            players[0] = undefined
            skip = 1
        }
        if (skip == 0) {
            running = 0
            if (hp2 <= 0) {
                hp2 = 0
                running = 0
                finish(100)
                return
            }
            finish(2)
            return
        }
    }
    if (hp2 <= 0 && player2Alive == 1) {
        let skip = 0
        hp2 = 0
        player2Alive = 0
        if (player2 == 1 && gamemode == 1 && player1Alive == 1 && playersDeadRequired == 2) {
            players.pop()
            skip = 1
        }
        if (skip == 0) {
            running = 0
            if (hp <= 0) {
                hp = 0
                running = 0
                finish(100)
                return
            }
            finish(1)
            return
        }
    }
    cd++
    cd2++
    cdm--
    cdq--
    cdm2--
    cdq2--
    if (cd > weapons[weapon1][11]) {
        slowdown1 = 1
    }
    if (cd2 > weapons[weapon2][11]) {
        slowdown2 = 1
    }
    c.clearRect(0, 0, hsize, vsize)
    rng++
    c.textAlign = "left"
        c.font = "40px Trebuchet MS"
        c.fillStyle = "White"
        c.fillText("hp: " + hp.toFixed(0), 10, 50);
        if (player2 == 1) {
            c.fillText("hp2: " + hp2.toFixed(0), 10, 100);
        }
        if (showWeaponNames == 1) {
            c.textAlign = "right"
            c.fillText("weapon 1: " + weapons[weapon1][0], hsize - 10, 50);
            if (player2 == 1) {
                c.fillText("weapon 2: " + weapons[weapon2][0], hsize - 10, 100);
            }
            else if (bossF == 0) {
                let printRound = rounds - 1
                c.fillText("Round " + printRound, hsize - 10, 100);
            }
            if(pbon==1){
                c.fillText("Personal Best " + personalBest, hsize - 10, 150);
            }
        }
        else if (gamemode == 1) {
            c.textAlign = "right"
            let printRound = rounds - 1
            if (bossF == 0) {
                c.fillText("Round " + printRound, hsize - 10, 100);
            }
        }
    if(particles.length>0){
        particles.forEach((p)=>{p.print();p.move()})
        for(let i =0;i<particles.length;i++){
            let Yparticle = particles[i]
            if(Yparticle.cl>=Yparticle.l){
                particles.splice(i, 1)
            }
        }
    }
    if (autoFire == 1) {
        if (player1Alive) {
            B1()
        }
        if (player2Alive && player2 == 1) {
            B2()
        }
    }
    if (autoFire == 0 && keysPressed[4] == true) {
        if (player1Alive) {
            B1()
        }
    }
    if (keysPressed2[5] == true || keysPressed2[8] == true || keysPressed2[7] == true && autoFire == 0) {
        if (player2Alive && player2 == 1) {
            B2()
        }
    }
    if(level==0||level!=0&&levels[level-1].title!="Toxic Squad"){
        if (ammos.length > 0) {
            ammos.forEach((a) => { a.print(); a.move(); })
            check()
        }    
    }
    if (player2Alive == 1 && player2 == 1) {
        players[1].move()
        players[1].print()
        players[1].printHealth()
    }
    if (player1Alive == 1) {
        players[0].move()
        players[0].print()
        players[0].printHealth()
    }
    
    check2()
    //
    if (cd > weapons[weapon1][1]) {
        bulletsShot1=0
    }
    if (cd2 > weapons[weapon2][1]) {
        bulletsShot2=0
    }
    //
    //
    let clevel=levels[level-1]
    let ra =100
    if(level!=0){
        ra = clevel.ra
    }
    if (gamemode == 1) {
        if(level!=0&&levels[level-1].boss==0){
            bossF=0
        }
        if(bots.length==0&&level!=0&&rounds<ra+1){
            rounds++
            //campaign
            let firsti =0
            if(rounds>2){
                if(roundsReset.includes(levels[level-1].title)==true){
                    players[0].x=initialcoordinates[0]
                    players[0].y=initialcoordinates[1]
                    players[0].dir=0.5*Math.PI
                    ammos = []
                }
                firsti=clevel.rls[rounds-3]
                hp=hp+clevel.rpr
            }
            if(firsti==0){
                let letters = clevel.title.length
                particles.push(new TEXTPARTICLE(hsize/2,vsize/2, 40, letters*40,"white", 200, clevel.title, 1))
            }
            for(let i=firsti; i<clevel.rls[rounds-2]+firsti; i++){
                createBot2(clevel.core[i], clevel.speed[i], clevel.size[i], clevel.xs[i], clevel.ys[i], clevel.pro[i], clevel.op[i], clevel.w[i], clevel.hps[i], clevel.motherShips[i], 0, 0, 1.5*Math.PI)
            }
        }
        else if(rounds>=ra+1&&bots.length==0&&level!=0&&gotReward == 0){
            gotReward = 1
            money=money+levels[level-1].reward
            levelsDone[level]=1
            store()
            document.getElementById("canvaShenanigan").style.display="none"
            document.getElementById("campaignMenu").style.display="initial"
        }
        else{
            if (bossF == 0) {
                if(level==0){
                    if(op==1){
                        if (bots.length == 0 && botOdds == 0) {
                            for (let i = 0; i < rounds+1; i++) {
                                createBot(1, 0.1)
                            }
                            rounds++
                            hp = hp + regenPerRound
                            if (hp > mxh) {
                                hp = mxh
                            }
                        }
                    }
                    else{
                        if (bots.length == 0 && botOdds == 0) {
                            for (let i = 0; i < rounds; i++) {
                                createBot(1, 0.05)
                            }
                            rounds++
                            hp = hp + regenPerRound
                            if (hp > mxh) {
                                hp = mxh
                            }
                        }
                    }
                    if (Math.random() > 1 - botOdds) {
                        createBot(1, 0.05)
                    }
                }
            }
            else {
                if (bots.length < 1) {
                    createBot(1, 0.07)
                    for (let i = 0; i < 4; i++) {
                        createBot(0, 0.07)
                    }
                }
            }
        }
        if(level!=0&&levels[level-1].title=="Toxic Squad"){
            if (ammos.length > 0) {
                ammos.forEach((a) => { a.print(); a.move(); })
                check()
            }
        }
        bots.forEach((b) => { b.move(); b.print(); b.printHealth(); b.shoot() })
        Slowgame(10)
        check3()
        if (bots.length >= 2) {
            check4()
        }
        checkDeadBots()
        if(level!=0&&Math.random()>0.998&&oldcdtip<rng){
            let tip = tips[Math.floor(Math.random()*(tips.length-1))]
            oldcdtip=rng+360
            particles.push(new TEXTPARTICLE(hsize/2,vsize*0.95, 15, (tip.length+5)*15,"rgb(131, 28, 154)", 360, "tip: "+tip, 2))
        }
    }
}
function createBot2(core, speed, size, x, y, Pro, OP, weapon, hp, ms, dx, dy, dir) {
    let Msize = size
    let Mx = x
    let My = y
    let Mmaster = 0
    let pro = Pro
    let aim1 = Math.ceil(Math.random() * 2)
    let mop=OP
    if (core == 1&&ms==1) {
        Mmaster = 1
    }
    let mweapon = weapon
    if (mweapon == -1) {
        mweapon = Math.floor(Math.random() * (weapons.length +botsForbiddenWeapons))
    }
    bots.push(new BOT(Mx, My, speed, mweapon, Msize, aim1, core, Mmaster, pro, mop, hp, dx, dy, dir))
}
function createBot(core, speed) {
    let Msize = 60
    let Mx = Msize + Math.random() * (hsize - Msize * 2)
    let My = Msize + Math.random() * (vsize - 2 * Msize)
    let Mmaster = 0
    let pro = 0
    let aim1 = Math.ceil(Math.random() * 2)
    let mop=0
    if(op==1){
        mop=1
    }
    if(Math.random()>0.95){
        pro = 1
        aim1 = 2

    }
    if(Math.random()>0.96){
        pro = 2
        aim1 = 2
    }
    if (core == 1 && bots.length == 0 &&bossF==1) {
        Mmaster = 1
    }
    if (player1Alive == 1) {
        for (let i = 0; i < 1000000; i++) {
            let dtop = Math.sqrt(Math.pow(Mx - players[0].x, 2) + Math.pow(My - players[0].y, 2))
            let s1 = Mmaster == 1 && Math.abs(vsize / 2 - My) > 150
            let s2 = dtop > spawnDistance
            let s3 = Mmaster == 0
            if (s2 == true && s1 == true || s2 == true && s3 == true) {
                break
            }
            else {
                Mx = Msize + Math.random() * (hsize - Msize * 2)
                My = Msize + Math.random() * (vsize - 2 * Msize)
            }
        }
    }
    let mweapon = botWeapon
    if (mweapon == -1) {
        mweapon = Math.floor(Math.random() * (weapons.length + botsForbiddenWeapons))
    }
    
    bots.push(new BOT(Mx, My, speed, mweapon, Msize, aim1, core, Mmaster, pro, mop, 100, 0,0,1.5*Math.PI))
}
function check4() {
    //bots collision (sometimes buggy)

    for (let i = 0; i < bots.length; i++) {
        if(bots[i].c==1&&bots[i].m==0){
            for (let p = 0; p < bots.length; p++) {
                if(bots[p].c==1&&bots[p].m==0){
                    if(level==0||bots[i].size==60&&bots[p].size==60||levels[level-1].title!="Spacestation"){
                        if (i != p) {
                            let Ibot = bots[i]
                            let Pbot = bots[p]
                            let dist = Math.sqrt(Math.pow(Pbot.y - Ibot.y, 2) + Math.pow(Pbot.x - Ibot.x, 2))
                            let dirToIbot = Math.atan((Ibot.y - Pbot.y) / (Ibot.x - Pbot.x)) + 0.5 * Math.PI
                            if (Pbot.x < Ibot.x) {
                                dirToIbot = dirToIbot + Math.PI
                            }
                            if (dist < Ibot.size / 2 + Pbot.size / 2) {
                                Ibot.x = Pbot.x - Math.sin(dirToIbot) * (Ibot.size + 2)
                                Ibot.y = Pbot.y + Math.cos(dirToIbot) * (Ibot.size + 2)
                                Ibot.dx = Ibot.dx * Math.sin(dirToIbot) *0.5
                                Ibot.dy = Ibot.dy * Math.cos(dirToIbot) *0.5
                            }
                        }
                    }
                }
            }
        }
    }
}
function checkDeadBots() {
    if(rng%3!=0){
        return
    }
    for (let i = 0; i < bots.length; i++) {
        let Ybot = bots[i]
        if (Ybot.hp <= 0) {
            hp = hp + regenPerKill
            if (hp > mxh) {
                hp = mxh
            }
            bots.splice(i, 1)
            if(gamemode==1&&player2==0&&level==0){
                money = money+10+Ybot.pro*5+Ybot.op*5
            }
        }
    }
}
function check3() {
    for (let i = 0; i < bots.length; i++) {
        let Yplayer = bots[i]
        let www = Yplayer.size / 2
        if (Yplayer.x + www > hsize) {
            Yplayer.x = hsize - www - 1
            Yplayer.dx = 0 - Yplayer.dx
        }
        if (Yplayer.x - www < 0) {
            Yplayer.x = www + 1
            Yplayer.dx = 0 - Yplayer.dx
        }
        if (Yplayer.y + www > vsize) {
            Yplayer.y = vsize - 1 - www
            Yplayer.dy = 0 - Math.abs(Yplayer.dy)
        }
        if (Yplayer.y - www < 0) {
            Yplayer.y = www + 1
            Yplayer.dy = 0 - Yplayer.dy
        }
    }
}
function check2() {
    for (let i = 0; i < players.length; i++) {
        if (i == 0 && player1Alive == 1 || i == 1 && player2Alive == 1) {
            let Yplayer = players[i]
            //||Yplayer.x+(Math.sin(Yplayer.dir)*pl)+pw>hsize||Yplayer.x+(Math.sin(Yplayer.dir)*pl)-pw<0
            if (Yplayer.x + pw > hsize) {
                Yplayer.x = hsize - pw - 1
                Yplayer.dx = 0 - Yplayer.dx
                if (i == 0) {
                    hp = hp - borderDamage
                }
                else {
                    hp2 = hp2 - borderDamage
                }
            }
            if (Yplayer.x - pw < 0) {
                Yplayer.x = pw + 1
                Yplayer.dx = 0 - Yplayer.dx
                if (i == 0) {
                    hp = hp - borderDamage
                }
                else {
                    hp2 = hp2 - borderDamage
                }
            }
            //Yplayer.y+(Math.cos(Yplayer.dir)*pl)>vsize||
            if (Yplayer.y + pw > vsize) {
                Yplayer.y = vsize - 1 - pw
                Yplayer.dy = 0 - Yplayer.dy
                if (i == 0) {
                    hp = hp - borderDamage
                }
                else {
                    hp2 = hp2 - borderDamage
                }
            }
            //Yplayer.y+(Math.cos(Yplayer.dir)*pl)-pw<0||
            if (Yplayer.y - pw < 0) {
                Yplayer.y = pw + 1
                Yplayer.dy = 0 - Yplayer.dy
                if (i == 0) {
                    hp = hp - borderDamage
                }
                else {
                    hp2 = hp2 - borderDamage
                }
            }
        }
    }
}
function finish(w) {
    if (gamemode == 1) {
        c.clearRect(0, 0, hsize, vsize)
        let mimg = document.getElementById("youdied")
        let width = 800
        let height = 16/91*width
        c.drawImage(mimg, hsize/2- width/2,vsize/2-height/2, width, height)
        if(pbon==1){
            let kills = 0
            for(let i=0;i<rounds-1; i++){
                kills=kills+i
            }
            kills=kills+(rounds-bots.length)
            personalBest=Math.max(personalBest, kills)
            c.textAlign="center"
            c.fontStyle="40px trebuchetMS"
            c.fillStyle="purple" 
            c.fillText("Personal Best: " + personalBest, hsize/2, 50);
            c.fillText("Score: " + kills, hsize/2, 100);
        }
        if(ostore==1){
            store()
        }
        return
    }
    if(ostore==1){
        store()
    }
    c.textAlign = "left"
    if (w == 100) {
        c.clearRect(0, 0, hsize, vsize)
        c.fillText("hp: " + hp.toFixed(0), 10, 50);
        c.fillText("hp2: " + hp2.toFixed(0), 10, 100);
        c.textAlign = "center"
        c.font = "80px Trebuchet MS"
        c.fillStyle = "White"
        c.fillText("Tie", hsize / 2, vsize / 2)
        return
    }
    c.clearRect(0, 0, hsize, vsize)
    c.fillText("hp: " + hp.toFixed(0), 10, 50);
    c.fillText("hp2: " + hp2.toFixed(0), 10, 100);
    c.textAlign = "center"
    c.font = "80px Trebuchet MS"
    c.fillStyle = "White"
    c.fillText("player " + w + " won", hsize / 2, vsize / 2)
}
function check() {
    for (let i = 0; i < ammos.length; i++) {
        let thou = ammos[i]
        let runScript = 1
        if (Math.abs(hsize / 2 - thou.x) > hsize / 2 + thou.r) {
            if(thou.pAmount!=0){
                thou.grenade(i)
                ammos.splice(i,1)
                runScript = 0
            }
            else if (thou.d == 0 || persistOutsideWall == 0) {
                ammos.splice(i, 1)
                runScript = 0
            }
        }
        if (Math.abs(vsize / 2 - thou.y) > vsize / 2 + thou.r) {
            if(thou.pAmount!=0){
                thou.grenade(i)
                ammos.splice(i,1)
                runScript = 0
            }
            else if (thou.d == 0 || persistOutsideWall == 0) {
                ammos.splice(i, 1)
                runScript = 0
            }
        }
        if (thou.clife > thou.life) {
            if(thou.pAmount!=0){
                thou.grenade(i)
                ammos.splice(i,1)
                runScript = 0
            }
            else if (thou.d == 0 || persistOutsideWall == 0) {
                ammos.splice(i, 1)
                runScript = 0
            }
        }
        if(runScript == 1){
            if(thou.selfpropelled==1){
                createAmmoParticles(i)
            }
            if(thou.p=="all"){
                let Mult1 = BotDmgMult
                if(player2==1&&bossF==0){
                    Mult1=dmgMult
                }
                if(player2Alive==1&&player2==1){
                    let Yplayer = players[1]
                    let distance = Math.sqrt(Math.pow(Yplayer.x - thou.x, 2) + Math.pow(Yplayer.y - thou.y, 2))
                    let distance2 = Math.sqrt(Math.pow(Yplayer.x + (Math.sin(Yplayer.dir) * pl) - thou.x, 2) + Math.pow(Yplayer.y - (Math.cos(Yplayer.dir) * pl) - thou.y, 2))
                    if (distance < thou.r + pw || distance2 < thou.r + pw) {
                        hp2 = hp2 - thou.dmg * Mult1
                        if (thou.d == 0) {
                            ammos.splice(i, 1)
                        }
                        else {
                            thou.idmg = thou.idmg * thou.d
                            thou.vel = thou.vel * Math.pow(thou.d, 2)
                            Yplayer.dx=Yplayer.dx-penetrationSlowness* Yplayer.dx*(1-thou.d)
                            Yplayer.dy=Yplayer.dy-penetrationSlowness* Yplayer.dy*(1-thou.d)
                            if(thou.pAmount!=0){
                                thou.grenade(i)
                                ammos.splice(i,1)
                            }
                            else if (thou.idmg < 0.005) {
                                ammos.splice(i, 1)
                            }
                        }
                    }
                }
                if(player1Alive==1){
                    let Yplayer = players[0]
                    let distance = Math.sqrt(Math.pow(Yplayer.x - thou.x, 2) + Math.pow(Yplayer.y - thou.y, 2))
                    let distance2 = Math.sqrt(Math.pow(Yplayer.x + (Math.sin(Yplayer.dir) * pl) - thou.x, 2) + Math.pow(Yplayer.y - (Math.cos(Yplayer.dir) * pl) - thou.y, 2))
                    if (distance < thou.r + pw || distance2 < thou.r + pw) {
                        hp = hp - thou.dmg * Mult1
                        if (thou.d == 0) {
                            ammos.splice(i, 1)
                        }
                        else {
                            thou.idmg = thou.idmg * thou.d
                            thou.vel = thou.vel * Math.pow(thou.d, 2)
                            Yplayer.dx=Yplayer.dx-penetrationSlowness* Yplayer.dx*(1-thou.d)
                            Yplayer.dy=Yplayer.dy-penetrationSlowness* Yplayer.dy*(1-thou.d)
                            if(thou.pAmount!=0){
                                thou.grenade(i)
                                ammos.splice(i,1)
                            }
                            else if (thou.idmg < 0.005) {
                                ammos.splice(i, 1)
                            }
                        }
                    }   
                }
                if(bots.length>0){
                    for (let p = 0; p < bots.length; p++) {
                        let Ybot = bots[p]
                        let distance = Math.sqrt(Math.pow(Ybot.x - thou.x, 2) + Math.pow(Ybot.y - thou.y, 2))
                        if (distance < thou.r + Ybot.size / 2) {
                            Ybot.hp = Ybot.hp - thou.dmg * dmgMult
                            if (thou.d == 0) {
                                ammos.splice(i, 1)
                            }
                            else {
                                thou.idmg = thou.idmg * thou.d
                                thou.vel = thou.vel * Math.pow(thou.d, 2)
                                Ybot.dx=Ybot.dx-penetrationSlowness* Ybot.dx*(1-thou.d)
                                Ybot.dy=Ybot.dy-penetrationSlowness* Ybot.dy*(1-thou.d)
                                if(thou.pAmount!=0){
                                    thou.grenade(i)
                                    ammos.splice(i,1)
                                }
                                else if (thou.idmg < 0.005) {
                                    ammos.splice(i, 1)
                                }
                            }
                        }
                    }
                }
            }
            else if (thou.p == 1) {
                if (gamemode == 1) {
                    for (let p = 0; p < bots.length; p++) {
                        let Ybot = bots[p]
                        let distance = Math.sqrt(Math.pow(Ybot.x - thou.x, 2) + Math.pow(Ybot.y - thou.y, 2))
                        if (distance < thou.r + Ybot.size / 2) {
                            Ybot.hp = Ybot.hp - thou.dmg * dmgMult
                            if (thou.d == 0) {
                                ammos.splice(i, 1)
                                break
                            }
                            else {
                                if(thou.pAmount!=0){
                                    thou.grenade(i)
                                    ammos.splice(i,1)
                                    break
                                }
                                thou.idmg = thou.idmg * thou.d
                                thou.vel = thou.vel * Math.pow(thou.d, 2)
                                Ybot.dx=Ybot.dx-penetrationSlowness* Ybot.dx*(1-thou.d)
                                Ybot.dy=Ybot.dy-penetrationSlowness* Ybot.dy*(1-thou.d)
                                if (thou.idmg < 0.005) {
                                    ammos.splice(i, 1)
                                    break
                                }
                            }
                        }
                    }
                }
                else {
                    if (player2Alive == 1) {
                        let Yplayer = players[1]
                        let distance = Math.sqrt(Math.pow(Yplayer.x - thou.x, 2) + Math.pow(Yplayer.y - thou.y, 2))
                        let distance2 = Math.sqrt(Math.pow(Yplayer.x + (Math.sin(Yplayer.dir) * pl) - thou.x, 2) + Math.pow(Yplayer.y - (Math.cos(Yplayer.dir) * pl) - thou.y, 2))
                        if (distance < thou.r + pw || distance2 < thou.r + pw) {
                            hp2 = hp2 - thou.dmg * dmgMult
                            if (thou.d == 0) {
                                ammos.splice(i, 1)
                                break
                            }
                            else {
                                thou.idmg = thou.idmg * thou.d
                                thou.vel = thou.vel * Math.pow(thou.d, 2)
                                Yplayer.dx=Yplayer.dx-penetrationSlowness* Yplayer.dx*(1-thou.d)
                                Yplayer.dy=Yplayer.dy-penetrationSlowness* Yplayer.dy*(1-thou.d)
                                if(thou.pAmount!=0){
                                    thou.grenade(i)
                                    ammos.splice(i,1)
                                    break
                                }
                                else if (thou.idmg < 0.005) {
                                    ammos.splice(i, 1)
                                    break
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (thou.p == 2 && gamemode == 1) {
                    for (let p = 0; p < bots.length; p++) {
                        let Ybot = bots[p]
                        let distance = Math.sqrt(Math.pow(Ybot.x - thou.x, 2) + Math.pow(Ybot.y - thou.y, 2))
                        if (distance < thou.r + Ybot.size / 2) {
                            Ybot.hp = Ybot.hp - thou.dmg * dmgMult
                            if (thou.d == 0) {
                                ammos.splice(i, 1)
                                break
                            }
                            else {
                                if(thou.pAmount!=0){
                                    thou.grenade(i)
                                    ammos.splice(i,1)
                                    break
                                }
                                thou.idmg = thou.idmg * thou.d
                                thou.vel = thou.vel * Math.pow(thou.d, 2)
                                Ybot.dx=Ybot.dx-penetrationSlowness* Ybot.dx*(1-thou.d)
                                Ybot.dy=Ybot.dy-penetrationSlowness* Ybot.dy*(1-thou.d)
                                if (thou.idmg < 0.005) {
                                    ammos.splice(i, 1)
                                    break
                                }
                            }
                        }
                    }
                }
                if (gamemode == 1 && player1Alive == 1) {
                    let Yplayer = players[0]
                    let distance = Math.sqrt(Math.pow(Yplayer.x - thou.x, 2) + Math.pow(Yplayer.y - thou.y, 2))
                    let distance2 = Math.sqrt(Math.pow(Yplayer.x + (Math.sin(Yplayer.dir) * pl) - thou.x, 2) + Math.pow(Yplayer.y - (Math.cos(Yplayer.dir) * pl) - thou.y, 2))
                    if (distance < thou.r + pw || distance2 < thou.r + pw) {
                        hp = hp - thou.dmg * BotDmgMult
                        if (thou.d == 0) {
                            ammos.splice(i, 1)
                            break
                        }
                        else {
                            if(thou.pAmount!=0){
                                thou.grenade(i)
                                ammos.splice(i,1)
                                break
                            }
                            thou.idmg = thou.idmg * thou.d
                            thou.vel = thou.vel * Math.pow(thou.d, 2)
                            Yplayer.dx=Yplayer.dx-penetrationSlowness* Yplayer.dx*(1-thou.d)
                            Yplayer.dy=Yplayer.dy-penetrationSlowness* Yplayer.dy*(1-thou.d)
                            if (thou.idmg < 0.005) {
                                ammos.splice(i, 1)
                                break
                            }
                        }
                    }
                }
                else if (player1Alive == 1) {
                    let Yplayer = players[0]
                    let distance = Math.sqrt(Math.pow(Yplayer.x - thou.x, 2) + Math.pow(Yplayer.y - thou.y, 2))
                    let distance2 = Math.sqrt(Math.pow(Yplayer.x + (Math.sin(Yplayer.dir) * pl) - thou.x, 2) + Math.pow(Yplayer.y - (Math.cos(Yplayer.dir) * pl) - thou.y, 2))
                    if (distance < thou.r + pw || distance2 < thou.r + pw) {
                        hp = hp - thou.dmg * dmgMult
                        if (thou.d == 0) {
                            ammos.splice(i, 1)
                            break
                        }
                        else {
                            if(thou.pAmount!=0){
                                thou.grenade(i)
                                ammos.splice(i,1)
                                break
                            }
                            thou.idmg = thou.idmg * thou.d
                            thou.vel = thou.vel * Math.pow(thou.d, 2)
                            Yplayer.dx=Yplayer.dx-penetrationSlowness* Yplayer.dx*(1-thou.d)
                            Yplayer.dy=Yplayer.dy-penetrationSlowness* Yplayer.dy*(1-thou.d)
                            if (thou.idmg < 0.005) {
                                ammos.splice(i, 1)
                                break
                            }
                        }
                    }
                }
                if (thou.p != 2 && player2 == 1 && player2Alive == 1) {
                    let Yplayer = players[1]
                    let distance = Math.sqrt(Math.pow(Yplayer.x - thou.x, 2) + Math.pow(Yplayer.y - thou.y, 2))
                    let distance2 = Math.sqrt(Math.pow(Yplayer.x + (Math.sin(Yplayer.dir) * pl) - thou.x, 2) + Math.pow(Yplayer.y - (Math.cos(Yplayer.dir) * pl) - thou.y, 2))
                    if (distance < thou.r + pw || distance2 < thou.r + pw) {
                        hp2 = hp2 - thou.dmg * BotDmgMult
                        if (thou.d == 0) {
                            ammos.splice(i, 1)
                            break
                        }
                        else {
                            if(thou.pAmount!=0){
                                thou.grenade(i)
                                ammos.splice(i,1)
                                break
                            }
                            thou.idmg = thou.idmg * thou.d
                            thou.vel = thou.vel * Math.pow(thou.d, 2)
                            Yplayer.dx=Yplayer.dx-penetrationSlowness* Yplayer.dx*(1-thou.d)
                            Yplayer.dy=Yplayer.dy-penetrationSlowness* Yplayer.dy*(1-thou.d)
                            if (thou.idmg < 0.005) {
                                ammos.splice(i, 1)
                                break
                            }
                        }
                    }
                }
            }
        }
    }
}
onkeydown = onkeyup = function (e) {
    let n = keyorder.indexOf(e.key)
    keysPressed[n] = (e.type == 'keydown')
    if (keysPressed[0] == true) {
        verticalMovement = 1
    }
    else if (keysPressed[1] == true) {
        verticalMovement = -0.5
    }
    else {
        verticalMovement = 0
    }
    if (keysPressed[2] == true) {
        horizontalMovement = -1
    }
    else if (keysPressed[3] == true) {
        horizontalMovement = 1
    }
    else {
        horizontalMovement = 0
    }
    let n2 = keyorder2.indexOf(e.key)
    keysPressed2[n2] = (e.type == 'keydown')
    if (keysPressed2[0] == true) {
        verticalMovement2 = 1
    }
    else if (keysPressed2[1] == true) {
        verticalMovement2 = -0.5
    }
    else {
        verticalMovement2 = 0
    }
    if (keysPressed2[2] == true) {
        horizontalMovement2 = -1
    }
    else if (keysPressed2[3] == true) {
        horizontalMovement2 = 1
    }
    else {
        horizontalMovement2 = 0
    }
    if (keysPressed2[4] == true && cdm < 1) {
        cdm = 60 * changeCd
        if(level==0){
            weapon2++
            if (weapon2 > weapons.length - 1) {
                weapon2 = 0
            }
        }
        else{
            for(let i =0; i<weapons.length; i++){
                weapon2++
                if (weapon2 > weapons.length - 1) {
                    weapon2 = 0
                }
                if(levels[level-1].playerWeapons.includes(weapon2)){
                    break
                }
            }
        }
    }
    if (keysPressed[12] == true) {
        toggleStart(2)
    }
    if (keysPressed[5] == true) {
        toggleStart(lastGm, lastVar)
    }
    if (keysPressed[6] == true && cdq < 1) {
        cdq = 60 * 0.2
        if(level==0){
            weapon1++
            if (weapon1 > weapons.length-1) {
                weapon1 = 0
            }
        }
        else{
            for(let i =0; i<weapons.length; i++){
                weapon1++
                if (weapon1 > weapons.length - 1) {
                    weapon1 = 0
                }
                if(levels[level-1].playerWeapons.includes(weapon1)){
                    break
                }
            }
        }
    }
    if (keysPressed[8] == true && cdq2 < 1) {
        cdq = 60 * changeCd
        if(level==0){
            weapon1--
            if (weapon1 < 0) {
                weapon1 = weapons.length - 1
            }
        }
        else{
            for(let i =0; i<weapons.length; i++){
                weapon1--
                if (weapon1 < 0) {
                    weapon1 = weapons.length - 1
                }
                if(levels[level-1].playerWeapons.includes(weapon1)){
                    break
                }
            }
        }
    }
    if (keysPressed[7] == true) {
        let e = document.getElementById("parameters")
        if (e.style.display == 'none') {
            parameters = 1
            e.style.display = 'initial'
        }
        else {
            parameters = 0
            e.style.display = "none"
        }
    }
    if (keysPressed2[6] == true && cdm2 < 1) {
        cdm2 = 60 * changeCd
        if(level==0){
            weapon2--
            if (weapon2 < 0) {
                weapon2 = weapons.length - 1
            }
        }
        else{
            for(let i =0; i<weapons.length; i++){
                weapon2--
            if (weapon2 < 0) {
                weapon2 = weapons.length - 1
            }
                if(levels[level-1].playerWeapons.includes(weapon2)){
                    break
                }
            }
        }
    }
    if (keysPressed[9] == true) {
        toggleStart(1)
    }
    if (keysPressed[10] == true) {
        toggleStart(1, 2)
    }
    if (keysPressed[11] == true) {
        toggleStart(1, 1)
    }
    if (keysPressed[12] == true) {
        toggleStart(1, 3)
    }
    if (keysPressed[14] == true) {
        smallScreen()
    }
}
function toggleStart(gm, variation) {
    bulletsShot1=0
    bulletsShot2=0
    gamemode = gm
    coolParticlesColor="purple"
    autoFire=0
    op=0
    if (gm == 1 && variation == 1) {
        player2 = 0
        bossF = 1
        regenPerKill = 4
    }
    else if (variation == 1) {
        bossF = 0
        player2 = 1
    }
    else if (variation == 2 && gm == 1) {
        player2 = 1
        bossF = 1
    }
    else if(gm==1){
        player2 = 0
        bossF = 0
        regenPerKill = 1
        rounds=1
    }
    if(gm==2){
        coolParticlesColor="golden"
        autoFire=1
    }
    if(gm==1&&variation==3){
        player2=0
        rounds=1
        op=1
        bossF=0
    }
    if(gm!=1||variation!=4){
        level=0
    }
    pbon=0
    if(gm==1&&variation==0){
        pbon=1
    }
    document.getElementById("welcome").style.display = "none"
    document.getElementById("campaignMenu").style.display = "none"
    document.getElementById("canvaShenanigan").style.display = "initial"
    running = 0
    lastGm=gm
    lastVar=variation 
    vstart = 1
    let es=skinEquiped
    es=es-0
    if(specialcolorsskin.includes(es)==true){
        coolParticlesColor=specialcolors[specialcolorsskin.indexOf(es)]
    }
}
//name, cd, dmg, speed, slowdown, playerSlowdown, lifespan(range), bullet size, initial Speed, dmg falloff, spread, bullet amount, interval, recoil, aimbot
function B1() {
    if (cd > weapons[weapon1][13] && bulletsShot1 < weapons[weapon1][12] && bulletsShot1 > 0) {
        bulletsShot1++
        cd = 0
        ammos.push(new AMMO(players[0].x + (Math.sin(players[0].dir) * pl), players[0].y - (Math.cos(players[0].dir) * pl), players[0].dir, weapons[weapon1][7], 10, "red", weapons[weapon1][8], weapons[weapon1][6], weapons[weapon1][9], weapons[weapon1][4], weapons[weapon1][10], weapons[weapon1][2], 1, weapons[weapon1][15], weapons[weapon1][16], weapons[weapon1][17]))
        return
    }
    else if (bulletsShot1 >= weapons[weapon1][12]) {
        bulletsShot1 = 0
    }
    if (cd > weapons[weapon1][1]) {
        let spread = weapons[weapon1][10]
        if (cd > 2 * weapons[weapon1][1] && weapons[weapon1][13] != -1) {
            spread = spread / fsa
        }
        bulletsShot1 = 1
        cd = 0
        slowdown1 = weapons[weapon1][5]
        if (weapons[weapon1][13] == -1) {
            for (let i = 0; i < weapons[weapon1][12]; i++) {
                ammos.push(new AMMO(players[0].x + (Math.sin(players[0].dir) * pl), players[0].y - (Math.cos(players[0].dir) * pl), players[0].dir, weapons[weapon1][7], 10, "red", weapons[weapon1][8], weapons[weapon1][6], weapons[weapon1][9], weapons[weapon1][4], spread, weapons[weapon1][2], 1, weapons[weapon1][15], weapons[weapon1][16], weapons[weapon1][17]))
            }
            bulletsShot1 = weapons[weapon1][12]
        }
        else {
            ammos.push(new AMMO(players[0].x + (Math.sin(players[0].dir) * pl), players[0].y - (Math.cos(players[0].dir) * pl), players[0].dir, weapons[weapon1][7], 10, "red", weapons[weapon1][8], weapons[weapon1][6], weapons[weapon1][9], weapons[weapon1][4], spread, weapons[weapon1][2], 1, weapons[weapon1][15], weapons[weapon1][16], weapons[weapon1][17]))
        }
        return
    }
}
function B2() {
    if (cd2 > weapons[weapon2][13] && bulletsShot2 < weapons[weapon2][12] && bulletsShot2 > 0) {
        bulletsShot2++
        cd2 = 0
        ammos.push(new AMMO(players[1].x + (Math.sin(players[1].dir) * pl), players[1].y - (Math.cos(players[1].dir) * pl), players[1].dir, weapons[weapon2][7], 10, "red", weapons[weapon2][8], weapons[weapon2][6], weapons[weapon2][9], weapons[weapon2][4], weapons[weapon2][10], weapons[weapon2][2], 2, weapons[weapon2][15], weapons[weapon2][16], weapons[weapon2][17]))
        return
    }
    else if (bulletsShot2 >= weapons[weapon2][12]) {
        bulletsShot2 = 0
    }
    if (cd2 > weapons[weapon2][1]) {
        let spread = weapons[weapon2][10]
        if (cd2 > 2 * weapons[weapon2][1] && weapons[weapon2][13] != -1) {
            spread = spread / fsa
        }
        bulletsShot2 = 1
        cd2 = 0
        slowdown2 = weapons[weapon2][5]
        if (weapons[weapon2][13] == -1) {
            for (let i = 0; i < weapons[weapon2][12]; i++) {
                ammos.push(new AMMO(players[1].x + (Math.sin(players[1].dir) * pl), players[1].y - (Math.cos(players[1].dir) * pl), players[1].dir, weapons[weapon2][7], 10, "red", weapons[weapon2][8], weapons[weapon2][6], weapons[weapon2][9], weapons[weapon2][4], spread, weapons[weapon2][2], 2, weapons[weapon2][15], weapons[weapon2][16], weapons[weapon2][17]))
            }
            bulletsShot2 = weapons[weapon2][12]
        }
        else {
            ammos.push(new AMMO(players[1].x + (Math.sin(players[1].dir) * pl), players[1].y - (Math.cos(players[1].dir) * pl), players[1].dir, weapons[weapon2][7], 10, "red", weapons[weapon2][8], weapons[weapon2][6], weapons[weapon2][9], weapons[weapon2][4], spread, weapons[weapon2][2], 2, weapons[weapon2][15], weapons[weapon2][16], weapons[weapon2][17]))
        }
        return
    }
}
function WeaponSmith() {
    document.getElementById("welcome").style.display = "none"
    document.getElementById("weaponMenu").style.display = "initial"
}
function exit() {
    if(returntomenustore==1){
        store()
    }
    document.getElementById("welcome").style.display = "initial"
    document.getElementById("canvaShenanigan").style.display = "none"
    document.getElementById("campaignMenu").style.display="none"
    document.getElementById("shopMenu").style.display="none"
    level=0
    rounds=0
}
function smallScreen(){
    let hsize = window.innerWidth * 0.95
    let vsize = window.innerHeight * 0.9
    canva.width = hsize
    canva.height = vsize

    if(document.getElementById("canvaShenanigan").style.display=="initial"){
        document.getElementById("ingameButtons").style.display = "initial"
        //document.getElementById("ingameButtons").style.margin = "10px"
    }
    if(level==0){
         document.getElementById("restart").style.display = "none"
    }
}
function fullScreen(){
    document.getElementById("ingameButtons").style.display = "none"
    hsize = window.innerWidth * 0.985
    vsize = window.innerHeight * 0.96

    canva.width = hsize
    canva.height = vsize
}
function createParticles(p){
    //if(Math.random()>0.2){
    if(rng+Math.ceil(Math.random()*4)%10<1){
        return
    }
    let Yplayer = players[p]
    let red = 200+Math.random()*55
    let green=Math.random()*20
    let color = "rgb("+red+", "+green+",0)"
    let particleSize = 5+Math.random()*3
    let Myx = Yplayer.x + Math.sin(Yplayer.dir)*-20
    let Myy = Yplayer.y - Math.cos(Yplayer.dir)*-20
    let Myh;
    if(p==0){
        Myh = horizontalMovement
    }
    else{
        Myh = horizontalMovement2
    }
    particles.push(new PARTICLE(Myx, Myy, particleSize, color, 25, Yplayer.dir*Myh-0.05+Math.random()*0.1))
}
function createAmmoParticles(a){
    //if(Math.random()>0.2){
    if(rng+Math.ceil(Math.random()*4)%45<1){
        return
    }
    if(ammos.length>0){
        let Yammo = ammos[a]
        let red = 200+Math.random()*55
        let green=Math.random()*20
        let color = "rgb("+red+", "+green+",0)"
        let particleSize = 4+Math.random()*2
        if(ammos.length==0){return}
        if(ammos[a].selfpropelled==0){return}
        let Myx = Yammo.x + Math.sin(Yammo.dir)*-20
        let Myy = Yammo.y - Math.cos(Yammo.dir)*-20
        let Myh = 1
        particles.push(new PARTICLE(Myx, Myy, particleSize, color, 25, Yammo.dir*Myh))
    }
}
class COOLPARTICLE{
    constructor(x,y,radius,color,life,dir){
        this.x=x
        this.y = y
        this.r = radius
        this.c=color
        this.l = life
        this.dir = dir
        this.alpha=particleVisibility
        this.s=0.5+Math.random()
        this.cl=0
    }
    print(){
        c.beginPath()
        c.fillStyle=this.c
        c.globalAlpha=this.alpha
        c.arc(this.x, this.y, this.r, 2*Math.PI, false)
        c.fill()
        c.globalAlpha=1
    }
    move(){
        this.cl++
        this.x=this.x-this.s*Math.sin(this.dir)
        this.y=this.y+this.s*Math.cos(this.dir)
        let curve = Math.pow(Math.abs(this.l-this.cl),2)
        this.alpha=particleVisibility*curve/14000
        if(this.alpha<0){
            this.alpha=0
        }
        //x=this.l
        //y=this.alpha
        //f(x)=1/14000*(x-this.l)²
        this.r=this.r+0.05
    }
}
function deleteTitle(){
    for(let i=0;i<particles.length;i++){
        if(particles[i].text!=NaN&&particles[i].type==1){
            particles.splice(i,1)
        }
    }
}
class TEXTPARTICLE{
    constructor(x,y,height, width, color,life, text, type){
        this.x=x
        this.y = y
        this.r = height
        this.c=color
        this.l = life
        this.alpha=particleVisibility
        this.s=0.5+Math.random()
        this.cl=0
        this.text=text
        this.w=width
        this.type = type
    }
    print(){
        c.beginPath()
        c.fillStyle=this.c
        c.globalAlpha=this.alpha
        c.textAlign="center"
        c.fillText(this.text,this.x,this.y, this.w, this.r)
        c.fill()
        c.globalAlpha=1
    }
    move(){
        this.cl++
        let curve = Math.pow(Math.abs(this.l-this.cl),2)
        this.alpha=particleVisibility*curve/14000
        if(this.alpha<0){
            this.alpha=0
        }
        //x=this.l
        //y=this.alpha
        //f(x)=1/14000*(x-this.l)²
        this.r=this.r+0.25
        this.h=this.h+0.25
    }
}
class PARTICLE{
    constructor(x,y,radius,color,life,dir){
        this.x=x
        this.y = y
        this.r = radius
        this.c=color
        this.l = life
        this.dir = dir
        this.alpha=particleVisibility
        this.s=Math.random()
        this.cl=0
    }
    print(){
        c.globalAlpha=this.alpha
        c.beginPath()
        c.fillStyle=this.c
        c.arc(this.x, this.y, this.r, 2*Math.PI, false)
        c.fill()
        c.globalAlpha=1
    }
    move(){
        this.cl++
        this.x=this.x-this.s*Math.sin(this.dir)
        this.y=this.y+this.s*Math.cos(this.dir)
        //this.alpha=this.alpha-0.008
        this.alpha=particleVisibility-particleVisibility*(1/(this.l/this.cl))
        if(this.alpha<0){
            this.alpha=0
        }
        this.r=this.r+0.1
    }
}
function campaignMenu(){
    document.getElementById("welcome").style.display="none"
    document.getElementById("campaignMenu").style.display="initial"
}
function retry(){
    if(keysPressed[4]==true){return}
    toggleStart(1,4)
}
function level1(){
    level=1
    toggleStart(1,4)
}
function level2(){
    level=2
    toggleStart(1,4)
}
function level3(){
    level=3
    toggleStart(1,4)
}
function level4(){
    level=4
    toggleStart(1,4)
}
function level5(){
    level=5
    toggleStart(1,4)
}
function level6(){
    level=6
    toggleStart(1,4)
}
function level7(){
    level=7
    toggleStart(1,4)
}
function level8(){
    level=8
    toggleStart(1,4)
}
function level9(){
    level=9
    toggleStart(1,4)
}
function level10(){
    level=10
    toggleStart(1,4)
}
function level11(){
    level=11
    toggleStart(1,4)
}
function level12(){
    level=12
    toggleStart(1,4)
}
function level13(){
    level=13
    toggleStart(1,4)
}
function level14(){
    level=14
    toggleStart(1,4)
}
function level15(){
    level=15
    toggleStart(1,4)
}
function level16(){
    level=16
    toggleStart(1,4)
}
function level17(){
    level=17
    toggleStart(1,4)
}
function level18(){
    level=18
    toggleStart(1,4)
}
function level19(){
    level=19
    toggleStart(1,4)
}
function level20(){
    level=20
    toggleStart(1,4)
}
function Shop(){
    for(let i=0;i<shopButtonsStates.length;i++){
        state(i, shopButtonsStates[i])
    }
    document.getElementById("shopMenu").style.display="initial"
    document.getElementById("canvaShenanigan").style.display="none"
    document.getElementById("welcome").style.display="none"
    document.getElementById("money").innerHTML= "Coins: " + money
}
function Interact(id, price){
    if(shopButtonsStates[id]=="buy"){
        buy(id, price)
    }
    else if(shopButtonsStates[id]=="equip"){
        state(skinEquiped, "equip")
        skinEquiped=id
        state(skinEquiped, "unequip")
        store()
    }
    else{
        state(skinEquiped, "equip")
        skinEquiped=-1
        store()
    }
}
function buy (id, price){
    console.log(-price)
    if(money>=price&&itemsOwned[id]!=1){
        itemsOwned[id]=1
        money=money-price
        state(id, "equip")
        document.getElementById("money").innerHTML= "Coins: " + money
        store()
    }
}
function state (id, state){
    if(id<0){return}
    document.getElementById("buy"+id+"0").innerHTML=state
    shopButtonsStates[id]=state
}
function findNearest(x, y, type, last){
    if(rng+Math.ceil(Math.random()*4)%25<1){
        return last;
    }
    let distances=[]
    if(type=="bot"){
        for(let i=0; i<bots.length; i++){
            let Ybot= bots[i]
            let dist = Math.sqrt(Math.pow(Ybot.y-y ,2)+Math.pow(Ybot.x-x ,2))
            distances.push(dist)

        }
    }
    let betterDistanceId = 0
    for(let i=1; i<distances.length; i++){
        let smaller = Math.min(distances[0], distances[i])
        distances[0]=smaller
        if(smaller==distances[i]){
            betterDistanceId=i
        }
    }
    return betterDistanceId
}

destore()