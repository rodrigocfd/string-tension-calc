import * as c from '~/model/consts';
import {TTuningName} from '~/model/types';

interface Props {
	tuningName: TTuningName;
	onChange(tn: TTuningName): void;
}

const tuningsByKind: {kind: string; tuningNames: TTuningName[]}[] = [
	{kind: 'Standard', tuningNames: []},
	{kind: 'Drop', tuningNames: []},
];
c.TUNINGS.forEach(defTuning => {
	const kind = (defTuning.name.endsWith('standard')) ? 'Standard' : 'Drop';
	tuningsByKind.find(defTuning => kind === defTuning.kind)!
		.tuningNames.push(defTuning.name);
});

export default function Tuning(props: Props) {
	return <select value={props.tuningName}
		onChange={ev => props.onChange(ev.target.value as TTuningName)}>
		{tuningsByKind.map(group =>
			<optgroup key={group.kind} label={group.kind}>
				{group.tuningNames.map(name =>
					<option key={name} value={name}>
						{name}
					</option>,
				)}
			</optgroup>,
		)}
	</select>;
}
