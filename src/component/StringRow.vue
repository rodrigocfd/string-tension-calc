<script setup lang="ts">
import {computed, useCssModule} from 'vue';
import {IGuitar, IString} from '@/model/types';
import useStore from '@/model/useStore';
import Gauge from './Gauge.vue';
import Note from './Note.vue';
import * as c from '@/model/consts';

const props = defineProps<{
	strIndex: number;
	str: IString;
	guitar: IGuitar;
}>();

const store = useStore();

const isModifGauge = computed(() => {
	const pack = c.PACKS.find(p => p.name === props.guitar.packName)!;
	return pack.gauges[props.strIndex] !== props.str.gauge;
});
const isModifNote = computed(() => {
	const tuning = c.TUNINGS.find(t => t.name === props.guitar.tuningName)!;
	return tuning.notes[props.strIndex] !== props.str.note;
});
const tension = computed(() =>
	isNaN(props.str.tension) ? '–' : props.str.tension.toFixed(2));

const m = useCssModule('m');
const clsModifGauge = computed(() => ({
	[m.elem]: true,
	[m.modif]: true,
	[m.no]: !isModifGauge.value,
	[m.yes]: isModifGauge.value,
}));
const clsModifNote = computed(() => ({
	[m.elem]: true,
	[m.modif]: true,
	[m.no]: !isModifNote.value,
	[m.yes]: isModifNote.value,
}));
</script>

<template>
	<div :class="[m.elem, m.strName]">{{c.STRING_NAMES[props.strIndex]}}</div>
	<div :class="clsModifGauge">
		<Gauge :gauge="props.str.gauge"
			@update:gauge="g => store.changeGauge(props.guitar, props.str, g)" />
	</div>
	<div :class="clsModifNote">
		<Note v-show="!isNaN(props.str.tension)"
			:strIndex="props.strIndex"
			:note="props.str.note"
			@update:note="n => store.changeNote(props.guitar, props.str, n)" />
	</div>
	<div :class="m.elem">
		<input :class="m.tension"
			type="text"
			:value="tension"
			disabled /> {{store.unit}}
	</div>
</template>

<style module="m" lang="scss">
	.elem {
		margin: 2px 3px;
		&.strName {
			width: 26px;
		}
		&.modif {
			padding: 1px;
			&.yes {
				border: 1px solid red;
			}
			&.no {
				border: 1px solid white;
			}
		}
		.tension {
			width: 3.5em;
			text-align: right;
		}
	}
</style>