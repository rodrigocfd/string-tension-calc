<script setup lang="ts">
import {computed} from 'vue';
import {INumStrings, IPackName} from '@/model/types';
import * as c from '@/model/consts';

const props = defineProps<{
	name: IPackName;
}>();

const emit = defineEmits<{
	change: [name: IPackName],
}>();

const currentPackName = computed({
	get: (): IPackName => props.name,
	set: (name: IPackName): void => emit('change', name),
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
		<optgroup v-for="group in packsByNumStrings" :key="group.num" :label="group.num + ' strings'">
			<option v-for="packName of group.packNames" :key="packName">
				{{packName}}
			</option>
		</optgroup>
	</select>
</template>