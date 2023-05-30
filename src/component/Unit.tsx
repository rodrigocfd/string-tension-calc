import {useStore} from '@/model/store';
import {IUnit} from '@/model/types';
import * as c from '@/model/consts';

function Unit() {
	const unit = useStore(s => s.unit);
	const setUnit = useStore(s => s.setUnit);

	return <select value={unit} onChange={e => setUnit(e.target.value as IUnit)}>
		{c.UNITS.map(u =>
			<option key={u.name} value={u.name}>
				unit: {u.name}
			</option>
		)}
	</select>;
}

export default Unit;
