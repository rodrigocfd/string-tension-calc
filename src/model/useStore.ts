import {reactive, toRefs} from 'vue';
import {defineStore} from 'pinia';
import {IGauge, IGuitar, INote, IPackName, IScale, IString, ITuningName, IUnit} from './types';
import {calcTension} from './funcs';
import * as c from './consts';

const useStore = defineStore('global', () => {
	const state = reactive({
		unit: 'kg/cm' as IUnit,
		guitars: [] as IGuitar[],
	});

	const pub = {
		addNew(): void {
			state.guitars.push({
				_key: genKey(),
				scale: c.DEFAULT_SCALE,
				packName: c.DEFAULT_PACK_NAME,
				tuningName: c.DEFAULT_TUNING_NAME,
				strings: genStrings(c.DEFAULT_PACK_NAME, c.DEFAULT_TUNING_NAME, c.DEFAULT_SCALE),
			});
		},
		moveLeft(guitar: IGuitar): void {
			const idx = state.guitars.findIndex(g => g._key === guitar._key);
			const tmp = state.guitars[idx];
			state.guitars[idx] = state.guitars[idx - 1];
			state.guitars[idx - 1] = tmp;
		},
		remove(guitar: IGuitar): void {
			const idx = state.guitars.findIndex(g => g._key === guitar._key);
			state.guitars.splice(idx, 1);
		},
		changeScale(guitar: IGuitar, scale: IScale): void {
			guitar.scale = scale;
			guitar.strings.forEach((str, strIdx) =>
				str.tension = calcTension(strIdx, guitar.strings.length,
					str.gauge, str.note, guitar.scale, state.unit),
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
				gauge, strObj.note, guitar.scale, state.unit);
		},
		changeNote(guitar: IGuitar, str: IString, note: INote): void {
			const strIdx = guitar.strings.findIndex(s => s._key === str._key);
			const strObj = guitar.strings[strIdx];
			strObj.note = note;
			strObj.tension = calcTension(strIdx, guitar.strings.length,
				strObj.gauge, note, guitar.scale, state.unit);
		},
	};

	return {...toRefs(state), ...pub};
});

export default useStore;

let curKey = 0;
function genKey(): number {
	return curKey++;
}

function genStrings(packName: IPackName, tuningName: ITuningName, scale: IScale): IString[] {
	const store = useStore();
	const pack = c.PACKS.find(pack => pack.name === packName)!;
	return pack.gauges.map((gauge, strIdx) => {
		const tuning = c.TUNINGS.find(tuning => tuning.name === tuningName)!;
		return {
			_key: genKey(),
			gauge,
			note: tuning.notes[strIdx],
			tension: calcTension(strIdx, pack.gauges.length,
				gauge, tuning.notes[strIdx], scale, store.unit),
		};
	});
}
