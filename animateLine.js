// Animated Line Drawing
// https://stackoverflow.com/questions/60032243/drawing-animated-lines-in-sequence-p5-js/60033863#60033863


var dotPair;
var dotArray = [];
var tempX;
var tempY;
// .5 is slow 2 is faster
var speed = 2.5; 
var ready = false; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  // r,g,b and trans 0 is clear 255 is opaque
  stroke(0, 255, 0, 100);
  strokeWeight(5);
  // initial dot
  dotArray.push(new Dot(50, 50));
}

function draw() {
    background(245); // light gray 

    for(let i = 0; i < dotArray.length; i++){
        dotArray[i].showDotPair();
    }
    
    // here is the line that we draw from start to end
    // it justs adds speed to percent done
    dotArray[dotArray.length-1].animateLine();
  
    for(let i = 0; i < dotArray.length; i++){
        dotArray[i].showLine();
    }

    if(ready){
        ready = false; 
        let prev = dotArray[dotArray.length-1];
        dotArray.push(new Dot(prev.end.x, prev.end.y));
    }
}

class Dot {

    constructor(x, y) {
        this.start = createVector(x, y);
        let sourceNum = round(random(0,10));
        let targetNum = round(random(0,10));
        this.end = createVector(20 + targetNum*40, 20 + sourceNum*40);
        this.current = this.end;
        // shoud be percent to end of line
        this.angle = 0.0;
    }

    showDotPair() {
        push();
        fill('blue');
        noStroke();
        circle(this.start.x, this.start.y, 15);
        fill('orange');
        circle(this.end.x, this.end.y, 15);
        pop();
    }

    showLine() {
        line(this.start.x, this.start.y, this.current.x, this.current.y)
    }

    animateLine() {
        // 6th arg says stay withinBounds of last two values
        tempX = map(this.angle, 0, 100, this.start.x, this.end.x, 1);
        tempY = map(this.angle, 0, 100, this.start.y, this.end.y, 1);

        this.current = createVector(tempX, tempY);

        if (tempX == this.end.x && tempY == this.end.y) {
          ready = true; 
        }
        this.angle += speed;
    }
}