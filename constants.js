/**
 * String Tension Calculator
 * @author Rodrigo Cesar de Freitas Dias
 * @license MIT
 * @see https://github.com/rodrigocfd/string-tension-calc
 */

const SCALES = [
	{ scale: '24.625"', inches: 24.625 },
	{ scale: '25"',     inches: 25     },
	{ scale: '25.5"',   inches: 25.5   },
	{ scale: '26.5"',   inches: 26.5   }
];

const NOTES = [
	{ note: 'F4',  freq: 349.228  },
	{ note: 'E4',  freq: 329.628  },
	{ note: 'D#4', freq: 311.127  },
	{ note: 'D4',  freq: 293.665  },
	{ note: 'C#4', freq: 277.183  },
	{ note: 'C4',  freq: 261.626  },
	{ note: 'B3',  freq: 246.942  },
	{ note: 'A#3', freq: 233.082  },
	{ note: 'A3',  freq: 220      },
	{ note: 'G#3', freq: 207.652  },
	{ note: 'G3',  freq: 195.998  },
	{ note: 'F#3', freq: 184.997  },
	{ note: 'F3',  freq: 174.614  },
	{ note: 'E3',  freq: 164.814  },
	{ note: 'D#3', freq: 155.563  },
	{ note: 'D3',  freq: 146.832  },
	{ note: 'C#3', freq: 138.591  },
	{ note: 'C3',  freq: 130.813  },
	{ note: 'B2',  freq: 123.471  },
	{ note: 'A#2', freq: 116.541  },
	{ note: 'A2',  freq: 110      },
	{ note: 'G#2', freq: 103.826  },
	{ note: 'G2',  freq:  97.9989 },
	{ note: 'F#2', freq:  92.4686 },
	{ note: 'F2',  freq:  87.3071 },
	{ note: 'E2',  freq:  82.4069 },
	{ note: 'D#2', freq:  77.7817 },
	{ note: 'D2',  freq:  73.4162 },
	{ note: 'C#2', freq:  69.2957 },
	{ note: 'C2',  freq:  65.4064 },
	{ note: 'B1',  freq:  61.7354 },
	{ note: 'A#1', freq:  58.2705 },
	{ note: 'A1',  freq:  55      },
	{ note: 'G#1', freq:  51.9131 },
	{ note: 'G1',  freq:  48.9994 },
	{ note: 'F#1', freq:  46.2493 },
	{ note: 'F1',  freq:  43.6535 },
	{ note: 'E1',  freq:  41.2034 }
];

