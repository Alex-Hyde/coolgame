function tracker(x,y, angle,colour){
    bodyhitbox=new rectHitbox(-25,-25,50,50);
    thehitbox=new Hitbox([bodyhitbox]);

    this.imageindex=0;
    this.delaytimer=0;
    this.healable=true;
    this.istracker=true;
    var deltax= x - player.x
    var deltay= y - player.y
    var hypoteneuse= Math.sqrt((deltax**2)+(deltay**2));
    var speedfactor = 2/hypoteneuse
    this.xvel= deltax*speedfactor
    this.yvel= deltay*speedfactor
    
    enemy.call(this,50,50,x,y,angle,thehitbox,2,this.image0, 150,colour);
 

    this.track = function(targetx,targety){
        newdeltax= this.x-targetx;
        newdeltay= this.y-targety;
        newhypoteneus= Math.sqrt((newdeltax**2)+(newdeltay**2));
        newspeedfactor= this.speed/newhypoteneus
        neededxvel= newdeltax*newspeedfactor
        neededyvel=newdeltay*newspeedfactor
        if(neededxvel>=this.xvel){
            this.xvel+= Math.min(0.03,(neededxvel-this.xvel));
        }
        else{
            this.xvel-=Math.min(0.03,(this.xvel-neededxvel));
        }
        if(neededyvel>=this.yvel){
            this.yvel+= Math.min(0.03,(neededyvel-this.yvel));
        }
        else{
            this.yvel-=Math.min(0.03,(this.yvel-neededyvel));
        }
        this.x-= this.xvel *player.playertime
        this.y-= this.yvel *player.playertime

        }
    this.update = function() {
        this.delaytimer+=1
        if(this.delaytimer==10){
            this.delaytimer=1;
            this.imageindex+=1;
        }
        d = new Date();
        clock = d.getTime();
        if (clock - player.lastHitTime > player.invulnTime) {
            player.invuln = false;
            if (!player.invuln && player.collision(this) && player.health >= 0) {
                player.health -= 15;
                player.hit=true;
                if(player.damagemultiplyer < 1){
                    this.health-=30;
                    if(this.health <= 0){
                        mobindex=entityList.mobList.indexOf(this);
                        entityList.mobList.splice(mobindex, 1);
                    }
                }
                player.invuln = true;
                player.lastHitTime = clock;
            }
        }
        this.track(player.x,player.y);
        this.healthBar();
    }

    this.draw = function(ctx){
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.translate(-this.x, -this.y);
            ctx.drawImage(this.images[this.imageindex % this.images.length], this.x-this.width/2, this.y-this.height/2, this.width, this.height);
            ctx.restore(); 
        }
    }


function yellowTracker(x,y, angle) {
    tracker.call(this,x,y, angle,"yellow");
    this.image0=document.getElementById("yellowenemy");
    this.image1=document.getElementById("yellowenemy1");
    this.image2=document.getElementById("yellowenemy2");
    this.image3=document.getElementById("yellowenemy3");
    this.images=[this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image1,this.image2,this.image3,this.image2,this.image1];
    
}
function purpleTracker(x,y, angle) {
    tracker.call(this,x,y, angle,"purple");
    this.image0=document.getElementById("purplemob");
    this.image1=document.getElementById("purplemob1"); 
    this.images=[this.image0,this.image0,this.image1,this.image1];
}
function redTracker(x,y, angle) {
    tracker.call(this,x,y, angle,"red");
    this.image0=document.getElementById("redmob");
    this.image1=document.getElementById("redmob1");
    this.image2=document.getElementById("redmob2");
    this.image3=document.getElementById("redmob3");
    this.image4=document.getElementById("redmob4");
    this.image5=document.getElementById("redmob5");
    this.image6=document.getElementById("redmob6");
    this.image7=document.getElementById("redmob7");
    this.image8=document.getElementById("redmob8");
    this.images=[this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image1,this.image2,this.image3,this.image4,this.image5,this.image6,this.image7,this.image8];

}
function greenTracker(x,y, angle) {
    tracker.call(this,x,y, angle,"green");
    this.image0=document.getElementById("greenmob");
    this.image1=document.getElementById("greenmob1");
    this.image2=document.getElementById("greenmob");
    this.image3=document.getElementById("greenmob3");
    this.images=[this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image0,this.image1,this.image2,this.image3,this.image2,this.image1];

}


