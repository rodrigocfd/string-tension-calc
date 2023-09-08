import styled from 'styled-components';

import {useStore} from '@/model/store';
import Guitar from './Guitar';

export default function GuitarList() {
	const guitars = useStore(s => s.guitars);

	return <div>
		{guitars.map((g, gtrIdx) =>
			<DivGtrBlock key={g._id}>
				<Guitar guitarIndex={gtrIdx} guitar={g} />
			</DivGtrBlock>
		)}
	</div>;
}

const DivGtrBlock = styled.div`
	display: inline-block;
	vertical-align: top;
	margin: 0 10px 10px 0;
`;
