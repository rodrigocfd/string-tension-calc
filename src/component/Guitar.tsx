import styled from 'styled-components';
import {IGuitar} from '@/model/types';

interface Props {
	guitarIndex: number;
	guitar: IGuitar;
}

function Guitar(props: Props) {
	return <div>
		<DivTopRow>
			<DivName>Guitar #{props.guitarIndex + 1}</DivName>

		</DivTopRow>

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