function Tank(x,y,angle,colour,image,projectileimage){
    tankhitbox=new rectHitbox(-60,-32,120,80);
    fulltankhitbox= new Hitbox([tankhitbox]);
    this.projectileimage=projectileimage;
    this.shotprobability=0;
    this.xvel=0
    this.yvel=0
    this.healable=true;
    enemy.call(this,128,128,x,y,angle,fulltankhitbox,8,image,700,colour);
    this.draw = function(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.restore(); 
    }
    this.track = function(targetx,targety){
        newdeltax= this.x-targetx;
        newdeltay= this.y-targety;
        newhypoteneus= Math.sqrt((newdeltax**2)+(newdeltay**2));
        if(newhypoteneus==0){newhypoteneus=1;}
        if(-50< this.x - targetx && this.x - targetx < 50){this.speed=3}
        newspeedfactor= this.speed/newhypoteneus
        neededxvel= newdeltax*newspeedfactor
        neededyvel=newdeltay*newspeedfactor
        if(neededxvel>=this.xvel){
            this.xvel+= Math.min(0.03,(neededxvel-this.xvel));
        }
        else{
            this.xvel-=Math.min(0.03,(this.xvel-neededxvel));
        }
        if(neededyvel>=this.yvel){
            this.yvel+= Math.min(0.03,(neededyvel-this.yvel));
        }
        else{
            this.yvel-=Math.min(0.03,(this.yvel-neededyvel));
        }
        this.y-= this.yvel *player.playertime

        }
    this.update = function() {
        d = new Date();
        clock = d.getTime();
        if (clock - player.lastHitTime > player.invulnTime) {
            player.invuln = false;
            if (!player.invuln && player.collision(this) && player.health >= 0) {
                player.health -= 30;
                player.hit=true;
                if(player.damagemultiplyer < 1){
                    this.health-=60;
                    if(this.health <= 0){
                        mobindex=entityList.mobList.indexOf(this);
                        entityList.mobList.splice(mobindex, 1);
                    }
                }
                player.invuln = true;
                player.lastHitTime = clock;
            }
        }
        this.track(player.x,player.y);
        this.shoot();
    }
    this.shoot = function(){
        guess=Math.random()
        if(guess < (this.shotprobability/10005)){
            entityList.mobProjectiles.push(new tankProjectile(this.x,this.y,this.colour,this.projectileimage));
        this.shotprobability =0;
        }
        else{
            this.shotprobability+=1
        }
    }
}

function redTank(x,y,angle){
    Tank.call(this,x,y,angle,"red",document.getElementById("redtank"),document.getElementById("redorb"));
}

function greenTank(x,y,angle){
    Tank.call(this,x,y,angle,"green",document.getElementById("greentank"),document.getElementById("greenorb"));
}

function purpleTank(x,y,angle){
    Tank.call(this,x,y,angle,"purple",document.getElementById("purpletank"),document.getElementById("purpleorb"));
}

function yellowTank(x,y,angle){
    Tank.call(this,x,y,angle,"yellow",document.getElementById("yellowtank"),document.getElementById("yelloworb"));
}

function leftTank(x,y,angle,colour,image,projectileimage){
    Tank.call(this,x,y,angle,colour,image,projectileimage);
    this.shoot = function(){
        guess=Math.random()
        if(guess < (this.shotprobability/10005)){
            entityList.mobProjectiles.push(new lefttankProjectile(this.x,this.y,this.colour,this.projectileimage));
        this.shotprobability =0;
        }
        else{
            this.shotprobability+=1
        }
    }
}

function redLeftTank(x,y,angle){
    leftTank.call(this,x,y,angle,"red",document.getElementById("redlefttank"),document.getElementById("redorb"));
}

function greenLeftTank(x,y,angle){
    leftTank.call(this,x,y,angle,"green",document.getElementById("greenlefttank"),document.getElementById("greenorb"));
}

function purpleLeftTank(x,y,angle){
    leftTank.call(this,x,y,angle,"purple",document.getElementById("purplelefttank"),document.getElementById("purpleorb"));
}

function yellowLeftTank(x,y,angle){
    leftTank.call(this,x,y,angle,"yellow",document.getElementById("yellowlefttank"),document.getElementById("yelloworb"));
}


