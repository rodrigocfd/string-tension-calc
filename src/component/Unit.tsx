import * as c from '~/model/consts';
import {TUnit} from '~/model/types';
import useStore from '~/model/useStore';

export default function Unit() {
	const unit = useStore(s => s.unit);
	const setUnit = useStore(s => s.setUnit);

	return <select value={unit} onChange={ev => setUnit(ev.target.value as TUnit)}>
		{c.UNITS.map(u =>
			<option key={u.name} value={u.name}>
				unit: {u.name}
			</option>,
		)}
	</select>;
}