const GAUGES = [
	{ gauge: '.007 P', weight: 0.00001085 },
	{ gauge: '.008 P', weight: 0.00001418 },
	{ gauge: '.0085 P', weight: 0.00001601 },
	{ gauge: '.009 P', weight: 0.00001794 },
	{ gauge: '.0095 P', weight: 0.00001999 },
	{ gauge: '.010 P', weight: 0.00002215 },
	{ gauge: '.0105 P', weight: 0.00002442 },
	{ gauge: '.011 P', weight: 0.0000268 },
	{ gauge: '.0115 P', weight: 0.0000293 },
	{ gauge: '.012 P', weight: 0.0000319 },
	{ gauge: '.013 P', weight: 0.00003744 },
	{ gauge: '.0135 P', weight: 0.00004037 },
	{ gauge: '.014 P', weight: 0.00004342 },
	{ gauge: '.015 P', weight: 0.00004984 },
	{ gauge: '.016 P', weight: 0.00005671 },
	{ gauge: '.017 P', weight: 0.00006402 },
	{ gauge: '.018 P', weight: 0.00007177 },
	{ gauge: '.019 P', weight: 0.00007997 },
	{ gauge: '.020 P', weight: 0.00008861 },
	{ gauge: '.022 P', weight: 0.00010722 },
	{ gauge: '.024 P', weight: 0.0001276 },
	{ gauge: '.026 P', weight: 0.00014975 },

	{ gauge: '.017 W', weight: 0.00005524 },
	{ gauge: '.018 W', weight: 0.00006215 },
	{ gauge: '.019 W', weight: 0.00006947 },
	{ gauge: '.020 W', weight: 0.00007495 },
	{ gauge: '.021 W', weight: 0.00008293 },
	{ gauge: '.022 W', weight: 0.00009184 },
	{ gauge: '.024 W', weight: 0.00010857 },
	{ gauge: '.025 W', weight: 0.00011764 },
	{ gauge: '.026 W', weight: 0.00012671 },
	{ gauge: '.028 W', weight: 0.00014666 },
	{ gauge: '.030 W', weight: 0.00017236 },
	{ gauge: '.032 W', weight: 0.00019347 },
	{ gauge: '.034 W', weight: 0.0002159 },
	{ gauge: '.036 W', weight: 0.00023964 },
	{ gauge: '.037 W', weight: 0.000252175 },
	{ gauge: '.038 W', weight: 0.00026471 },
	{ gauge: '.039 W', weight: 0.00027932 },
	{ gauge: '.040 W', weight: 0.000301055 },
	{ gauge: '.042 W', weight: 0.00032279 },
	{ gauge: '.044 W', weight: 0.00035182 },
	{ gauge: '.046 W', weight: 0.00038216 },
	{ gauge: '.048 W', weight: 0.00041382 },
	{ gauge: '.049 W', weight: 0.00043014 },
	{ gauge: '.050 W', weight: 0.000447123 },
	{ gauge: '.052 W', weight: 0.00048109 },
	{ gauge: '.054 W', weight: 0.00053838 },
	{ gauge: '.056 W', weight: 0.00057598 },
	{ gauge: '.059 W', weight: 0.00064191 },
	{ gauge: '.060 W', weight: 0.00066542 },
	{ gauge: '.062 W', weight: 0.00070697 },
	{ gauge: '.064 W', weight: 0.00074984 },
	{ gauge: '.065 W', weight: 0.000774365 },
	{ gauge: '.066 W', weight: 0.00079889 },
	{ gauge: '.068 W', weight: 0.00084614 },
	{ gauge: '.070 W', weight: 0.00089304 },
	{ gauge: '.072 W', weight: 0.00094124 },
	{ gauge: '.074 W', weight: 0.00098869 },
	{ gauge: '.080 W', weight: 0.00115011 }
];

