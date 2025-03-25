import {ChangeEvent} from 'react';
import * as c from '~/model/consts';
import {TGauge} from '~/model/types';

interface Props {
	gauge: TGauge;
	onChange(gauge: TGauge): void;
}

interface GaugesByKind {
	kind: 'P' | 'W';
	label: string;
	gauges: TGauge[];
}

const gaugesByKind: GaugesByKind[] = [
	{kind: 'P', label: 'Plain', gauges: []},
	{kind: 'W', label: 'Wound', gauges: []},
];
c.GAUGES.forEach(gauge => {
	gaugesByKind.find(g => g.kind === gauge[gauge.length - 1])!
		.gauges.push(gauge);
});

export default function Gauge(props: Props) {
	const gaugeStr = (props.gauge === null) ? '' : props.gauge;

	function change(ev: ChangeEvent<HTMLSelectElement>): void {
		const val = ev.target.value;
		props.onChange(val === '' ? null : val as TGauge);
	}

	return <select value={gaugeStr} onChange={change}>
		<option value={''}>✕</option>
		{gaugesByKind.map(group =>
			<optgroup key={group.kind} label={group.label}>
				{group.gauges.map(gauge =>
					<option key={gauge} value={gauge!}>
						{gauge}
					</option>,
				)}
			</optgroup>,
		)}
	</select>;
}
