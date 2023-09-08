import {ITuningName} from '@/model/types';
import * as c from '@/model/consts';

interface Props {
	tuningName: ITuningName;
	onChange(tuningName: ITuningName): void;
}

const tuningsByKind: {kind: string, tuningNames: ITuningName[]}[] = [
	{kind: 'Standard', tuningNames: []},
	{kind: 'Drop', tuningNames: []},
];
c.TUNINGS.forEach(defTuning => {
	const kind = (defTuning.name.endsWith('standard')) ? 'Standard' : 'Drop';
	tuningsByKind.find(defTuning => kind === defTuning.kind)!
		.tuningNames.push(defTuning.name);
});

export default function Tuning(props: Props) {
	return <select value={props.tuningName} onChange={e => props.onChange(e.target.value as ITuningName)}>
		{tuningsByKind.map(group =>
			<optgroup key={group.kind} label={group.kind}>
				{group.tuningNames.map(tuning =>
					<option key={tuning} value={tuning}>
						{tuning}
					</option>
				)}
			</optgroup>
		)}
	</select>;
}
