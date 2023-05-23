<script setup lang="ts">
import {computed} from 'vue';
import {IGuitar, IString} from '@/model/types';
import store from '@/model/store';
import {calcTension} from '@/model/funcs';
import * as c from '@/model/consts';
import Gauge from './Gauge.vue';
import Pitch from './Pitch.vue';

const props = defineProps<{
	index: number;
	str: IString;
	guitar: IGuitar;
}>();

const modifGauge = computed((): boolean => {
	const pack = c.PACKS.find(p => p.name === props.guitar.packName)!;
	return pack.gauges[props.index] === props.str.gauge;
});
const modifNote = computed((): boolean => {
	const tuning = c.TUNINGS.find(t => t.name === props.guitar.tuningName)!;
	return tuning.notes[props.index] === props.str.note;
});

const tension = computed((): number =>
	calcTension(props.index, props.guitar.strings.length,
		props.str, props.guitar.scale, store.unit.value)
);
</script>

<template>
	<div :class="m.stringRow">
		<div>{{props.index + 1}}</div>
		<div :class="modifGauge ? m.modifVal : m.origVal">
			<Gauge v-model:gauge="props.str.gauge" />
		</div>
		<div :class="modifNote ? m.modifVal : m.origVal">
			<Pitch :stringIndex="props.index" v-model:note="props.str.note" />
		</div>
		<div>
			<input type="text" :class="m.tension" :value="tension.toFixed(2)" disabled />
			{{store.unit.value}}
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
		.origVal {
			border: 1px solid red;
			padding: 1px;
		}
		.modifVal {
			border: 1px solid white;
			padding: 1px;
		}
	}
</style>