function Mothership(x,y,angle){
    mothershiphitbox=new rectHitbox(-60,-30,120,40);
    fullmothershiphitbox= new Hitbox([mothershiphitbox]);
    sinMoveMob.call(this,128,64,x,y,angle,fullmothershiphitbox,document.getElementById("mothership"),1000,"none");
    this.imageindex=0;
    this.healable=true;
    this.spawnprobability=0;
    this.spawnactive=false;
    this.image0=document.getElementById("mothership")
    this.image1=document.getElementById("mothership1")
    this.image2=document.getElementById("mothership2")
    this.image3=document.getElementById("mothership3")
    this.image4=document.getElementById("mothership4")
    this.image5=document.getElementById("mothership5")
    this.image6=document.getElementById("mothership6")
    this.image7=document.getElementById("mothership7")
    this.images=[this.image0,this.image1,this.image2,this.image3,this.image4,this.image5,this.image6,this.image7];
    this.draw = function(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.images[Math.floor(this.imageindex) % this.images.length], this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.restore(); 
    }

    this.spawnmob=function(){
        randommobslist=[new purpleTracker(this.x,this.y+50,0), new yellowTracker(this.x,this.y+50,0), new greenTracker(this.x,this.y+50,0), new redTracker(this.x,this.y+50,0)];
        entityList.mobList.push(randommobslist[Math.floor(Math.random()*4)]);
    }

    this.newPos = function() {
        this.x = this.initX + 200 *player.playertime * Math.tan(Math.sin(clock/2000)) - this.width/2;
    }

    this.update=function(){
        this.newPos();
        d = new Date();
        clock = d.getTime();
        if (clock - player.lastHitTime > player.invulnTime) {
            player.invuln = false;
            if (!player.invuln && player.collision(this) && player.health >= 0) {
                player.health -= 40;
                player.hit=true;
                if(player.damagemultiplyer < 1){
                    this.health-=80;
                    if(this.health <= 0){
                        mobindex=entityList.mobList.indexOf(this);
                        entityList.mobList.splice(mobindex, 1);
                    }
                }
                player.invuln = true;
                player.lastHitTime = clock;
            }
        }
        if(this.spawnactive==false){
            this.imageindex=0;
            spawnroll=Math.random()
            if(spawnroll > this.spawnprobability){
                this.spawnprobability+=0.000005
            }
            else{
                this.spawnactive=true;
            }
        }
        else{
            this.imageindex+=0.5;
            if (this.imageindex % 7 ==0){
                this.spawnmob();
                this.spawnactive=false;
                this.spawnprobability=0;
            }
        }

    }
    

}

function Medic(x,y,angle,colour,image){
    medicshiphitbox= new rectHitbox(-54,-20,108,40);
    fullmedicshiphitbox= new Hitbox([medicshiphitbox]);
    healingrect= new rectHitbox(-154,-120,308,240)
    this.Healinghitbox=new Hitbox([healingrect]);
    this.ismedicship=true;
    this.healing=undefined;
    this.xvel=0
    this.yvel=0;
    enemy.call(this,108,40,x,y,angle,fullmedicshiphitbox,2,image,700,colour);

    this.draw = function(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.translate(-this.x, -this.y);
        ctx.drawImage(this.image, this.x-this.width/2, this.y-this.height/2, this.width, this.height);
        ctx.restore(); 
    }

    this.update = function(){
        console.log(this.healing)
        if(this.healing!=undefined){
            if(!entityList.mobList.includes(this.healing)){
                this.healing=undefined
            }
        }
        let weakestmob=entityList.mobList[0];
        entityList.mobList.forEach(mob=>{
            if(mob.healable!=undefined && this.Healinghitbox.collision(mob.hitbox,this,mob)==true && mob.health < mob.maxHealth){
                mob.health+= Math.min(0.1,mob.maxHealth-mob.health);
                if(mob.colour==this.colour){
                    mob.health+= Math.min(0.1,mob.maxHealth-mob.health);
                }
            }
        })
        if(this.healing!=undefined){
            if(this.healing.health/this.healing.maxHealth==1){
                this.healing=undefined;
            }
        }
       if(this.healing==undefined){
        entityList.mobList.forEach(mob=>{
            if(mob.healable!=undefined && weakestmob.health/weakestmob.maxHealth > mob.health/mob.maxHealth){
                weakestmob=mob;
            }
            else if(weakestmob.healable==undefined){
                weakestmob=mob;
            }
        })
       }
       if(weakestmob.healable!=undefined){
           this.healing=weakestmob;
       }
       if (this.healing!=undefined){
        this.track(this.healing.x,this.healing.y);
       }
    }

    this.track = function(targetx,targety){
        newdeltax= this.x-targetx;
        newdeltay= this.y-targety;
        newhypoteneus= Math.sqrt((newdeltax**2)+(newdeltay**2));
        if(newhypoteneus==0){newhypoteneus=1;}
        newspeedfactor= this.speed/newhypoteneus
        neededxvel= newdeltax*newspeedfactor
        neededyvel=newdeltay*newspeedfactor
        if(neededxvel>=this.xvel){
            this.xvel+= Math.min(0.03,(neededxvel-this.xvel));
        }
        else{
            this.xvel-=Math.min(0.03,(this.xvel-neededxvel));
        }
        if(neededyvel>=this.yvel){
            this.yvel+= Math.min(0.03,(neededyvel-this.yvel));
        }
        else{
            this.yvel-=Math.min(0.03,(this.yvel-neededyvel));
        }
        this.x-= this.xvel *player.playertime
        this.y-= this.yvel *player.playertime

        }
}

