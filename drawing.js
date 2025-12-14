/*function setup() {
    createCanvas(100,  100, SVG)
    background(255)
    fill(150)
    stroke(150)
}

function draw() {
    var r = frameCount % 200 * Math.sqrt(2)
    background(255)
    ellipse(0, 0, r, r)
}*/

//let img

//My exercise to write notes of syntax to eventually memoorize it.
//Load the image and create :) a p5.Image object.
/*function preload() {
    img = loadImage('assets/20251208_SitePlanMain.svg')
}*/

//Define file variables
var x1
var y1
var x2
var y2


//Dataset and table variables
var dataTable
var dataTableLength
var projects = []
var distToSchool = []
var xCenter = []
var yCenter = []
var pCoords = []
var pLineCoords = []
var remapV

var dotPair
var dotArray = []
var tempX
var tempY
var speed = 2.5
var raady = false


//Load image and dataset
function preload(){
    dataTable = loadTable('assets/FinalMFB_Dataset.csv', 'header')
}


/*class Dot {

    constructor(x, y) {
        this.start = createVection(x, y)
        let sourceNum = round(rand)
    }
}*/


//File Classes used in the project


function Remap(){
    this.funcX1 = 0
    this.funcY1 = 0

    //Remap function for x and y coordinates

        //Remap function for x
        this.remapX = function(x1){
            this.funcX1 = x1

            return this.funcX1
        }

        //Remap function for y
        this.remapY = function(y1){
            this.funcY1 = y1 + 116

            return this.funcY1
        }
}


//Main setup function
function setup() {
    // Ensure the SVG and canvas container exist (map.js exposes helpers)
    if (window.insertMapSVG) window.insertMapSVG('svg-container')
    if (window.ensureCanvasContainer) window.ensureCanvasContainer('svg-container', 'canvas-container')

    const canvas = createCanvas(1366, 768)
    canvas.parent('canvas-container')

    //Draw the image
    /*image(img, 0,0)*/
    // Apply any pending resize requested before p5 was ready
    _applyPendingP5Resize()

    dataTableLength = dataTable.getRowCount()

    for(var i = 0; i < dataTableLength; i++){

        //Moves data from CSV to arrays
        projects[i] = dataTable.getString(i, 0)
        distToSchool[i] = dataTable.getNum(i, 1)
        xCenter[i] = dataTable.getNum(i, 2)
        yCenter[i] = dataTable.getNum(i, 3)
        pCoords[i] = dataTable.getString(i, 4)

        pLineCoords[i] = split(pCoords[i], ',')

    }

    console.log(pLineCoords[0])
    //Separates the x and y coordinates from the CSV file row
    
}


// Handle resize requests from map.js: call p5's resizeCanvas when asked
window.addEventListener('p5resize', (e) => {
    const d = e && e.detail ? e.detail : null
    if (!d) return
    if (typeof resizeCanvas === 'function') {
        resizeCanvas(d.width, d.height)
    } else {
        // If p5 hasn't initialized yet, store pending request
        window.__pendingP5Resize = d
    }
})


// If a resize request arrived before setup ran, apply it after setup
function _applyPendingP5Resize() {
    if (window.__pendingP5Resize && typeof resizeCanvas === 'function') {
        const d = window.__pendingP5Resize
        resizeCanvas(d.width, d.height)
        delete window.__pendingP5Resize
    }
}

remapV = new Remap()
 

//Main draw function
function draw(){
    clear()

    stroke(255, 0, 0)
    strokeWeight(4)
    line(mouseX, mouseY, width/2, height/2)
    //remapV = new Remap()
    noFill()
    ellipse(width/2, height/2, 100, 100)

    //Draws the points on the map
    for( var i = 0; i < dataTableLength; i++){
        ellipse(remapV.remapX(xCenter[i]), remapV.remapY(yCenter[i]), 10, 10)

        // Create nestesd arrays for the coordinate lines
        // The loop will include maybe some sequential part in the loop that is offfset

        //Make pLCoordGroups a list for rach array goups
        /*plCoordGroups = Math.round(pLineCoords[i].length / 4)

        for( var j = 0; j < plCoordGroups; i){
            line(pLineCoords[i][j], pLineCoords[i][j+1], pLineCoords[i][j+2], pLineCoords[i][j+3])
        }*/
    }
    
    
   

    //ellipse(remapV.remapX(674.56), remapV.remapY(327.36), 10, 10)
    //console.log(remapV.remapX(0))
}
