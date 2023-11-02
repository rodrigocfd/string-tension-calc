<script setup lang="ts">
import {IGuitar} from '@/model/types';
import useStore from '@/model/useStore';
import Pack from './Pack.vue';
import Scale from './Scale.vue';
import StringRow from './StringRow.vue';
import Summation from './Summation.vue';
import Tuning from './Tuning.vue';

const props = defineProps<{
	guitarIndex: number;
	guitar: IGuitar;
}>();

const store = useStore();
</script>

<template>
	<div :class="[m.guitarBox, m['color' + (props.guitarIndex % 7)]]">
		<div :class="m.topRow">
			<div :class="m.name">Guitar #{{props.guitarIndex + 1}}</div>
			<div :class="m.topButtons">
				<button @click="() => store.moveLeft(props.guitar)"
					v-if="props.guitarIndex > 0" title="Move left">⇐</button>
				<button @click="() => store.remove(props.guitar)" title="Remove">✕</button>
			</div>
		</div>
		<div>
			<Scale :scale="props.guitar.scale"
				@update:scale="s => store.changeScale(props.guitar, s)" />
		</div>
		<div>
			<Pack :packName="props.guitar.packName"
				@update:packName="name => store.changePack(props.guitar, name)" />
		</div>
		<div :class="m.tuningSum">
			<Tuning :tuningName="props.guitar.tuningName"
				@update:tuningName="name => store.changeTuning(props.guitar, name)" />
			<Summation :guitarIndex="props.guitarIndex" :guitar="props.guitar" />
		</div>
		<div>
			<div v-for="(str, idx) of props.guitar.strings" :key="str._key">
				<StringRow :strIndex="idx" :str="str" :guitar="props.guitar" />
			</div>
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
			justify-content: space-between;
			.name {
				font-size: 115%;
			}
			.topButtons {
				display: flex;
				gap: 6px;
			}
		}
		.tuningSum {
			display: flex;
			justify-content: space-between;
			padding-right: 9px;
		}
	}
</style>