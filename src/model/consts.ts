import {IPackName, IPitchesForString, ITuningName} from './types';

export const GAUGES = [
	'.007 P',
	'.008 P',
	'.0085 P',
	'.009 P',
	'.0095 P',
	'.010 P',
	'.0105 P',
	'.011 P',
	'.0115 P',
	'.012 P',
	'.013 P',
	'.0135 P',
	'.014 P',
	'.015 P',
	'.016 P',
	'.017 P',
	'.018 P',
	'.019 P',
	'.020 P',
	'.022 P',
	'.024 P',
	'.026 P',

	'.017 W',
	'.018 W',
	'.019 W',
	'.020 W',
	'.021 W',
	'.022 W',
	'.024 W',
	'.025 W',
	'.026 W',
	'.028 W',
	'.030 W',
	'.032 W',
	'.034 W',
	'.036 W',
	'.037 W',
	'.038 W',
	'.039 W',
	'.040 W',
	'.042 W',
	'.044 W',
	'.046 W',
	'.048 W',
	'.049 W',
	'.050 W',
	'.052 W',
	'.054 W',
	'.056 W',
	'.059 W',
	'.060 W',
	'.062 W',
	'.064 W',
	'.065 W',
	'.066 W',
	'.068 W',
	'.070 W',
	'.072 W',
	'.074 W',
	'.080 W',
	'.084 W',
] as const;

export const NUM_STRINGS = [6, 7, 8] as const;

