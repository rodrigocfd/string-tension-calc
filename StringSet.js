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
	var weightUnit = 'kg';

	(function Ctor() {
		$tpl = $('#templates .stringSet').clone();
		$tpl.data('obj', self);
		fillComboPacks();
		fillComboScaleLengths();
		fillComboTunings();

		$tpl.find('.packs').change(function() {
			StringRow.deleteAllRows($tpl);
			var pack = $(this).find(':selected').data('obj');
			var scale = $tpl.find('.scaleLength :selected').data('obj');
			var tuning = $tpl.find('.tuning :selected').data('obj');

			$.each(pack.gauges, function(i) {
				var newRow = new StringRow(i + 1);
				newRow.setRowInfo(this, tuning.notes[i])
					.setScaleLength(calcMultiScaleLength(scale.inches, i, pack.gauges.length))
					.setUnit(weightUnit);
				newRow.getBlock().appendTo($tpl.find('.rowsArea'))
					.hide().fadeIn(200);
				newRow.onTensionChange(function() {
					if (onTensionChangeCB) onTensionChangeCB();
				});
			});

			if (onTensionChangeCB) onTensionChangeCB();
		});

		$tpl.find('.scaleLength').change(function() {
			var scale = $(this).find(':selected').data('obj');
			var pack = $tpl.find('.packs :selected').data('obj');

			$.each(StringRow.getAllRows($tpl), function(i) {
				this.setScaleLength(calcMultiScaleLength(scale.inches, i, pack.gauges.length));
			});
		});

		$tpl.find('.tuning').change(function() {
			var tuning = $(this).find(':selected').data('obj');
			$.each(StringRow.getAllRows($tpl), function(i) {
				this.setRowInfo(null, tuning.notes[i]);
			});
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
			if ($tpl.index() === 0) {
				alert('First string set cannot be moved left.');
			} else {
				$tpl.insertBefore($tpl.prev());
				if (onTensionChangeCB) onTensionChangeCB();
			}
		});

		setDefaultValues();
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
		$.each(StringRow.getAllRows($tpl), function() {
			this.setUnit(unit);
		});
		return self;
	};

	self.getTensions = function() {
		var tensions = [];
		$.each(StringRow.getAllRows($tpl), function() {
			tensions.push(this.getTension());
		});
		return tensions;
	};

	self.onTensionChange = function(callback) {
		onTensionChangeCB = callback;
		return self;
	};

	function fillComboPacks() {
		$.each(PACKS, function() {
			var $newOpt = $('<option>'+this.name+'</option>');
			$newOpt.data('obj', this);
			$tpl.find('.pack'+this.gauges.length).append($newOpt);
		});
		return $tpl.find('.packs');
	}

	function fillComboScaleLengths() {
		$.each(SCALES, function() {
			var $newOpt = $('<option>'+this.scale+'</option>');
			$newOpt.data('obj', this);
			var simpleOrMulti = (this.inches[0] == this.inches[1]) ? 'S' : 'M';
			$tpl.find('.scale'+simpleOrMulti).append($newOpt);
		});
		return $tpl.find('.scaleLength');
	}

	function fillComboTunings() {
		var $cmbTuning = $tpl.find('.tuning');
		$.each(TUNINGS, function() {
			var $newOpt = $('<option>'+this.tuning+'</option>');
			$newOpt.data('obj', this);
			$cmbTuning.append($newOpt);
		});
		return $cmbTuning;
	}

	function setDefaultValues() {
		$.each(['.tuning', '.scaleLength', '.packs'], function() {
			$tpl.find(this+' option').each(function() {
				var $opt = $(this);
				if ($opt.data('obj').defaultSel) {
					$opt.prop('selected', true);
					return false;
				}
			});
		});
		$tpl.find('.packs').trigger('change');
	}

	function calcMultiScaleLength(scales, num, totalStrings) {
		return scales[0] - (scales[0] - scales[1]) * (num / (totalStrings - 1));
	}
}

StringSet.getAllSets = function(container) {
	var sets = [];
	$(container).find('.stringSet').each(function() {
		sets.push($(this).data('obj'));
	});
	return sets;
};