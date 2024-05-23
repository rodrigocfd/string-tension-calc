import {useStore} from '@/model/useStore';
import {TUnit} from '@/model/types';
import * as c from '@/model/consts';

export default function Unit() {
	const unit = useStore(s => s.unit);
	const setUnit = useStore(s => s.setUnit);

	return <select value={unit} onChange={e => setUnit(e.target.value as TUnit)}>
		{c.UNITS.map(u =>
			<option key={u.name} value={u.name}>
				unit: {u.name}
			</option>,
		)}
	</select>;
}
