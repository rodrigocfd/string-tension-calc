<script setup lang="ts">
import useStore from '@/model/useStore';
import Guitar from './Guitar.vue';

const store = useStore();
</script>

<template>
	<transition-group name="guitars" tag="div">
		<div v-for="(g, idx) of store.guitars" :key="g._id" :class="m.gtrBlock">
			<Guitar :guitarIndex="idx" :guitar="g" />
		</div>
	</transition-group>
</template>

<style module="m" lang="scss">
	.gtrBlock {
		display: inline-block;
		vertical-align: top;
		margin: 0 10px 10px 0;
	}

	:global(.guitars-move),
	:global(.guitars-enter-active),
	:global(.guitars-leave-active) {
		transition: all .3s ease;
	}
	:global(.guitars-enter-from),
	:global(.guitars-leave-to) {
		opacity: 0;
	}
	:global(.guitars-leave-active) {
		position: absolute;
	}
</style>