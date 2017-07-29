(function() {

	const BASE_INC = 15

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
						LEFT: () => character.x += BASE_INC,
						RIGHT: () => character.x -= BASE_INC,
						TOP: () => character.y += BASE_INC,
						BOT: () => character.y -= BASE_INC
					}[side]()
					redraw()
				},
				moveTo(x, y) {
					const theta = x == character.x ? Math.sign(y - character.y) * Math.PI / 2 : Math.atan((y - character.y) / (x - character.x))
					const r = BASE_INC
					let dx = r * Math.cos(theta)
					dx = Math.abs(Math.min(dx, Math.abs(character.x - x)))
					let dy = r * Math.sin(theta)
					dy = Math.abs(Math.min(dy, Math.abs(character.y - y)))
					character.x += character.x > x ? -dx : dx
					character.y += character.y > y ? -dy : dy
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
			redraw: redraw,
			init: redraw
		}
	}

	this.lib.tsp = lib()

}).apply(window)
