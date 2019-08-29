/**
 * String Tension Calculator
 * @author Rodrigo Cesar de Freitas Dias
 * @license MIT
 * @see https://github.com/rodrigocfd/string-tension-calc
 */

class StringRow {
	constructor(stringNo) {
		this.$tpl = $('#templates .stringRow').clone();
		this.$tpl.data('obj', this);

		this.stringNo = stringNo;
		this.$tpl.find('.stringOrd').text([ 'E','B','G','D','A','E','B','F#' ][this.stringNo - 1]);

		this.scaleLen = 0;
		this.packDefinedGauge = null;
		this.packDefinedNote = null;
		this.onTensionChangeCB = null;

		this.fillComboGauges();
		this.fillComboNotes();

		this.$tpl.find('.gauge').change(ev => {
			let $cmb = $(ev.currentTarget);
			$cmb.toggleClass('modified',
				$cmb.find(':selected').text() !== this.packDefinedGauge);
			this.calcTension();
		});

		this.$tpl.find('.note').change(ev => {
			let $cmb = $(ev.currentTarget);
			$cmb.toggleClass('modified',
				$cmb.find(':selected').data('obj').note !== this.packDefinedNote);
			this.calcTension();
		});
	}

	appendHtmlTo(selector) {
		this.$tpl.appendTo(selector).hide().fadeIn(200);
		return this;
	}

	getBlock() {
		return this.$tpl;
	}

	setUnit(unit) {
		this.$tpl.find('.lbs').toggle(unit === 'lbs');
		this.$tpl.find('.kg').toggle(unit === 'kg');
		return this;
	}

	setRowInfo(gauge, note) {
		if (gauge) {
			this.packDefinedGauge = gauge;
			$('.gauge').removeClass('modified');
			this.$tpl.find('.gauge option').each((idx, elem) => {
				let $opt = $(elem);
				if ($opt.text() == gauge) {
					$opt.prop('selected', true);
					return false;
				}
			});
		}
		if (note) {
			this.packDefinedNote = note;
			$('.note').removeClass('modified');
			this.$tpl.find('.note option').each((i, elem) => {
				let $opt = $(elem);
				if ($opt.data('obj').note == note) {
					$opt.prop('selected', true);
					return false;
				}
			});
		}
		this.calcTension();
		return this;
	}

	setScaleLength(scaleLength) {
		this.scaleLen = scaleLength;
		this.calcTension();
		return this;
	}

	getTension() {
		let gauge = this.$tpl.find('.gauge :selected').text();
		let note = this.$tpl.find('.note :selected').data('obj');
		let fGauge = parseFloat(gauge.substr(0, gauge.length - 2));

		let coefs = (gauge[gauge.length - 1] == 'P') ?
			[ -.000176520934, .0840206843, -16.01839853, 1656.456428,
				-96731.24564, 3248319.241, -58293798.41, 432468921.1 ] :
			[ -.002123403683, .4863557681, -46.19498733, 2403.599196,
				-74026.84724, 1389623.565, -15576312.23, 95696503.28, -247760614.2 ];

		return this.poly(fGauge, coefs) * Math.pow(2 * this.scaleLen * note.freq, 2) / 386.4;
	}

	onTensionChange(callback) {
		this.onTensionChangeCB = callback;
		return this;
	}

	fillComboGauges() {
		let $plains = $('<optgroup label="Plain"></optgroup>');
		let $wounds = $('<optgroup label="Wound"></optgroup>');

		$.each(GAUGES, (i, gau) => {
			let $newOpt = $('<option>'+gau+'</option>');
			$newOpt.appendTo(gau[gau.length - 1] == 'P' ?
				$plains : $wounds);
		});

		return this.$tpl.find('.gauge').append($plains).append($wounds);
	}

	fillComboNotes() {
		let $cmbNote = this.$tpl.find('.note');

		let addEntries = (idxFrom, idxTo) => {
			let suffixes = [ '+1','std','-1','-2','-3','-4','-5' ]
			for (let i = idxFrom; i <= idxTo; ++i) {
				let $newOpt = $(`<option>${NOTES[i].note} (${suffixes[i - idxFrom]})</option>`);
				$newOpt.data('obj', NOTES[i]);
				$cmbNote.append($newOpt);
			}
		};

		switch (this.stringNo) {
			case 1: addEntries( 0,  6); break;
			case 2: addEntries( 5, 11); break;
			case 3: addEntries( 9, 15); break;
			case 4: addEntries(14, 20); break;
			case 5: addEntries(19, 25); break;
			case 6: addEntries(24, 30); break;
			case 7: addEntries(29, 35); break;
			case 8: addEntries(34, NOTES.length - 1);
		}
		return $cmbNote;
	}

	poly(x, args) {
		let res = 0;
		$.each(args, (i, arg) => {
			res += arg * Math.pow(x, i);
		});
		return res;
	}

	calcTension() {
		this.$tpl.find('.tensionLbs').val(this.getTension().toFixed(2));
		this.$tpl.find('.tensionKg').val((this.getTension() * .453592).toFixed(2));
		if (this.onTensionChangeCB) this.onTensionChangeCB();
	}

	static getAllRows(container) {
		let rows = [];
		$(container).find('.stringRow').each((i, elem) => {
			rows.push($(elem).data('obj'));
		});
		return rows;
	}

	static deleteAllRows(container) {
		$(container).find('.stringRow').remove();
	}
}
