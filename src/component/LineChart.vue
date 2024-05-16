<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
import {Chart} from 'chart.js/auto';
import useStore from '@/model/useStore';
import {countValidStrings} from '@/model/funcs';
import * as c from '@/model/consts';

const store = useStore();

const canvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart<'line', number[], string> | null = null;

onMounted(() => {
	chart = new Chart(canvas.value!, {
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
	});
});

watch([() => store.guitars, () => store.unit], ([gtrs, _unit], [_prevGtrs, _prevUnit]) => {
	const maxNumStrs = Math.max(...gtrs.map(gtr => countValidStrings(gtr)));
	chart!.data.labels = c.STRING_NAMES.slice(0, maxNumStrs).reverse();
	chart!.data.datasets = gtrs.map((gtr, gtrIdx) => ({
		label: 'Guitar #' + (gtrIdx + 1),
		data: gtr.strings.map(str => str.tension).slice(0, maxNumStrs).reverse(),
		tension: .1,
		pointRadius: 8,
		pointHoverRadius: 6,
	}));
	chart!.update('none');
}, {
	deep: true,
});
</script>

<template>
	<div :class="m.chart" v-show="store.guitars.length > 0">
		<canvas ref="canvas" />
	</div>
</template>

<style module="m" lang="scss">
	.chart {
		max-width: 100vw;
		max-height: 240px;
	}
</style>