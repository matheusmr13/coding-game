(function() {
	let startRun = null
	let time = null

	window.init = () => {
		time = 0
		startRun = null
		const scenarioId = parseInt((window.location.hash + '').replace('#', '')) || 1
		$('.item-value').text('-')
		$('[data-test="'+scenarioId+'"]').addClass('selected').siblings().removeClass('selected')
		window.lib[game] = window.lib[game].init($('.canvas'), scenarioId)
	}

	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	let game = getParameterByName('game') || 'tsp'

	const execRound = (code, timestamp) => {
		if (!startRun || timestamp - startRun >= 1000) {
			$('.time .item-value').text(time++)
			startRun = timestamp

			$('.score .item-value').text(window.lib[game].score())
		}

		const {ended, win} = window.lib[game].hasEnded()
		if (ended) {
			if (win) {
				$('body').find('.overlay, .video-win').fadeIn()
			} else {
				$('body').find('.overlay, .video-loose').fadeIn()
			}
			return;
		}

		eval('(function(lib){'+code+'})(window.lib[\''+game+'\'])')
		window.lib[game] = window.lib[game].redraw()

		window.requestAnimationFrame((timestamp) => execRound(code, timestamp))
	}

	$('button.run').click(() => {
		const code = window.editor.getValue()
		window.requestAnimationFrame((timestamp) => execRound(code, timestamp))
	})

	init()
	if (game === 'tetris') {
		window.lib.tetris.mountDriver()
	}
})()
