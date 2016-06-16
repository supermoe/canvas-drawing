//conf
var refreshRate = 30;   // Polling rate during a stroke
var color = '#E62062';	// Stroke color
var simplify = true;	// Whether to simplify drawn strokes or not
var weight = 3;		// Stroke weight/width

// Entry point
function main(canvas){	
	// Init
	var drawId;
	var lastPosition = {x:0, y:0};
	var mouse = {x:0, y:0}
	var paths = [];
	var currentPath;


	
	// Update mouse position
	$(canvas).mousemove(e => {
		var rect = canvas.getBoundingClientRect();
		mouse.x = e.pageX - rect.left;
		mouse.y = e.pageY - rect.top;
	});
	
	// Start a stroke
	$(canvas).mousedown(function (e) {
		currentPath = new paper.Path();
		currentPath.strokeColor = color;
		currentPath.strokeWidth = weight;
		drawId = setInterval(() => {
			if (lastPosition.x != mouse.x && lastPosition.y != mouse.y)
				draw(mouse, currentPath);
			lastPosition.x = mouse.x;
			lastPosition.y = mouse.y;
		}, 1000/refreshRate);
	});

	// End a stroke and save it
	$(canvas).mouseup(() => {
		if (simplify) currentPath.simplify();
		paths.push(currentPath);
		clearInterval(drawId);
	});

}

// Draw a point
function draw(mouse, path){
	path.add(mouse.x, mouse.y);
	console.log("drawing");
	paper.view.draw();
}
