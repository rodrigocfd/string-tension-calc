import styled from 'styled-components';
import GuitarList from './GuitarList';
import Unit from './Unit';

function App() {
	return <>
		<Header>
			<h1>String Tension Calculator</h1>
			<DivTopButtons>
				<Unit />

			</DivTopButtons>
			<LnkRepo href="https://github.com/rodrigocfd/string-tension-calc">
				<img src="/github.svg" />
			</LnkRepo>
		</Header>
		<GuitarList />
	</>;
}

export default App;

const Header = styled.header`
	display: flex;
	align-items: baseline;
	& > h1 {
		font-size: 16pt;
		margin: 0 18px 12px 0;
	}
`;
const DivTopButtons = styled.div`
	display: flex;
	@media (max-width: 480px) {
		flex-direction: column;
		gap: 6px;
	}
`;
const LnkRepo = styled.a`
	align-self: center;
	&:hover {
		transform: scale(1.1);
	}
	&:active {
		transform: scale(1.2);
	}
	& > img {
		width: 22px;
		padding-left: 10px;
	}
`;
