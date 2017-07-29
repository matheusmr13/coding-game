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
		let actual
		let newActual = () => {
			let type =Object.keys(types)[Math.floor(Math.random()*Object.keys(types).length)]
			actual = {
				type: types[type],
				position: 0,
				x: -2,
				y: 5
			}
		}
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
		return {
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
						if (actual.type.matrix[actual.position][i][j] && (!matrix[i + actual.x + 1] || matrix[i + actual.x + 1][j])) {
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
			},
			matrix: matrix,
			goToColumn(y) {
				actual.y = Math.max(0, Math.min(9, y))
			},
			ended() {
				return ended
			},
			init(_container) {
				container = _container;
				newActual()
				reset()
			}
		}
	}
	this.lib.tetris = lib()
}).apply(window)
