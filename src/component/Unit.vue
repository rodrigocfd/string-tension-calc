<script setup lang="ts">
import {computed} from 'vue';
import {IUnit} from '@/model/types';
import store from '@/model/store';
import * as c from '@/model/consts';

const currentUnit = computed({
	get: (): IUnit => store.unit,
	set: (unit: IUnit): void => store.setUnit(unit),
});
</script>

<template>
	{{ store.unit }}
	<select v-model="currentUnit">
		<option v-for="unit of c.UNITS" :key="unit" :value="unit">
			unit: {{unit}}
		</option>
	</select>
</template>