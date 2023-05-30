import {create} from 'zustand';
import {combine} from 'zustand/middleware';
import {IGuitar, IUnit} from './types';

export const useStore = create(
	combine({
		unit: 'kg/cm' as IUnit,
		guitars: [] as IGuitar[],
	},
	(set, get) => ({
		setUnit(unit: IUnit): void {
			set(state => ({unit}));
		},
	})),
);
