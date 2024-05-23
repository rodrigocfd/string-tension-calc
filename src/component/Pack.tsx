import {TNumStrings, TPackName} from '@/model/types';
import * as c from '@/model/consts';

interface Props {
	packName: TPackName;
	onChange(packName: TPackName): void;
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

export default function Pack(props: Props) {
	return <select value={props.packName} onChange={e => props.onChange(e.target.value as TPackName)}>
		{packsByNumStrings.map(group =>
			<optgroup key={group.num} label={group.num +  ' strings'}>
				{group.packNames.map(packName =>
					<option key={packName} value={packName}>
						[{group.num}] {packName}
					</option>,
				)}
			</optgroup>,
		)}
	</select>;
}
