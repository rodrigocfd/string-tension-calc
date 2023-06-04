import styled from 'styled-components';
import {useStore} from '@/model/store';
import GuitarList from './GuitarList';
import LineChart from './LineChart';
import Unit from './Unit';
import GlobalStyle from './globalStyle';

function App() {
	const addNew = useStore(s => s.addNew);

	return <>
		<GlobalStyle />
		<Header>
			<h1>String Tension Calculator</h1>
			<DivTopButtons>
				<Unit />
				<BtnAddNew onClick={() => addNew()}>New guitar</BtnAddNew>
			</DivTopButtons>
			<LnkRepo href="https://github.com/rodrigocfd/string-tension-calc">
				<img src="/github.svg" />
			</LnkRepo>
		</Header>
		<GuitarList />
		<LineChart />
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
const BtnAddNew = styled.button`
	margin-left: 12px;
	white-space: nowrap;
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