const PACKS = [ {
	name: ".007 Dunlop Rev. Willy's",
	plain: [ { gauge: '.007 P', note: 'E4' }, { gauge: '.009 P', note: 'B3' }, { gauge: '.011 P', note: 'G3' } ],
	wound: [ { gauge: '.020 W', note: 'D3' }, { gauge: '.030 W', note: 'A2' }, { gauge: '.038 W', note: 'E2' } ]
}, {
	name: ".008 Dunlop Rev. Willy's",
	plain: [ { gauge: '.008 P', note: 'E4' }, { gauge: '.010 P', note: 'B3' }, { gauge: '.012 P', note: 'G3' } ],
	wound: [ { gauge: '.020 W', note: 'D3' }, { gauge: '.030 W', note: 'A2' }, { gauge: '.040 W', note: 'E2' } ]
}, {
	name: ".008 D'Addario EXL130",
	plain: [ { gauge: '.008 P', note: 'E4' }, { gauge: '.010 P', note: 'B3' }, { gauge: '.015 P', note: 'G3' } ],
	wound: [ { gauge: '.021 W', note: 'D3' }, { gauge: '.030 W', note: 'A2' }, { gauge: '.038 W', note: 'E2' } ]
}, {
	name: '.008 Ernie Ball Extra Slinky',
	plain: [ { gauge: '.008 P', note: 'E4' }, { gauge: '.011 P', note: 'B3' }, { gauge: '.014 P', note: 'G3' } ],
	wound: [ { gauge: '.022 W', note: 'D3' }, { gauge: '.030 W', note: 'A2' }, { gauge: '.038 W', note: 'E2' } ]
}, {
	name: ".009 D'Addario/Ernie Ball",
	plain: [ { gauge: '.009 P', note: 'E4' }, { gauge: '.011 P', note: 'B3' }, { gauge: '.016 P', note: 'G3' } ],
	wound: [ { gauge: '.024 W', note: 'D3' }, { gauge: '.032 W', note: 'A2' }, { gauge: '.042 W', note: 'E2' } ]
}, {
	name: ".009 D'Addario/Ernie Ball hybrid",
	plain: [ { gauge: '.009 P', note: 'E4' }, { gauge: '.011 P', note: 'B3' }, { gauge: '.016 P', note: 'G3' } ],
	wound: [ { gauge: '.026 W', note: 'D3' }, { gauge: '.036 W', note: 'A2' }, { gauge: '.046 W', note: 'E2' } ]
}, {
	name: ".009 D'Addario EXL120BT balanced",
	plain: [ { gauge: '.009 P', note: 'E4' }, { gauge: '.012 P', note: 'B3' }, { gauge: '.015 P', note: 'G3' } ],
	wound: [ { gauge: '.022 W', note: 'D3' }, { gauge: '.030 W', note: 'A2' }, { gauge: '.040 W', note: 'E2' } ]
}, {
	name: ".010 D'Addario/Ernie Ball",
	plain: [ { gauge: '.010 P', note: 'E4' }, { gauge: '.013 P', note: 'B3' }, { gauge: '.017 P', note: 'G3' } ],
	wound: [ { gauge: '.026 W', note: 'D3' }, { gauge: '.036 W', note: 'A2' }, { gauge: '.046 W', note: 'E2' } ]
}, {
	name: ".010 D'Addario/Ernie Ball hybrid",
	plain: [ { gauge: '.010 P', note: 'E4' }, { gauge: '.013 P', note: 'B3' }, { gauge: '.017 P', note: 'G3' } ],
	wound: [ { gauge: '.030 W', note: 'D3' }, { gauge: '.042 W', note: 'A2' }, { gauge: '.052 W', note: 'E2' } ]
}, {
	name: ".010 D'Addario EXL110BT balanced",
	plain: [ { gauge: '.010 P', note: 'E4' }, { gauge: '.0135 P', note: 'B3' }, { gauge: '.017 P', note: 'G3' } ],
	wound: [ { gauge: '.025 W', note: 'D3' }, { gauge: '.034 W', note: 'A2' }, { gauge: '.046 W', note: 'E2' } ]
}, {
	name: '.010 Dunlop Heavy Core Heavy',
	plain: [ { gauge: '.010 P', note: 'E4' }, { gauge: '.013 P', note: 'B3' }, { gauge: '.017 P', note: 'G3' } ],
	wound: [ { gauge: '.028 W', note: 'D3' }, { gauge: '.038 W', note: 'A2' }, { gauge: '.048 W', note: 'E2' } ]
}, {
	name: ".011 D'Addario EXL115",
	plain: [ { gauge: '.011 P', note: 'E4' }, { gauge: '.014 P', note: 'B3' }, { gauge: '.018 P', note: 'G3' } ],
	wound: [ { gauge: '.028 W', note: 'D3' }, { gauge: '.038 W', note: 'A2' }, { gauge: '.049 W', note: 'E2' } ]
}, {
	name: ".011 D'Addario EXL115BT balanced",
	plain: [ { gauge: '.011 P', note: 'E4' }, { gauge: '.015 P', note: 'B3' }, { gauge: '.019 P', note: 'G3' } ],
	wound: [ { gauge: '.028 W', note: 'D3' }, { gauge: '.037 W', note: 'A2' }, { gauge: '.050 W', note: 'E2' } ]
}, {
	name: '.011 Ernie Ball Power Slinky',
	plain: [ { gauge: '.011 P', note: 'E4' }, { gauge: '.014 P', note: 'B3' }, { gauge: '.018 P', note: 'G3' } ],
	wound: [ { gauge: '.028 W', note: 'D3' }, { gauge: '.038 W', note: 'A2' }, { gauge: '.048 W', note: 'E2' } ]
}, {
	name: '.011 Dunlop Heavy Core Heavier',
	plain: [ { gauge: '.011 P', note: 'E4' }, { gauge: '.014 P', note: 'B3' }, { gauge: '.018 P', note: 'G3' } ],
	wound: [ { gauge: '.028 W', note: 'D3' }, { gauge: '.038 W', note: 'A2' }, { gauge: '.050 W', note: 'E2' } ]
}, {
	name: ".012 D'Addario EXL145",
	plain: [ { gauge: '.012 P', note: 'E4' }, { gauge: '.016 P', note: 'B3' }, { gauge: '.020 P', note: 'G3' } ],
	wound: [ { gauge: '.032 W', note: 'D3' }, { gauge: '.042 W', note: 'A2' }, { gauge: '.054 W', note: 'E2' } ]
}, {
	name: '.012 Ernie Ball Not Even Slinky',
	plain: [ { gauge: '.012 P', note: 'E4' }, { gauge: '.016 P', note: 'B3' }, { gauge: '.024 P', note: 'G3' } ],
	wound: [ { gauge: '.032 W', note: 'D3' }, { gauge: '.044 W', note: 'A2' }, { gauge: '.056 W', note: 'E2' } ]
}, {
	name: ".009 D'Addario EXL120-7",
	plain: [ { gauge: '.009 P', note: 'E4' }, { gauge: '.011 P', note: 'B3' }, { gauge: '.016 P', note: 'G3' } ],
	wound: [ { gauge: '.024 W', note: 'D3' }, { gauge: '.032 W', note: 'A2' }, { gauge: '.042 W', note: 'E2' },
		{ gauge: '.054 W', note: 'B1'} ]
}, {
	name: '.009 Ernie Ball Super Slinky 7',
	plain: [ { gauge: '.009 P', note: 'E4' }, { gauge: '.011 P', note: 'B3' }, { gauge: '.016 P', note: 'G3' } ],
	wound: [ { gauge: '.024 W', note: 'D3' }, { gauge: '.032 W', note: 'A2' }, { gauge: '.042 W', note: 'E2' },
		{ gauge: '.052 W', note: 'B1' } ]
}, {
	name: ".010 D'Addario EXL110-7",
	plain: [ { gauge: '.010 P', note: 'E4' }, { gauge: '.013 P', note: 'B3' }, { gauge: '.017 P', note: 'G3' } ],
	wound: [ { gauge: '.026 W', note: 'D3' }, { gauge: '.036 W', note: 'A2' }, { gauge: '.046 W', note: 'E2' },
		{ gauge: '.059 W', note: 'B1'} ]
}, {
	name: '.010 Ernie Ball Regular Slinky 7',
	plain: [ { gauge: '.010 P', note: 'E4' }, { gauge: '.013 P', note: 'B3' }, { gauge: '.017 P', note: 'G3' } ],
	wound: [ { gauge: '.026 W', note: 'D3' }, { gauge: '.036 W', note: 'A2' }, { gauge: '.046 W', note: 'E2' },
		{ gauge: '.056 W', note: 'B1' } ]
}, {
	name: '.010 Dunlop Heavy Core Heavy7',
	plain: [ { gauge: '.010 P', note: 'E4' }, { gauge: '.013 P', note: 'B3' }, { gauge: '.017 P', note: 'G3' } ],
	wound: [ { gauge: '.028 W', note: 'D3' }, { gauge: '.038 W', note: 'A2' }, { gauge: '.048 W', note: 'E2' },
		{ gauge: '.060 W', note: 'B1' } ]
}, {
	name: ".009 D'Addario EXL120-8",
	plain: [ { gauge: '.009 P', note: 'E4' }, { gauge: '.011 P', note: 'B3' }, { gauge: '.016 P', note: 'G3' } ],
	wound: [ { gauge: '.024 W', note: 'D3' }, { gauge: '.032 W', note: 'A2' }, { gauge: '.042 W', note: 'E2' },
		{ gauge: '.054 W', note: 'B1'}, { gauge: '.065 W', note: 'F#1' } ]
}, {
	name: '.009 Ernie Ball 8-String Heavy Bottom',
	plain: [ { gauge: '.009 P', note: 'E4' }, { gauge: '.011 P', note: 'B3' }, { gauge: '.016 P', note: 'G3' } ],
	wound: [ { gauge: '.024 W', note: 'D3' }, { gauge: '.034 W', note: 'A2' }, { gauge: '.046 W', note: 'E2' },
		{ gauge: '.064 W', note: 'B1'}, { gauge: '.080 W', note: 'F#1' } ]
}, {
	name: ".010 D'Addario/Ernie Ball 8-string",
	plain: [ { gauge: '.010 P', note: 'E4' }, { gauge: '.013 P', note: 'B3' }, { gauge: '.017 P', note: 'G3' } ],
	wound: [ { gauge: '.030 W', note: 'D3' }, { gauge: '.042 W', note: 'A2' }, { gauge: '.054 W', note: 'E2' },
		{ gauge: '.064 W', note: 'B1'}, { gauge: '.074 W', note: 'F#1' } ]
}];

const COLORS = [ '#EDC240', '#AFD8F8', '#CB4B4B', '#4DA74D', '#9440ED',
	'#FF158A', '#0244FE', '#804040', '#FF8000' ];