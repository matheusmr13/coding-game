(function() {
	const typesWidth = {
		T: [3, 2, 3, 2],
		L: [3, 2, 3, 2],
		O: [3, 2, 3, 2],
		Q: [2],
		R: [1, 4],
		S: [3, 2, 3, 2],
		H: [3, 2, 3, 2]
	}
	const types = {
		T: {
			color: 'red',
			matrix: [
				[
					[0, 1, 0, 0],
					[1, 1, 1, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				], [
					[1, 0, 0, 0],
					[1, 1, 0, 0],
					[1, 0, 0, 0],
					[0, 0, 0, 0]
				], [
					[0, 0, 0, 0],
					[1, 1, 1, 0],
					[0, 1, 0, 0],
					[0, 0, 0, 0]
				], [
					[0, 1, 0, 0],
					[1, 1, 0, 0],
					[0, 1, 0, 0],
					[0, 0, 0, 0]
				]
			]
		},
		L: {
			color: 'blue',
			matrix: [
				[
					[1, 0, 0, 0],
					[1, 1, 1, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				], [
					[1, 0, 0, 0],
					[1, 0, 0, 0],
					[1, 1, 0, 0],
					[0, 0, 0, 0]
				], [
					[1, 1, 1, 0],
					[1, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				], [
					[1, 1, 0, 0],
					[0, 1, 0, 0],
					[0, 1, 0, 0],
					[0, 0, 0, 0]
				]
			]
		},
		O: {
			color: 'green',
			matrix: [
				[
					[1, 1, 1, 0],
					[0, 0, 1, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				], [
					[0, 1, 0, 0],
					[0, 1, 0, 0],
					[1, 1, 0, 0],
					[0, 0, 0, 0]
				], [
					[1, 0, 0, 0],
					[1, 1, 1, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				], [
					[1, 1, 0, 0],
					[1, 0, 0, 0],
					[1, 0, 0, 0],
					[0, 0, 0, 0]
				]
			]
		},
		Q: {
			color: 'gray',
			matrix: [
				[
					[1, 1, 0, 0],
					[1, 1, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				]
			]
		},
		R: {
			color: 'orange',
			matrix: [
				[
					[1, 0, 0, 0],
					[1, 0, 0, 0],
					[1, 0, 0, 0],
					[1, 0, 0, 0]
				], [
					[1, 1, 1, 1],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				]
			]
		},
		S: {
			color: 'magenta',
			matrix: [
				[
					[1, 1, 0, 0],
					[0, 1, 1, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				], [
					[0, 1, 0, 0],
					[1, 1, 0, 0],
					[1, 0, 0, 0],
					[0, 0, 0, 0]
				], [
					[1, 1, 0, 0],
					[0, 1, 1, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				], [
					[1, 0, 0, 0],
					[1, 1, 0, 0],
					[0, 1, 0, 0],
					[0, 0, 0, 0]
				]
			]
		},
		H: {
			color: 'brown',
			matrix: [
				[
					[0, 1, 1, 0],
					[1, 1, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				], [
					[1, 0, 0, 0],
					[1, 1, 0, 0],
					[0, 1, 0, 0],
					[0, 0, 0, 0]
				], [
					[0, 1, 1, 0],
					[1, 1, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				], [
					[0, 1, 0, 0],
					[1, 1, 0, 0],
					[1, 0, 0, 0],
					[0, 0, 0, 0]
				]
			]
		}
	}
		
	let actual = {}
	let newActual = () => {
		let type = Object.keys(types)[Math.floor(Math.random()*Object.keys(types).length)]
		actual.type = types[type]
		actual.typeKey = type
		actual.position = 0
		actual.x = -2
		actual.y = 5
	}
	let score = 0
	let matrix = [];
	let divMatrix = [];
	let container
	const reset = () => {
		for (var i = 0; i < 20;i++) {
			let elementOnI = matrix[i]
			let line = elementOnI || []
			for (var j = 0; j < 10; j++) {
				if (!line[j]) {
					line.push(0)
				} else if (line[j] === 1) {
					line[j] = 0
				}
			}
			if (!elementOnI)
			matrix.push(line)
		}
	}
	let shouldReset = true
	let ended = false

	let hasColision = (position, y) => {
		for (var i=0; i < 4;i++) {
			for (var j=0; j< 4;j++) {
				if (actual.type.matrix[position][i][j] && (!matrix[i + actual.x + 1] || matrix[i + actual.x + 1][j + y])) {
					return true
				}
			}
		}
		return false
	}

	let updateCounter = 0
	let shouldDraw = false
	let tetris = {
		redraw() {
			reset()
			let willColide = false

			if (updateCounter > 15) {
				actual.x++
				for (var i=0; i < 4;i++) {
					for (var j=0; j< 4;j++) {
						if (actual.type.matrix[actual.position][i][j] && (!matrix[i + actual.x + 1] || matrix[i + actual.x + 1][j + actual.y])) {
							willColide = true
						}
						if (matrix[i + actual.x]) {
							matrix[i + actual.x][j + actual.y] = matrix[i + actual.x][j + actual.y] || actual.type.matrix[actual.position][i][j]
						}
					}
				}
				updateCounter = 0
				shouldDraw = true
			}
			updateCounter++
			if (shouldDraw) {
				for (var i = 0; i < 20;i++) {
					for (var j = 0; j < 10; j++) {
						divMatrix[i][j].css('background-color', (matrix[i][j] === 1 ? actual.type.color : matrix[i][j] || 'white'))
					}
				}
				shouldDraw = false
			}

			if (willColide) {
				for (var i = 0; i < 20;i++) {
					let fullLine = true
					for (var j = 0; j < 10; j++) {
						if (matrix[i][j] === 1) {
							matrix[i][j] = actual.type.color
						}
						if (!matrix[i][j]) {
							fullLine = false
						}
					}

					if (fullLine) {
						console.info('deve zerar a linha')
						divMatrix[i][0].parent().remove()

						matrix.splice(i, 1)
						matrix.unshift(Array(10).fill(0))
						divMatrix.splice(i, 1)

						const divRow = []
						const row = $('<div class="row">')
						for (var j = 0; j < 10; j++) {
							const col = $('<div class="col"></div>')
							divRow.push(col)
							row.append(col)
						}
						container.prepend(row)
						divMatrix.unshift(divRow)
					}
				}
				if (actual.x < 1) {
					ended = true
					return tetris
				}

				newActual()
			}

			score += 10
			return tetris
		},
		matrix: matrix,
		goToColumn(y) {
			shouldDraw = true
			const newY = Math.max(0, Math.min(10 - typesWidth[actual.typeKey][actual.position], y))

			if (!hasColision(actual.position, newY)) {
				actual.y = newY
			}			
		},
		hasEnded() {
			return {
				ended: ended,
				win: false
			}
		},
		rotate() {
			shouldDraw = true
			let newPosition = actual.position + 1
			if (newPosition === actual.type.matrix.length) {
				newPosition = 0
			}

			if (!hasColision(newPosition, actual.y)) {
				actual.position = newPosition
			}
		},
		score() {
			return score
		},
		actual: actual,
		init(_container) {
			container = _container;
			container.html('')
			divMatrix = []
			for (var i = 0; i < 20;i++) {
				const divRow = []
				const row = $('<div class="row">')
				for (var j = 0; j < 10; j++) {
					const col = $('<div class="col"></div>')
					divRow.push(col)
					row.append(col)
				}
				container.append(row)
				divMatrix.push(divRow)
			}
			matrix = []
			ended = false
			newActual()
			score = 0
			reset()
			return tetris
		}
	}
	this.lib.tetris = tetris
	this.lib.tetris.mountDriver = () => {
		$(document).keydown(function(e) {
			switch(e.which) {
				case 37: // left
					tetris.goToColumn(tetris.actual.y - 1)
				break;

				case 38: // up
					tetris.rotate()
				break;

				case 39: // right
					tetris.goToColumn(tetris.actual.y + 1)
				break;

				case 40: // down
				break;

				default: return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		});
	}
}).apply(window)
