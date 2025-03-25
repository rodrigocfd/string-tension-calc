import {ChangeEvent} from 'react';
import * as c from '~/model/consts';
import {IScale, TScaleLength, TScaleMode} from '~/model/types';
import css from '~/css/Scale.module.css';

interface Props {
	scale: IScale;
	onChange(scale: IScale): void;
}

export default function Scale(props: Props) {
	const isMulti = props.scale.mode === 'multi';

	function onChangeMode(ev: ChangeEvent<HTMLSelectElement>): void {
		props.onChange({
			mode: ev.target.value as TScaleMode,
			lengthLo: props.scale.lengthLo,
			lengthHi: isMulti ? props.scale.lengthHi : props.scale.lengthLo,
		});
	}
	function onChangeLengthLo(ev: ChangeEvent<HTMLSelectElement>): void {
		const lengthLo = parseFloat(ev.target.value) as TScaleLength;
		props.onChange({
			mode: props.scale.mode,
			lengthLo,
			lengthHi: isMulti ? props.scale.lengthHi : lengthLo,
		});
	}
	function onChangeLengthHi(ev: ChangeEvent<HTMLSelectElement>): void {
		props.onChange({
			...props.scale,
			lengthHi: isMulti ? parseFloat(ev.target.value) as TScaleLength : props.scale.lengthLo,
		});
	}

	return <div className={css.scaleRow}>
		<select value={props.scale.mode} onChange={onChangeMode}>
			{c.SCALE_MODES.map(mode =>
				<option key={mode} value={mode}>
					{mode}
				</option>,
			)}
		</select>

		<select value={props.scale.lengthLo} onChange={onChangeLengthLo}>
			{c.SCALE_LENGTHS.map(len =>
				<option key={len} value={len}>
					{len}&apos;&apos;
				</option>,
			)}
		</select>
		<div style={{display: isMulti ? '' : 'none'}}>(low)</div>

		<div style={{display: isMulti ? '' : 'none'}}>to</div>

		<select style={{display: isMulti ? '' : 'none'}}
			value={props.scale.lengthHi}
			onChange={onChangeLengthHi}>
			{c.SCALE_LENGTHS.map(len =>
				<option key={len} value={len}>
					{len}&apos;&apos;
				</option>,
			)}
		</select>
		<div style={{display: isMulti ? '' : 'none'}}>(high)</div>
	</div>;
}
