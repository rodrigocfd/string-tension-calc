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
			set(state => ({unit}));
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
