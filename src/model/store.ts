import {computed, reactive} from 'vue';
import {IGuitar, IPackName, IString, ITuningName, IUnit} from './types';
import * as c from './consts';

const data = reactive({
	unit: 'kg' as IUnit,
	guitars: [] as IGuitar[],
});

const store = {
	unit: computed((): IUnit => data.unit),
	setUnit(unit: IUnit): void {
		data.unit = unit;
	},

	guitars: computed((): IGuitar[] => data.guitars),
	addNew(): void {
		const packName = c.DEFAULT_PACKS.find(p => p.numStrings === c.DEFAULT_NUM_STRINGS)!.packName;
		data.guitars.push({
			_key: genKey(),
			scale: {mode: 'normal', lengthHi: 25, lengthLo: 25},
			packName,
			tuningName: c.DEFAULT_TUNING_NAME,
			strings: genStrings(packName, c.DEFAULT_TUNING_NAME),
		});
	},
	remove(guitar: IGuitar): void {
		const idx = data.guitars.findIndex(g => g._key === guitar._key);
		data.guitars.splice(idx, 1);
	},
	moveLeft(ss: IGuitar) {
		const idx = data.guitars.findIndex(g => g._key === ss._key);
		const tmp = data.guitars[idx];
		data.guitars[idx] = data.guitars[idx - 1];
		data.guitars[idx - 1] = tmp;
	},
	changePack(guitar: IGuitar, name: IPackName): void {
		guitar.packName = name;
		guitar.strings = genStrings(guitar.packName, guitar.tuningName);
	},
	changeTuning(guitar: IGuitar, name: ITuningName): void {
		guitar.tuningName = name;
		guitar.strings = genStrings(guitar.packName, guitar.tuningName);
	},
};

export default store;

let curKey = 0;
function genKey(): number {
	return curKey++;
}

function genStrings(packName: IPackName, tuningName: ITuningName): IString[] {
	return c.PACKS.find(pack => pack.name === packName)!
		.gauges.map((gauge, idxStr) => ({
			_key: genKey(),
			gauge,
			note: c.TUNINGS.find(tuning => tuning.name === tuningName)!
				.notes[idxStr],
		}));
}
