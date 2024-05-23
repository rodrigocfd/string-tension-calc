import {AnimatePresence, motion} from 'framer-motion';
import {useStore} from '@/model/useStore';
import Guitar from './Guitar';
import s from '@/component-styles/GuitarList.module.scss';

export default function GuitarList() {
	const guitars = useStore(s => s.guitars);
	const animation = {
		initial: {scale: 0},
		animate: {scale: 1},
		exit: {scale: 0},
		transition: {duration: .25},
	};

	return <AnimatePresence>
		{guitars.map((g, idx) =>
			<motion.div key={g._id} className={s.gtrBlock} layout {...animation}>
				<Guitar guitarIndex={idx} guitar={g} />
			</motion.div>,
		)}
	</AnimatePresence>;
}
