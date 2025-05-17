<script setup lang="ts">
import {computed} from 'vue';
import store from '~/model/store';
import {IGuitar} from '~/model/types';

const props = defineProps<{
	guitar: IGuitar;
}>();

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

<style module="m">
	.tension {
		width: 3.5em;
		text-align: right;
	}
</style>
