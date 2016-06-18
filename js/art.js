var art = {
	// Init
	lastPosition: {x:0, y:0},
	mouse: {x:0, y:0},
	currentPath: null,
	drawing: false,
	steps: 0,
	lastPoint: {x:0, y:0},

	init: function (c_draw, c_display){
		this.c_draw = c_draw;
		this.c_display = c_display;
		c_display.width = c_draw.width;
		c_display.height = c_draw.height;


		// Update mouse position
		$(c_draw).on('tapmove', function (e) {
			this.updateMouse(e);
			if (this.drawing) {
				if (this.lastPosition.x != this.mouse.x && this.lastPosition.y != this.mouse.y)
					this.lastPoint = this.draw(this.mouse, this.currentPath);
				this.lastPosition.x = this.mouse.x;
				this.lastPosition.y = this.mouse.y;
			}
			this.steps++;

			// Stop the stroke if too big, then start another one
			if (this.steps > maxSteps){
				this.endStroke();
				this.beginStroke();
			}
		}.bind(this));


		// Start a stroke
		$(c_draw).on('tapstart', function (e) {
			this.updateMouse(e);
			this.beginStroke(true);
			this.drawing = true;
		}.bind(this));

		// End a stroke and save it
		$(c_draw).on('tapend', function (e) {
			this.endStroke();
			this.drawing = false;
		}.bind(this));
	},

	updateMouse: function (e) {
		var rect = this.c_draw.getBoundingClientRect();
		this.mouse.x = e.pageX || e.originalEvent.touches[0].pageX;
		this.mouse.y = e.pageY || e.originalEvent.touches[0].pageY;
		this.mouse.x -= rect.left;
		this.mouse.y -= rect.top;
	},

	beginStroke: function (start) {
		this.currentPath = new paper.Path();
		this.currentPath.strokeColor = color;
		this.currentPath.strokeWidth = weight;
		this.currentPath.add(start ? this.mouse.x : this.lastPoint._point.x, start ? this.mouse.y : this.lastPoint._point.y);
		this.steps = 0;
	},

	endStroke: function () {
		this.currentPath.simplify();
		paths.push(this.currentPath);
		paper.view.draw();
		// Clone raw data to display canvas
		this.c_display.getContext('2d').drawImage(this.c_draw, 0, 0);
		paper.project.activeLayer.removeChildren();
	},

	// Draw a point
	draw: function (point, path){
		var pt = path.add(point.x, point.y);
		paper.view.draw();
		return pt;
	}
}
