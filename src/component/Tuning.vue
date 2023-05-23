<script setup lang="ts">
import {computed} from 'vue';
import {ITuningName} from '@/model/types';
import * as c from '@/model/consts';

const props = defineProps<{
	tuningName: ITuningName;
}>();

const emit = defineEmits<{
	'update:tuningName': [tuningName: ITuningName];
}>();

const currentTuningName = computed({
	get: (): ITuningName => props.tuningName,
	set: (name: ITuningName): void => emit('update:tuningName', name),
});

const tuningsByKind: {kind: string, tuningNames: ITuningName[]}[] = [
	{kind: 'Standard', tuningNames: []},
	{kind: 'Drop', tuningNames: []},
];
c.TUNINGS.forEach(defTuning => {
	const kind = (defTuning.name.endsWith('standard')) ? 'Standard' : 'Drop';
	tuningsByKind.find(defTuning => kind === defTuning.kind)!
		.tuningNames.push(defTuning.name);
});
</script>

<template>
	<select v-model="currentTuningName">
		<optgroup v-for="group of tuningsByKind" :key="group.kind" :label="group.kind">
			<option v-for="tuning of group.tuningNames" :key="tuning" :value="tuning">
				{{tuning}}
			</option>
		</optgroup>
	</select>
</template>