import {create} from 'zustand';
import {combine} from 'zustand/middleware';
import {immer} from 'zustand/middleware/immer';
import {IGuitar, IScale, IString, TGauge, TNote, TPackName, TTuningName, TUnit} from './types';
import {calcTension, genStrings, nextId} from './funcs';
import * as c from './consts';

export const useStore = create(immer(
	combine({
		unit: 'kg/cm' as TUnit,
		guitars: [] as IGuitar[],
	},
	set => ({
		setUnit(unit: TUnit): void {
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
					_id: nextId(),
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
		changePack(guitar: IGuitar, name: TPackName): void {
			set(state => {
				const ourGtr = state.guitars.find(g => g._id === guitar._id)!;
				ourGtr.packName = name;
				ourGtr.strings = genStrings(name, ourGtr.tuningName, ourGtr.scale, state.unit);
			});
		},
		changeTuning(guitar: IGuitar, name: TTuningName): void {
			set(state => {
				const ourGtr = state.guitars.find(g => g._id === guitar._id)!;
				ourGtr.tuningName = name;
				ourGtr.strings = genStrings(ourGtr.packName, name, ourGtr.scale, state.unit);
			});
		},
		changeGauge(guitar: IGuitar, str: IString, gauge: TGauge): void {
			set(state => {
				const ourGtr = state.guitars.find(g => g._id === guitar._id)!;
				const strIdx = ourGtr.strings.findIndex(s => s._id === str._id);
				const ourStr = ourGtr.strings[strIdx];
				ourStr.gauge = gauge;
				ourStr.tension = calcTension(strIdx, guitar.strings.length,
					gauge, ourStr.note, guitar.scale, state.unit);
			});
		},
		changeNote(guitar: IGuitar, str: IString, note: TNote): void {
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

export default useStore;
