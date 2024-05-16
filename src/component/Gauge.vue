<script setup lang="ts">
import {computed} from 'vue';
import {TGauge} from '@/model/types';
import * as c from '@/model/consts';

const props = defineProps<{
	gauge: TGauge;
}>();
const emit = defineEmits<{
	'update:gauge': [gauge: TGauge];
}>();

const gaugesByKind: {kind: 'P'|'W'; label: string; gauges: TGauge[]}[] = [
	{kind: 'P', label: 'Plain', gauges: []},
	{kind: 'W', label: 'Wound', gauges: []},
];
c.GAUGES.forEach(gauge => {
	gaugesByKind.find(g => g.kind === gauge[gauge.length - 1])!
		.gauges.push(gauge);
});

const gauge = computed({
	get: (): TGauge => props.gauge,
	set: (gauge: TGauge): void => emit('update:gauge', gauge),
});
</script>

<template>
	<select v-model="gauge">
		<option :value="null">✕</option>
		<optgroup v-for="group of gaugesByKind"
			:key="group.kind"
			:label="group.kind">
			<option v-for="g of group.gauges" :key="g!">
				{{g}}
			</option>
		</optgroup>
	</select>
</template>