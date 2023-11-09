<script setup lang="ts">
import {computed} from 'vue';
import {IUnit} from '@/model/types';
import useStore from '@/model/useStore';
import * as c from '@/model/consts';

const store = useStore();

const unit = computed({
	get: (): IUnit => store.unit,
	set: (u: IUnit): void => store.changeUnit(u),
});
</script>

<template>
	<select v-model="unit">
		<option v-for="u of c.UNITS" :key="u.name" :value="u.name">
			unit: {{u.name}}
		</option>
	</select>
</template>