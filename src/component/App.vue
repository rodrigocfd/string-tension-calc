<script setup lang="ts">
import store from '@/model/store';
import GuitarList from './GuitarList.vue';
import LineChart from './LineChart.vue';
import Unit from './Unit.vue';
</script>

<template>
	<header :class="m.header">
		<h1 :class="m.title">String Tension Calculator</h1>
		<div :class="m.topButtons">
			<Unit />
			<button :class="m.add" @click="() => store.addNew()">New guitar</button>
		</div>
		<a :class="m.repo" href="https://github.com/rodrigocfd/string-tension-calc">
			<img src="/github.svg" />
		</a>
	</header>
	<GuitarList />
	<LineChart />
</template>

<style module="m" lang="scss">
	* {
		font-family: 'Segoe UI', sans-serif;
		font-size: 10pt;
	}
	.header {
		display: flex;
		align-items: baseline;
		.title {
			font-size: 16pt;
			margin: 0 18px 12px 0;
		}
		.topButtons {
			display: flex;
			@media (max-width: 480px) {
				flex-direction: column;
				gap: 6px;
			}
			.add {
				margin-left: 12px;
				white-space: nowrap;
			}
		}
		.repo {
			align-self: center;
			&:hover {
				transform: scale(1.1);
			}
			&:active {
				transform: scale(1.2);
			}
			& > img {
				width: 22px;
				padding-left: 10px;
			}
		}
	}
</style>