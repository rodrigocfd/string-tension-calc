import styled from 'styled-components';
import {IGuitar} from '@/model/types';
import {useStore} from '@/model/store';
import Scale from './Scale';
import StringRow from './StringRow';

interface Props {
	guitarIndex: number;
	guitar: IGuitar;
}

function Guitar(props: Props) {
	const moveLeft = useStore(s => s.moveLeft);
	const remove = useStore(s => s.remove);
	const changeScale = useStore(s => s.changeScale);

	return <div>
		<DivTopRow>
			<DivName>Guitar #{props.guitarIndex + 1}</DivName>
			<DivTopButtons>
				{props.guitarIndex > 0 &&
					<button onClick={() => moveLeft(props.guitar)} title='Move left'>⇐</button>
				}
				<button onClick={() => remove(props.guitar)} title='Remove'>✕</button>
			</DivTopButtons>
		</DivTopRow>
		<div>
			<Scale scale={props.guitar.scale} onChange={s => changeScale(props.guitar, s)} />
		</div>

		<div>
			{props.guitar.strings.map((s, strIdx) =>
				<StringRow key={s._key} strIndex={strIdx} str={s} guitar={props.guitar} />
			)}
		</div>
	</div>;
}

export default Guitar;

const DivTopRow = styled.div`
	display: flex;
	gap: 6px;
	align-items: baseline;
	justify-content: space-between;
`;
const DivName = styled.div`
	font-size: 115%;
`;
const DivTopButtons = styled.div`
	display: flex;
	gap: 6px;
`;
