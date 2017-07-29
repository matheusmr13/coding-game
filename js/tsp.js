(function() {

	const lib = function() {
		let createObj = (c, x, y) => {
			return {
				container: c,
				x,
				y
			}
		}
		let characters = {
			player: createObj($('.player'), 0, 0),
			enemy: createObj($('.enemy'), 200, 0)
		}
		let shotPlayer = createObj($('.shot-player'), 0, 0)
		let shotEnemy = createObj($('.shot-enemy'), 0, 0)


		let characterFunctions = (character) => {
			character = characters[character]
			return {
				walk(side) {
					const sides = {
						LEFT: () => character.x += 100,
						RIGHT: () => character.x -= 100,
						TOP: () => character.y += 100,
						BOT: () => character.y -= 100
					}[side]()
					redraw()
				}
			}
		}
		let redraw = () => {
			let redrawPart = (part) => {
				part.container.css('left', part.x).css('top', part.y)
			}
			redrawPart(characters.player)
			redrawPart(shotPlayer)
			redrawPart(characters.enemy)
			redrawPart(shotEnemy)
		}
		return {
			player: characterFunctions('player'),
			enemy:  characterFunctions('enemy'),
			redraw: redraw
		}
	}

	this.lib = lib()

}).apply(window)
