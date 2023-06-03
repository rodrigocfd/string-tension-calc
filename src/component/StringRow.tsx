import {useMemo} from 'react';
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

	const isModifGauge = useMemo(() => {
		const pack = c.PACKS.find(p => p.name === props.guitar.packName)!;
		return pack.gauges[props.strIndex] !== props.str.gauge;
	}, [props.guitar.packName, props.strIndex, props.str.gauge]);

	return <DivStringRow>
		<DivStrName>{c.STRING_NAMES[props.strIndex]}</DivStrName>
		<DivModif modif={isModifGauge}>
			<Gauge gauge={props.str.gauge} onChange={g => changeGauge(props.guitar, props.str, g)} />
		</DivModif>

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
const DivModif = styled.div<{modif: boolean}>`
	border: 1px solid ${p => p.modif ? 'red' : 'white'};
	padding: 1px;
`;
