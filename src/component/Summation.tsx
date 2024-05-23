import {useMemo} from 'react';
import {IGuitar} from '@/model/types';
import {useStore} from '@/model/useStore';
import s from '@/component-styles/Summation.module.scss';

interface Props {
	guitar: IGuitar;
}

export default function Summation(props: Props) {
	const unit = useStore(s => s.unit);
	const sum = useMemo(() =>
		props.guitar.strings.reduce((accum, str) =>
			accum + (isNaN(str.tension) ? 0 : str.tension), 0),
	[props.guitar.strings]);

	return <div>
		∑ <input className={s.tension}
			type='text'
			value={sum.toFixed(2)}
			disabled /> {unit}
	</div>;
}
