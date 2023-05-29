import {IGauge, INote, IScale, IUnit} from './types';
import * as c from './consts';

function effectiveScaleLength(
	stringIndex: number, numStrings: number, scale: IScale): number
{
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
	stringIndex: number, numStrings: number, gauge: IGauge, note: INote,
	scale: IScale, unit: IUnit): number
{
	const gaugeStr = gauge;
	const gaugeFloat = parseFloat(gaugeStr.slice(0, -2));
	const isPlain = gaugeStr.endsWith('P');
	const freq = c.PITCHES.find(p => p.note === note)!.freq;
	const effScaleLen = effectiveScaleLength(stringIndex, numStrings, scale);

	let tension = polynomialGauge(gaugeFloat, isPlain) * Math.pow(2 * effScaleLen * freq, 2) / 386.4;

	if (unit === 'kg/cm') tension *= .17858;
	else if (unit === 'N') tension *= 4.44822;

	return tension;
};
