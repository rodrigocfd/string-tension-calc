import {cn} from '~/model/funcs';
import {IGuitar} from '~/model/types';
import useStore from '~/model/useStore';
import Pack from './Pack';
import Scale from './Scale';
import StringRow from './StringRow';
import Summation from './Summation';
import Tuning from './Tuning';
import css from '~/css/Guitar.module.css';

interface Props {
	guitarIndex: number;
	guitar: IGuitar;
}

export default function Guitar(props: Props) {
	const store = useStore();

	return <div className={cn(css.guitar, css['color' + (props.guitarIndex % 7)])}>
		<div className={css.topRow}>
			<div className={css.name}>Guitar #{props.guitarIndex + 1}</div>
			<div className={css.btns}>
				{props.guitarIndex > 0 &&
					<button onClick={() => store.moveLeft(props.guitar)} title='Move left'>⇐</button>
				}
				<button onClick={() => store.remove(props.guitar)} title='Remove'>✕</button>
			</div>
		</div>
		<div>
			<Scale scale={props.guitar.scale} onChange={s => store.changeScale(props.guitar, s)} />
		</div>
		<div>
			<Pack packName={props.guitar.packName} onChange={p => store.changePack(props.guitar, p)} />
		</div>
		<div className={css.tuningSumRow}>
			<Tuning tuningName={props.guitar.tuningName} onChange={t => store.changeTuning(props.guitar, t)} />
			<Summation guitar={props.guitar} />
		</div>
		<div className={css.stringRow}>
			{props.guitar.strings.map((str, strIdx) =>
				<StringRow key={str._id}
					strIndex={strIdx}
					str={str}
					guitar={props.guitar} />,
			)}
		</div>
	</div>;
}
