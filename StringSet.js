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
		fillComboTunings();

		$tpl.find('.packs').change(function() {
			StringRow.deleteAllRows($tpl);
			var pack = $(this).find(':selected').data('obj');
			var scale = $tpl.find('.scaleLength :selected').data('obj');
			var tuning = $tpl.find('.tuning :selected').data('obj');

			$.each(pack.gauges, function(i) {
				var newRow = new StringRow(i + 1);
				newRow.setRowInfo(this, tuning.notes[i])
					.setScaleLength(scale.inches)
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
			$.each(StringRow.getAllRows($tpl), function() {
				this.setScaleLength(scale.inches);
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
			if (onMoveLeftCB) onMoveLeftCB(self);
		});

		$tpl.find('.tuning option:eq(0)').prop('selected', true);
		$tpl.find('.scaleLength option:eq(2)').prop('selected', true);
		$tpl.find('.packs option:eq(9)').prop('selected', true).trigger('change');
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
			switch (this.gauges.length) {
				case 6: $cat6.append($newOpt); break;
				case 7: $cat7.append($newOpt); break;
				case 8: $cat8.append($newOpt);
			}
		});

		return $tpl.find('.packs').append($cat6).append($cat7).append($cat8);
	}

	function fillComboScaleLengths() {
		var $cmbScale = $tpl.find('.scaleLength');
		$.each(SCALES, function() {
			var $newOpt = $('<option>'+this.scale+'</option>');
			$newOpt.data('obj', this);
			$cmbScale.append($newOpt);
		});
		return $cmbScale;
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
}

StringSet.getAllSets = function(container) {
	var sets = [];
	$(container).find('.stringSet').each(function() {
		sets.push($(this).data('obj'));
	});
	return sets;
};