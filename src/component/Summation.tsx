import styled from 'styled-components';
import {IGuitar} from '@/model/types';
import {useStore} from '@/model/store';

interface Props {
	guitar: IGuitar;
}

function Summation(props: Props) {
	const unit = useStore(s => s.unit);
	const sum = props.guitar.strings.reduce((accum, str) => accum + str.tension, 0);

	return <div>
		∑ <InputTension type='text' value={sum.toFixed(2)} disabled /> {unit}
	</div>;
}

export default Summation;

const InputTension = styled.input`
	width: 3.5em;
	text-align: right;
`;
