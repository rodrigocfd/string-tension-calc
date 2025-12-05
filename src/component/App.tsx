import ghlogo from '/gh-logo.svg';
import useStore from '~/model/useStore';
import GuitarList from './GuitarList';
import LineChart from './LineChart';
import Unit from './Unit';

export default function App() {
	const addGuitar = useStore(s => s.addGuitar);

	return <>
		<header className='App-header'>
			<h1>String Tension Calculator</h1>
			<div className='App-topButtons'>
				<Unit />
				<button type='button' onClick={addGuitar} className='App-addNew'>
					New guitar
				</button>
			</div>
			<a href='https://github.com/rodrigocfd/string-tension-calc' className='App-repo'>
				<img src={ghlogo} />
			</a>
		</header>
		<GuitarList />
		<LineChart />
	</>;
}
