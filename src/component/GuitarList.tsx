import useStore from '~/model/useStore';
import Guitar from './Guitar';

export default function GuitarList() {
	const guitars = useStore(s => s.guitars);

	return <>
		{guitars.map((g, idx) =>
			<div key={g._id} className='GuitarList-block'>
				<Guitar guitarIndex={idx} guitar={g} />
			</div>,
		)}
	</>;
}
