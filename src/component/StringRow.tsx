import {useMemo} from 'react';
import * as c from '~/model/consts';
import {cn} from '~/model/funcs';
import {IGuitar, IString, TGauge, TNote, TPackName, TTuningName} from '~/model/types';
import useStore from '~/model/useStore';
import Gauge from './Gauge';
import Note from './Note';
import css from '~/css/StringRow.module.css';

interface Props {
	strIndex: number;
	str: IString;
	guitar: IGuitar;
}

export default function StringRow(props: Props) {
	const store = useStore();

	const clsGauge = useClsGauge(props.guitar.packName, props.strIndex, props.str.gauge);
	const clsNote = useClsNote(props.guitar.tuningName, props.strIndex, props.str.note);

	const tensionStr = useMemo(() =>
		isNaN(props.str.tension) ? '–' : props.str.tension.toFixed(2),
	[props.str.tension]);

	return <>
		<div className={cn(css.elem, css.name)}>
			{c.STRING_NAMES[props.strIndex]}
		</div>
		<div className={clsGauge}>
			<Gauge gauge={props.str.gauge}
				onChange={g => store.changeGauge(props.guitar, props.str, g)} />
		</div>
		<div className={clsNote}>
			{!isNaN(props.str.tension) &&
				<Note strIndex={props.strIndex}
					note={props.str.note}
					onChange={n => store.changeNote(props.guitar, props.str, n)} />
			}
		</div>
		<div className={css.elem}>
			<input type='text'
				className={css.tension}
				value={tensionStr}
				disabled /> {store.unit}
		</div>
	</>;
}

function useClsGauge(packName: TPackName, strIndex: number, strGauge: TGauge) {
	return useMemo(() => {
		const pack = c.PACKS.find(p => p.name === packName)!;
		const isModif = pack.gauges[strIndex] !== strGauge;
		return cn(css.elem, [css.yesModif, isModif], [css.notModif, !isModif]);
	}, [packName, strIndex, strGauge]);
}

function useClsNote(tuningName: TTuningName, strIndex: number, strNote: TNote) {
	return useMemo(() => {
		const tuning = c.TUNINGS.find(t => t.name === tuningName)!;
		const isModif = tuning.notes[strIndex] !== strNote;
		return cn(css.elem, [css.yesModif, isModif], [css.notModif, !isModif]);
	}, [tuningName, strIndex, strNote]);
}
