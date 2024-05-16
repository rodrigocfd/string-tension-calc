<script setup lang="ts">
import {computed} from 'vue';
import {TNote} from '@/model/types';
import * as c from '@/model/consts';

const props = defineProps<{
	strIndex: number;
	note: TNote;
}>();
const emit = defineEmits<{
	'update:note': [note: TNote];
}>();

const note = computed({
	get: (): TNote => props.note,
	set: (note: TNote): void => emit('update:note', note),
});

const pitches = computed(() =>
	c.PITCHES_FOR_STRING.find(p => p.stringIndex === props.strIndex)!.pitches);
</script>

<template>
	<select v-model="note">
		<option v-for="pitch of pitches" :key="pitch.note" :value="pitch.note">
			{{pitch.note}} {{pitch.descr}}
		</option>
	</select>
</template>