<script setup lang="ts">
import {computed} from 'vue';
import {IGuitar} from '@/model/types';
import useStore from '@/model/useStore';

const props = defineProps<{
	guitar: IGuitar;
}>();

const store = useStore();

const sumTension = computed(() =>
	props.guitar.strings.reduce((accum, str) =>
		accum + (isNaN(str.tension) ? 0 : str.tension), 0),
);
</script>

<template>
	<div>
		∑ <input :class="m.tension"
			type="text"
			:value="sumTension.toFixed(2)"
			disabled /> {{store.unit}}
	</div>
</template>

<style module="m" lang="scss">
	.tension {
		width: 3.5em;
		text-align: right;
	}
</style>