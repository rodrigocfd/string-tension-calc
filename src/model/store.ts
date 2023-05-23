import {reactive} from 'vue';
import {IGuitar, IPackName, IString, ITuningName, IUnit} from './types';
import * as c from './consts';

const data = reactive({
	unit: 'kg' as IUnit,
	guitars: [] as IGuitar[],
});

const store = {
	get unit(): IUnit {
		return data.unit;
	},
	setUnit(unit: IUnit): void {
		data.unit = unit;
	},

	get guitars(): IGuitar[] {
		return data.guitars;
	},
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
};

export default store;

//------------------------------------------------------------------------------

let curKey = 0;
function genKey(): number {
	return curKey++;
}

function genStrings(packName: IPackName, tuningName: ITuningName): IString[] {
	return c.PACKS.find(pack => pack.name === packName)!
		.gauges.map((gauge, idxStr) => ({
			_key: genKey(),
			gauge,
			pitchNote: c.TUNINGS.find(tuning => tuning.name === tuningName)!
				.notes[idxStr],
		}));
}
