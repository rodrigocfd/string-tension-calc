<script setup lang="ts">
import {computed} from 'vue';
import {IPitchNote} from '@/model/types';
import * as c from '@/model/consts';

const props = defineProps<{
	stringIndex: number;
	note: IPitchNote;
}>();

const emit = defineEmits<{
	'update:note': [note: IPitchNote];
}>();

const currentNote = computed({
	get: (): IPitchNote => props.note,
	set: (note: IPitchNote): void => emit('update:note', note),
});

const pitches = c.PITCHES_FOR_STRING
	.find(p => p.stringIndex === props.stringIndex)!.pitches;
</script>

<template>
	<select v-model="currentNote">
		<option v-for="pitch of pitches" :key="pitch.note" :value="pitch.note">
			{{pitch.note}} ({{pitch.descr}})
		</option>
	</select>
</template>