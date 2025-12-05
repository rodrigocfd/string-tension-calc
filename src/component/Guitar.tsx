import {IGuitar} from '~/model/types';
import useStore from '~/model/useStore';
import PackName from './PackName';
import Scale from './Scale';
import StringRow from './StringRow';
import Summation from './Summation';
import Tuning from './Tuning';

interface Props {
	guitarIndex: number;
	guitar: IGuitar;
}

export default function Guitar(props: Props) {
	const moveLeft = useStore(s => s.moveLeft);
	const remove = useStore(s => s.remove);
	const changeScale = useStore(s => s.changeScale);
	const changePack = useStore(s => s.changePack);
	const changeTuning = useStore(s => s.changeTuning);

	return <div className={'Guitar-box Guitar-color' + (props.guitarIndex % 7)}>
		<div className='Guitar-topRow'>
			<div className='Guitar-name'>Guitar #{props.guitarIndex + 1}</div>
			<div className='Guitar-topBtns'>
				{props.guitarIndex > 0 &&
					<button type='button' onClick={() => moveLeft(props.guitar)} title='Move left'>⇐</button>
				}
				<button type='button' onClick={() => remove(props.guitar)}>✕</button>
			</div>
		</div>
		<div>
			<Scale scale={props.guitar.scale} onChange={s => changeScale(props.guitar, s)} />
		</div>
		<div>
			<PackName packName={props.guitar.packName} onChange={pn => changePack(props.guitar, pn)} />
		</div>
		<div className='Guitar-tuningSum'>
			<Tuning tuningName={props.guitar.tuningName} onChange={tn => changeTuning(props.guitar, tn)} />
			<Summation guitar={props.guitar} />
		</div>
		<div className='Guitar-stringRow'>
			{props.guitar.strings.map((str, strIdx) =>
				<StringRow key={str._id}
					strIndex={strIdx}
					str={str}
					guitar={props.guitar} />,
			)}
		</div>
	</div>;
}