function redMedic(x,y,angle){
    Medic.call(this,x,y,angle,'red',document.getElementById("redMedic"));
}

function yellowMedic(x,y,angle){
    Medic.call(this,x,y,angle,'yellow',document.getElementById("yellowMedic"));
}

function greenMedic(x,y,angle){
    Medic.call(this,x,y,angle,'green',document.getElementById("greenMedic"));
}

function purpleMedic(x,y,angle){
    Medic.call(this,x,y,angle,'purple',document.getElementById("purpleMedic"));
}

function yellowRobotMedic(x,y,angle){
    Medic.call(this,x,y,angle,'yellow',document.getElementById("yellowRobotMedic"));
}

function redRobotMedic(x,y,angle){
    Medic.call(this,x,y,angle,'red',document.getElementById("redRobotMedic"));
}
function greenRobotMedic(x,y,angle){
    Medic.call(this,x,y,angle,'green',document.getElementById("greenRobotMedic"));
}
function purpleRobotMedic(x,y,angle){
    Medic.call(this,x,y,angle,'purple',document.getElementById("purpleRobotMedic"));
}

function leftredRobotTank(x,y,angle){
    leftTank.call(this,x,y,angle,"red",document.getElementById("leftredRobotTank"),document.getElementById("rednuke"));
    this.width=170;
    this.height=56;
    this.hitbox=new Hitbox([new rectHitbox(-85,-15,170,25),new rectHitbox(-70,10,90,18)]);

    this.shoot = function(){
        guess=Math.random()
        if(guess < (this.shotprobability/10005)){
            entityList.mobProjectiles.push(new lefttanknuke(this.x,this.y,this.colour,this.projectileimage));
        this.shotprobability =0;
        }
        else{
            this.shotprobability+=1
        }
    }
}

function leftyellowRobotTank(x,y,angle){
    leftTank.call(this,x,y,angle,"yellow",document.getElementById("leftyellowRobotTank"),document.getElementById("yellownuke"));
    this.width=170;
    this.height=56;
    this.hitbox=new Hitbox([new rectHitbox(-85,-15,170,25),new rectHitbox(-70,10,90,18)]);

    this.shoot = function(){
        guess=Math.random()
        if(guess < (this.shotprobability/10005)){
            entityList.mobProjectiles.push(new lefttanknuke(this.x,this.y,this.colour,this.projectileimage));
        this.shotprobability =0;
        }
        else{
            this.shotprobability+=1
        }
    }
}

function leftgreenRobotTank(x,y,angle){
    leftTank.call(this,x,y,angle,"green",document.getElementById("leftgreenRobotTank"),document.getElementById("greennuke"));
    this.width=170;
    this.height=56;
    this.hitbox=new Hitbox([new rectHitbox(-85,-15,170,25),new rectHitbox(-70,10,90,18)]);

    this.shoot = function(){
        guess=Math.random()
        if(guess < (this.shotprobability/10005)){
            entityList.mobProjectiles.push(new lefttanknuke(this.x,this.y,this.colour,this.projectileimage));
        this.shotprobability =0;
        }
        else{
            this.shotprobability+=1
        }
    }
}

function leftpurpleRobotTank(x,y,angle){
    leftTank.call(this,x,y,angle,"purple",document.getElementById("leftpurpleRobotTank"),document.getElementById("purplenuke"));
    this.width=170;
    this.height=56;
    this.hitbox=new Hitbox([new rectHitbox(-85,-15,170,25),new rectHitbox(-70,10,90,18)]);

    this.shoot = function(){
        guess=Math.random()
        if(guess < (this.shotprobability/10005)){
            entityList.mobProjectiles.push(new lefttanknuke(this.x,this.y,this.colour,this.projectileimage));
        this.shotprobability =0;
        }
        else{
            this.shotprobability+=1
        }
    }
}

function purpleRobotTank(x,y,angle){
    Tank.call(this,x,y,angle,"purple",document.getElementById("rightpurpleRobotTank"),document.getElementById("purplenuke1"));
    this.width=170;
    this.height=56;
    this.hitbox=new Hitbox([new rectHitbox(-85,-15,170,25),new rectHitbox(-20,10,90,18)]);

    this.shoot = function(){
        guess=Math.random()
        if(guess < (this.shotprobability/10005)){
            entityList.mobProjectiles.push(new tanknuke(this.x,this.y,this.colour,this.projectileimage));
        this.shotprobability =0;
        }
        else{
            this.shotprobability+=1
        }
    }
}

