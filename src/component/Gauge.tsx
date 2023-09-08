import {IGauge} from '@/model/types';
import * as c from '@/model/consts';

interface Props {
	gauge: IGauge;
	onChange(gauge: IGauge): void;
}

const gaugesByKind: {kind: 'P'|'W', label: string, gauges: IGauge[]}[] = [
	{kind: 'P', label: 'Plain', gauges: []},
	{kind: 'W', label: 'Wound', gauges: []},
];
c.GAUGES.forEach(gauge => {
	gaugesByKind.find(g => g.kind === gauge[gauge.length - 1])!
		.gauges.push(gauge);
});

export default function Gauge(props: Props) {
	return <select value={props.gauge} onChange={e => props.onChange(e.target.value as IGauge)}>
		{gaugesByKind.map(group =>
			<optgroup key={group.kind} label={group.label}>
				{group.gauges.map(gauge =>
					<option key={gauge} value={gauge}>
						{gauge}
					</option>
				)}
			</optgroup>
		)}
	</select>;
}
