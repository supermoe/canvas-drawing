## Storage
Drawings are stored in localStorage.
format is as such :

	drawing_storage : "stringified array"
	drawing_storage[i] : {data: [paper.js JSON project]}

use **save(slot_number)** and **load(slot_number)** to save or load a specific slot;
