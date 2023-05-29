<script setup lang="ts">
import {computed} from 'vue';
import {IGuitar} from '@/model/types';
import store from '@/model/store';
import {calcTension} from '@/model/funcs';

const props = defineProps<{
	guitarIndex: number;
	guitar: IGuitar;
}>();

const sum = computed(() =>
	props.guitar.strings.reduce((acum, str) =>
		acum + calcTension(props.guitarIndex, props.guitar.strings.length,
			str, props.guitar.scale, store.unit.value),
		0)
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