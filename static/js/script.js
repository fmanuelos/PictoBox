(function(){

// This demo depends on the canvas element
if(!('getContext' in document.createElement('canvas'))){
	alert('Sorry, it looks like your browser does not support canvas!');
	return false;
}

// setup canvas and audio
var ctx = document.getElementById("paper").getContext("2d");
var audio = document.getElementById("audio");

// ctx.lineCap = "round";
// ctx.lineJoin = "round";
ctx.lineWidth = 1;
ctx.beginPath();

var drawing = false;

document.getElementById("paper").addEventListener("mousedown", function(e) {
		drawing = true;
		ctx.moveTo(e.pageX,e.pageY);
}, false);

document.addEventListener("mousemove", function(e) {
	if(drawing){
		ctx.lineTo(e.pageX,e.pageY);
		ctx.stroke();

		//play write sound
		audio.play();
	}
}, false);

document.addEventListener("mouseup", function() {
	drawing = false;
}, false);

//ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

// save canvas image button
document.getElementById("button").addEventListener("click", function(){

	var canvas = document.getElementById("paper");
	var saveContext=document.getElementById("paper2").getContext("2d");
	var base_image = new Image();

	saveContext.mozImageSmoothingEnabled = false;
	saveContext.webkitImageSmoothingEnabled = false;
	saveContext.msImageSmoothingEnabled = false;
	saveContext.imageSmoothingEnabled = false;

	// save canvas image as data url (png format by default)
    base_image.src = canvas.toDataURL("image/png");

	saveContext.drawImage(base_image, 0, 0, 500, 500);

}, false);

})();
