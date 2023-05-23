<script setup lang="ts">
import {computed} from 'vue';
import {IGauge} from '@/model/types';
import * as c from '@/model/consts';

const props = defineProps<{
	gauge: IGauge;
}>();

const emit = defineEmits<{
	'update:gauge': [gauge: IGauge];
}>();

const currentGauge = computed({
	get: (): IGauge => props.gauge,
	set: (gauge: IGauge): void => emit('update:gauge', gauge),
});

const gaugesByKind: {kind: 'P'|'W', label: string, gauges: IGauge[]}[] = [
	{kind: 'P', label: 'Plain', gauges: []},
	{kind: 'W', label: 'Wound', gauges: []},
];
c.GAUGES.forEach(gauge => {
	gaugesByKind.find(g => g.kind === gauge[gauge.length - 1])!
		.gauges.push(gauge);
});
</script>

<template>
	<select v-model="currentGauge">
		<optgroup v-for="kind of gaugesByKind" :key="kind.kind" :label="kind.label">
			<option v-for="gauge of kind.gauges" :key="gauge">
				{{gauge}}
			</option>
		</optgroup>
	</select>
</template>