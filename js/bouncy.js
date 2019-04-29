//alert("hi");
//console.log("Have a nice day");

//variables for the program
var howManyDots; 
var howManyMade = 0;

var xLocs = new Array();
var yLocs = new Array();
var dXSpeed = new Array();
var dYSpeed = new Array();
var dotColor = new Array();

// for animation -- boolean variable
var movethedots = false;

var dotSize = 15;

var colors = ['Cyan', 'LightPink', 'Yellow', 
'SlateBlue', 'DarkOrange', 'lightSlateGrey', 
'OrangeRed', 'SkyBlue', 'Salmon', 'Turquoise', 
'Orchid', 'MediumBlue'];

var totalColors = colors.length;
console.log("The total number of the colors is " + totalColors);

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext('2d');

var rect = canvas.getBoundingClientRect();
var canvasW = rect.right - rect.left;
var canvasH = rect.bottom - rect.top;

function getMousePosition(canvas, event) {
	var rect = canvas.getBoundingClientRect();
	var xL = event.clientX - rect.left;
	var yL = event.clientY - rect.top;
	return {
		x: xL,
		y: yL
	};
}

function addClick(x, y) {
	xLocs.push(Math.floor(x - (dotSize/2.0)));
	yLocs.push(Math.floor(y - (dotSize/2.0)));

	var dColor = Math.floor(Math.random() * colors.length);
	dotColor.push(dColor);

	// this is for dot speed
	var randDX = 0;
	var randDY = 0;
	while (randDX === 0 && randDY === 0) {
		randDX = Math.floor(Math.random() * 9) - 4;
		randDY = Math.floor(Math.random() * 9) - 4;
	}
	dXSpeed.push(randDX);
	dYSpeed.push(randDY);
}

function redrawScene() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	for (var i = 0; i < xLocs.length; i++) {
		context.beginPath();
		context.ellipse(
			xLocs[i],
			yLocs[i],
			dotSize,
			dotSize,
			0, 0,
			Math.PI *2
			);
		var whichColorNum = dotColor[i];
		context.fillStyle = colors[whichColorNum];
		context.fill();
		context.closePath();
	}
}

function setup() {
	setTimeout(function() {
		howManyDots = prompt("How many dots would you like");
	}, 1000);
}

canvas.addEventListener('mousedown', function(event) {
		//alert("hey you called the anonymous function");
		var mousePos = getMousePosition(canvas, event);
		//alert("You clicked at (" + mousePos.x + ", " + mousePos.y + ")");

		if (howManyMade < howManyDots) {
			addClick(mousePos.x, mousePos.y);
			howManyMade++;
			redrawScene();
		}	
	}
);	

function frame() {
	if (movethedots === false) {
		clearInterval(id);
	}
	else {
		for (var i = 0; i < xLocs.length; i++) {
			var theDX = dXSpeed[i];
			var theDY = dYSpeed[i];
			xLocs[i] += theDX;
			yLocs[i] += theDY;

			//bouncing
			//run a check for left
			if (xLocs[i] < dotSize/2) {
				xLocs[i] = dotSize/2 + 1;
				dXSpeed[i] *= -1;
			}
			//run a check for right
			if (xLocs[i] > canvasW - dotSize/2) {
				xLocs[i] = canvasW - dotSize/2 -2;
				dXSpeed[i] *= -1;
			}
			//run a check for top
			if (yLocs[i] < dotSize/2) {
				yLocs[i] = dotSize/2 + 1;
				dYSpeed[i] *= -1;
			}
			//run a check for bottom
			if (yLocs[i] > canvasH - dotSize/2) {
				yLocs[i] = canvasH - dotSize/2 -2;
				dYSpeed[i] *= -1;
			}
		}
		redrawScene();
	}
}

function moveEveryBody() {
	var id = setInterval(frame, 7);
}

function toggleDotMoving() {
	if (movethedots === false) {
		moveEveryBody();
		movethedots = true;
	}
	else {
		movethedots = false;
	}
}

function doReset() {
	howManyMade = 0;
	var xLocsLen = xLocs.length;
	var yLocsLen = yLocs.length;
	var dXSpeedLen = dXSpeed.length;
	var dYSpeedLen = dYSpeed.length;
	var dotColorLen = dotColor.length;

	for (var i=0; i<xLocsLen; i++) {
		xLocs.pop();
	}
	for (var i=0; i<yLocsLen; i++) {
		yLocs.pop();
	}
	for (var i=0; i<dXSpeedLen; i++) {
		dXSpeed.pop();
	}
	for (var i=0; i<dYSpeedLen; i++) {
		dYSpeed.pop();
	}
	for (var i=0; i<dotColorLen; i++) {
		dotColor.pop();
	}
	redrawScene();
}


