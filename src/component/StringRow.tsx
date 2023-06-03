import styled from 'styled-components';
import {IGuitar, IString} from '@/model/types';
import {useStore} from '@/model/store';
import * as c from '@/model/consts';
import Gauge from './Gauge';

interface Props {
	strIndex: number;
	str: IString;
	guitar: IGuitar;
}

function StringRow(props: Props) {
	const unit = useStore(s => s.unit);
	const changeGauge = useStore(s => s.changeGauge);

	return <DivStringRow>
		<DivStrName>{c.STRING_NAMES[props.strIndex]}</DivStrName>
		<div>
			<Gauge gauge={props.str.gauge} onChange={g => changeGauge(props.guitar, props.str, g)} />
		</div>

		<div>
			<InputTension type='text' value={props.str.tension.toFixed(2)} disabled /> {unit}
		</div>
	</DivStringRow>;
}

export default StringRow;

const DivStringRow = styled.div`
	display: flex;
	align-items: baseline;
	& > div {
		margin: 2px 3px;
	}
`;
const DivStrName = styled.div`
	width: 26px;
`;
const InputTension = styled.input`
	width: 3.5em;
	text-align: right;
`;
