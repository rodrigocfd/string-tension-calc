import {create} from 'zustand';
import {combine} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {IGauge, IGuitar, INote, IPackName, IScale, IString, ITuningName, IUnit} from './types';
import {calcTension} from './funcs';
import * as c from './consts';

export const useStore = create(immer(
	combine({
		unit: 'kg/cm' as IUnit,
		guitars: [] as IGuitar[],
	},
	(set, get) => ({
		setUnit(unit: IUnit): void {
			set(state => {
				state.unit = unit;
				state.guitars.forEach(guitar => {
					guitar.strings.forEach((str, strIdx) => {
						str.tension = calcTension(strIdx, guitar.strings.length,
							str.gauge, str.note, guitar.scale, state.unit);
					});
				});
			});
		},

		addNew(): void {
			set(state => {
				state.guitars.push({
					_id: genId(),
					scale: c.DEFAULT_SCALE,
					packName: c.DEFAULT_PACK_NAME,
					tuningName: c.DEFAULT_TUNING_NAME,
					strings: genStrings(c.DEFAULT_PACK_NAME, c.DEFAULT_TUNING_NAME, c.DEFAULT_SCALE, state.unit),
				});
			});
		},
		moveLeft(guitar: IGuitar): void {
			set(state => {
				const idx = state.guitars.findIndex(g => g._id === guitar._id)!;
				const tmp = state.guitars[idx];
				state.guitars[idx] = state.guitars[idx - 1];
				state.guitars[idx - 1] = tmp;
			});
		},
		remove(guitar: IGuitar): void {
			set(state => {
				state.guitars = state.guitars.filter(g => g._id !== guitar._id);
			});
		},
		changeScale(guitar: IGuitar, scale: IScale): void {
			set(state => {
				const ourGtr = state.guitars.find(g => g._id === guitar._id)!;
				ourGtr.scale = scale;
				ourGtr.strings.forEach((str, strIdx) =>
					str.tension = calcTension(strIdx, ourGtr.strings.length,
						str.gauge, str.note, scale, state.unit),
				);
			});
		},
		changePack(guitar: IGuitar, name: IPackName): void {
			set(state => {
				const ourGtr = state.guitars.find(g => g._id === guitar._id)!;
				ourGtr.packName = name;
				ourGtr.strings = genStrings(name, ourGtr.tuningName, ourGtr.scale, state.unit);
			});
		},
		changeTuning(guitar: IGuitar, name: ITuningName): void {
			set(state => {
				const ourGtr = state.guitars.find(g => g._id === guitar._id)!;
				ourGtr.tuningName = name;
				ourGtr.strings = genStrings(ourGtr.packName, name, ourGtr.scale, state.unit);
			});
		},
		changeGauge(guitar: IGuitar, str: IString, gauge: IGauge): void {
			set(state => {
				const ourGtr = state.guitars.find(g => g._id === guitar._id)!;
				const strIdx = ourGtr.strings.findIndex(s => s._id === str._id);
				const ourStr = ourGtr.strings[strIdx];
				ourStr.gauge = gauge;
				ourStr.tension = calcTension(strIdx, guitar.strings.length,
					gauge, ourStr.note, guitar.scale, state.unit);
			});
		},
		changeNote(guitar: IGuitar, str: IString, note: INote): void {
			set(state => {
				const ourGtr = state.guitars.find(g => g._id === guitar._id)!;
				const strIdx = ourGtr.strings.findIndex(s => s._id === str._id);
				const ourStr = ourGtr.strings[strIdx];
				ourStr.note = note;
				ourStr.tension = calcTension(strIdx, guitar.strings.length,
					str.gauge, note, guitar.scale, state.unit);
			});
		},
	})),
));

let curId = 0;
function genId(): number {
	return curId++;
}

function genStrings(
	packName: IPackName,
	tuningName: ITuningName,
	scale: IScale,
	unit: IUnit,
): IString[]
{
	const pack = c.PACKS.find(pack => pack.name === packName)!;
	return pack.gauges.map((gauge, strIdx) => {
		const tuning = c.TUNINGS.find(tuning => tuning.name === tuningName)!;
		return {
			_id: genId(),
			gauge,
			note: tuning.notes[strIdx],
			tension: calcTension(strIdx, pack.gauges.length,
				gauge, tuning.notes[strIdx], scale, unit),
		};
	});
}
