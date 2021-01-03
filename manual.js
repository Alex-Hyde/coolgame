function loadInstructions(bgCoord) {
    entityList.clear();
    entityList.other.push(new InstructionsScreen(bgCoord));
}

function InstructionsScreen(bgCoord) {
    this.pages = [[document.getElementById("manualpage1")],
    [document.getElementById("manualpage2-1"), document.getElementById("manualpage2-3"), document.getElementById("manualpage2-2"), document.getElementById("manualpage2-3"), 
    document.getElementById("manualpage2-4"), document.getElementById("manualpage2-6"), document.getElementById("manualpage2-5"), document.getElementById("manualpage2-6"), document.getElementById("manualpage2-7"), document.getElementById("manualpage2-9"),
    document.getElementById("manualpage2-8"), document.getElementById("manualpage2-9"), document.getElementById("manualpage2-10"), document.getElementById("manualpage2-12"), document.getElementById("manualpage2-11"),
    document.getElementById("manualpage2-12")]];
    this.pageIndex = 0;
    this.currentPage = this.pages[this.pageIndex];
    this.lastRefresh = 0;
    this.animationIndex = 0;
    this.x = bgCoord;
    this.menuBG = document.getElementById("menuBG");
    this.shipBG = document.getElementById("inventoryShipBG");
    this.buttonList = [];
    this.nextLastButtonList = [];
    this.buttonList.push(new CloseInstructionsButton());
    
    this.draw = function(ctx) {
        this.currentPage = this.pages[this.pageIndex];
        ctx.drawImage(this.menuBG, this.x, 0, gameScreen.canvas.width, gameScreen.canvas.height, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        if (this.x > 3000 -gameScreen.canvas.width) {
            ctx.drawImage(this.menuBG, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height, 3000 - this.x, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        }
        ctx.drawImage(this.shipBG, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height, 0, 0, gameScreen.canvas.width, gameScreen.canvas.height);
        refresh = new Date().getTime();
        if (refresh - this.lastRefresh > 600) {
            this.lastRefresh = refresh
            this.animationIndex++;
        }
        ctx.drawImage(this.currentPage[this.animationIndex % this.currentPage.length],80,-30);
        this.buttonList.forEach(b => {
            b.draw(ctx);
        });
        this.nextLastButtonList.forEach(b => {
            b.draw(ctx);
        });

    }
    this.update = function() {
        this.currentPage = this.pages[this.pageIndex];
        this.x += 0.5;
        this.x = this.x % 3000;
        if (this.pageIndex == 0) {
            this.nextLastButtonList.push(new NextPageButton(1));
        } else if (this.pageIndex == 1) {
            this.nextLastButtonList.push(new NextPageButton(2));
            this.nextLastButtonList.push(new PreviousPageButton(0));
        } else if (this.pageIndex == 2) {
            this.nextLastButtonList.push(new NextPageButton(3));
            this.nextLastButtonList.push(new PreviousPageButton(1));
        } else if (this.pageIndex == 3) {
            this.nextLastButtonList.push(new NextPageButton(4));
            this.nextLastButtonList.push(new PreviousPageButton(2));
        } else if (this.pageIndex == 4) {
            this.nextLastButtonList.push(new PreviousPageButton(3));
        }
        this.buttonList.forEach(b => {
            b.update();
        });
        this.nextLastButtonList.forEach(b => {
            b.update();
        });
    }
}


function OpenInstructionsButton() {
    Button.call(this, 90, 320, 89, 70);
    this.defaultImage = document.getElementById("manualopenbutton");
    this.hoverImage = document.getElementById("manualopenbuttonhovered");
    this.pressedImage = document.getElementById("manualopenbuttonpressed");
    this.image = this.defaultImage;
    
    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    this.onHover = function() {
        this.image = this.hoverImage;
    }

    this.onUnHover = function() {
        this.image = this.defaultImage;
    }

    this.onClick = function() {
        this.image = this.pressedImage;
    }

    this.onRelease = function() {
        loadInstructions(entityList.other[0].x);
    }
}

function CloseInstructionsButton() {
    Button.call(this, 770, 30, 20, 20);
    this.defaultImage = document.getElementById("manualexitbutton");
    this.hoverImage = document.getElementById("manualexitbuttonhovered");
    this.pressedImage = document.getElementById("manualexitbuttonpressed");
    this.image = this.defaultImage;
    
    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    this.onRelease = function() {
        loadMenu();
        this.w -= 4;
        this.h -= 4;
        this.x += 2;
        this.y += 2;
    }

    this.onClick = function() {
        this.image = this.pressedImage;
    }

    this.onHover = function() {
        this.image = this.hoverImage;
    }

    this.onUnHover = function() {
        this.image = this.defaultImage;
    }
}

function NextPageButton(next) {
    Button.call(this, 790, 200, 50, 125);
    this.defaultImage = document.getElementById("manualnextbutton");
    this.hoverImage = document.getElementById("manualnextbuttonhovered");
    this.pressedImage = document.getElementById("manualnextbuttonpressed");
    this.image = this.defaultImage;
    this.ticks = 0;
    this.pressed = false;
    this.coolDown = 1000;
    this.next = next
    
    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    this.onRelease = function() {
        entityList.other[0].pageIndex = this.next;
        entityList.other[0].nextLastButtonList = [];
    }

    this.onClick = function() {
        this.image = this.pressedImage;
    }

    this.onHover = function() {
        this.image = this.hoverImage;
    }

    this.onUnHover = function() {
        this.image = this.defaultImage;
    }
}

function PreviousPageButton(previous) {
    Button.call(this, 100, 200, 50, 125);
    this.defaultImage = document.getElementById("manualbackbutton");
    this.hoverImage = document.getElementById("manualbackbuttonhovered");
    this.pressedImage = document.getElementById("manualbackbuttonpressed");
    this.image = this.defaultImage;
    this.lastPressed = 0;
    this.coolDown = 1000;
    this.pressed = false;
    this.previous = previous;
    
    this.draw = function(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    this.onRelease = function() {
        entityList.other[0].pageIndex = this.previous;
        entityList.other[0].nextLastButtonList = [];
    }

    this.onClick = function() {
        this.image = this.pressedImage;
    }

    this.onHover = function() {
        this.image = this.hoverImage;
    }

    this.onUnHover = function() {
        this.image = this.defaultImage;
    }
}