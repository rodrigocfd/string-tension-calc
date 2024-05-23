import {useMemo} from 'react';
import {IGuitar, IString} from '@/model/types';
import {useStore} from '@/model/useStore';
import * as c from '@/model/consts';
import Gauge from './Gauge';
import Note from './Note';
import s from '@/component-styles/StringRow.module.scss';

interface Props {
	strIndex: number;
	str: IString;
	guitar: IGuitar;
}

export default function StringRow(props: Props) {
	const unit = useStore(s => s.unit);
	const changeGauge = useStore(s => s.changeGauge);
	const changeNote = useStore(s => s.changeNote);

	const isModifGauge = useMemo(() => {
		const pack = c.PACKS.find(p => p.name === props.guitar.packName)!;
		return pack.gauges[props.strIndex] !== props.str.gauge;
	}, [props.guitar.packName, props.strIndex, props.str.gauge]);

	const isModifNote = useMemo(() => {
		const tuning = c.TUNINGS.find(t => t.name === props.guitar.tuningName)!;
		return tuning.notes[props.strIndex] !== props.str.note;
	}, [props.guitar.tuningName, props.strIndex, props.str.note]);

	const clsModifGauge = [s.elem, s.modif, isModifGauge ? s.yes : s.no].join(' ');
	const clsModifNote  = [s.elem, s.modif, isModifNote  ? s.yes : s.no].join(' ');

	const tensionStr = useMemo(() =>
		isNaN(props.str.tension) ? '–' : props.str.tension.toFixed(2),
	[props.str.tension]);

	return <>
		<div className={[s.strName, s.elem].join(' ')}>{c.STRING_NAMES[props.strIndex]}</div>
		<div className={clsModifGauge}>
			<Gauge gauge={props.str.gauge}
				onChange={g => changeGauge(props.guitar, props.str, g)} />
		</div>
		<div className={clsModifNote}>
			{!isNaN(props.str.tension) &&
				<Note strIndex={props.strIndex}
					note={props.str.note}
					onChange={n => changeNote(props.guitar, props.str, n)} />
			}
		</div>
		<div className={s.elem}>
			<input className={s.tension}
				type='text'
				value={tensionStr}
				disabled /> {unit}
		</div>
	</>;
}
