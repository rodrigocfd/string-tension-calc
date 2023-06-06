<script setup lang="ts">
import {computed} from 'vue';
import {IGuitar} from '@/model/types';
import store from '@/model/store';

const props = defineProps<{
	guitar: IGuitar;
}>();

const sum = computed(() =>
	props.guitar.strings.reduce((accum, str) => accum + str.tension, 0),
);
</script>

<template>
	<div>∑ <input type="text" :class="m.tension" :value="sum.toFixed(2)" disabled />
		{{store.unit.value}}
	</div>
</template>

<style module="m" lang="scss">
	.tension {
		width: 3.5em;
		text-align: right;
	}
</style>