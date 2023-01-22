<script lang="ts">
	import { defineComponent } from 'vue';

	import type { PropType } from 'vue'
	import type { Note } from '../store/notes';

	export default defineComponent({
		name: 'note-card',

		components: {
		},

		props: {
			note: Object as PropType<Note>
		},

		data() {
			return {
				dialog: true as boolean
			};
		}
	});
</script>

<template>
	<div class="note-form" :style="{ top: note?.posY + 'px', left: note?.posX + 'px', color: note?.color }">
		<v-card class="mx-auto" :color="note?.color || '#26c6da'" theme="dark" max-width="400" append-icon="mdi-check-circle" :title="note?.title">
			<template v-slot:append>
				<v-icon icon="mdi-check-circle" @click="$emit('complete', note?.id)"></v-icon>
			</template>
		
			<v-card-text class="text-h5 py-2">
				{{ note?.description }}
			</v-card-text>
		
			<v-card-actions>
				<v-list-item class="w-100">
					<template v-slot:prepend>
						<v-avatar color="grey-darken-3" image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-avatar>
					</template>
		
					<v-list-item-title class="author ml-2">{{ note?.author }}</v-list-item-title>
				</v-list-item>
			</v-card-actions>
		</v-card>
	</div>
</template>

<style scoped>
	.note-form {
		position: absolute;
		max-width: 300px;
	}
</style>
