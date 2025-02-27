class PLAYER {
    constructor(x,y,s, rs){
        this.x = x
        this.y = y
        this.s = s
        this.rs = rs
        this.dx = 1
        this.dy = 0
        this.dir = 0.5*Math.PI
        this.a=-1
        this.es=skinEquiped
        this.es=this.es-0
        if(animatedskins.includes(this.es)==true){
            this.a=0
            this.animationticksdelay=animationTimes[animatedskins.indexOf(this.es)]
            this.framesAmount=animationFrames[animatedskins.indexOf(this.es)]
        }
        this.crng = 0
    }
    print(){
        this.crng++
        let string;
        if(this.a!=-1){
            if(this.animationticksdelay=="speed"){
                let vangle=this.dir
                let velocity = Math.sin(vangle)*this.dx+Math.cos(vangle)*this.dy
                if(this.crng%Math.round(7/velocity*(12/Math.pow(this.framesAmount,1)))==0){
                    if(velocity>0){
                        this.a--
                        if(this.a<0){
                            this.a=this.framesAmount-1
                        }
                    }
                    else{
                        this.a++
                        if(this.a>=this.framesAmount-1){
                            this.a=0
                        }
                    }
                }
            }
            else{
                if(this.crng%this.animationticksdelay==0){
                    this.a++
                    if(this.a>=this.framesAmount-1){
                        this.a=0
                    }
                }
            }
            string= "player"+this.es+this.a
        }
        else{
            string= "player"+this.es
        }
        let img = document.getElementById(string)
        c.save()
        c.translate(this.x+(Math.sin(this.dir))*(pl-qq)/2,this.y-(Math.cos(this.dir))*(pl-qq)/2)
        c.rotate(this.dir)
        c.drawImage(img, -pw*pwMult, -pw*pwMult, pw*pwMult*2, pw*pwMult*2)
        c.restore()
    }
    move(){
        this.dir = this.dir+horizontalMovement*this.rs
        if(this.dir>2*Math.PI){
            this.dir = this.dir-2*Math.PI
        }
        this.dir=this.dir%(2*Math.PI)
        if(this.dir<0){
            this.dir = 2*Math.PI+this.dir
        }
        this.dx=this.dx+verticalMovement*(Math.sin(this.dir))*this.s*weapons[weapon1][3]*slowdown1*bslowdown1
        this.dy=this.dy+verticalMovement*(Math.cos(this.dir))*this.s*weapons[weapon1][3]*slowdown1*bslowdown1
        if(Math.abs(verticalMovement)>0){
            createParticles(0)
        }
        this.dx=this.dx*F
        this.dy=this.dy*F
        this.x=this.x+this.dx
        this.y=this.y-this.dy
    }
    recoil(amount, dir){
        this.dx=this.dx+amount*Math.sin(dir)*-1
        this.dy=this.dy+amount*Math.cos(dir)*-1
    }
    printHealth(){
        let barSize = barSize1
        let barHeight = 25+Math.max(10,Math.cos(this.dir)*pl+5)
        c.beginPath()
        c.fillStyle="black"
        c.fillRect(this.x-barSize/2, this.y-barHeight-bw, barSize, bw)
        c.beginPath()
        c.fillStyle="red"
        c.fillRect(this.x-barSize/2+2, this.y-barHeight-bw+2, (hp/mxh)*(barSize-4), bw-2)
    }
}
class PLAYER2{
    constructor(x,y,s, rs){
        this.x = x
        this.y = y
        this.s = s
        this.rs = rs
        this.dx = -1
        this.dy = 0
        this.dir = 1.5*Math.PI
        this.a=-1
        this.es=skinEquiped
        this.es=this.es-0
        if(animatedskins.includes(this.es)==true){
            this.a=0
            this.animationticksdelay=animationTimes[animatedskins.indexOf(this.es)]
            this.framesAmount=animationFrames[animatedskins.indexOf(this.es)]
        }
        this.crng = 0
    }
    print(){
    this.crng++
        let string;
        if(this.a!=-1){
            if(this.animationticksdelay=="speed"){
                let vangle2=this.dir
                let velocity2 = Math.sin(vangle2)*this.dx+Math.cos(vangle2)*this.dy
                if(this.crng%Math.round(7/velocity2*(12/Math.pow(this.framesAmount,1)))==0){
                    if(velocity2>0){
                        this.a--
                        if(this.a<0){
                            this.a=this.framesAmount-1
                        }
                    }
                    else{
                        this.a++
                        if(this.a>=this.framesAmount-1){
                            this.a=0
                        }
                    }
                }
            }
            else{
                if(this.crng%this.animationticksdelay==0){
                    this.a++
                    if(this.a>=this.framesAmount-1){
                        this.a=0
                    }
                }
            }
            string= "player"+this.es+this.a
        }
        else{
            string= "player"+this.es
        }
        let img = document.getElementById(string)
        c.save()
        c.translate(this.x+(Math.sin(this.dir))*(pl-qq)/2,this.y-(Math.cos(this.dir))*(pl-qq)/2)
        c.rotate(this.dir)
        c.drawImage(img, -pw*pwMult, -pw*pwMult, pw*pwMult*2, pw*pwMult*2)
        c.restore()
    }
    move(){
        this.dir = this.dir+horizontalMovement2*this.rs
        if(this.dir>2*Math.PI){
            this.dir = this.dir-2*Math.PI
        }
        this.dir=this.dir%(2*Math.PI)
        if(this.dir<0){
            this.dir = 2*Math.PI+this.dir
        }
        this.dx=this.dx+verticalMovement2*(Math.sin(this.dir))*this.s*weapons[weapon2][3]*slowdown2*bslowdown2
        this.dy=this.dy+verticalMovement2*(Math.cos(this.dir))*this.s*weapons[weapon2][3]*slowdown2*bslowdown2
        if(Math.abs(verticalMovement2)>0){
            createParticles(1)
        }
        this.dx=this.dx*F
        this.dy=this.dy*F
        this.x=this.x+this.dx
        this.y=this.y-this.dy
    }
    recoil(amount, dir){
        this.dx=this.dx+amount*Math.sin(dir)*-1
        this.dy=this.dy+amount*Math.cos(dir)*-1
    }
    printHealth(){
        let barSize = barSize1
        let barHeight = 25+Math.max(10,Math.cos(this.dir)*pl+5)
        c.beginPath()
        c.fillStyle="black"
        c.fillRect(this.x-barSize/2, this.y-barHeight-bw, barSize, bw)
        c.beginPath()
        c.fillStyle="red"
        c.fillRect(this.x-barSize/2+2, this.y-barHeight-bw+2, (hp2/mxh)*(barSize-4), bw-2)
    }
}
class AMMO{
    constructor(x,y,dir,r,l, color, initialStrength, lifespan, falloff, bulletSlowdown, spread, dmg, player, aimbot, Allowdelete, projectileAmount){
        this.x = x
        this.y = y
        this.dir = dir + (Math.random()*2*((spread/180)*Math.PI)-((spread/180)*Math.PI))
        this.c=color
        this.l = l
        this.r = r
        this.dx = 0
        this.dy = 0
        this.i = initialStrength*bulletSpeedMult
        this.dx = this.i
        this.dy = this.i
        this.vel = this.i
        this.s =0.01
        this.life = lifespan
        this.clife = 0
        this.fo = falloff
        this.f = bulletSlowdown
        this.p = player
        this.idmg=dmg
        this.dmg = dmg
        if(player ==1){
            players[0].recoil(weapons[weapon1][14]*recoilMult, this.dir)
        }
        else if(player==2){
            players[1].recoil(weapons[weapon2][14]*recoilMult, this.dir)
        }
        else{
            //bots[player-2].recoil(weapons[weapon2][14]*recoilMult, this.dir)
        }
        this.aim=aimbot
        this.d=Allowdelete
        this.selfpropelled=0
        if(bulletSlowdown>=1){
            this.selfpropelled=1
        }
        this.pAmount=projectileAmount
        this.lasttargetid=0

        this.es=skinEquiped
        this.es=this.es-0
        if(specialcolorsskin.includes(this.es)==true&&(this.p==1||this.p==2)){
            if(specialcolors[specialcolorsskin.indexOf(this.es)]=="rand"){
                if(Math.random()>0.6666){
                    this.c="green"
                }
                else if(Math.random()>=0.5){
                    this.c="red"
                }
                else{
                    this.c="blue"
                }
            }
            else{
                this.c=specialcolors[specialcolorsskin.indexOf(this.es)]
            }
        }
        this.crng = 0
        this.transparency=1
        if(level!=0&&levels[level-1].title=="Toxic Squad"&&this.p==3){
            this.transparency=0.6 
        }
        this.circle=1
        if(this.r==10.1){
            this.circle=0
        }
    }
    print(){
        this.clife++
        c.globalAlpha=this.transparency
        c.fillStyle=this.c
        c.beginPath()
        if(this.selfpropelled==0){
            c.arc(this.x, this.y, this.r, 2*Math.PI, false)
        }
        if(this.circle==1){
            c.arc(this.x+this.l*(Math.sin(this.dir)), this.y-this.l*(Math.cos(this.dir)), this.r, 2*Math.PI, false)
        }
        c.fill()
        if(this.circle==1){
            c.beginPath()
            c.strokeStyle=this.c
            c.lineWidth=this.r*2
            c.moveTo(this.x,this.y)
            c.lineTo(this.x+this.l*(Math.sin(this.dir)), this.y-this.l*(Math.cos(this.dir)))
            c.stroke()
        }
        c.globalAlpha=1
    }
    move(){
        //this.dx=this.dx+(Math.sin(this.dir))*this.s
        //this.dy=this.dy+(Math.cos(this.dir))*this.s
        if(this.aim>0){
            let fantoms = []
            this.dir=this.dir%(2*Math.PI)
            if(this.dir<0){
                this.dir = 2*Math.PI+this.dir
            }
            let target = 0
            if(this.p==1){
                if(gamemode==1){
                    //target = bots[Math.floor(Math.random()*(bots.length))]
                    this.lasttargetid=findNearest(this.x, this.y, "bot",this.lasttargetid)
                    target = bots[this.lasttargetid]
                }
                else{
                    target=players[1]
                }
            }
            else if(this.p==2){
                if(gamemode==1){
                    //target = bots[Math.floor(Math.random()*(bots.length))]
                    this.lasttargetid = findNearest(this.x, this.y, "bot", this.lasttargetid)
                    target = bots[this.lasttargetid]
                }
                else{
                    target=players[0]
                }
            }
            else{
                target=players[0]
                if(player2==1&&Math.random()>0.4999){
                    target=players[1]
                }
            }
            if(target==undefined){
                fantoms[0]=new FANTOM(0,0)
                target = fantoms[0]
            }
            let dirToTarget = Math.atan((this.y-target.y)/(this.x-target.x))+0.5*Math.PI
            if (target.x < this.x){
                dirToTarget = dirToTarget + Math.PI
            }
            if(Math.abs(dirToTarget-this.dir)>this.aim){
                if(Math.abs(dirToTarget-this.dir)>Math.PI){
                    if(dirToTarget>this.dir){
                        this.dir=this.dir-this.aim
                    }
                    else{
                        this.dir=this.dir+this.aim
                    }
                }
                else{
                    if(dirToTarget>this.dir){
                        this.dir=this.dir+this.aim
                    }
                    else{
                        this.dir=this.dir-this.aim
                    }
                }
            }
        }
        this.vel=this.vel*this.f
        this.dx=this.vel*Math.sin(this.dir)
        this.dy=this.vel*Math.cos(this.dir)
        this.x=this.x+this.dx
        this.y=this.y-this.dy
        //old formula vvvv
        this.dmg = this.idmg*(1-(this.clife*this.fo)/100)
        //prototype   vvvv
        //this.dmg = this.idmg*(1/(this.clife*this.fo))
    }
    grenade(i){
        if(this.pAmount==0){return}
        this.vel=0
        let projectileAmount = this.pAmount
        let projectileSize = 8
        let projectileDamage = 3.6
        let mdir = (2*Math.PI)/projectileAmount 
        //let projectileShooter=this.p
        let projectileShooter="all"
        for(let p=0;p<projectileAmount; p++){
            ammos.push(new AMMO(this.x+Math.sin(p*mdir)*50, this.y-Math.cos(p*mdir)*50, p*mdir, projectileSize, projectileSize*1.6, "grey", 20, 60*1, -0.5, 0.986, 1.2, projectileDamage, projectileShooter, 0, 0, 0))
        }
    }
}
class FANTOM{
    constructor(x,y){
        this.x=x
        this.y=y
    }
}