<script setup lang="ts">
import useStore from '@/model/useStore';
import * as c from '@/model/consts';

const store = useStore();
</script>

<template>
	<select v-model="store.unit">
		<option v-for="unit of c.UNITS" :key="unit.name" :value="unit.name">
			unit: {{unit.name}}
		</option>
	</select>
</template>