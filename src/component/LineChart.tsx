import {useEffect, useRef, useState} from 'react';
import {Chart} from 'chart.js/auto';
import {useStore} from '@/model/store';
import * as c from '@/model/consts';
import s from '@/component-styles/LineChart.module.scss';

export default function LineChart() {
	const canvas = useRef<HTMLCanvasElement | null>(null);
	useChart(canvas.current);

	return <div className={s.chart}>
		<canvas ref={canvas} />
	</div>;
}

function useChart(canvas: HTMLCanvasElement | null) {
	const unit = useStore(s => s.unit);
	const guitars = useStore(s => s.guitars);
	const [chart, setChart] = useState<Chart<'line', number[], string> | null>(null);

	useEffect(() => {
		if (canvas === null) {
			if (chart !== null) {
				chart.destroy();
				setChart(null);
			}
		} else {
			if (chart === null) {
				setChart(new Chart(canvas, {
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
				chart.data.labels = c.STRING_NAMES.slice(0, maxNumStrs).reverse();

				chart.data.datasets = guitars.map((gtr, gtrIdx) => ({
					label: 'Guitar #' + (gtrIdx + 1),
					data: [
						...Array(maxNumStrs - gtr.strings.length).fill(NaN),
						...[...gtr.strings].reverse().map(str => str.tension),
					],
					tension: .1,
					pointRadius: 8,
					pointHoverRadius: 6,
				}));
				chart.update('none');
			}
		}
	}, [canvas, unit, guitars, chart]);
}
