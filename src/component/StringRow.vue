<script setup lang="ts">
import {computed} from 'vue';
import {IGuitar, IString} from '@/model/types';
import * as c from '@/model/consts';
import Gauge from './Gauge.vue';

const props = defineProps<{
	index: number;
	str: IString;
	guitar: IGuitar;
}>();

const modifGauge = computed((): boolean => {
	const pack = c.PACKS.find(p => p.name === props.guitar.packName)!;
	return pack.gauges[props.index] === props.str.gauge;
});
</script>

<template>
	<div :class="m.stringRow">
		<div>{{props.index + 1}}</div>
		<div :class="modifGauge ? m.modifGauge : m.origGauge">
			<Gauge v-model:gauge="props.str.gauge" />
		</div>

	</div>
</template>

<style module="m" lang="scss">
	.stringRow {
		display: flex;
		align-items: baseline;
		& > div {
			margin: 2px 3px;
			.tension {
				width: 3.5em;
				text-align: right;
			}
		}
		.origGauge {
			border: 1px solid red;
			padding: 1px;
		}
		.modifGauge {
			border: 1px solid white;
			padding: 1px;
		}
	}
</style>