(function() {
	const lib = function() {
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
						[0, 1, 0, 0],
						[0, 1, 1, 0],
						[0, 1, 0, 0],
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
						[0, 1, 1, 0],
						[0, 0, 1, 0],
						[0, 0, 1, 0],
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
						[0, 0, 1, 0],
						[0, 0, 1, 0],
						[0, 1, 1, 0],
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
			R: {
				color: 'magenta',
				matrix: [
					[
						[1, 1, 0, 0],
						[0, 1, 1, 0],
						[0, 0, 0, 0],
						[0, 0, 0, 0]
					], [
						[0, 0, 1, 0],
						[0, 1, 1, 0],
						[0, 1, 0, 0],
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
			R: {
				color: 'brown',
				matrix: [
					[
						[0, 1, 1, 0],
						[1, 1, 0, 0],
						[0, 0, 0, 0],
						[0, 0, 0, 0]
					], [
						[0, 1, 0, 0],
						[0, 1, 1, 0],
						[0, 0, 1, 0],
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
			let type =Object.keys(types)[Math.floor(Math.random()*Object.keys(types).length)]
			actual.type= types[type]
			actual.position= 0
			actual.x= -2
			actual.y= 5
		}
		let score = 0
		let matrix = [];
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
		let hue = {
			redraw() {
				reset()
				// if (shouldReset) {
				// 	newActual()
				// 	shouldReset = false
				// 	return
				// }
				actual.x++
				let willColide = false
				for (var i=0; i < 4;i++) {
					for (var j=0; j< 4;j++) {
						console.info('parte ' + i + '/' + j + ': ' + JSON.stringify(actual))
						// console.info('parte ' + i + '/' + j + ': ' + matrix[i + actual.x + 1][j])
						// console.info('parte ' + i + '/' + j + ': ' + matrix[i + actual.x + 1])
						console.info('-----------------')
						if (actual.type.matrix[actual.position][i][j] && (!matrix[i + actual.x + 1] || matrix[i + actual.x + 1][j + actual.y])) {
							willColide = true
						}
						if (matrix[i + actual.x]) {
							matrix[i + actual.x][j + actual.y] = matrix[i + actual.x][j + actual.y] || actual.type.matrix[actual.position][i][j]
						}
					}
				}
				let table = ''
				for (var i = 0; i < 20;i++) {
					table += '<div class="row">'
					for (var j = 0; j < 10; j++) {
						table += '<div class="col" style="background-color:' + (matrix[i][j] === 1 ? actual.type.color : matrix[i][j] || 'white') + '"></div>'
					}
					table += '</div>'
				}
				container.html(table)

				if (willColide) {
					for (var i = 0; i < 20;i++) {
						for (var j = 0; j < 10; j++) {
							if (matrix[i][j] === 1) {
								matrix[i][j] = actual.type.color
							}
						}
					}
					if (actual.x < 1) {
						ended = true
						return;
					}

					newActual()
					// shouldReset = true
				}

				score += 10
				return hue
			},
			matrix: matrix,
			goToColumn(y) {

				const newY = Math.max(0, Math.min(9, y))
				let willColide = false
				for (var i=0; i < 4;i++) {
					for (var j=0; j< 4;j++) {
						if (actual.type.matrix[actual.position][i][j] && (!matrix[i + actual.x + 1] || matrix[i + actual.x + 1][j + newY])) {
							willColide = true
						}
					}
				}

				if (!willColide) {
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
				let newPosition = actual.position + 1
				if (newPosition === actual.type.matrix.length) {
					newPosition = 0
				}

				let willColide = false
				for (var i=0; i < 4;i++) {
					for (var j=0; j< 4;j++) {
						if (actual.type.matrix[newPosition][i][j] && (!matrix[i + actual.x + 1] || matrix[i + actual.x + 1][j + actual.y])) {
							willColide = true
						}
					}
				}

				if (!willColide) {
					actual.position = newPosition
				}
			},
			score() {return score},
			actual: actual,
			init(_container) {
				container = _container;
				matrix = []
				ended = false
				newActual()
				score = 0
				reset()
			}
		}
		return hue;
	}
	const tetris = lib()
	this.lib.tetris = tetris

	this.lib.tetris.mountDriver = () => {
		$(document).keydown(function(e) {
			switch(e.which) {
				case 37: // left
				console.info(tetris.actual)
					tetris.goToColumn(tetris.actual.y + 1)
				break;

				case 38: // up
					tetris.rotate()
				break;

				case 39: // right
					tetris.goToColumn(tetris.actual.x - 1)
				break;

				case 40: // down
				break;

				default: return; // exit this handler for other keys
			}
			e.preventDefault(); // prevent the default action (scroll / move caret)
		});
	}
}).apply(window)
