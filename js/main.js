//conf
var color = '#E62062';	// Stroke color
var weight = 3;			// Stroke weight/width
var debug = true;		// Display debug
var maxSteps = 50;		// Max number of steps before splitting a stroke

// Entry point
function main(c_draw, c_display){
	// Init
	var drawId;
	var lastPosition = {x:0, y:0};
	var mouse = {x:0, y:0}
	var paths = [];
	var currentPath;
	var drawing = false;
	var steps = 0;
	var lastPoint;

	c_display.width = c_draw.width;
	c_display.height = c_draw.height;

	// Update mouse position
	$(c_draw).mousemove(e => {
		var rect = c_draw.getBoundingClientRect();
		mouse.x = e.pageX - rect.left;
		mouse.y = e.pageY - rect.top;
		if (drawing) {
			if (lastPosition.x != mouse.x && lastPosition.y != mouse.y)
				lastPoint = draw(mouse, currentPath);
			lastPosition.x = mouse.x;
			lastPosition.y = mouse.y;
		}
		steps++;
		if (steps > maxSteps){
			console.log(steps);
			endStroke();
			beginStroke();
		}
	});

	// Start a stroke
	$(c_draw).mousedown(function (e) {
		beginStroke(true);
		drawing = true;
	});

	// End a stroke and save it
	$(c_draw).mouseup(function () {
		endStroke();
		drawing = false;
	});

	function beginStroke(start) {
		currentPath = new paper.Path();
		currentPath.strokeColor = color;
		currentPath.strokeWidth = weight;
		currentPath.add(start ? mouse.x : lastPoint._point.x, start ? mouse.y : lastPoint._point.y);
		steps = 0;
	}

	function endStroke() {
		currentPath.simplify();
		paths.push(currentPath);
		paper.view.draw();
		c_display.getContext('2d').drawImage(c_draw, 0, 0);
		paper.project.activeLayer.removeChildren();
	}

}
// Draw a point
function draw(mouse, path){
	var pt = path.add(mouse.x, mouse.y);
	paper.view.draw();
	return pt;
}
