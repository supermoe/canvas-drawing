//conf
var color = '#E62062';	// Stroke color
var weight = 3;			// Stroke weight/width
var debug = true;		// Display debug
var maxSteps = 50;		// Max number of steps before splitting a stroke
var paths = [];			// All paths drawn during this session

// Entry point
function main(c_draw, c_display){
	// Init
	var drawId;
	var lastPosition = {x:0, y:0};
	var mouse = {x:0, y:0}
	var currentPath;
	var drawing = false;
	var steps = 0;
	var lastPoint;

	c_display.width = c_draw.width;
	c_display.height = c_draw.height;

	function getMouse(e) {
		var rect = c_draw.getBoundingClientRect();
		mouse.x = e.pageX || e.originalEvent.touches[0].pageX;
		mouse.y = e.pageY || e.originalEvent.touches[0].pageY;
		mouse.x -= rect.left;
		mouse.y -= rect.top;
	}

	// Update mouse position
	$(c_draw).on('tapmove', function (e) {
		getMouse(e);
		if (drawing) {
			if (lastPosition.x != mouse.x && lastPosition.y != mouse.y)
				lastPoint = draw(mouse, currentPath);
			lastPosition.x = mouse.x;
			lastPosition.y = mouse.y;
		}
		steps++;

		// Stop the stroke if too big, then start another one
		if (steps > maxSteps){
			endStroke();
			beginStroke();
		}
	});

	// Start a stroke
	$(c_draw).on('tapstart', function (e) {
		getMouse(e);
		beginStroke(true);
		drawing = true;
	});

	// End a stroke and save it
	$(c_draw).on('tapend', function (e) {
		console.log("endstroke")
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
		// Clone raw data to display canvas
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
