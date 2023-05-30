import {create} from 'zustand';
import {combine} from 'zustand/middleware';
import {IGuitar, IPackName, IScale, IString, ITuningName, IUnit} from './types';
import {calcTension} from './funcs';
import * as c from './consts';

export const useStore = create(
	combine({
		unit: 'kg/cm' as IUnit,
		guitars: [] as IGuitar[],
	},
	(set, get) => ({
		setUnit(unit: IUnit): void {
			set(state => ({
				unit,
				guitars: state.guitars.map(g => ({
					...g,
					strings: g.strings.map((s, strIdx) => ({
						...s,
						tension: calcTension(strIdx, g.strings.length,
							s.gauge, s.note, g.scale, unit),
					})),
				})),
			}));
		},

		addNew(): void {
			set(state => ({
				guitars: [...state.guitars, {
					_key: genKey(),
					scale: c.DEFAULT_SCALE,
					packName: c.DEFAULT_PACK_NAME,
					tuningName: c.DEFAULT_TUNING_NAME,
					strings: genStrings(c.DEFAULT_PACK_NAME, c.DEFAULT_TUNING_NAME, c.DEFAULT_SCALE, state.unit),
				}],
			}));
		},
		moveLeft(guitar: IGuitar): void {
			set(state => {
				const guitars = [...state.guitars];
				const idx = guitars.findIndex(g => g._key === guitar._key)!;
				const tmp = guitars[idx];
				guitars[idx] = guitars[idx - 1];
				guitars[idx - 1] = tmp;
				return {guitars};
			});
		},
		remove(guitar: IGuitar): void {
			set(state => ({
				guitars: state.guitars.filter(g => g._key !== guitar._key),
			}));
		},
		changeScale(guitar: IGuitar, scale: IScale): void {
			set(state => {
				const guitars = [...state.guitars];
				const ourGtr = guitars.find(g => g._key === guitar._key)!;
				ourGtr.scale = scale;
				ourGtr.strings = genStrings(ourGtr.packName, ourGtr.tuningName, scale, state.unit);
				return {guitars};
			});
		},
		changePack(guitar: IGuitar, name: IPackName): void {
			set(state => {
				const guitars = [...state.guitars];
				const ourGtr = guitars.find(g => g._key === guitar._key)!;
				ourGtr.packName = name;
				ourGtr.strings = genStrings(name, ourGtr.tuningName, ourGtr.scale, state.unit);
				return {guitars};
			});
		},
	})),
);

let curKey = 0;
function genKey(): number {
	return curKey++;
}

function genStrings(packName: IPackName, tuningName: ITuningName, scale: IScale, unit: IUnit): IString[] {
	const pack = c.PACKS.find(pack => pack.name === packName)!;
	return pack.gauges.map((gauge, strIdx) => {
		const tuning = c.TUNINGS.find(tuning => tuning.name === tuningName)!;
		return {
			_key: genKey(),
			gauge,
			note: tuning.notes[strIdx],
			tension: calcTension(strIdx, pack.gauges.length,
				gauge, tuning.notes[strIdx], scale, unit),
		};
	});
}
