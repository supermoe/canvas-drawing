//conf
var refreshRate = 30;   // Polling rate during a stroke
var color = '#E62062';	// Stroke color
var weight = 3;		// Stroke weight/width
var debug = true;	// Display debug

// Entry point
function main(c_draw, c_display){	
	// Init
	var drawId;
	var lastPosition = {x:0, y:0};
	var mouse = {x:0, y:0}
	var paths = [];
	var currentPath;

	c_display.width = c_draw.width;
	c_display.height = c_draw.height;
	
	// Update mouse position
	$(c_draw).mousemove(e => {
		var rect = c_draw.getBoundingClientRect();
		mouse.x = e.pageX - rect.left;
		mouse.y = e.pageY - rect.top;
	});
	
	// Start a stroke
	$(c_draw).mousedown(function (e) {
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
	$(c_draw).mouseup(() => {
		() => {
			currentPath.simplify();	
			c_display.getContext('2d').drawImage(c_draw, 0, 0);
		}();
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
