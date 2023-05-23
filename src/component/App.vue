<script setup lang="ts">
import store from '@/model/store';
import GuitarList from './GuitarList.vue';
import LineChart from './LineChart.vue';
import Unit from './Unit.vue';
</script>

<template>
	<header :class="m.header">
		<h1>String Tension Calculator</h1>
		<Unit />
		<button @click="() => store.addNew()">New guitar</button>
	</header>
	<GuitarList />
	<LineChart />
</template>

<style module="m" lang="scss">
	* {
		font-family: 'Segoe UI', sans-serif;
		font-size: 11pt;
	}
	.header {
		margin-bottom: 10px;
		& > * {
			display: inline-block;
		}
		& > h1 {
			font-size: 16pt;
			margin: 0 18px 12px 0;
		}
		& > button {
			margin-left: 12px;
		}
	}
</style>