import * as c from '~/model/consts';
import {TUnit} from '~/model/types';
import useStore from '~/model/useStore';

export default function Unit() {
	const store = useStore();

	return <select value={store.unit} onChange={e => store.setUnit(e.target.value as TUnit)}>
		{c.UNITS.map(u =>
			<option key={u.name} value={u.name}>
				unit: {u.name}
			</option>,
		)}
	</select>;
}
