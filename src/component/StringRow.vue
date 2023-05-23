<script setup lang="ts">
import {INumStrings, IScale, IString} from '@/model/types';

const props = defineProps<{
	index: number;
	str: IString;
	numStrings: INumStrings;
	scale: IScale;
}>();
</script>

<template>
	<div :class="m.stringRow">
		<div>{{props.index + 1}}</div>

	</div>
</template>

<style module="m" lang="scss">
	.stringRow {
		display: flex;
		& > div {
			margin: 3px;
			.tension {
				width: 3.5em;
				text-align: right;
			}
		}
	}
</style>