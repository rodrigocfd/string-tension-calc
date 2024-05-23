import {useMemo} from 'react';
import {TNote} from '@/model/types';
import * as c from '@/model/consts';

interface Props {
	strIndex: number;
	note: TNote;
	onChange(note: TNote): void;
}

export default function Note(props: Props) {
	const pitches = useMemo(
		() => c.PITCHES_FOR_STRING.find(p => p.stringIndex === props.strIndex)!.pitches,
		[props.strIndex]);

	return <select value={props.note} onChange={e => props.onChange(e.target.value as TNote)}>
		{pitches.map(pitch =>
			<option key={pitch.note} value={pitch.note}>
				{pitch.note} {pitch.descr}
			</option>,
		)}
	</select>;
}
