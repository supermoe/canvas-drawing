var storage = {

	save: function (id) {
		console.log(paths);
		paths.map(function (path) {
			paper.project.activeLayer.addChild(path);
		});
		paper.view.draw();
		var drawing = {data: paper.project.exportJSON()};
		paper.project.activeLayer.removeChildren();

		var stringifiedStorage = localStorage.getItem('drawing_storage');
		var drawingStorage =  stringifiedStorage ? JSON.parse(stringifiedStorage) : [];
		drawingStorage[id] = drawing;
		localStorage.setItem('drawing_storage', JSON.stringify(drawingStorage));

		console.log(JSON.stringify(drawingStorage));
		console.log('Saved drawing in slot '+id)
	},

	load: function (id) {
		var stringifiedStorage = localStorage.getItem('drawing_storage');
		if (stringifiedStorage) {
			var drawingStorage = JSON.parse(localStorage.getItem('drawing_storage'));
			if (drawingStorage[id].data){
				paper.project.clear();
				paper.project.importJSON(drawingStorage[id].data);
				paths = paper.project.getItems({class: paper.Path});
				paper.view.draw();
				var display = document.getElementById('display')
				display.getContext('2d').clearRect(0, 0, display.width, display.height);
				display.getContext('2d').drawImage(document.getElementById('draw'), 0, 0);
				paper.project.activeLayer.removeChildren();

				console.log('Loaded drawing in slot '+id)
				return
			}
		}
		// Couldn't load drawing
		// TODO : handle error
	}

}
