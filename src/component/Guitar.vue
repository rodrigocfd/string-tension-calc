<script setup lang="ts">
import store from '~/model/store';
import {IGuitar} from '~/model/types';
import Pack from './Pack.vue';
import Scale from './Scale.vue';
import StringRow from './StringRow.vue';
import Summation from './Summation.vue';
import Tuning from './Tuning.vue';

const props = defineProps<{
	guitarIndex: number;
	guitar: IGuitar;
}>();
</script>

<template>
	<div :class="[m.gtrBox, m['color' + props.guitarIndex % 7]]">
		<div :class="m.topRow">
			<div :class="m.name">Guitar #{{props.guitarIndex + 1}}</div>
			<div :class="m.topBtns">
				<button v-if="props.guitarIndex > 0"
					@click="() => store.moveLeft(props.guitar)"
					title="Move left">
					⇐
				</button>
				<button @click="() => store.remove(props.guitar)" title="Remove">✕</button>
			</div>
		</div>
		<div>
			<Scale :scale="props.guitar.scale"
				@update:scale="s => store.changeScale(props.guitar, s)" />
		</div>
		<div>
			<Pack :packName="props.guitar.packName"
				@update:packName="n => store.changePack(props.guitar, n)" />
		</div>
		<div :class="m.tuningSum">
			<Tuning :tuningName="props.guitar.tuningName"
				@update:tuningName="n => store.changeTuning(props.guitar, n)" />
			<Summation :guitar="props.guitar" />
		</div>
		<div :class="m.stringRow">
			<StringRow v-for="(s, strIdx) of props.guitar.strings"
				:key="s._id"
				:strIndex="strIdx"
				:str="s"
				:guitar="props.guitar" />
		</div>
	</div>
</template>

<style module="m">
	.gtrBox {
		padding: 2px 1px;
		border: 1px solid #ddd;
		&.color0 { border-top: 4px solid #36a2eb; }
		&.color1 { border-top: 4px solid #ff6384; }
		&.color2 { border-top: 4px solid #ff9f40; }
		&.color3 { border-top: 4px solid #ffcd56; }
		&.color4 { border-top: 4px solid #4bc0c0; }
		&.color5 { border-top: 4px solid #9966ff; }
		&.color6 { border-top: 4px solid #c9cbcf; }

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
			.topBtns {
				display: flex;
				gap: 6px;
			}
		}
		.tuningSum {
			display: flex;
			justify-content: space-between;
			padding-right: 9px;
		}
		.stringRow {
			display: grid;
			grid-template-columns: repeat(4, auto);
		}
	}
</style>
