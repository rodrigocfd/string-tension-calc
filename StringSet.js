/**
 * String Tension Calculator
 * @author Rodrigo Cesar de Freitas Dias
 * @license MIT
 * @see https://github.com/rodrigocfd/string-tension-calc
 */

function StringSet() {

	var self = this;
	var $tpl = null;
	var onTensionChangeCB = null;
	var onMoveLeftCB = null;
	var weightUnit = 'kg';

	(function Ctor() {
		$tpl = $('#templates .stringSet').clone();
		$tpl.data('obj', self);
		fillComboPacks();
		fillComboScaleLengths();
		$tpl.find('.scaleLength option:eq(2)').prop('selected', true);

		$tpl.find('.packs').change(function() {
			StringRow.deleteAllRows($tpl.find('.rowsArea'));
			var pack = $(this).find(':selected').data('obj');
			var ord = 1;
			var scale = $tpl.find('.scaleLength :selected').data('obj');

			$.each([ pack.plain, pack.wound ], function() {
				$.each(this, function() {
					var newRow = new StringRow(ord++);
					newRow.setRowInfo(this.gauge, this.note)
						.setScaleLength(scale.inches)
						.setUnit(weightUnit);
					newRow.getBlock().appendTo($tpl.find('.rowsArea'))
						.hide().fadeIn(200);
					newRow.onTensionChange(function() {
						if (onTensionChangeCB) onTensionChangeCB();
					});
				});
			});

			if (onTensionChangeCB) onTensionChangeCB();
		});

		$tpl.find('.packs option:eq(7)').prop('selected', true).trigger('change');

		$tpl.find('.scaleLength').change(function() {
			var scale = $(this).find(':selected').data('obj');
			$tpl.find('.stringRow').each(function() {
				var row = $(this).data('obj');
				row.setScaleLength(scale.inches);
			});
		});

		$tpl.find('.changeTuning').change(function() {
			var selOpt = $(this).find(':selected');
			switch (selOpt.text()) {
				case 'E standard':  retune(['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1', 'F#1']); break;
				case 'Eb standard': retune(['D#4','A#3','F#3','C#3','G#2','D#2','A#1','F1' ]); break;
				case 'D standard':  retune(['D4', 'A3', 'F3', 'C3', 'G2', 'D2', 'A1', 'E1' ]); break;
				case 'C# standard': retune(['C#4','G#3','E3', 'B2', 'F#2','C#2','G#1','D#1']); break;
				case 'C standard':  retune(['C4', 'G3', 'D#3','A#2','F2', 'C2', 'G1', 'D1' ]);
			}
			$(this).find('option:first').prop('selected', true);
		});

		$tpl.find('.deleteSet').click(function() {
			if (confirm('Delete this set?')) {
				$tpl.fadeOut(200, function() {
					$tpl.remove();
					if (onTensionChangeCB) onTensionChangeCB();
				});
			}
		});

		$tpl.find('.moveLeft').click(function() {
			if (onMoveLeftCB) onMoveLeftCB(self);
		});
	})();

	self.getBlock = function() {
		return $tpl;
	};

	self.setColor = function(color) {
		$tpl.css('border-top', '4px solid '+color);
		return self;
	};

	self.setUnit = function(unit) {
		weightUnit = unit;
		$.each(StringRow.getAllRows($tpl.find('.rowsArea')), function() {
			this.setUnit(unit);
		});
		return self;
	};

	self.getTensions = function() {
		var tensions = [];
		$.each(StringRow.getAllRows($tpl.find('.rowsArea')), function() {
			tensions.push(this.getTension());
		});
		return tensions;
	};

	self.onTensionChange = function(callback) {
		onTensionChangeCB = callback;
		return self;
	};

	self.onMoveLeft = function(callback) {
		onMoveLeftCB = callback;
		return self;
	};

	function fillComboPacks() {
		var $cat6 = $('<optgroup label="6 strings"></optgroup>');
		var $cat7 = $('<optgroup label="7 strings"></optgroup>');
		var $cat8 = $('<optgroup label="8 strings"></optgroup>');

		$.each(PACKS, function() {
			var $newOpt = $('<option>'+this.name+'</option>');
			$newOpt.data('obj', this);
			var numStr = this.plain.length + this.wound.length;
			switch (numStr) {
				case 6: $cat6.append($newOpt); break;
				case 7: $cat7.append($newOpt); break;
				case 8: $cat8.append($newOpt);
			}
		});

		$tpl.find('.packs').append($cat6).append($cat7).append($cat8);
	}

	function fillComboScaleLengths() {
		var $cmbScale = $tpl.find('.scaleLength');
		$.each(SCALES, function() {
			var $newOpt = $('<option>'+this.scale+'</option>');
			$newOpt.data('obj', this);
			$cmbScale.append($newOpt);
		});
	}

	function retune(notes) {
		$tpl.find('.stringRow').each(function(i) {
			var row = $(this).data('obj');
			row.setRowInfo(null, notes[i]);
		});
	}
}

StringSet.getAllSets = function(container) {
	var sets = [];
	$(container).find('.stringSet').each(function() {
		sets.push($(this).data('obj'));
	});
	return sets;
};