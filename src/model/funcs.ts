import {IGauge, INote, IPackName, IScale, IString, ITuningName, IUnit} from './types';
import * as c from './consts';

let curKey = 0;
export function genKey(): number {
	return curKey++;
}

export function genStrings(
	packName: IPackName,
	tuningName: ITuningName,
	scale: IScale,
	unit: IUnit,
): IString[] {
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

export function calcTension(
	stringIndex: number,
	numStrings: number,
	gauge: IGauge,
	note: INote,
	scale: IScale,
	unit: IUnit,
): number {
	const gaugeStr = gauge;
	const gaugeFloat = parseFloat(gaugeStr.slice(0, -2));
	const isPlain = gaugeStr.endsWith('P');
	const freq = c.PITCHES.find(p => p.note === note)!.freq;
	const effScaleLen = effectiveScaleLength(stringIndex, numStrings, scale);

	let tension = polynomialGauge(gaugeFloat, isPlain) * Math.pow(2 * effScaleLen * freq, 2) / 386.4;

	const unitInfo = c.UNITS.find(u => u.name === unit)!;
	return tension * unitInfo.lbFactor;
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
