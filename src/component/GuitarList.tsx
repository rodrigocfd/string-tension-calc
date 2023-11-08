import {useStore} from '@/model/store';
import Guitar from './Guitar';
import s from '@/component-styles/GuitarList.module.scss';

export default function GuitarList() {
	const guitars = useStore(s => s.guitars);

	return <>
		{guitars.map((g, idx) =>
			<div key={g._id} className={s.gtrBlock}>
				<Guitar guitarIndex={idx} guitar={g} />
			</div>
		)}
	</>;
}
