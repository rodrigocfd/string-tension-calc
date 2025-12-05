import {useMemo} from 'react';
import * as c from '~/model/consts';
import {IGuitar, IString, TGauge, TNote, TPackName, TTuningName} from '~/model/types';
import useStore from '~/model/useStore';
import Gauge from './Gauge';
import Note from './Note';

interface Props {
	strIndex: number;
	str: IString;
	guitar: IGuitar;
}

export default function StringRow(props: Props) {
	const unit = useStore(s => s.unit);
	const changeGauge = useStore(s => s.changeGauge);
	const changeNote = useStore(s => s.changeNote);

	const clsGauge = useClsGauge(props.guitar.packName, props.strIndex, props.str.gauge);
	const clsNote = useClsNote(props.guitar.tuningName, props.strIndex, props.str.note);

	const tensionStr = useMemo(() =>
		isNaN(props.str.tension) ? '–' : props.str.tension.toFixed(2),
	[props.str.tension]);

	return <>
		<div className='StringRow-elem StringRow-name'>
			{c.STRING_NAMES[props.strIndex]}
		</div>
		<div className={clsGauge}>
			<Gauge gauge={props.str.gauge}
				onChange={g => changeGauge(props.guitar, props.str, g)} />
		</div>
		<div className={clsNote}>
			{!isNaN(props.str.tension) &&
				<Note strIndex={props.strIndex}
					note={props.str.note}
					onChange={n => changeNote(props.guitar, props.str, n)} />
			}
		</div>
		<div className='StringRow-elem'>
			<input type='text'
				className='StringRow-tension'
				value={tensionStr}
				disabled /> {unit}
		</div>
	</>;
}

function useClsGauge(packName: TPackName, strIndex: number, strGauge: TGauge) {
	return useMemo(() => {
		const pack = c.PACKS.find(p => p.name === packName)!;
		const isModif = pack.gauges[strIndex] !== strGauge;
		return 'StringRow-elem StringRow-modif ' + (isModif ? 'StringRow-yesModif' : 'StringRow-noModif');
	}, [packName, strIndex, strGauge]);
}

function useClsNote(tuningName: TTuningName, strIndex: number, strNote: TNote) {
	return useMemo(() => {
		const tuning = c.TUNINGS.find(t => t.name === tuningName)!;
		const isModif = tuning.notes[strIndex] !== strNote;
		return 'StringRow-elem StringRow-modif ' + (isModif ? 'StringRow-yesModif' : 'StringRow-noModif');
	}, [tuningName, strIndex, strNote]);
}
