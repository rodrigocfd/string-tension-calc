import {ChangeEvent, useRef} from 'react';
import {IScale, IScaleMode, IScaleLength} from '@/model/types';
import * as c from '@/model/consts';
import s from '@/component-styles/Scale.module.scss';

interface Props {
	scale: IScale;
	onChange(scale: IScale): void;
}

export default function Scale(props: Props) {
	const cmbMode = useRef<HTMLSelectElement| null>(null);
	const cmbLenLo = useRef<HTMLSelectElement| null>(null);
	const cmbLenHi = useRef<HTMLSelectElement| null>(null);
	const isMulti = props.scale.mode === 'multi';

	function change(_ev: ChangeEvent<HTMLSelectElement>): void {
		const mode = cmbMode.current!.value as IScaleMode;
		const lengthLo = parseFloat(cmbLenLo.current!.value) as IScaleLength;
		const lengthHi = (mode === 'normal')
			? lengthLo
			: parseFloat(cmbLenHi.current!.value) as IScaleLength;
		props.onChange({mode, lengthLo, lengthHi});
	}

	return <div className={s.scaleRow}>
		<select ref={cmbMode} value={props.scale.mode} onChange={change}>
			{c.SCALE_MODES.map(mode =>
				<option key={mode} value={mode}>
					{mode}
				</option>
			)}
		</select>

		<select ref={cmbLenLo} value={props.scale.lengthLo} onChange={change}>
			{c.SCALE_LENGTHS.map(len =>
				<option key={len} value={len}>
					{len}''
				</option>
			)}
		</select>
		<div style={{display: isMulti ? '' : 'none'}}>(low)</div>

		<div style={{display: isMulti ? '' : 'none'}}>to</div>

		<select style={{display: isMulti ? '' : 'none'}}
			ref={cmbLenHi}
			value={props.scale.lengthHi}
			onChange={change}>
			{c.SCALE_LENGTHS.map(len =>
				<option key={len} value={len}>
					{len}''
				</option>
			)}
		</select>
		<div style={{display: isMulti ? '' : 'none'}}>(high)</div>
	</div>;
}
