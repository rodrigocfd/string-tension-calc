<script setup lang="ts">
import {computed} from 'vue';
import * as c from '~/model/consts';
import store from '~/model/store';
import {TUnit} from '~/model/types';

const unit = computed({
	get: (): TUnit => store.d.unit,
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
