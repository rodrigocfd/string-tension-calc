/**
 * String Tension Calculator
 * @author Rodrigo Cesar de Freitas Dias
 * @license MIT
 * @see https://github.com/rodrigocfd/string-tension-calc
 */

function StringRow(ord) {

	var self = this;
	var $tpl = null;
	var onTensionChangeCB = null;
	var stringNo = 0;
	var scaleLen = 0;

	(function Ctor(ordNumber) {
		$tpl = $('#templates .stringRow').clone();
		$tpl.data('obj', self);

		stringNo = ordNumber;
		$tpl.find('.stringOrd').text([ 'E','B','G','D','A','E','B','F#' ][stringNo - 1]);
		fillComboGauges();
		fillComboNotes();

		$tpl.find('.gauge, .note').change(calcTension);
	})(ord);

	self.appendHtmlTo = function(selector) {
		$tpl.appendTo(selector).hide().fadeIn(200);
		return self;
	};

	self.getBlock = function() {
		return $tpl;
	};

	self.setUnit = function(unit) {
		$tpl.find('.lbs').toggle(unit === 'lbs');
		$tpl.find('.kg').toggle(unit === 'kg');
		return self;
	};

	self.setRowInfo = function(gauge, note) {
		if (gauge) {
			$tpl.find('.gauge option:not(:first)').each(function() {
				var $opt = $(this);
				if ($opt.data('obj').gauge === gauge) {
					$opt.prop('selected', true);
					return false;
				}
			});
		}
		if (note) {
			$tpl.find('.note option:not(:first)').each(function() {
				var $opt = $(this);
				if ($opt.data('obj').note === note) {
					$opt.prop('selected', true);
					return false;
				}
			});
		}
		calcTension();
		return self;
	};

	self.setScaleLength = function(scaleLength) {
		scaleLen = scaleLength;
		calcTension();
		return self;
	};

	self.getTension = function() {
		var gauge = $tpl.find('.gauge :selected').data('obj');
		var note = $tpl.find('.note :selected').data('obj');
		return gauge.weight * Math.pow(2 * scaleLen * note.freq, 2) / 386.088;
	};

	self.onTensionChange = function(callback) {
		onTensionChangeCB = callback;
		return self;
	};

	function fillComboGauges() {
		var $plains = $('<optgroup label="Plain"></optgroup>');
		var $wounds = $('<optgroup label="Wound"></optgroup>');

		$.each(GAUGES, function() {
			var $newOpt = $('<option>'+this.gauge+'</option>');
			$newOpt.data('obj', this);
			$newOpt.appendTo(this.gauge[this.gauge.length - 1] === 'P' ?
				$plains : $wounds);
		});

		$tpl.find('.gauge').append($plains).append($wounds);
	}

	function fillComboNotes() {
		switch (stringNo) {
			case 1: addEntries( 0,  6); break;
			case 2: addEntries( 5, 11); break;
			case 3: addEntries( 9, 15); break;
			case 4: addEntries(14, 20); break;
			case 5: addEntries(19, 25); break;
			case 6: addEntries(24, 30); break;
			case 7: addEntries(29, 35); break;
			case 8: addEntries(34, 37);
		}

		function addEntries(idxFrom, idxTo) {
			var suffixes = [ '+1','std','-1','-2','-3','-4','-5' ]
			for (var i = idxFrom; i <= idxTo; ++i) {
				var $newOpt = $('<option>'+NOTES[i].note+' ('+suffixes[i - idxFrom]+')</option>');
				$newOpt.data('obj', NOTES[i]);
				$tpl.find('.note').append($newOpt);
			}
		}
	}

	function calcTension() {
		$tpl.find('.tensionLbs').val(self.getTension().toFixed(2));
		$tpl.find('.tensionKg').val((self.getTension() * .453592).toFixed(2));
		if (onTensionChangeCB) onTensionChangeCB();
	}
}

StringRow.getAllRows = function(container) {
	var rows = [];
	$(container).find('.stringRow').each(function() {
		rows.push($(this).data('obj'));
	});
	return rows;
};

StringRow.deleteAllRows = function(container) {
	$(container).find('.stringRow').remove();
};