<script setup lang="ts">
import {computed} from 'vue';
import {IUnit} from '@/model/types';
import store from '@/model/store';
import * as c from '@/model/consts';

const currentUnit = computed({
	get: (): IUnit => store.unit.value,
	set: (unit: IUnit): void => store.setUnit(unit),
});
</script>

<template>
	<select v-model="currentUnit">
		<option v-for="unit of c.UNITS" :key="unit" :value="unit">
			unit: {{unit}}
		</option>
	</select>
</template>