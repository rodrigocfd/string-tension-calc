import {ChangeEvent, useRef} from 'react';
import styled from 'styled-components';

import {IScale, IScaleMode, IScaleLength} from '@/model/types';
import * as c from '@/model/consts';

interface Props {
	scale: IScale;
	onChange(scale: IScale): void;
}

function Scale(props: Props) {
	const cmbMode = useRef<HTMLSelectElement| null>(null);
	const cmbLenLo = useRef<HTMLSelectElement| null>(null);
	const cmbLenHi = useRef<HTMLSelectElement| null>(null);
	const isMulti = props.scale.mode === 'multi';

	function change(ev: ChangeEvent<HTMLSelectElement>): void {
		const mode = cmbMode.current!.value as IScaleMode;
		const lengthLo = parseFloat(cmbLenLo.current!.value) as IScaleLength;
		const lengthHi = (mode === 'normal')
			? lengthLo
			: parseFloat(cmbLenHi.current!.value) as IScaleLength;
		props.onChange({mode, lengthLo, lengthHi});
	}

	return <DivScaleRow>
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
		<DivShowHide $show={isMulti}>(low)</DivShowHide>

		<DivShowHide $show={isMulti}>to</DivShowHide>

		<SelectShowHide $show={isMulti} ref={cmbLenHi} value={props.scale.lengthHi} onChange={change}>
			{c.SCALE_LENGTHS.map(len =>
				<option key={len} value={len}>
					{len}''
				</option>
			)}
		</SelectShowHide>
		<DivShowHide $show={isMulti}>(high)</DivShowHide>
	</DivScaleRow>;
}

export default Scale;

const DivScaleRow = styled.div`
	display: flex;
	gap: 6px;
	align-items: baseline;
`;
const DivShowHide = styled.div<{$show: boolean}>`
	display: ${p => p.$show ? '' : 'none'};
`;
const SelectShowHide = styled.select<{$show: boolean}>`
	display: ${p => p.$show ? '' : 'none'};
`;
