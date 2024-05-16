<script setup lang="ts">
import {computed} from 'vue';
import {TUnit} from '@/model/types';
import useStore from '@/model/useStore';
import * as c from '@/model/consts';

const store = useStore();

const unit = computed({
	get: (): TUnit => store.unit,
	set: (u: TUnit): void => store.setUnit(u),
});
</script>

<template>
	<select v-model="unit">
		<option v-for="u of c.UNITS" :key="u.name" :value="u.name">
			unit: {{u.name}}
		</option>
	</select>
</template>