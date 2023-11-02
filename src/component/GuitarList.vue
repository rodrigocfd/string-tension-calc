<script setup lang="ts">
import useStore from '@/model/useStore';
import Guitar from './Guitar.vue';

const store = useStore();
</script>

<template>
	<transition-group name="sets" tag="div" :class="m.arena">
		<div v-for="(guitar, idx) of store.guitars" :key="guitar._key">
			<Guitar :guitarIndex="idx" :guitar="guitar" />
		</div>
	</transition-group>
</template>

<style module="m" lang="scss">
	.arena {
		& > div {
			display: inline-block;
			vertical-align: top;
			margin: 0 10px 10px 0;
		}
	}

	:global(.sets-move),
	:global(.sets-enter-active),
	:global(.sets-leave-active) {
		transition: all .3s ease;
	}
	:global(.sets-enter-from),
	:global(.sets-leave-to) {
		opacity: 0;
	}
	:global(.sets-leave-active) {
		position: absolute;
	}
</style>