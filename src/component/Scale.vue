<script setup lang="ts">
import {computed, ref} from 'vue';
import {IScale, IScaleLength, IScaleMode} from '@/model/types';
import * as c from '@/model/consts';

const props = defineProps<{
	scale: IScale;
}>();
const emit = defineEmits<{
	'update:scale': [scale: IScale];
}>();

const cmbMode = ref<HTMLSelectElement | null>(null);
const cmbLenLo = ref<HTMLSelectElement | null>(null);
const cmbLenHi = ref<HTMLSelectElement | null>(null);

const isMulti = computed(() => props.scale.mode === 'multi');

function changed(): void {
	const mode = cmbMode.value!.value as IScaleMode;
	const lengthLo = parseFloat(cmbLenLo.value!.value) as IScaleLength;
	const lengthHi = (mode === 'normal')
		? lengthLo
		: parseFloat(cmbLenHi.value!.value) as IScaleLength;
	emit('update:scale', {mode, lengthLo, lengthHi});
}
</script>

<template>
	<div :class="m.scaleRow">
		<select :value="props.scale.mode" @change="changed" ref="cmbMode">
			<option v-for="mode of c.SCALE_MODES" :key="mode" :value="mode">
				{{mode}}
			</option>
		</select>

		<select :value="props.scale.lengthLo" @change="changed" ref="cmbLenLo">
			<option v-for="len of c.SCALE_LENGTHS" :key="len" :value="len">
				{{len}}''
			</option>
		</select>
		<div v-show="isMulti">(low)</div>

		<div v-show="isMulti">to</div>

		<select v-show="isMulti" :value="props.scale.lengthHi" @change="changed" ref="cmbLenHi">
			<option v-for="len of c.SCALE_LENGTHS" :key="len" :value="len">
				{{len}}''
			</option>
		</select>
		<div v-show="isMulti">(high)</div>
	</div>
</template>

<style module="m" lang="scss">
	.scaleRow {
		display: flex;
		gap: 6px;
		align-items: baseline;
	}
</style>