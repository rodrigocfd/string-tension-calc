<script setup lang="ts">
import {ref} from 'vue';
import {IScale, IScaleLength, IScaleMode} from '@/model/types';
import * as c from '@/model/consts';

const props = defineProps<{
	scale: IScale;
}>();

const emit = defineEmits<{
	'update:scale': [scale: IScale];
}>();

const cmbMode = ref<HTMLSelectElement | null>(null);
const cmbLenHi = ref<HTMLSelectElement | null>(null);
const cmbLenLo = ref<HTMLSelectElement | null>(null);

function changed(): void {
	const mode = cmbMode.value!.value as IScaleMode;
	const lengthHi = parseFloat(cmbLenHi.value!.value) as IScaleLength;
	const lengthLo = (mode === 'normal')
		? lengthHi
		: parseFloat(cmbLenLo.value!.value) as IScaleLength;
	emit('update:scale', {mode, lengthHi, lengthLo});
}
</script>

<template>
	<div :class="m.scaleRow">
		<select :value="props.scale.mode" @change="changed" ref="cmbMode">
			<option v-for="mode of c.SCALE_MODES" :key="mode" :value="mode">
				{{mode}}
			</option>
		</select>
		<select :value="props.scale.lengthHi" @change="changed" ref="cmbLenHi">
			<option v-for="len of c.SCALE_LENGTHS" :key="len" :value="len">
				{{len}}''
			</option>
		</select>
		<div v-show="props.scale.mode == 'multi'">
			to <select :value="props.scale.lengthLo" @change="changed" ref="cmbLenLo">
				<option v-for="len of c.SCALE_LENGTHS" :key="len" :value="len">
					{{len}}''
				</option>
			</select>
		</div>
	</div>
</template>

<style module="m" lang="scss">
	.scaleRow {
		display: flex;
		gap: 6px;
	}
</style>