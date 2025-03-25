import ghlogo from '/ghlogo.svg';
import useStore from '~/model/useStore';
import GuitarList from './GuitarList';
import LineChart from './LineChart';
import Unit from './Unit';
import css from '~/css/App.module.css';

export default function App() {
	const store = useStore();

	return <>
		<header className={css.header}>
			<h1>String Tension Calculator</h1>
			<div className={css.topButtons}>
				<Unit />
				<button type='button' onClick={store.addNew} className={css.addNew}>
					New guitar
				</button>
			</div>
			<a href='https://github.com/rodrigocfd/string-tension-calc' className={css.repo}>
				<img src={ghlogo} />
			</a>
		</header>
		<GuitarList />
		<LineChart />
	</>;
}
