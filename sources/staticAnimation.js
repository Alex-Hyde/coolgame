// animation that stays in one position on the screen
function staticAnimation(imageList, x, y, w, h, delay = 1, cycles = 1, back = false) {
    this.imageList = imageList;
    this.delay = delay;
    this.index = 0;
    this.cycles = cycles;
    this.x1 = x;
    this.y1 = y;
    this.w1 = w;
    this.h1 = h;
    this.back = back;
    if (back) {
        entityList.staticTexturesBack.push(this);
    } else {
        entityList.staticTextures.push(this);
    }

    this.draw = function(ctx) {
        if (this.index/this.delay < this.imageList.length) {
            ctx.drawImage(this.imageList[Math.floor(this.index/this.delay)], this.x1, this.y1, this.w1, this.h1);
            this.index++;
        } else if(this.cycles != 1) {
            this.cycles--;
            this.index = 0;
        } else {
            if (this.back) {
                var index = entityList.staticTexturesBack.indexOf(this);
                if (index != -1) {
                    entityList.staticTexturesBack.splice(index, 1);
                }
            } else {
                var index = entityList.staticTextures.indexOf(this);
                if (index != -1) {
                    entityList.staticTextures.splice(index, 1);
                }
            }
        }
    }
}

function explosionAnimation(x, y, w, h, delay = 5, cycles = 1) {
    var imageList = [document.getElementById("explosion1"), document.getElementById("explosion2"), document.getElementById("explosion1")];
    staticAnimation.call(this, imageList, x, y, w, h, delay, cycles);
}

function portalAnimation(x, y, w, h, delay = 5, cycles = 1) {
    var imageList = [document.getElementById("portal1"), document.getElementById("portal2"), document.getElementById("portal3"),
                     document.getElementById("portal2"), document.getElementById("portal1")];
    staticAnimation.call(this, imageList, x, y, w, h, delay, cycles, true);
}

function damageAnimation(x, y, w, h, delay = 1, cycles = 1){
    var imageList=[document.getElementById("damage_explosion"),document.getElementById("damage_explosion1"),
                    document.getElementById("damage_explosion2"),document.getElementById("damage_explosion3"),
                    document.getElementById("damage_explosion4"),document.getElementById("damage_explosion5"),
                    document.getElementById("damage_explosion6"),document.getElementById("damage_explosion7"),
                    document.getElementById("damage_explosion8"),document.getElementById("damage_explosion9")];
    staticAnimation.call(this,imageList,x,y,w,h,delay,cycles);
}