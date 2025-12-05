import * as c from '~/model/consts';
import {TNumStrings, TPackName} from '~/model/types';

interface Props {
	packName: TPackName;
	onChange(pn: TPackName): void;
}

const packsByNumStrings: {num: TNumStrings; packNames: TPackName[]}[] = [
	{num: 6, packNames: []},
	{num: 7, packNames: []},
	{num: 8, packNames: []},
];
c.PACKS.forEach(pack => {
	packsByNumStrings.find(p => p.num === pack.gauges.filter(g => g !== null).length)!
		.packNames.push(pack.name);
});

export default function PackName(props: Props) {
	return <select value={props.packName} onChange={ev => props.onChange(ev.target.value as TPackName)}>
		{packsByNumStrings.map(packGroup =>
			<optgroup key={packGroup.num} label={packGroup.num + ' strings'}>
				{packGroup.packNames.map(packName =>
					<option key={packName} value={packName}>
						{packName}
					</option>,
				)}
			</optgroup>,
		)}
	</select>;
}
