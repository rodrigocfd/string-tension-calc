<script setup lang="ts">
import {computed} from 'vue';
import {TTuningName} from '@/model/types';
import * as c from '@/model/consts';

const props = defineProps<{
	tuningName: TTuningName;
}>();
const emit = defineEmits<{
	'update:tuningName': [tuningName: TTuningName];
}>();

const tuningsByKind: {kind: string; tuningNames: TTuningName[]}[] = [
	{kind: 'Standard', tuningNames: []},
	{kind: 'Drop', tuningNames: []},
];
c.TUNINGS.forEach(defTuning => {
	const kind = (defTuning.name.endsWith('standard')) ? 'Standard' : 'Drop';
	tuningsByKind.find(defTuning => kind === defTuning.kind)!
		.tuningNames.push(defTuning.name);
});

const tuningName = computed({
	get: (): TTuningName => props.tuningName,
	set: (tuningName: TTuningName): void => emit('update:tuningName', tuningName),
});
</script>

<template>
	<select v-model="tuningName">
		<optgroup v-for="group of tuningsByKind"
			:key="group.kind"
			:label="group.kind">
			<option v-for="name of group.tuningNames" :key="name">
				{{name}}
			</option>
		</optgroup>
	</select>
</template>