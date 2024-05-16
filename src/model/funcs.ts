import {IGuitar, IScale, IString, TGauge, TNote, TPackName, TTuningName, TUnit} from './types';
import * as c from './consts';

let curId = 0;
export function nextId(): number {
	return curId++;
}

export function genStrings(
	packName: TPackName,
	tuningName: TTuningName,
	scale: IScale,
	unit: TUnit,
): IString[] {
	const pack = c.PACKS.find(pack => pack.name === packName)!;
	return pack.gauges.map((gauge, strIdx) => {
		const tuning = c.TUNINGS.find(tuning => tuning.name === tuningName)!;
		const tension = (gauge === null) ? NaN
			: calcTension(strIdx, pack.gauges.length, gauge, tuning.notes[strIdx], scale, unit);
		return {
			_id: nextId(),
			gauge,
			note: tuning.notes[strIdx],
			tension,
		};
	});
}

export function countValidStrings(guitar: IGuitar): number {
	let count = guitar.strings.length;
	for (let i = guitar.strings.length - 1; i >= 0; --i) {
		if (!isNaN(guitar.strings[i].tension)) {
			count = i + 1;
			break;
		}
	}
	return Math.max(6, count);
}

function effectiveScaleLength(
	stringIndex: number,
	numStrings: number,
	scale: IScale,
): number {
	const diff = scale.lengthLo - scale.lengthHi;
	const incr = diff / (numStrings - 1);
	return scale.lengthHi + incr * stringIndex;
}

function polynomialGauge(gauge: number, isPlain: boolean): number {
	const coefs = isPlain ?
		[-.000176520934, .0840206843, -16.01839853, 1656.456428,
			-96731.24564, 3248319.241, -58293798.41, 432468921.1] :
		[-.002123403683, .4863557681, -46.19498733, 2403.599196,
			-74026.84724, 1389623.565, -15576312.23, 95696503.28, -247760614.2];

	return coefs.reduce((tot, coef, i) => tot + coef * Math.pow(gauge, i), 0);
}

export function calcTension(
	stringIndex: number,
	numStrings: number,
	gauge: TGauge,
	note: TNote,
	scale: IScale,
	unit: TUnit,
): number {
	if (gauge === null) {
		return NaN;
	} else {
		const gaugeStr = gauge;
		const gaugeFloat = parseFloat(gaugeStr.slice(0, -2));
		const isPlain = gaugeStr.endsWith('P');
		const freq = c.PITCHES.find(p => p.note === note)!.freq;
		const effScaleLen = effectiveScaleLength(stringIndex, numStrings, scale);

		const tension = polynomialGauge(gaugeFloat, isPlain) * Math.pow(2 * effScaleLen * freq, 2) / 386.4;

		const unitInfo = c.UNITS.find(u => u.name === unit)!;
		return tension * unitInfo.lbFactor;
	}
}
