<script setup lang="ts">
import {IGuitar} from '@/model/types';
import store from '@/model/store';

const props = defineProps<{
	index: number;
	guitar: IGuitar;
}>();
</script>

<template>
	<div :class="[m.guitarBox, m['color' + props.index % 7]]">
		<div :class="m.topRow">
			<div>Guitar #{{props.index + 1}}</div>

			<button @click="() => store.remove(props.guitar)">Remove</button>
			<button @click="() => store.moveLeft(props.guitar)" v-if="props.index !== 0">⇐</button>
		</div>
	</div>
</template>

<style module="m" lang="scss">
	$colors: (
		0: #36a2eb,
		1: #ff6384,
		2: #ff9f40,
		3: #ffcd56,
		4: #4bc0c0,
		5: #9966ff,
		6: #c9cbcf,
	);
	@each $idx, $color in $colors {
		.color#{$idx} {
			border: 1px solid #ddd;
			border-top: 4px solid $color;
		}
	}

	.guitarBox {
		padding: 2px 1px;
		& > div {
			padding: 3px 6px;
		}
		.topRow {
			display: flex;
			gap: 6px;
			align-items: baseline;
		}
	}
</style>