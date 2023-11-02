<script setup lang="ts">
import {computed} from 'vue';
import {IGuitar} from '@/model/types';
import useStore from '@/model/useStore';

const props = defineProps<{
	guitar: IGuitar;
}>();

const store = useStore();

const sum = computed(() =>
	props.guitar.strings.reduce((accum, str) => accum + str.tension, 0),
);
</script>

<template>
	<div>∑ <input type="text" :class="m.tension" :value="sum.toFixed(2)" disabled />
		{{store.unit}}
	</div>
</template>

<style module="m" lang="scss">
	.tension {
		width: 3.5em;
		text-align: right;
	}
</style>