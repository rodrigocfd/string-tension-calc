/**
 * String Tension Calculator
 * @author Rodrigo Cesar de Freitas Dias
 * @license MIT
 * @see https://github.com/rodrigocfd/string-tension-calc
 */

$(document).ready(function() {
	$('[name=unit]').change(function() {
		var unit = $(this).val();
		$.each(StringSet.getAllSets('#setsArea'), function() {
			this.setUnit(unit);
		});
		updatePlot();
	});

	$('#newStringSet').focus().click(function() {
		var newSet = new StringSet();
		newSet.getBlock().insertBefore('#newStringSet')
			.hide().fadeIn(200);
		newSet.onTensionChange(updatePlot);
		$('[name=unit]:checked').trigger('change');
	});
});

function updatePlot() {
	var tensionSeries = [];
	$.each(StringSet.getAllSets('#setsArea'), function(i) {
		this.setColor(COLORS[i % COLORS.length]);
		var series = {
			color: COLORS[i % COLORS.length],
			points: { radius: 6 },
			data: []
		};
		$.each(this.getTensions(), function(j) {
			var tension = this;
			if ($('[name=unit]:checked').val() === 'kg') tension *= .453592;
			series.data.push([ j, tension ]);
		});
		tensionSeries.push(series);
	});

	if (tensionSeries.length) {
		var xTicks = [];
		$.each([ 'E','B','G','D','A','E','(B)','(F#)' ], function(i) {
			xTicks.push([ i, this ]);
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