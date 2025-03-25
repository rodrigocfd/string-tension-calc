import {useMemo} from 'react';
import {IGuitar} from '~/model/types';
import useStore from '~/model/useStore';
import css from '~/css/Summation.module.css';

interface Props {
	guitar: IGuitar;
}

export default function Summation(props: Props) {
	const store = useStore();
	const sum = useMemo(() =>
		props.guitar.strings.reduce((accum, str) =>
			accum + (isNaN(str.tension) ? 0 : str.tension), 0),
	[props.guitar.strings]);

	return <div>
		∑ <input type='text'
			className={css.tension}
			value={sum.toFixed(2)}
			disabled /> {store.unit}
	</div>;
}
