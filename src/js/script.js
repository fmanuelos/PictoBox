(function(){

// This demo depends on the canvas element
if(!('getContext' in document.createElement('canvas'))){
	alert('Sorry, it looks like your browser does not support canvas!');
	return false;
}

// setup canvas and audio
var ctx = document.getElementById("paper").getContext("2d");
var audio = document.getElementById("audio");

ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.lineWidth = 1;

ctx.beginPath();
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.width);
ctx.stroke();

var drawing = false;
var erasing = false;

// pencil different sizes
document.getElementById("small-pencil").addEventListener("click", function() {
	ctx.lineWidth = 1;
	ctx.strokeStyle = "#000";
	erasing = false;
}, false);

document.getElementById("normal-pencil").addEventListener("click", function() {
	ctx.lineWidth = 3;
	ctx.strokeStyle = "#000";
	erasing = false;
}, false);

document.getElementById("big-pencil").addEventListener("click", function() {
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#000";
	erasing = false;
}, false);


// eraser diferent sizes
document.getElementById("normal-eraser").addEventListener("click", function() {
	ctx.lineWidth = 3;
	ctx.strokeStyle = "#fff";
	erasing = true;
}, false);

document.getElementById("big-eraser").addEventListener("click", function() {
	ctx.lineWidth = 5;
	ctx.strokeStyle = "#fff";
	erasing = true;
}, false);


//paint seccion
document.getElementById("paper").addEventListener("mousedown", function(e) {
	drawing = true;
	ctx.beginPath();
	//ctx.moveTo(e.pageX,e.pageY);
	ctx.moveTo(e.offsetX,e.offsetY);
}, false);

document.addEventListener("mousemove", function(e) {
	if (drawing){
		//ctx.lineTo(e.pageX,e.pageY);
		ctx.lineTo(e.offsetX,e.offsetY);
		ctx.stroke();

		//play pencil sound
		if (erasing){
			//audio.play();
		} else {
			audio.play();
		}
	}
}, false);

document.addEventListener("mouseup", function() {
	drawing = false;
}, false);

document.getElementById("trash").addEventListener("click", function(e) {
	ctx.beginPath();
	ctx.fillStyle = '#fff';
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.width);
	ctx.stroke();
	//play trash sound
	audio.play();
}, false);


//ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

// download canvas image
document.getElementById('download').addEventListener('click', function() {
	this.download = "test.jpg";
	this.href = document.getElementById("paper").toDataURL("image/jpg");
}, false);

})();