export const PACKS = [
	{gauges: ['.007 P', '.009 P', '.011 P', '.020 W', '.030 W', '.038 W'], name: ".007 Dunlop Rev. Willy's"},
	{gauges: ['.008 P', '.010 P', '.012 P', '.020 W', '.030 W', '.040 W'], name: ".008 Dunlop Rev. Willy's"},
	{gauges: ['.008 P', '.010 P', '.015 P', '.021 W', '.030 W', '.038 W'], name: ".008 D'Addario EXL130"},
	{gauges: ['.008 P', '.011 P', '.014 P', '.022 W', '.030 W', '.038 W'], name: '.008 Ernie Ball Extra Slinky'},
	{gauges: ['.008 P', '.011 P', '.016 P', '.024 W', '.030 W', '.038 W'], name: '.008 Dunlop Extra Light'},
	{gauges: ['.008 P', '.011 P', '.014 P', '.022 W', '.032 W', '.046 W'], name: '.008 Fender Yngwie Malmsteen'},
	{gauges: ['.0085 P','.0105 P','.015 P', '.022 W', '.032 W', '.039 W'], name: ".0085 D'Addario EXL130+"},
	{gauges: ['.009 P', '.011 P', '.016 P', '.024 W', '.032 W', '.042 W'], name: ".009 D'Addario / Ernie Ball"},
	{gauges: ['.009 P', '.011 P', '.016 P', '.026 W', '.036 W', '.046 W'], name: ".009 D'Addario / Ernie Ball hybrid"},
	{gauges: ['.009 P', '.012 P', '.015 P', '.022 W', '.030 W', '.040 W'], name: ".009 D'Addario EXL120BT balanced"},
	{gauges: ['.0095 P','.0115 P','.016 P', '.024 W', '.034 W', '.044 W'], name: ".0095 D'Addario EXL120+"},
	{gauges: ['.010 P', '.013 P', '.017 P', '.026 W', '.036 W', '.046 W'], name: ".010 D'Addario / Ernie Ball"},
	{gauges: ['.010 P', '.013 P', '.017 P', '.030 W', '.042 W', '.052 W'], name: ".010 D'Addario / Ernie Ball hybrid"},
	{gauges: ['.010 P', '.0135 P','.017 P', '.025 W', '.034 W', '.046 W'], name: ".010 D'Addario EXL110BT balanced"},
	{gauges: ['.010 P', '.012 P', '.016 P', '.028 W', '.038 W', '.048 W'], name: '.010 GHS David Gilmour'},
	{gauges: ['.010 P', '.013 P', '.017 P', '.028 W', '.038 W', '.048 W'], name: '.010 Dunlop Heavy Core Heavy'},
	{gauges: ['.010 P', '.013 P', '.017 P', '.036 W', '.052 W', '.060 W'], name: '.010 Dunlop Zakk Wylde'},
	{gauges: ['.0105 P','.0135 P','.018 P', '.028 W', '.038 W', '.048 W'], name: ".0105 D'Addario EXL110+"},
	{gauges: ['.011 P', '.014 P', '.018 P', '.028 W', '.038 W', '.049 W'], name: ".011 D'Addario EXL115"},
	{gauges: ['.011 P', '.015 P', '.019 P', '.028 W', '.037 W', '.050 W'], name: ".011 D'Addario EXL115BT balanced"},
	{gauges: ['.011 P', '.014 P', '.018 P', '.028 W', '.038 W', '.048 W'], name: '.011 Ernie Ball Power Slinky'},
	{gauges: ['.011 P', '.014 P', '.018 P', '.028 W', '.038 W', '.050 W'], name: '.011 Dunlop Heavy Core Heavier'},
	{gauges: ['.012 P', '.016 P', '.020 P', '.032 W', '.042 W', '.054 W'], name: ".012 D'Addario EXL145"},
	{gauges: ['.012 P', '.016 P', '.024 W', '.032 W', '.042 W', '.052 W'], name: ".012 D'Addario EJ21"},
	{gauges: ['.012 P', '.016 P', '.024 P', '.032 W', '.044 W', '.056 W'], name: '.012 Ernie Ball Not Even Slinky'},
	{gauges: ['.013 P', '.017 P', '.026 W', '.036 W', '.046 W', '.062 W'], name: ".013 D'Addario EXL158"},
	{gauges: ['.013 P', '.017 P', '.026 W', '.036 W', '.046 W', '.056 W'], name: ".013 D'Addario EJ22"},
	{gauges: ['.013 P', '.018 P', '.030 W', '.044 W', '.056 W', '.072 W'], name: '.013 Ernie Ball Baritone Slinky'},
	{gauges: ['.014 P', '.018 P', '.026 W', '.044 W', '.056 W', '.068 W'], name: ".014 D'Addario EXL157"},
	{gauges: ['.009 P', '.011 P', '.016 P', '.024 W', '.032 W', '.042 W', '.054 W'], name: ".009 D'Addario EXL120-7"},
	{gauges: ['.009 P', '.011 P', '.016 P', '.024 W', '.032 W', '.042 W', '.052 W'], name: '.009 Ernie Ball Super Slinky 7'},
	{gauges: ['.0095 P','.013 P', '.016 P', '.024 W', '.034 W', '.046 W', '.064 W'], name: '.0095 Strandberg Optimized'},
	{gauges: ['.010 P', '.013 P', '.017 P', '.026 W', '.036 W', '.046 W', '.059 W'], name: ".010 D'Addario EXL110-7"},
	{gauges: ['.010 P', '.013 P', '.017 P', '.026 W', '.036 W', '.046 W', '.056 W'], name: '.010 Ernie Ball Regular Slinky 7'},
	{gauges: ['.010 P', '.013 P', '.017 P', '.028 W', '.038 W', '.048 W', '.060 W'], name: '.010 Dunlop Heavy Core Heavy7'},
	{gauges: ['.009 P', '.011 P', '.016 P', '.024 W', '.032 W', '.042 W', '.054 W', '.065 W'], name: ".009 D'Addario EXL120-8"},
	{gauges: ['.009 P', '.011 P', '.016 P', '.024 W', '.034 W', '.046 W', '.064 W', '.080 W'], name: '.009 Ernie Ball 8-String Heavy Bottom'},
	{gauges: ['.009 P', '.012 P', '.015 P', '.022 W', '.030 W', '.042 W', '.056 W', '.084 W'], name: '.009 Strandberg Optimized'},
	{gauges: ['.010 P', '.013 P', '.017 P', '.030 W', '.042 W', '.054 W', '.064 W', '.074 W'], name: ".010 D'Addario/Ernie Ball 8-string"},
] as const;

