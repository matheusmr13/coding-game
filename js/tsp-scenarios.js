(function () {

	let scenarios = {
		1 : (w, h) => {
			return {
				player :  { x : w / 2, y : h / 2},
				targets : [{x : w / 4, y : h / 4}],
				power : {x : 3 * w / 4, y : 3 * h / 4},
				myScore : 4
			}
		},
		2 : (w, h) => {
			return {
				player :  { x : w / 2, y : h / 2},
				targets : [{x : w / 4, y : h / 4}, {x : 3 * w / 4, y : h / 4}, {x : 3 * w / 4, y : 3 * h / 4}, {x : w / 4, y : 3 * h / 4}],
				power : {x : w / 2, y : 3 * h / 4},
				myScore : 4
			}
		},
		3 : (w, h) => {
			return {
				player :  { x : w / 2, y : 2 * h / 3},
				targets : [{x : w / 5, y : h / 4}, {x : 2 * w / 5, y : h / 4}, {x : 3 * w / 5, y : h / 4}, {x : 4 * w / 5, y : h / 4}],
				power : {x : 3 * w / 4, y : 3 * h / 4},
				myScore : 3
			}
		},
		4 : (w, h) => {
			return {
				player :  { x : w / 2, y : h / 2},
				targets : [{x : w / 5, y : h / 4}, {x : 2 * w / 5, y : h / 4}, {x : 3 * w / 5, y : h / 4}, {x : 4 * w / 5, y : h / 4},
						   {x : w / 5, y : 3 * h / 4}, {x : 2 * w / 5, y : 3 * h / 4}, {x : 3 * w / 5, y : 3 * h / 4}, {x : 4 * w / 5, y : 3 * h / 4},
						   {x : w / 5, y : h / 2}, {x : 4 * w / 5, y : h / 2}],
				power : {x : 3 * w / 4, y : 3 * h / 4},
				myScore : 3
			}
		}
	}

	this.scenarios = scenarios
}).apply(window)
