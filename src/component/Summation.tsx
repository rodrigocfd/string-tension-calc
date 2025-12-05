import {IGuitar} from '~/model/types';
import useStore from '~/model/useStore';

interface Props {
	guitar: IGuitar;
}

export default function Summation(props: Props) {
	const unit = useStore(s => s.unit);

	const sumTension = props.guitar.strings.reduce((accum, str) =>
		accum + (isNaN(str.tension) ? 0 : str.tension), 0);

	return <div>
		∑ <input className='Summation-tension'
			type='text'
			value={sumTension.toFixed(2)}
			disabled /> {unit}
	</div>;
}
