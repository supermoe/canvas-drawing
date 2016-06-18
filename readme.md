## Storage
Drawings are stored in localStorage.
format is as such :

	drawing_storage : "stringified array"
	drawing_storage[i] : {data: [paper.js JSON project]}

use **storage.save(slot_number)** and **storage.load(slot_number)** to save or load a specific slot;