function redRobotTank(x,y,angle){
    Tank.call(this,x,y,angle,"red",document.getElementById("rightredRobotTank"),document.getElementById("rednuke1"));
    this.width=170;
    this.height=56;
    this.hitbox=new Hitbox([new rectHitbox(-85,-15,170,25),new rectHitbox(-20,10,90,18)]);

    this.shoot = function(){
        guess=Math.random()
        if(guess < (this.shotprobability/10005)){
            entityList.mobProjectiles.push(new tanknuke(this.x,this.y,this.colour,this.projectileimage));
        this.shotprobability =0;
        }
        else{
            this.shotprobability+=1
        }
    }
}

function yellowRobotTank(x,y,angle){
    Tank.call(this,x,y,angle,"yellow",document.getElementById("rightyellowRobotTank"),document.getElementById("yellownuke1"));
    this.width=170;
    this.height=56;
    this.hitbox=new Hitbox([new rectHitbox(-85,-15,170,25),new rectHitbox(-20,10,90,18)]);

    this.shoot = function(){
        guess=Math.random()
        if(guess < (this.shotprobability/10005)){
            entityList.mobProjectiles.push(new tanknuke(this.x,this.y,this.colour,this.projectileimage));
        this.shotprobability =0;
        }
        else{
            this.shotprobability+=1
        }
    }
}

function greenRobotTank(x,y,angle){
    Tank.call(this,x,y,angle,"green",document.getElementById("rightgreenRobotTank"),document.getElementById("greennuke1"));
    this.width=170;
    this.height=56;
    this.hitbox=new Hitbox([new rectHitbox(-85,-15,170,25),new rectHitbox(-20,10,90,18)]);

    this.shoot = function(){
        guess=Math.random()
        if(guess < (this.shotprobability/10005)){
            entityList.mobProjectiles.push(new tanknuke(this.x,this.y,this.colour,this.projectileimage));
        this.shotprobability =0;
        }
        else{
            this.shotprobability+=1
        }
    }
}

function RoboMothership(x,y,angle){
Mothership.call(this,x,y,angle);
this.width=200;
this.height=80;
this.hitbox= new Hitbox([new rectHitbox(-90,-30,150,40),new rectHitbox(60,-30,40,14)])
this.image0=document.getElementById("robomothership");
this.image1=document.getElementById("robomothership1");
this.image2=document.getElementById("robomothership2");
this.image3=document.getElementById("robomothership3");
this.image4=document.getElementById("robomothership4");
this.image5=document.getElementById("robomothership5");
this.image6=document.getElementById("robomothership6");
this.images=[this.image0,this.image1,this.image2,this.image3,this.image4,this.image5,this.image6];

this.spawnmob=function(){
    randommobslist=[new purpleRoboTracker(this.x,this.y+50,0), new yellowRoboTracker(this.x,this.y+50,0), new greenRoboTracker(this.x,this.y+50,0), new redRoboTracker(this.x,this.y+50,0)];
    entityList.mobList.push(randommobslist[Math.floor(Math.random()*4)]);
}
}

function redRoboTracker(x,y,angle){
    redTracker.call(this,x,y,angle);
    this.image0=document.getElementById("redrobotracker");
    this.images=[this.image0]
}

function yellowRoboTracker(x,y,angle){
    yellowTracker.call(this,x,y,angle);
    this.image0=document.getElementById("yellowrobotracker");
    this.images=[this.image0]
}

function greenRoboTracker(x,y,angle){
    greenTracker.call(this,x,y,angle);
    this.image0=document.getElementById("greenrobotracker");
    this.images=[this.image0]
    this.width=60;
    this.height=36
}

function purpleRoboTracker(x,y,angle){
    purpleTracker.call(this,x,y,angle);
    this.image0=document.getElementById("purplerobotracker");
    this.images=[this.image0]
}

function greenRoboSinMob(x,y,angle){
    GreenSinMob.call(this,x,y,angle);
    this.image=document.getElementById("greenrobosinmob");
}

function redRoboSinMob(x,y,angle){
    RedSinMob.call(this,x,y,angle);
    this.image=document.getElementById("redrobosinmob");
}

function yellowRoboSinMob(x,y,angle){
    YellowSinMob.call(this,x,y,angle);
    this.image=document.getElementById("yellowrobosinmob");
}

function purpleRoboSinMob(x,y,angle){
    PurpleSinMob.call(this,x,y,angle);
    this.image=document.getElementById("purplerobosinmob");
}