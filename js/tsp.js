(function() {

	const BASE_INC = 3
	const PLAYER_SIZE = 10

	const calculateTheta = (p, p0) => {
		return p.x == p0.x ? Math.sign(p.y - p0.y) * Math.PI / 2 : Math.atan((p.y - p0.y) / (p.x - p0.x))
	}

	const calculateDx = (r, theta, x, x0) => {
		return Math.abs(Math.min(r * Math.cos(theta), Math.abs(x - x0)))
	}

	const calculateDy = (r, theta, y, y0) => {
		return Math.abs(Math.min(r * Math.sin(theta), Math.abs(y - y0)))
	}

	const createObj = (c, x, y) => {
		return {
			container : c.show(),
			coord: {x, y},
			target : {x, y},
			dead : false
		}
	}

	const initState = () => {
		let player = createObj($('.player'), 100, 100)
		let targets = [
			createObj($('.enemy').eq(0), 520, 400),
			createObj($('.enemy').eq(1), 100, 200)
		]
		let myScore = 4

		return {player, targets, myScore}
	}

	const lib = () => {
		const state = initState()
		let player = state.player
		let targets = state.targets
		let myScore = state.myScore

		let characterFunctions = () => {
			return {
				moveTo(coord) {
					player.target = coord
				}
			}
		}

		const killTargets = (player, targets) => {
			targets.forEach(t => {
				if (Math.abs(t.coord.x - player.coord.x) < PLAYER_SIZE && Math.abs(t.coord.y - player.coord.y) < PLAYER_SIZE) {
					t.dead = true
				}
			})

			return targets
		}

		const updatePlayer = (player) => {
			const {x, y}  = player.target
			const theta = calculateTheta(player.target, player.coord)
			const r = BASE_INC
			let dx = calculateDx(r, theta, x, player.coord.x)
			let dy = calculateDy(r, theta, y, player.coord.y)
			player.coord.x += player.coord.x > x ? -dx : dx
			player.coord.y += player.coord.y > y ? -dy : dy

			return player
		}

		let redraw = () => {
			player = updatePlayer(player)
			player.container.css('left', player.coord.x).css('top', player.coord.y)

			targets = killTargets(player, targets)

			targets.forEach(t => {
				if (!t.dead) {
					t.container.css('left', t.coord.x).css('top', t.coord.y)
				} else {
					t.container.hide()
				}
			})

			return {
				player: characterFunctions(),
				targets,
				redraw: redraw,
				hasEnded,
				init,
				score
			}
		}

		const hasEnded = () => {
			let hasTargets = false
			targets.forEach(t => {
				if (!t.dead) {
					hasTargets = true
				}
			})
			return {ended : !hasTargets || myScore < 0, win : myScore >= 0};
		}

		const score = () => {
			return myScore--
		}

		const init = () => {
			const state = initState()
			player = state.player
			targets = state.targets
			myScore = state.myScore
			redraw()
		}

		return {
			player: characterFunctions(),
			targets,
			redraw: redraw,
			hasEnded,
			init,
			score
		}
	}

	this.lib.tsp = lib()

}).apply(window)
