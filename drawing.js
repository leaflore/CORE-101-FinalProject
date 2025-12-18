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

var routePair
var routeArray = []
var allSegments = []
var segmentIndex = 0
var tempX
var tempY
var speed = 2.5
var ready = false

var apartmentCenters = []
var aoCenterX = []
var aoCenterY = []


//Load image and dataset
function preload(){
    dataTable = loadTable('assets/FinalMFB_Dataset.csv', 'header')
}


class Route {

    constructor(coordX1, coordY1, coordX2, coordY2) {
        this.start = createVector(coordX1, coordY1)
        this.end =  createVector(coordX2, coordY2)
        this.current = this.start.copy()
        // Below is ther percentage of the line completed
        this.angle = 0.0
        this.isDone = false
    }

    showLine() {
        line(this.start.x, this.start.y, this.current.x, this.current.y)
    }

    animateLine() {
        var tempX = map(this.angle, 0, 100, this.start.x, this.end.x, true)
        var tempY = map(this.angle, 0, 100, this.start.y, this.end.y, true)

        this.current.set(tempX, tempY)

        if (this.angle >= 100) {
            this.isDone = true
        }
        else {
            this.angle += speed
        }
    }
}


class apartmentOrigin {
    
    constructor(hoverX, hoverY, index){
        this.x = hoverX
        this.y = hoverY
        this.index = index
        this.sz = 10  // Size of the circle for hover detection
        this.hu = 200  // Hue value for the rectangle color
    }
    
    mouseHovered(){
        if(dist(mouseX, mouseY, this.x, this.y) <= this.sz/2){
            this.showInfo()  // Call as a method of this object
        }
    }

    showInfo(){
        fill(this.hu, 70, 70, 20)
        rect(this.x, this.y, 200, 100)

        fill(0)
        textSize(20)
        text(this.index, this.x - 15, this.y +15)
    }
  
}

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

        apartmentCenters[i] = new apartmentOrigin(remapV.remapX(xCenter[i]), remapV.remapY(yCenter[i]), [i])

    }

    for(var i = 0; i < dataTableLength; i++){

        // Build segments from coordinate pairs: [x1,y1,x2,y2, x3,y3,x4,y4, ...]
        // Each segment connects two points, so we step by 2 to get consecutive pairs
        for(var j = 0; j + 3 < plCoordsList[i].length; j += 2){
            
            var x1 = remapV.remapX(plCoordsList[i][j])
            var y1 = remapV.remapY(plCoordsList[i][j+1])

            var x2 = remapV.remapX(plCoordsList[i][j+2])
            var y2 = remapV.remapY(plCoordsList[i][j+3])

            append(allSegments, new Route(x1, y1, x2, y2))
        }
    }
    
    
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
        noFill()  // Ensure circles are not filled
        stroke(255, 0, 0)  // Reset stroke color for circles
        strokeWeight(4)
        ellipse(remapV.remapX(xCenter[i]), remapV.remapY(yCenter[i]), 10, 10)
        apartmentCenters[i].mouseHovered()
        
    }


    stroke(0, 0, 255)
    strokeWeight(2)

    for( var i = 0; i < segmentIndex; i++){
        var segment = allSegments[i]
        line(segment.start.x, segment.start.y, segment.end.x, segment.end.y)
    }

    if (segmentIndex < allSegments.length) {
        var currentSegment = allSegments[segmentIndex]

        currentSegment.animateLine()
        currentSegment.showLine()

        if (currentSegment.isDone) {
            segmentIndex++
        }
    }
    //line(x1, y1, x2, y2)
    //ellipse(remapV.remapX(674.56), remapV.remapY(327.36), 10, 10)
    //console.log(remapV.remapX(0))
    
}
