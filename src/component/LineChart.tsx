import {useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import {Chart} from 'chart.js/auto';

import {useStore} from '@/model/store';
import * as c from '@/model/consts';

export default function LineChart() {
	const unit = useStore(s => s.unit);
	const guitars = useStore(s => s.guitars);
	const canvas = useRef<HTMLCanvasElement | null>(null);
	const [chart, setChart] = useState<Chart<'line', number[], string> | null>(null);

	useEffect(() => {
		if (canvas.current === null) return;
		if (chart === null) {
			setChart(new Chart(canvas.current!, {
				type: 'line',
				data: {
					labels: [],
					datasets: [],
				},
				options: {
					scales: {
						y: {
							min: 0,
						},
					},
				},
			}));
		} else {
			const maxNumStrs = Math.max(...guitars.map(gtr => gtr.strings.length));
			chart!.data.labels = c.STRING_NAMES.slice(0, maxNumStrs).reverse();

			chart!.data.datasets = guitars.map((gtr, gtrIdx) => ({
				label: 'Guitar #' + (gtrIdx + 1),
				data: [
					...Array(maxNumStrs - gtr.strings.length).fill(NaN),
					...[...gtr.strings].reverse().map(str => str.tension),
				],
				tension: .1,
				pointRadius: 8,
				pointHoverRadius: 6,
			}));
			chart!.update('none');
		}
	}, [canvas.current, unit, guitars]);

	return <>
		{guitars.length > 0 &&
			<DivChart>
				<canvas ref={canvas} />
			</DivChart>
		}
	</>;
}

const DivChart = styled.div`
	max-width: 100vw;
	max-height: 240px;
`;
