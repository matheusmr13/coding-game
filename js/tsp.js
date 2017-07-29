(function() {

	const BASE_INC = 3
	const PLAYER_SIZE = 10

	const calculateTheta = (p, p0) => {
		return p.x == p0.x ? Math.sign(p.y - p0.y) * Math.PI / 2 : Math.atan((p.y - p0.y) / (p.x - p0.x))
	}

	const calculateDx = (r, theta, x, x0) => {
		return Math.abs(Math.min(r * Math.cos(theta), Math.abs(x0 - x)))
	}

	const calculateDy = (r, theta, y, y0) => {
		return Math.abs(Math.min(r * Math.sin(theta), Math.abs(y0 - y)))
	}

	const createObj = (c, x, y) => {
		return {
			container: c,
			x,
			y,
			target : {x, y},
			dead : false
		}
	}

	const lib = () => {
		let player = createObj($('.player'), 100, 100)
		let targets = [
			createObj($('.enemy').eq(0), 520, 400),
			createObj($('.enemy').eq(1), 100, 200)
		]

		let characterFunctions = () => {
			return {
				moveTo(x, y) {
					player.target = {x, y}
				}
			}
		}

		const killTargets = () => {
			targets.forEach(t => {
				if (Math.abs(t.x - player.x) < PLAYER_SIZE && Math.abs(t.y - player.y) < PLAYER_SIZE) {
					t.dead = true
				}
			})

			return targets
		}

		const updatePlayer = () => {
			const {x, y}  = player.target
			const theta = calculateTheta(player.target, player)
			const r = BASE_INC
			let dx = calculateDx(r, theta, x, player.x)
			let dy = calculateDy(r, theta, y, player.y)
			player.x += player.x > x ? -dx : dx
			player.y += player.y > y ? -dy : dy

			return player
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
