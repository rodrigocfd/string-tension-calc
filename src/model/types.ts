import * as c from './consts';

export type IGauge = typeof c.GAUGES[number];
export type INumStrings = typeof c.NUM_STRINGS[number];
export type IPack = typeof c.PACKS[number];
export type IPackName = typeof c.PACKS[number]['name'];
export type IPitchNote = typeof c.PITCHES[number]['note'];
export type IScaleLength = typeof c.SCALE_LENGTHS[number];
export type IScaleMode = typeof c.SCALE_MODES[number];
export type IStringIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type ITuningName = typeof c.TUNINGS[number]['name'];
export type IUnit = typeof c.UNITS[number];

export interface IDefaultPack {
	numStrings: INumStrings;
	packName: IPackName;
}

export interface IGuitar {
	_key: number;
	scale: IScale;
	packName: IPackName;
	tuningName: ITuningName;
	strings: IString[];
}

export interface IString {
	_key: number;
	gauge: IGauge;
	note: IPitchNote;
}

export interface IPitchesForString {
	stringIndex: IStringIndex;
	pitches: {
		note: IPitchNote;
		descr: string;
	}[],
}

export interface IScale {
	mode: IScaleMode;
	lengthHi: IScaleLength;
	lengthLo: IScaleLength;
}
