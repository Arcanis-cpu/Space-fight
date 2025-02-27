class BOT{
    constructor(x,y, speed, weapon, size, id, core, master, pro, op, hp, dx, dy, dir){
        this.x = x
        this.y = y
        this.dir = dir
        this.s = speed
        this.w = weapon
        this.size = size
        this.dx = dx
        this.dy = dy
        this.rs = 0.05
        if(core==0&&level!=0&&slowerRsMinions.includes(levels[level-1].title)==true){
            this.rs=0.025
        }
        this.cd =0
        this.bs = 0
        this.id = id
        this.c = core
        this.m = master
        this.e=0
        this.stage = 800
        this.pro = pro
        this.op=op
        if(op==1&&this.pro==0){
            this.pro=Math.ceil(Math.random()*2)
        }
        this.mx=0
        this.my=0
        this.on=0
        this.nextdir = 0
        this.skin=1
        if(this.pro>0){
            this.skin=2
        }
        if(this.op==1){
            this.skin=3
        }
        if(this.c == 0&&this.m==0){
            this.skin=7
        }
        if(level!=0){
            if(levels[level-1].title=="Hello?"){
                this.y=size+Math.random()*(vsize-2*size)
                this.skin=0
            }
        }
        if(level!=0&&levels[level-1].title=="Flash"){
            this.skin=5
        }
        if(this.s==0){
            this.skin=6
        }
        this.mxh = hp
        this.hp = this.mxh
        this.summon = 0
        this.stageSize = 0
        this.stageAmount=0
        if(this.m==1){
            this.ccop=0
            this.ccpro=0
            if(level!=0 && halfbossnames.includes(levels[level-1].title)==true){
                if(summoners.includes(levels[level-1].title)==true){
                    this.ccsize=40
                    this.ccspeed=0.09
                    this.ccmxh=50   
                    this.skin=1
                    this.summon=1
                    this.stage=this.mxh/2
                    this.stageSize=this.mxh/2
                    this.stageAmount=1
                }
                else{
                    this.skin=1
                }
            }
            else{
                this.ccsize=50
                this.ccspeed=0.08
                this.ccmxh=80  
                this.size = this.size*1.5
                this.mxh = 1000
                this.stageSize=200
                this.stageAmount=5
                this.stage=800
                if(player2==1&&playersDeadRequired==2){
                    this.stageAmount=5
                    this.mxh = 1500
                    this.stageSize=300
                    this.stage=1200
                }
                this.hp = this.mxh
                this.s = speed*0.9
                this.skin=8
                this.summon=1
            }
        }
        this.rngtp = 0
        this.rngtime = 100
        //interval between tp^
        this.tptime=30
        this.crng=Infinity
        this.sometimesinvis=0
        this.invisTime=20
        this.inviscd = 0
        this.tpcolor="yellow"
        if(level!=0){
            if(levels[level-1].title=="Flash"){
                this.stage=90
                this.stageSize=10
                this.rngtp=0
                this.skin = 5
                this.rngtime = 100
            }
            if(levels[level-1].title=="Glitch"){
                this.stage=190
                this.stageSize=10
                this.rngtp=0
                this.skin=9
                this.sometimesinvis=1
                this.tpcolor="black"
                this.rngtime = 200
            }
            if(levels[level-1].title=="The last fleet"){
                this.ccmxh=80
                this.ccop=1
                this.ccsize=55
                this.ccspeed=0.085
                if(this.m==1&&this.c==1){
                    this.skin=3
                }
            }
            if(levels[level-1].title=="Toxic Squad"){
                this.skin=4
            }
        }
        this.oldskin=this.skin
    }
    print(){
        let img;
        let rotationbonus=0
        if(this.skin==0){
            return
        }
        else if(this.skin==1){
            img = document.getElementById("orange")
        }
        else if(this.skin==2){
            img = document.getElementById("blue")
        }
        else if(this.skin==3){
            img = document.getElementById("purple")
            //(it's red)
        }
        else if(this.skin==4){
            img = document.getElementById("green")
           
        }
        else if(this.skin==5){
            img = document.getElementById("flash")
        }
        else if(this.skin==6){
            let img = document.getElementById("bot")
            c.drawImage(img, this.x-this.size/2, this.y-this.size/2, this.size, this.size)
            return
        }
        else if(this.skin==7){
            rotationbonus=-0.5*Math.PI
            img = document.getElementById("canon")
        }
        else if(this.skin==8){
            img = document.getElementById("deathstar")
        }
        else if(this.skin==9){
            img = document.getElementById("shadow")
        }
        else{
            let img = document.getElementById("bot2")
            c.drawImage(img, this.x-this.size/2, this.y-this.size/2, this.size, this.size)
            return
        }
        c.save()
        c.translate(this.x,this.y)
        c.rotate(this.dir+rotationbonus)
        c.drawImage(img, -this.size/2, -this.size/2, this.size, this.size)
        c.restore()
    }
    move(){
        this.inviscd++
        if(player2==1&&Math.random()>0.996){
            if(this.e==0){
                this.e=1
            }
            else{
                this.e=0
            }
        }
        let ennemy = players[this.e]
        if(ennemy==undefined){
            if(this.e==0){
                this.e=1
            }
            else{
                this.e=0
            }
            ennemy = players[this.e]
        }
        this.cd++
        this.dir=this.dir%(2*Math.PI)
        if(this.dir<0){
            this.dir = 2*Math.PI+this.dir
        }
        if(this.id%2==0&&ai==1){
            let prevision = 20+this.pro*10
            let prevX=pl+ennemy.dx*prevision
            let prevY=pl+ennemy.dy*prevision
            let ennemyDir = ennemy.dir
            //ennemyDir=Math.atan((ennemy.dy)/(ennemy.dx))+0.5*Math.PI
            //if(ennemy.dx<0){
            //    ennemyDir=ennemyDir+ Math.PI
            //}
            //ennemyDir = 2*Math.PI-ennemyDir

            let dirToPlayer = Math.atan((this.y-(ennemy.y-Math.cos(ennemyDir)*prevY))/(this.x-(ennemy.x+Math.sin(ennemyDir)*prevX)))+0.5*Math.PI
            
            if ((ennemy.x+Math.sin(ennemyDir)*prevX) < this.x){
                dirToPlayer = dirToPlayer + Math.PI
            }
            if(Math.abs(dirToPlayer-this.dir)>this.rs){
                if(Math.abs(dirToPlayer-this.dir)>Math.PI){
                    if(dirToPlayer>this.dir){
                        this.dir=this.dir-this.rs
                    }
                    else{
                        this.dir=this.dir+this.rs
                    }
                }
                else{
                    if(dirToPlayer>this.dir){
                        this.dir=this.dir+this.rs
                    }
                    else{
                        this.dir=this.dir-this.rs
                    }
                }
            }
        }
        else{
            let dirToPlayer = Math.atan((this.y-ennemy.y)/(this.x-ennemy.x))+0.5*Math.PI
            if (ennemy.x < this.x){
                dirToPlayer = dirToPlayer + Math.PI
            }
            if(Math.abs(dirToPlayer-this.dir)>this.rs){
                if(Math.abs(dirToPlayer-this.dir)>Math.PI){
                    if(dirToPlayer>this.dir){
                        this.dir=this.dir-this.rs
                    }
                    else{
                        this.dir=this.dir+this.rs
                    }
                }
                else{
                    if(dirToPlayer>this.dir){
                        this.dir=this.dir+this.rs
                    }
                    else{
                        this.dir=this.dir-this.rs
                    }
                }
            }
        }
        if(this.c == 0&&this.m==0){
            let master = bots[0] 
            this.x = master.x
            this.y = master.y
            //this.size = master.size
            this.hp = master.hp
            this.mxh=master.mxh
            return
        }
        let dist = Math.sqrt(Math.pow(this.x-ennemy.x,2)+Math.pow(this.y-ennemy.y,2))
        if(this.pro==1){
            if(level!=0&&levels[level-1].title=="Flash"){
                if(dist<300){
                    this.w = 13
                }
                else{
                    this.w = 8
                }
            }
            else{
                if(dist<325){
                    this.w = 11
                }
                else{
                    this.w = 10
                }
            }
        }
        if(this.pro==2){
            if(level!=0&&levels[level-1].title=="Toxic Squad"){
                if(dist<375){
                    this.w = 16
                }
                else{
                    this.w = 14
                }
            }
            else{
                if(dist<350){
                    this.w = 16
                }
                else{
                    this.w = 10
                }
            }
        }
        let ennemyHP = ennemy.hp
        if(ennemy==players[0]){
            ennemyHP=hp
        }
        if(ennemy==players[1]){
            ennemyHP=hp2
        }
        if(this.pro>0&&ennemyHP<25&&dist>325){
            this.w=14
        }
        let move1 = 1
        if(dist<150&&this.op==0&&this.pro!=1){
            if(level!=0&&levels[level-1].title=="Flash"&&levels[level-1].title=="Glitch"&&this.inviscd>60){
                move1=1
            }
            else{
                move1=0
            }
        }
        this.dx = this.dx+this.s*Math.sin(this.dir)*weapons[this.w][3]*move1
        this.dx = this.dx*F
        this.dy = this.dy-this.s*Math.cos(this.dir)*weapons[this.w][3]*move1
        this.dy = this.dy*F
        this.x = this.x + this.dx
        this.y = this.y + this.dy
        if(level!=0){
            if((levels[level-1].title=="Flash"||levels[level-1].title=="Glitch")&& (this.rngtp==1&&(Math.random()>0.985||this.hp<this.stage)||this.rngtp==0&&(rng%this.rngtime==0))){
                this.stage=this.stage-this.stageSize
                this.nextdir=0
                for(let i =0; i<100; i++){
                    this.mx = this.size+Math.random()*(hsize-2*this.size)
                    this.my = this.size+Math.random()*(vsize-2*this.size)
                    this.nextdir = Math.atan((this.my-ennemy.y)/(this.mx-ennemy.x))+0.5*Math.PI
                    if (ennemy.x < this.mx){
                        this.nextdir = this.nextdir + Math.PI
                    }
                    if(Math.abs(this.nextdir-ennemy.dir)>Math.PI*1.5){
                        break
                    }
                }
            this.crng=rng
            this.on=1
//            console.log(dirToPlayer2/Math.PI*180)
            }
            if((levels[level-1].title=="Flash"||levels[level-1].title=="Glitch")&&rng-this.tptime>this.crng){
                this.crng=Infinity
                this.on=0
                this.x=this.mx
                this.y=this.my
                this.dir=this.nextdir
            }
        }
        if(this.sometimesinvis==1&&Math.random()>0.97){
            this.skin=0
            this.inviscd=0
        }
        if(this.inviscd>this.invisTime){
            this.skin=this.oldskin
        }
        if(this.summon==1&&this.stage!=0){
            if(this.hp<this.stage){
                let amount = 1
                if(this.stage<800){
                    amount++
                }
                if(this.stage<600){
                    amount++
                }
                if(this.stage<400){
                    amount++
                }
                for(let i=0; i<amount;i++){
                    createBot2(1,this.ccspeed, this.ccsize, this.x-this.ccsize+Math.random()*(this.ccsize*2), this.y-this.ccsize+Math.random()*(this.ccsize*2), this.ccpro, this.ccop, Math.floor(Math.random()*(weapons.length+botsForbiddenWeapons)), this.ccmxh, 0, this.dx, this.dy, this.dir)
                }
                this.stage =this.stage-this.stageSize
            }
        }
    }
    printHealth(){
        if(this.skin==0){
            return
        }
        if(this.c == 0&&this.m==0){
            return
        }
        let barSize = barSize1
        let barHeight = 10+this.size/2
        let mult = 1
        if(this.c == 1&&this.m==1){
            if(this.mxh>299){
                barSize=barSize*1.6
                mult = 1.6
            }
        }
        c.beginPath()
        c.fillStyle="black"
        c.fillRect(this.x-barSize/2, this.y-barHeight-bw*mult, barSize, bw*mult)
        c.beginPath()
        c.fillStyle="red"
        c.fillRect(this.x-barSize/2+2, this.y-barHeight-bw*mult+2, (this.hp/this.mxh)*(barSize-4), bw*mult-2)
        if(this.m==1){
            for(let i = 0; i<this.stageAmount-1; i++){
                c.fillStyle="black"
                c.fillRect(this.x-barSize/2+ ((i+1)*this.stageSize/this.mxh)*(barSize-4), this.y-barHeight-bw*mult+2, 5, bw*mult-2)
            }
            if(this.stage!=0){
                c.fillStyle="grey"
                c.fillRect(this.x-barSize/2+ (this.stage/this.mxh)*(barSize-4), this.y-barHeight-bw*mult+2, 5, bw*mult-2)
            }
        }
        if(level!=0&&this.on==1){
            if(levels[level-1].title=="Flash"){
                c.beginPath()
                c.fillStyle= this.tpcolor
                c.strokeStyle="rgb(200,200,0)"
                c.lineWidth=10
                c.arc(this.mx, this.my, this.size/2, 2*Math.PI, false)
                c.stroke()
                c.fill()
            }
        }
    }
    shoot(){
        let mcolor = "red"
        if(level!=0&&levels[level-1].title=="Toxic Squad"){
            mcolor="green" 
        }
        if(this.cd>weapons[this.w][13]&&this.bs<weapons[this.w][12]&&this.bs>0){
            this.bs++
            this.cd=0
            ammos.push(new AMMO(this.x, this.y, this.dir, weapons[this.w][7], 10, mcolor, weapons[this.w][8], weapons[this.w][6], weapons[this.w][9], weapons[this.w][4], weapons[this.w][10], weapons[this.w][2],3, weapons[this.w][15], weapons[this.w][16], weapons[this.w][17]))
            return
        }
        else if(this.bs>=weapons[this.w][12]){
            this.bs=0
        }
        if(this.cd>weapons[this.w][1]){
            let spread = weapons[this.w][10]
            if(this.cd>2*weapons[this.w][1]&&weapons[this.w][13]!=-1){
                spread = spread/fsa
            }
            this.bs=1
            this.cd = 0
            if(weapons[this.w][13]==-1){
                for(let i =0; i<weapons[this.w][12];i++){
                    ammos.push(new AMMO(this.x, this.y, this.dir, weapons[this.w][7], 10, mcolor, weapons[this.w][8], weapons[this.w][6], weapons[this.w][9], weapons[this.w][4], spread, weapons[this.w][2],3, weapons[this.w][15], weapons[this.w][16], weapons[this.w][17]))
                }
                this.bs=weapons[this.w][12]
            }    
            else{
                ammos.push(new AMMO(this.x, this.y, this.dir, weapons[this.w][7], 10, mcolor, weapons[this.w][8], weapons[this.w][6], weapons[this.w][9], weapons[this.w][4], spread, weapons[this.w][2],3, weapons[this.w][15], weapons[this.w][16], weapons[this.w][17]))
            }
            return
        }
    }
}