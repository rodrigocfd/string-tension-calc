import styled from 'styled-components';

import AnimateMount from '@/model/AnimateMount';
import {useStore} from '@/model/store';
import Guitar from './Guitar';

export default function GuitarList() {
	const guitars = useStore(s => s.guitars);

	return <div>
		{guitars.map((g, gtrIdx) =>
			<AnimateMount clsTrans='animate' key={g._id}>
				<DivGtrBlock>
					<Guitar guitarIndex={gtrIdx} guitar={g} />
				</DivGtrBlock>
			</AnimateMount>
		)}
	</div>;
}

const DivGtrBlock = styled.div`
	display: inline-block;
	vertical-align: top;
	margin: 0 10px 10px 0;

	transition: transform .4s, opacity .4s;
	transform: translateY(-100px);
	opacity: 0;
	&.animate {
		transform: translateY(0);
		opacity: 1;
	}
`;
