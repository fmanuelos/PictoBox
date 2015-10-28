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

// download canvas image
document.getElementById('download').addEventListener('click', function() {
	this.download = "test.png";
	this.href = document.getElementById("paper").toDataURL("image/png");
}, false);

})();
