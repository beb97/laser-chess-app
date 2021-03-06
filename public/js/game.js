// Game
var game;
var settings;
var fps = 25;
// IHM
var cnv;

function setup() {
    // frameRate(5);
    frameRate(fps);
    angleMode(DEGREES);
    game = new Game();
    settings = game.settings;
    game.draw();
}

function draw() {
    game.update();
    game.board.draw();
}

function mousePressed() {
        game.board.commands.handleClick();
}

function keyPressed() {
        game.board.commands.handleKey();
}

function windowResized() {
    cnv = game.getCanevasSize();
    resizeCanvas(cnv.x, cnv.y);
    for (let player of game.board.players.list) {
        // player.createSlider();
        player.setSliderSize();
    }
}

class Settings {
    constructor(boardwidth = 10, boardHeight = 8) {
        this.boardwidth = boardwidth;
        this.boardHeight = boardHeight;
        this.boardColor = '#888888';
        this.laserColor = color(255,0,0,150);
        this.laserStroke = 7;
        this.cellSize = 60;
        this.cellColor = 'white';
        this.cellColorPlayerAlpha = 100;
        this.cellColorTarget = color(250,250,0,200);
        this.cellStroke = 1;
        this.cellStrokeColor = 'black';
        this.cellStrokeColorHover = 'blue';
        this.cellStrokeHover = 3;
        this.pieceStroke = 2;
        this.pieceStrokeColor = 'black';
        this.pieceStrokeColorHover = 'blue';
    }
}

class Game {
    constructor() {
        this.settings = new Settings();
        this.board = new Board(this.settings.boardwidth, this.settings.boardHeight);
        this.multi = new Multi();
    }

    reset() {
        for (let player of game.board.players.list) {
            player.slider.remove();
        }
        // delete game.settings;
        delete game.board;
        // this.settings = new Settings();
        this.board = new Board(this.settings.boardwidth, this.settings.boardHeight);
    }

    update() {
        this.board.update();
    }

    withinCanevas(x,y) {
        return (0 < x && x <= cnv.x) && ( 0 < y && y <= cnv.y);
    }

    draw() {
        // CANEVAS
        cnv = this.getCanevasSize();
        createCanvas(cnv.x, cnv.y).parent('canevas');
    }

    mouseCoord() {
        return createVector(mouseX,mouseY);
    }

    getCanevasSize() {
        const cWidthIni = $('#canevas').width();
        const cWidth = constrain(cWidthIni, 100, 600);
        game.settings.cellSize = cWidth / game.settings.boardwidth;
        const cHeight = game.settings.cellSize  * game.settings.boardHeight +1;
        return createVector(cWidth,cHeight);
    }

    prompt(message) {
        $('#prompt').text(message);
    }
}
