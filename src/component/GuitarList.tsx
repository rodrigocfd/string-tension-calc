import {AnimatePresence, HTMLMotionProps, motion} from 'framer-motion';
import useStore from '~/model/useStore';
import Guitar from './Guitar';

const animation: HTMLMotionProps<'div'> = {
	initial: {scale: 0},
	animate: {scale: 1},
	exit: {scale: 0},
	transition: {duration: .25},
};

export default function GuitarList() {
	const guitars = useStore(s => s.guitars);

	return <AnimatePresence>
		{guitars.map((g, idx) =>
			<motion.div key={g._id} layout {...animation} className='GuitarList-block'>
				<Guitar guitarIndex={idx} guitar={g} />
			</motion.div>,
		)}
	</AnimatePresence>;
}
