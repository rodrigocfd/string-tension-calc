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

	return <DivGuitarBox gtrIdx={props.guitarIndex % 7}>
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
	</DivGuitarBox>;
}

export default Guitar;

const DivGuitarBox = styled.div<{gtrIdx: number}>`
	--color0: #36a2eb;
	--color1: #ff6384;
	--color2: #ff9f40;
	--color3: #ffcd56;
	--color4: #4bc0c0;
	--color5: #9966ff;
	--color6: #c9cbcf;
	padding: 2px 1px;
	border: 1px solid #ddd;
	border-top: 4px solid var(--color${p => p.gtrIdx});
	& > div {
		padding: 3px 6px;
	}
`;
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
