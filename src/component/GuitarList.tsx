import {AnimatePresence, HTMLMotionProps, motion} from 'framer-motion';
import useStore from '~/model/useStore';
import Guitar from './Guitar';
import css from '~/css/GuitarList.module.css';

const animation: HTMLMotionProps<'div'> = {
	initial: {scale: 0},
	animate: {scale: 1},
	exit: {scale: 0},
	transition: {duration: .25},
};

export default function GuitarList() {
	const store = useStore();

	return <AnimatePresence>
		{store.guitars.map((g, idx) =>
			<motion.div key={g._id} layout {...animation} className={css.gtrBlock}>
				<Guitar guitarIndex={idx} guitar={g} />
			</motion.div>,
		)}
	</AnimatePresence>;
}
