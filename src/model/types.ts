import * as c from './consts';

export type TGauge = typeof c.GAUGES[number] | null;
export type TNote = typeof c.PITCHES[number]['note'];
export type TNumStrings = typeof c.NUM_STRINGS[number];
export type TPack = typeof c.PACKS[number];
export type TPackName = typeof c.PACKS[number]['name'];
export type TScaleLength = typeof c.SCALE_LENGTHS[number];
export type TScaleMode = typeof c.SCALE_MODES[number];
export type TStringIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type TTuningName = typeof c.TUNINGS[number]['name'];
export type TUnit = typeof c.UNITS[number]['name'];

export interface IDefaultPack {
	numStrings: TNumStrings;
	packName: TPackName;
}

export interface IGuitar {
	_id: number;
	scale: IScale;
	packName: TPackName;
	tuningName: TTuningName;
	strings: IString[];
}

export interface IString {
	_id: number;
	gauge: TGauge;
	note: TNote;
	tension: number;
}

export interface IPitchesForString {
	stringIndex: TStringIndex;
	pitches: {
		note: TNote;
		descr: string;
	}[];
}

export interface IScale {
	mode: TScaleMode;
	lengthLo: TScaleLength;
	lengthHi: TScaleLength;
}