export const PITCHES = [
	{note: 'F4',  freq: 349.228 },
	{note: 'E4',  freq: 329.628 }, // guitar high E
	{note: 'D#4', freq: 311.127 },
	{note: 'D4',  freq: 293.665 },
	{note: 'C#4', freq: 277.183 },
	{note: 'C4',  freq: 261.626 },
	{note: 'B3',  freq: 246.942 }, // guitar high B
	{note: 'A#3', freq: 233.082 },
	{note: 'A3',  freq: 220     },
	{note: 'G#3', freq: 207.652 },
	{note: 'G3',  freq: 195.998 }, // guitar G
	{note: 'F#3', freq: 184.997 },
	{note: 'F3',  freq: 174.614 },
	{note: 'E3',  freq: 164.814 },
	{note: 'D#3', freq: 155.563 },
	{note: 'D3',  freq: 146.832 }, // guitar D
	{note: 'C#3', freq: 138.591 },
	{note: 'C3',  freq: 130.813 },
	{note: 'B2',  freq: 123.471 },
	{note: 'A#2', freq: 116.541 },
	{note: 'A2',  freq: 110     }, // guitar A
	{note: 'G#2', freq: 103.826 },
	{note: 'G2',  freq:  97.9989},
	{note: 'F#2', freq:  92.4686},
	{note: 'F2',  freq:  87.3071},
	{note: 'E2',  freq:  82.4069}, // guitar low E
	{note: 'D#2', freq:  77.7817},
	{note: 'D2',  freq:  73.4162},
	{note: 'C#2', freq:  69.2957},
	{note: 'C2',  freq:  65.4064},
	{note: 'B1',  freq:  61.7354}, // 7-string guitar low B
	{note: 'A#1', freq:  58.2705},
	{note: 'A1',  freq:  55     },
	{note: 'G#1', freq:  51.9131},
	{note: 'G1',  freq:  48.9994},
	{note: 'F#1', freq:  46.2493}, // 8-string guitar low F#
	{note: 'F1',  freq:  43.6535},
	{note: 'E1',  freq:  41.2034},
	{note: 'D#1', freq:  38.8909},
	{note: 'D1',  freq:  36.7081},
	{note: 'C#1', freq:  34.6478},
	{note: 'C1',  freq:  32.7032},
	{note: 'B0',  freq:  30.8677},
] as const;

export const SCALE_MODES = [
	'normal',
	'multi',
] as const;

export const SCALE_LENGTHS = [
	24.75,
	25,
	25.4,
	25.5,
	26,
	26.25,
	26.5,
	27,
	27.5,
	28,
	28.5,
	28.75,
	30,
] as const;

export const TUNINGS = [
	{name: 'F standard',  notes: ['F4', 'C4', 'G#3','D#3','A#2','F2', 'C2', 'G1' ]},
	{name: 'E standard',  notes: ['E4', 'B3', 'G3', 'D3', 'A2', 'E2', 'B1', 'F#1']},
	{name: 'Eb standard', notes: ['D#4','A#3','F#3','C#3','G#2','D#2','A#1','F1' ]},
	{name: 'D standard',  notes: ['D4', 'A3', 'F3', 'C3', 'G2', 'D2', 'A1', 'E1' ]},
	{name: 'C# standard', notes: ['C#4','G#3','E3', 'B2', 'F#2','C#2','G#1','D#1']},
	{name: 'C standard',  notes: ['C4', 'G3', 'D#3','A#2','F2', 'C2', 'G1', 'D1' ]},
	{name: 'B standard',  notes: ['B3', 'F#3','D3', 'A2', 'E2', 'B1', 'F#1','C#1']},
	{name: 'Bb standard', notes: ['A#3','F3', 'C#3','G#2','D#2','A#1','F1', 'C1' ]},

	{name: 'Drop D',  notes: ['E4', 'B3', 'G3', 'D3', 'A2', 'D2', 'A1', 'E1' ]},
	{name: 'Drop C#', notes: ['D#4','A#3','F#3','C#3','G#2','C#2','G#1','D#1']},
	{name: 'Drop C',  notes: ['D4', 'A3', 'F3', 'C3', 'G2', 'C2', 'G1', 'D1' ]},
	{name: 'Drop B',  notes: ['C#4','G#3','E3', 'B2', 'F#2','B1', 'F#1','C#1']},
] as const;

export const UNITS = [
	'kg',
	'lbs',
] as const;

