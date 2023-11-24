import {defineStore} from 'pinia';
import {IGauge, IGuitar, INote, IPackName, IScale, IString, ITuningName, IUnit} from './types';
import {calcTension, genKey, genStrings} from './funcs';
import * as c from './consts';

const useStore = defineStore('string-tension-calc', {
	state: () => ({
		unit: 'kg/cm' as IUnit,
		guitars: [] as IGuitar[],
	}),
	actions: {
		changeUnit(u: IUnit): void {
			this.unit = u;
			this.guitars.forEach(g => {
				const pack = c.PACKS.find(pack => pack.name === g.packName)!;
				const tuning = c.TUNINGS.find(tuning => tuning.name === g.tuningName)!;
				g.strings.forEach((s, strIdx) => {
					s.tension = calcTension(strIdx, pack.gauges.length,
						s.gauge, tuning.notes[strIdx], g.scale, this.unit);
				});
			});
		},
		addNew(): void {
			this.guitars.push({
				_key: genKey(),
				scale: c.DEFAULT_SCALE,
				packName: c.DEFAULT_PACK_NAME,
				tuningName: c.DEFAULT_TUNING_NAME,
				strings: genStrings(c.DEFAULT_PACK_NAME, c.DEFAULT_TUNING_NAME,
					c.DEFAULT_SCALE, this.unit),
			});
		},
		moveLeft(guitar: IGuitar): void {
			const idx = this.guitars.findIndex(g => g._key === guitar._key);
			const tmp = this.guitars[idx];
			this.guitars[idx] = this.guitars[idx - 1];
			this.guitars[idx - 1] = tmp;
		},
		remove(guitar: IGuitar): void {
			const idx = this.guitars.findIndex(g => g._key === guitar._key);
			this.guitars.splice(idx, 1);
		},
		changeScale(guitar: IGuitar, scale: IScale): void {
			guitar.scale = scale;
			guitar.strings.forEach((str, strIdx) =>
				str.tension = calcTension(strIdx, guitar.strings.length,
					str.gauge, str.note, guitar.scale, this.unit),
			);
		},
		changePack(guitar: IGuitar, name: IPackName): void {
			guitar.packName = name;
			guitar.strings = genStrings(guitar.packName, guitar.tuningName,
				guitar.scale, this.unit);
		},
		changeTuning(guitar: IGuitar, name: ITuningName): void {
			guitar.tuningName = name;
			guitar.strings = genStrings(guitar.packName, guitar.tuningName,
				guitar.scale, this.unit);
		},
		changeGauge(guitar: IGuitar, str: IString, gauge: IGauge): void {
			const strIdx = guitar.strings.findIndex(s => s._key === str._key);
			const strObj = guitar.strings[strIdx];
			strObj.gauge = gauge;
			strObj.tension = calcTension(strIdx, guitar.strings.length,
				gauge, strObj.note, guitar.scale, this.unit);
		},
		changeNote(guitar: IGuitar, str: IString, note: INote): void {
			const strIdx = guitar.strings.findIndex(s => s._key === str._key);
			const strObj = guitar.strings[strIdx];
			strObj.note = note;
			strObj.tension = calcTension(strIdx, guitar.strings.length,
				strObj.gauge, note, guitar.scale, this.unit);
		},
	},
});

export default useStore;
