import {INumStrings, IPackName} from '@/model/types';
import * as c from '@/model/consts';

interface Props {
	packName: IPackName;
	onChange(packName: IPackName): void;
}

const packsByNumStrings: {num: INumStrings, packNames: IPackName[]}[] = [
	{num: 6, packNames: []},
	{num: 7, packNames: []},
	{num: 8, packNames: []},
];
c.PACKS.forEach(defPack => {
	packsByNumStrings.find(p => p.num === defPack.gauges.length)!
		.packNames.push(defPack.name);
});

function Pack(props: Props) {
	return <select value={props.packName} onChange={e => props.onChange(e.target.value as IPackName)}>
		{packsByNumStrings.map(group =>
			<optgroup key={group.num} label={group.num +  ' strings'}>
				{group.packNames.map(packName =>
					<option key={packName} value={packName}>
						{packName}
					</option>
				)}
			</optgroup>
		)}
	</select>;
}

export default Pack;
