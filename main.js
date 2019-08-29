/**
 * String Tension Calculator
 * @author Rodrigo Cesar de Freitas Dias
 * @license MIT
 * @see https://github.com/rodrigocfd/string-tension-calc
 */

$(document).ready(() => {
	$('[name=unit]').on('change', ev => {
		let unit = $(ev.currentTarget).val();
		for (let sset of StringSet.getAllSets('#setsArea')) {
			sset.setUnit(unit);
		}
		updatePlot();
	});

	$('#newStringSet').focus().on('click', () => {
		let newSet = new StringSet();
		newSet.getBlock().insertBefore('#newStringSet')
			.hide().fadeIn(200);
		newSet.onTensionChange(updatePlot);
		$('[name=unit]:checked').trigger('change');
	});
});

function updatePlot() {
	let tensionSeries = [];
	$.each(StringSet.getAllSets('#setsArea'), (i, setArea) => {
		setArea.setColor(COLORS[i % COLORS.length]);
		let series = {
			color: COLORS[i % COLORS.length],
			points: { radius: 6 },
			data: []
		};
		$.each(setArea.getTensions(), (j, tension) => {
			if ($('[name=unit]:checked').val() === 'kg') tension *= .453592;
			series.data.push([ j, tension ]);
		});
		tensionSeries.push(series);
	});

	if (tensionSeries.length) {
		let xTicks = [];
		$.each([ 'E','B','G','D','A','E','(B)','(F#)' ], (i, ciph) => {
			xTicks.push([ i, ciph ]);
		});

		$('#plotArea').hide().fadeIn(200);
		$.plot('#plotArea', tensionSeries, {
			grid: {
				borderColor: '#999',
				borderWidth: 1
			},
			lines: { show: true, lineWidth: 2 },
			points: { show: true, lineWidth: 3 },
			xaxis: { ticks: xTicks }
		});
	} else {
		$('#plotArea').fadeOut(200);
	}
}
