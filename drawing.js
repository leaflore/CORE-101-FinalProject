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
var plCoordsList = []
var plcGroupLength = []
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
            this.funcX1 = Number(x1)

            return this.funcX1
        }

        //Remap function for y
        this.remapY = function(y1){
            this.funcY1 = Number(y1) + 116

            return this.funcY1
        }
}

remapV = new Remap()

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

        //Process dataset for program manipulation
        plCoordsList[i] = split(pCoords[i], ',') //Separates the x and y coordinates from the CSV file row
        plcGroupLength[i] = (Math.round((plCoordsList[i].length) / 4) + 1) //Get amount of points in the distance to nearest grocery store

        //Convert point string into a number
        for(var j = 0; j < plCoordsList[i].length; j++){
            plCoordsList[i][j] = Number(plCoordsList[i][j])
        }
    }
    
    console.log(plCoordsList[0])
    console.log(plcGroupLength[0])
    console.log(plCoordsList[0][0])

    qple = 0 * 4

    x1 = remapV.remapX(plCoordsList[0][2])
    y1 = remapV.remapY(plCoordsList[0][3])
    x2 = remapV.remapX(plCoordsList[0][4])
    y2 = remapV.remapY(plCoordsList[0][5])
    
    console.log(y1)

   
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

        for( var j = 0; j <= plcGroupLength[i]; j++){
            
            qple = (2*j)

            x1 = remapV.remapX(plCoordsList[i][qple])
            y1 = remapV.remapY(plCoordsList[i][qple+1])
            x2 = remapV.remapX(plCoordsList[i][qple+2])
            y2 = remapV.remapY(plCoordsList[i][qple+3])

            line(x1, y1, x2, y2)


            /*console.log(x1)
            console.log(y1)
            console.log(x2)
            console.log(y2)*/
        }
       
    }
    //line(x1, y1, x2, y2)
    //ellipse(remapV.remapX(674.56), remapV.remapY(327.36), 10, 10)
    //console.log(remapV.remapX(0))
    
}
