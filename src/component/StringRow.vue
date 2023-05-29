<script setup lang="ts">
import {computed} from 'vue';
import {IGuitar, IString} from '@/model/types';
import store from '@/model/store';
import * as c from '@/model/consts';
import Gauge from './Gauge.vue';
import Pitch from './Pitch.vue';

const props = defineProps<{
	strIndex: number;
	str: IString;
	guitar: IGuitar;
}>();

const isModifGauge = computed((): boolean => {
	const pack = c.PACKS.find(p => p.name === props.guitar.packName)!;
	return pack.gauges[props.strIndex] === props.str.gauge;
});
const isModifNote = computed((): boolean => {
	const tuning = c.TUNINGS.find(t => t.name === props.guitar.tuningName)!;
	return tuning.notes[props.strIndex] === props.str.note;
});
</script>

<template>
	<div :class="m.stringRow">
		<div :class="m.strName">{{c.STRING_NAMES[props.strIndex]}}</div>
		<div :class="isModifGauge ? m.modifVal : m.origVal">
			<Gauge :gauge="props.str.gauge"
				@update:gauge="g => store.changeGauge(props.guitar, props.str, g)" />
		</div>
		<div :class="isModifNote ? m.modifVal : m.origVal">
			<Pitch :stringIndex="props.strIndex"
				:note="props.str.note"
				@update:note="n => store.changeNote(props.guitar, props.str, n)" />
		</div>
		<div>
			<input type="text" :class="m.tension" :value="props.str.tension.toFixed(2)" disabled />
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
		.strName {
			width: 26px;
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