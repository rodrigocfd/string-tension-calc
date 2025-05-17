import {reactive} from 'vue';
import * as c from './consts';
import {calcTension, countValidStrings, genStrings, nextId} from './funcs';
import {IGuitar, IScale, IString, TGauge, TNote, TPackName, TTuningName, TUnit} from './types';

export const state = reactive({
	unit: 'kg/cm' as TUnit,
	guitars: [] as IGuitar[],

	setUnit(unit: TUnit): void {
		this.unit = unit;
		this.guitars.forEach(guitar => {
			guitar.strings.forEach((str, strIdx) => {
				const numValidStrs = countValidStrings(guitar);
				str.tension = calcTension(strIdx, numValidStrs,
					str.gauge, str.note, guitar.scale, this.unit);
			});
		});
	},

	addNew(): void {
		this.guitars.push({
			_id: nextId(),
			scale: c.DEFAULT_SCALE,
			packName: c.DEFAULT_PACK_NAME,
			tuningName: c.DEFAULT_TUNING_NAME,
			strings: genStrings(c.DEFAULT_PACK_NAME, c.DEFAULT_TUNING_NAME, c.DEFAULT_SCALE, this.unit),
		});
	},
	moveLeft(guitar: IGuitar): void {
		const idx = this.guitars.findIndex(g => g._id === guitar._id)!;
		const tmp = this.guitars[idx];
		this.guitars[idx] = this.guitars[idx - 1];
		this.guitars[idx - 1] = tmp;
	},
	remove(guitar: IGuitar): void {
		this.guitars = this.guitars.filter(g => g._id !== guitar._id);
	},
	changeScale(guitar: IGuitar, scale: IScale): void {
		const ourGtr = this.guitars.find(g => g._id === guitar._id)!;
		const numValidStrs = countValidStrings(ourGtr);
		ourGtr.scale = scale;
		ourGtr.strings.forEach((str, strIdx) =>
			str.tension = calcTension(strIdx, numValidStrs,
				str.gauge, str.note, scale, this.unit),
		);
	},
	changePack(guitar: IGuitar, name: TPackName): void {
		const ourGtr = this.guitars.find(g => g._id === guitar._id)!;
		ourGtr.packName = name;
		ourGtr.strings = genStrings(name, ourGtr.tuningName, ourGtr.scale, this.unit);
	},
	changeTuning(guitar: IGuitar, name: TTuningName): void {
		const ourGtr = this.guitars.find(g => g._id === guitar._id)!;
		ourGtr.tuningName = name;
		ourGtr.strings = genStrings(ourGtr.packName, name, ourGtr.scale, this.unit);
	},
	changeGauge(guitar: IGuitar, str: IString, gauge: TGauge): void {
		const ourGtr = this.guitars.find(g => g._id === guitar._id)!;
		const numValidStrs = countValidStrings(ourGtr);
		const strIdx = ourGtr.strings.findIndex(s => s._id === str._id);
		const ourStr = ourGtr.strings[strIdx];
		ourStr.gauge = gauge;
		ourStr.tension = calcTension(strIdx, numValidStrs,
			gauge, ourStr.note, guitar.scale, this.unit);
	},
	changeNote(guitar: IGuitar, str: IString, note: TNote): void {
		const ourGtr = this.guitars.find(g => g._id === guitar._id)!;
		const numValidStrs = countValidStrings(ourGtr);
		const strIdx = ourGtr.strings.findIndex(s => s._id === str._id);
		const ourStr = ourGtr.strings[strIdx];
		ourStr.note = note;
		ourStr.tension = calcTension(strIdx, numValidStrs,
			str.gauge, note, guitar.scale, this.unit);
	},
});

export default state;
