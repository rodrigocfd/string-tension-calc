import {useStore} from '@/model/useStore';
import GuitarList from './GuitarList';
import LineChart from './LineChart';
import Unit from './Unit';
import ghlogo from '/ghlogo.svg';
import s from '@/component-styles/App.module.scss';
import '@/component-styles/global.scss';

export default function App() {
	const addNew = useStore(s => s.addNew);

	return <>
		<header className={s.header}>
			<h1>String Tension Calculator</h1>
			<div className={s.topButtons}>
				<Unit />
				<button className={s.addNew} onClick={addNew}>New guitar</button>
			</div>
			<a className={s.repo} href='https://github.com/rodrigocfd/string-tension-calc'>
				<img src={ghlogo} />
			</a>
		</header>
		<GuitarList />
		<LineChart />
	</>;
}
