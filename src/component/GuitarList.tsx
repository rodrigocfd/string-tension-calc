import AnimateMount from '@/model/AnimateMount';
import {useStore} from '@/model/store';
import Guitar from './Guitar';
import s from '@/component-styles/GuitarList.module.scss';

export default function GuitarList() {
	const guitars = useStore(s => s.guitars);

	return <div>
		{guitars.map((g, gtrIdx) =>
			<AnimateMount clsTrans={s.animate} key={g._id}>
				<div className={s.gtrBlock}>
					<Guitar guitarIndex={gtrIdx} guitar={g} />
				</div>
			</AnimateMount>
		)}
	</div>;
}
