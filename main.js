var entityList = [];
const root2 = Math.sqrt(2);

// function run on start
function loadMenu() {
    gameScreen.start();
    button = new PlayButton((gameScreen.canvas.width-100)/2, (gameScreen.canvas.height-100)/2);
    button.addToScreen();
}

function loadGame() {
    entityList = [];
    player1 = new Player1(300, 100, 0);
    player2 = new Player2(100, 300, 0);
    mob1 = new Mob1(gameScreen.canvas.width/2, gameScreen.canvas.height/2, 0);
    mob2 = new Mob2(gameScreen.canvas.width/2, gameScreen.canvas.height/2+80, 0);
    player1.spawn();
    player2.spawn();
    mob1.spawn();
    mob2.spawn();
}

var gameScreen = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(main, 15);
        this.clickedKeys = []; // detecting single press of key
        this.x = -1;
        this.y = -1;
        this.pressed = false;
        this.clicked = false;

        // Event listeners
        window.addEventListener('keydown', function (e) {
            gameScreen.keys = (gameScreen.keys || []);
            gameScreen.keys[e.keyCode] = true;
            gameScreen.clickedKeys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            gameScreen.keys[e.keyCode] = false;
        })
        window.addEventListener('mousemove', function (e) {
            var rect = gameScreen.canvas.getBoundingClientRect(); // adjust for position of canvas relative to window
            gameScreen.x = e.pageX - rect.left;
            gameScreen.y = e.pageY - rect.top;
        })
        window.addEventListener('mousedown', function (e) {
            gameScreen.pressed = true;
            gameScreen.clicked = true;
        })
        window.addEventListener('mouseup', function (e) {
            gameScreen.pressed = false;
        })
    },
    clear : function() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    },
    reset : function() {
        this.clicked = false;
        this.clickedKeys = [];
    }
}

function getAngle(x1, y1, x2, y2) {
    if (x2-x1 == 0) { // division by 0
        if (y2-y1 < 0) {
            return -Math.PI/2
        }
        return Math.PI/2;
    }
    var angle = Math.atan((y2-y1)/(x2-x1));
    if (x2-x1 < 0) {
        return Math.PI + angle;
    }
    return angle;
}

function main() {
    gameScreen.clear();

    // update all the entities (movement, collision, etc.)
    entityList.forEach(e => {
        e.update();
    });
    // draw all the entities after updating them
    entityList.forEach(e => {
        e.draw(gameScreen.context);
        e.reset();
    });

    gameScreen.reset();
}