export const DEFAULT_PACK_NAME: IPackName = ".010 D'Addario / Ernie Ball";

export const DEFAULT_TUNING_NAME: ITuningName = 'E standard';

export const PITCHES_FOR_STRING: IPitchesForString[] = [{
	stringIndex: 0,
	pitches: [
		{note: 'F4',  descr: '+1'},
		{note: 'E4',  descr: 'std'},
		{note: 'D#4', descr: '−1'},
		{note: 'D4',  descr: '−2'},
		{note: 'C#4', descr: '−3'},
		{note: 'C4',  descr: '−4'},
		{note: 'B3',  descr: '−5'},
		{note: 'A#3', descr: '−6'},
		{note: 'A3',  descr: '−7'},
	],
}, {
	stringIndex: 1,
	pitches: [
		{note: 'C4',  descr: '+1'},
		{note: 'B3',  descr: 'std'},
		{note: 'A#3', descr: '−1'},
		{note: 'A3',  descr: '−2'},
		{note: 'G#3', descr: '−3'},
		{note: 'G3',  descr: '−4'},
		{note: 'F#3', descr: '−5'},
		{note: 'F3',  descr: '−6'},
		{note: 'E3',  descr: '−7'},
	],
}, {
	stringIndex: 2,
	pitches: [
		{note: 'G#3', descr: '+1'},
		{note: 'G3',  descr: 'std'},
		{note: 'F#3', descr: '−1'},
		{note: 'F3',  descr: '−2'},
		{note: 'E3',  descr: '−3'},
		{note: 'D#3', descr: '−4'},
		{note: 'D3',  descr: '−5'},
		{note: 'C#3', descr: '−6'},
		{note: 'C3',  descr: '−7'},
	],
}, {
	stringIndex: 3,
	pitches: [
		{note: 'D#3', descr: '+1'},
		{note: 'D3',  descr: 'std'},
		{note: 'C#3', descr: '−1'},
		{note: 'C3',  descr: '−2'},
		{note: 'B2',  descr: '−3'},
		{note: 'A#2', descr: '−4'},
		{note: 'A2',  descr: '−5'},
		{note: 'G#2', descr: '−6'},
		{note: 'G2',  descr: '−7'},
	],
}, {
	stringIndex: 4,
	pitches: [
		{note: 'A#2', descr: '+1'},
		{note: 'A2',  descr: 'std'},
		{note: 'G#2', descr: '−1'},
		{note: 'G2',  descr: '−2'},
		{note: 'F#2', descr: '−3'},
		{note: 'F2',  descr: '−4'},
		{note: 'E2',  descr: '−5'},
		{note: 'D#2', descr: '−6'},
		{note: 'D2',  descr: '−7'},
	],
}, {
	stringIndex: 5,
	pitches: [
		{note: 'F2',  descr: '+1'},
		{note: 'E2',  descr: 'std'},
		{note: 'D#2', descr: '−1'},
		{note: 'D2',  descr: '−2'},
		{note: 'C#2', descr: '−3'},
		{note: 'C2',  descr: '−4'},
		{note: 'B1',  descr: '−5'},
		{note: 'A#1', descr: '−6'},
		{note: 'A1',  descr: '−7'},
	],
}, {
	stringIndex: 6,
	pitches: [
		{note: 'C2',  descr: '+1'},
		{note: 'B1',  descr: 'std'},
		{note: 'A#1', descr: '−1'},
		{note: 'A1',  descr: '−2'},
		{note: 'G#1', descr: '−3'},
		{note: 'G1',  descr: '−4'},
		{note: 'F#1', descr: '−5'},
		{note: 'F1',  descr: '−6'},
		{note: 'E1',  descr: '−7'},
	],
}, {
	stringIndex: 7,
	pitches: [
		{note: 'G1',  descr: '+1'},
		{note: 'F#1', descr: 'std'},
		{note: 'F1',  descr: '−1'},
		{note: 'E1',  descr: '−2'},
		{note: 'D#1', descr: '−3'},
		{note: 'D1',  descr: '−4'},
		{note: 'C#1', descr: '−5'},
		{note: 'C1',  descr: '−6'},
		{note: 'B0',  descr: '−7'},
	],
}];