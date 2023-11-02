import {animated, useTransition} from '@react-spring/web';
import {useStore} from '@/model/store';
import Guitar from './Guitar';
import s from '@/component-styles/GuitarList.module.scss';

export default function GuitarList() {
	const guitars = useStore(s => s.guitars);
	const trans = useTransition(guitars, {
		from: {opacity: 0, transform: 'translateY(-100px)'},
		enter: {opacity: 1, transform: 'translateY(0)'},
		leave: {opacity: 0, transform: 'translateY(-100px)'},
		config: {
			duration: 200,
		},
	});

	return <div>
		{trans((style, g, state, gtrIdx) =>
			<animated.div className={s.gtrBlock} style={style}>
				<Guitar guitarIndex={gtrIdx} guitar={g} />
			</animated.div>
		)}
	</div>;
}
