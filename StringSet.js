/**
 * String Tension Calculator
 * @author Rodrigo Cesar de Freitas Dias
 * @license MIT
 * @see https://github.com/rodrigocfd/string-tension-calc
 */

class StringSet {
	constructor() {
		this.$tpl = $('#templates .stringSet').clone();
		this.$tpl.data('obj', this);

		this.weightUnit = 'kg';
		this.onTensionChangeCB = null;

		this.fillComboPacks();
		this.fillComboScaleLengths();
		this.fillComboTunings();

		this.$tpl.find('.packs').change(ev => {
			StringRow.deleteAllRows(this.$tpl);
			let pack = $(ev.currentTarget).find(':selected').data('obj');
			let scale = this.$tpl.find('.scaleLength :selected').data('obj');
			let tuning = this.$tpl.find('.tuning :selected').data('obj');

			$.each(pack.gauges, (i, gau) => {
				let newRow = new StringRow(i + 1);
				newRow.setRowInfo(gau, tuning.notes[i])
					.setScaleLength(StringSet.calcMultiScaleLength(scale.inches, i, pack.gauges.length))
					.setUnit(this.weightUnit);
				newRow.getBlock().appendTo(this.$tpl.find('.rowsArea'))
					.hide().fadeIn(200);
				newRow.onTensionChange(() => {
					if (this.onTensionChangeCB) this.onTensionChangeCB();
				});
			});

			if (this.onTensionChangeCB) this.onTensionChangeCB();
		});

		this.$tpl.find('.scaleLength').change(ev => {
			let scale = $(ev.currentTarget).find(':selected').data('obj');
			let pack = this.$tpl.find('.packs :selected').data('obj');

			$.each(StringRow.getAllRows(this.$tpl), (i, row) => {
				row.setScaleLength(StringSet.calcMultiScaleLength(scale.inches, i, pack.gauges.length));
			});
		});

		this.$tpl.find('.tuning').change(ev => {
			let tuning = $(ev.currentTarget).find(':selected').data('obj');
			$.each(StringRow.getAllRows(this.$tpl), (i, row) => {
				row.setRowInfo(null, tuning.notes[i]);
			});
		});

		this.$tpl.find('.deleteSet').click(() => {
			if (confirm('Delete this set?')) {
				this.$tpl.fadeOut(200, () => {
					this.$tpl.remove();
					if (this.onTensionChangeCB) this.onTensionChangeCB();
				});
			}
		});

		this.$tpl.find('.moveLeft').click(() => {
			if (this.$tpl.index() === 0) {
				alert('First string set cannot be moved left.');
			} else {
				this.$tpl.insertBefore(this.$tpl.prev());
				if (this.onTensionChangeCB) this.onTensionChangeCB();
			}
		});

		this.setDefaultValues();
	}

	getBlock() {
		return this.$tpl;
	}

	setColor(color) {
		this.$tpl.css('border-top', `4px solid ${color}`);
		return this;
	}

	setUnit(unit) {
		this.weightUnit = unit;
		for (let row of StringRow.getAllRows(this.$tpl)) {
			row.setUnit(unit);
		}
		return this;
	}

	getTensions() {
		let tensions = [];
		for (let row of StringRow.getAllRows(this.$tpl)) {
			tensions.push(row.getTension());
		}
		return tensions;
	}

	onTensionChange(callback) {
		this.onTensionChangeCB = callback;
		return this;
	}

	fillComboPacks() {
		for (const pac of PACKS) {
			let $newOpt = $(`<option>${pac.name}</option>`);
			$newOpt.data('obj', pac);
			this.$tpl.find(`.pack${pac.gauges.length}`).append($newOpt);
		}
		return this.$tpl.find('.packs');
	}

	fillComboScaleLengths() {
		for (const sca of SCALES) {
			let $newOpt = $(`<option>${sca.scale}</option>`);
			$newOpt.data('obj', sca);
			let simpleOrMulti = (sca.inches[0] == sca.inches[1]) ? 'S' : 'M';
			this.$tpl.find(`.scale${simpleOrMulti}`).append($newOpt);
		}
		return this.$tpl.find('.scaleLength');
	}

	fillComboTunings() {
		let $cmbTuning = this.$tpl.find('.tuning');
		for (const tun of TUNINGS) {
			let $newOpt = $(`<option>${tun.tuning}</option>`);
			$newOpt.data('obj', tun);
			$cmbTuning.append($newOpt);
		}
		return $cmbTuning;
	}

	setDefaultValues() {
		for (const selec of ['.tuning', '.scaleLength', '.packs']) {
			this.$tpl.find(`${selec} option`).each((i, elem) => {
				let $opt = $(elem);
				if ($opt.data('obj').defaultSel) {
					$opt.prop('selected', true);
					return false;
				}
			});
		}
		this.$tpl.find('.packs').trigger('change');
	}

	static calcMultiScaleLength(scales, num, totalStrings) {
		return scales[0] - (scales[0] - scales[1]) * (num / (totalStrings - 1));
	}

	static getAllSets(container) {
		let sets = [];
		$(container).find('.stringSet').each((i, elem) => {
			sets.push($(elem).data('obj'));
		});
		return sets;
	}
}