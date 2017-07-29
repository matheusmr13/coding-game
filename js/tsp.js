(function() {

	const BASE_INC = 3
	const PLAYER_SIZE = 10

	function updatePlayer(player) {
		const x  = player.target.x
		const y  = player.target.y
		const theta = x == player.x ? Math.sign(y - player.y) * Math.PI / 2 : Math.atan((y - player.y) / (x - player.x))
		const r = BASE_INC
		let dx = r * Math.cos(theta)
		dx = Math.abs(Math.min(dx, Math.abs(player.x - x)))
		let dy = r * Math.sin(theta)
		dy = Math.abs(Math.min(dy, Math.abs(player.y - y)))
		player.x += player.x > x ? -dx : dx
		player.y += player.y > y ? -dy : dy

		return player
	}

	function killTargets(player, targets) {
		targets.forEach(t => {
			if (Math.abs(t.x - player.x) < PLAYER_SIZE && Math.abs(t.y - player.y) < PLAYER_SIZE) {
				t.dead = true
			}
		})

		return targets
	}

	const lib = function() {
		let createObj = (c, x, y) => {
			return {
				container: c,
				x,
				y,
				target : {x, y},
				dead : false
			}
		}

		let player = createObj($('.player'), 100, 100)
		let targets = [
			createObj($('.enemy').eq(1), 200, 200),
			createObj($('.enemy').eq(0), 520, 400)
		]

		let characterFunctions = () => {
			return {
				moveTo(x, y) {
					player.target = {x, y}
				}
			}
		}

		let redraw = () => {
			player = updatePlayer(player)
			player.container.css('left', player.x).css('top', player.y)

			targets = killTargets(player, targets)

			targets.forEach(t => {
				if (!t.dead) {
					t.container.css('left', t.x).css('top', t.y)
				} else {
					t.container.hide()
				}
			})
		}

		const hasEnded = () => {
			let hasTargets = false
			targets.forEach(t => {
				if (!t.dead) {
					hasTargets = true
				}
			})
			return !hasTargets;
		}
		return {
			player: characterFunctions(),
			targets,
			redraw: redraw,
			hasEnded,
			init: redraw
		}
	}

	this.lib.tsp = lib()

}).apply(window)
