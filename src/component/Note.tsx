import {useMemo} from 'react';

import {INote} from '@/model/types';
import * as c from '@/model/consts';

interface Props {
	strIndex: number;
	note: INote;
	onChange(note: INote): void;
}

export default function Note(props: Props) {
	const pitches = useMemo(
		() => c.PITCHES_FOR_STRING.find(p => p.stringIndex === props.strIndex)!.pitches,
		[props.strIndex]);

	return <select value={props.note} onChange={e => props.onChange(e.target.value as INote)}>
		{pitches.map(pitch =>
			<option key={pitch.note} value={pitch.note}>
				{pitch.note} {pitch.descr}
			</option>
		)}
	</select>;
}
