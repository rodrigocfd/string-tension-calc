<script setup lang="ts">
import {computed} from 'vue';
import {INumStrings, IPackName} from '@/model/types';
import * as c from '@/model/consts';

const props = defineProps<{
	packName: IPackName;
}>();
const emit = defineEmits<{
	'update:packName': [name: IPackName],
}>();

const currentPackName = computed({
	get: (): IPackName => props.packName,
	set: (name: IPackName): void => emit('update:packName', name),
});

const packsByNumStrings: {num: INumStrings, packNames: IPackName[]}[] = [
	{num: 6, packNames: []},
	{num: 7, packNames: []},
	{num: 8, packNames: []},
];
c.PACKS.forEach(defPack => {
	packsByNumStrings.find(p => p.num === defPack.gauges.length)!
		.packNames.push(defPack.name);
});
</script>

<template>
	<select v-model="currentPackName">
		<optgroup v-for="group of packsByNumStrings" :key="group.num" :label="group.num + ' strings'">
			<option v-for="packName of group.packNames" :key="packName" :value="packName">
				{{packName}}
			</option>
		</optgroup>
	</select>
</template>