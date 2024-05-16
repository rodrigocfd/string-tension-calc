<script setup lang="ts">
import {computed} from 'vue';
import {IScale, TScaleLength, TScaleMode} from '@/model/types';
import * as c from '@/model/consts';

const props = defineProps<{
	scale: IScale;
}>();
const emit = defineEmits<{
	'update:scale': [scale: IScale];
}>();

const mode = computed({
	get: (): TScaleMode => props.scale.mode,
	set: (mode: TScaleMode): void => {
		emit('update:scale', {
			mode,
			lengthLo: props.scale.lengthLo,
			lengthHi: (mode === 'normal') ? props.scale.lengthLo : props.scale.lengthHi,
		});
	},
});
const lengthLo = computed({
	get: (): TScaleLength => props.scale.lengthLo,
	set: (lengthLo: TScaleLength): void => {
		emit('update:scale', {
			...props.scale,
			lengthLo,
			lengthHi: (props.scale.mode === 'normal') ? lengthLo : props.scale.lengthHi,
		});
	},
});
const lengthHi = computed({
	get: (): TScaleLength => props.scale.lengthHi,
	set: (lengthHi: TScaleLength): void => emit('update:scale', {...props.scale, lengthHi}),
});
</script>

<template>
	<div :class="m.scaleRow">
		<select v-model="mode">
			<option v-for="mode of c.SCALE_MODES" :key="mode" :value="mode">
				{{mode}}
			</option>
		</select>

		<select v-model="lengthLo">
			<option v-for="len of c.SCALE_LENGTHS" :key="len" :value="len">
				{{len}}''
			</option>
		</select>

		<template v-if="props.scale.mode === 'multi'">
			<div>(low)</div>
			<div>to</div>

			<select v-model="lengthHi">
				<option v-for="len of c.SCALE_LENGTHS" :key="len" :value="len">
					{{len}}''
				</option>
			</select>

			<div>(high)</div>
		</template>
	</div>
</template>

<style module="m" lang="scss">
	.scaleRow {
		display: flex;
		gap: 6px;
		align-items: baseline;
	}
</style>