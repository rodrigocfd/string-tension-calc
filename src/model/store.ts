import {computed, reactive} from 'vue';
import {IGauge, IGuitar, INote, IPackName, IScale, IString, ITuningName, IUnit} from './types';
import {calcTension} from './funcs';
import * as c from './consts';

const data = reactive({
	unit: 'kg/cm' as IUnit,
	guitars: [] as IGuitar[],
});

const store = {
	unit: computed((): IUnit => data.unit),
	setUnit(unit: IUnit): void {
		data.unit = unit;
		data.guitars.forEach(gtr => {
			gtr.strings.forEach((str, strIdx) =>
				str.tension = calcTension(strIdx, gtr.strings.length,
					str.gauge, str.note, gtr.scale, data.unit),
			);
		});
	},

	guitars: computed((): IGuitar[] => data.guitars),
	addNew(): void {
		data.guitars.push({
			_key: genKey(),
			scale: c.DEFAULT_SCALE,
			packName: c.DEFAULT_PACK_NAME,
			tuningName: c.DEFAULT_TUNING_NAME,
			strings: genStrings(c.DEFAULT_PACK_NAME, c.DEFAULT_TUNING_NAME, c.DEFAULT_SCALE),
		});
	},
	moveLeft(guitar: IGuitar): void {
		const idx = data.guitars.findIndex(g => g._key === guitar._key);
		const tmp = data.guitars[idx];
		data.guitars[idx] = data.guitars[idx - 1];
		data.guitars[idx - 1] = tmp;
	},
	remove(guitar: IGuitar): void {
		const idx = data.guitars.findIndex(g => g._key === guitar._key);
		data.guitars.splice(idx, 1);
	},
	changeScale(guitar: IGuitar, scale: IScale): void {
		guitar.scale = scale;
		guitar.strings.forEach((str, strIdx) =>
			str.tension = calcTension(strIdx, guitar.strings.length,
				str.gauge, str.note, guitar.scale, data.unit),
		);
	},
	changePack(guitar: IGuitar, name: IPackName): void {
		guitar.packName = name;
		guitar.strings = genStrings(guitar.packName, guitar.tuningName, guitar.scale);
	},
	changeTuning(guitar: IGuitar, name: ITuningName): void {
		guitar.tuningName = name;
		guitar.strings = genStrings(guitar.packName, guitar.tuningName, guitar.scale);
	},
	changeGauge(guitar: IGuitar, str: IString, gauge: IGauge): void {
		const strIdx = guitar.strings.findIndex(s => s._key === str._key);
		const strObj = guitar.strings[strIdx];
		strObj.gauge = gauge;
		strObj.tension = calcTension(strIdx, guitar.strings.length,
			gauge, strObj.note, guitar.scale, data.unit);
	},
	changeNote(guitar: IGuitar, str: IString, note: INote): void {
		const strIdx = guitar.strings.findIndex(s => s._key === str._key);
		const strObj = guitar.strings[strIdx];
		strObj.note = note;
		strObj.tension = calcTension(strIdx, guitar.strings.length,
			strObj.gauge, note, guitar.scale, data.unit);
	},
};

export default store;

let curKey = 0;
function genKey(): number {
	return curKey++;
}

function genStrings(packName: IPackName, tuningName: ITuningName, scale: IScale): IString[] {
	const pack = c.PACKS.find(pack => pack.name === packName)!;
	return pack.gauges.map((gauge, strIdx) => {
		const tuning = c.TUNINGS.find(tuning => tuning.name === tuningName)!;
		return {
			_key: genKey(),
			gauge,
			note: tuning.notes[strIdx],
			tension: calcTension(strIdx, pack.gauges.length,
				gauge, tuning.notes[strIdx], scale, data.unit),
		};
	});
}
