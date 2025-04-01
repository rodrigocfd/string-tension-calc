<script setup lang="ts">
import store from '~/model/store';
import GuitarList from './GuitarList.vue';
import LineChart from './LineChart.vue';
import Unit from './Unit.vue';
</script>

<template>
	<header :class="m.header">
		<h1>String Tension Calculator</h1>
		<div :class="m.topButtons">
			<Unit />
			<button type='button' @click="store.addNew" :class="m.addNew">
				New guitar
			</button>
		</div>
		<a href="https://github.com/rodrigocfd/string-tension-calc" :class="m.repo">
			<img src="/gh-logo.svg" />
		</a>
	</header>
	<GuitarList />
	<LineChart />
</template>

<style module="m">
	.header {
		display: flex;
		align-items: baseline;
		& > h1 {
			font-size: 16pt;
			margin: 0 18px 12px 0;
		}
		.topButtons {
			display: flex;
			@media (max-width: 480px) {
				flex-direction: column;
				gap: 6px;
			}
			.addNew {
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
