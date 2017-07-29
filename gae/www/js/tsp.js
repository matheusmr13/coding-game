(function() {

	const BASE_INC = 3
	const SCORE_INC = 2
	const playerSize = 10

	let player
	let power
	let targets
	let myScore
	let repulse
	let vars
	let field = {
		min : {
			x : 0,
			y : 0
		},
		max : {
			x : 0,
			y : 0
		}
	}

	const calculateTheta = (p, p0) => {
		return p.x == p0.x ? Math.sign(p.y - p0.y) * Math.PI / 2 : Math.atan((p.y - p0.y) / (p.x - p0.x))
	}

	const calculateDx = (r, theta, x, x0) => {
		return Math.abs(Math.min(r * Math.cos(theta), Math.abs(x - x0)))
	}

	const calculateDy = (r, theta, y, y0) => {
		return Math.abs(Math.min(r * Math.sin(theta), Math.abs(y - y0)))
	}

	const distance = (p, p0) => {
		return Math.sqrt(Math.pow(p.x - p0.x, 2) + Math.pow(p.y - p0.y, 2))
	}

	const findInfinity = (p, p0) => {
		const r = 1000
		const theta = calculateTheta(p, p0)
		let dx = Math.abs(r * Math.cos(theta))
		let dy = Math.abs(r * Math.sin(theta))

		let pf = {x: p0.x, y: p0.y}
		pf.x += pf.x > p.x ? -dx : dx
		pf.y += pf.y > p.y ? -dy : dy

		return pf
	}

	const createObj = (c, coord) => {
		return {
			container : c.show(),
			coord,
			target : coord,
			dead : false
		}
	}

	const initState = (w, h, scenarioId) => {
		const scenario = scenarios[scenarioId](w, h)

		field.max = {x: w, y: h}
		$('.enemy').remove()
		let targets = []
		scenario.targets.forEach( t => {
			$('<div class="character enemy"></div>').appendTo('[data-game="tsp"]')
			targets.push(createObj($('.enemy').last(), t))
		})

		return {
			player : createObj($('.player').removeClass('power'), scenario.player),
			power : createObj($('.power').show(), scenario.power),
			targets,
			myScore : scenario.myScore
		}
	}

	const collided = (p, p0) => {
		return Math.abs(p.x - p0.x) < playerSize && Math.abs(p.y - p0.y) < playerSize
	}

	const lib = () => {
		const characterFunctions = () => {
			return {
				moveTo(coord) { player.target = coord },
				coord() { return player.coord }
			}
		}

		const powerFunctions = () => {
			return {
				coord() { return power.died ? false : power.coord }
			}
		}

		const targetsFunctions = (targets) => {
			let ts = []
			targets = targets || []
			targets.filter(t => {return !t.dead}).forEach( t => {
				ts.push({ coord() { return t.coord }})
			})

			return ts
		}

		const killTargets = (player, targets) => {
			targets.forEach(t => {
				if (!t.dead && collided(t.coord, player.coord)) {
					t.dead = repulse
					myScore = repulse ? myScore + SCORE_INC : 0
				} else if ((t.coord.x < field.min.x || t.coord.y < field.min.y) ||
						   (t.coord.x > field.max.x || t.coord.y > field.max.y)) {
					t.dead = true
				}
			})

			return targets
		}

		const updateElement = (e, r) => {
			const {x, y}  = e.target
			const theta = calculateTheta(e.target, e.coord)
			let dx = calculateDx(r, theta, x, e.coord.x)
			let dy = calculateDy(r, theta, y, e.coord.y)
			e.coord.x += e.coord.x > x ? -dx : dx
			e.coord.y += e.coord.y > y ? -dy : dy

			return e
		}

		let redraw = () => {
			player = updateElement(player, BASE_INC)
			player.container.css('left', player.coord.x).css('top', player.coord.y)

			if (!collided(player.coord, power.coord)) {
				power.container.css('left', power.coord.x).css('top', power.coord.y)
			} else {
				repulse = true
				power.died = true
				power.container.hide()
				player.container.addClass('power')
			}

			targets = killTargets(player, targets)

			targets.forEach(t => {
				if (!t.dead) {
					if (repulse) {
						t.target = findInfinity(t.coord, player.coord)
						t = updateElement(t, Math.min(0.75 * BASE_INC, BASE_INC / (0.05 * distance(t.coord, player.coord))))
					} else {
						t.target = player.coord
						t = updateElement(t, BASE_INC * 0.75)
					}
					t.container.css('left', t.coord.x).css('top', t.coord.y)
				} else {
					t.container.hide()
				}
			})

			return {
				player : characterFunctions(),
				power : powerFunctions(),
				targets : targetsFunctions(targets),
				redraw : redraw,
				hasEnded,
				init,
				score,
				vars
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

		const init = (canvas, scenarioId) => {
			const state = initState(canvas.width(), canvas.height(), scenarioId)
			player = state.player
			power = state.power
			targets = state.targets
			myScore = state.myScore
			repulse = false
			vars = {}
			return redraw()
		}

		return {
			player : characterFunctions(),
			targets : targetsFunctions(targets),
			redraw : redraw,
			hasEnded,
			init,
			score,
			vars
		}
	}

	this.lib.tsp = lib()

}).apply(window)
