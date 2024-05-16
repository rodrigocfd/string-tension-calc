<script setup lang="ts">
import {computed} from 'vue';
import {TNumStrings, TPackName} from '@/model/types';
import * as c from '@/model/consts';

const props = defineProps<{
	packName: TPackName;
}>();
const emit = defineEmits<{
	'update:packName': [packName: TPackName];
}>();

const packsByNumStrings: {num: TNumStrings; packNames: TPackName[]}[] = [
	{num: 6, packNames: []},
	{num: 7, packNames: []},
	{num: 8, packNames: []},
];
c.PACKS.forEach(pack => {
	packsByNumStrings.find(p => p.num === pack.gauges.filter(g => g !== null).length)!
		.packNames.push(pack.name);
});

const packName = computed({
	get: (): TPackName => props.packName,
	set: (packName: TPackName): void => emit('update:packName', packName),
});
</script>

<template>
	<select v-model="packName">
		<optgroup v-for="packGroup of packsByNumStrings"
			:key="packGroup.num"
			:label="packGroup.num + ' strings'">
			<option v-for="packName of packGroup.packNames"
				:key="packName"
				:value="packName">
				{{packName}}
			</option>
		</optgroup>
	</select>
</template>