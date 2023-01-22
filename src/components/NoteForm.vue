<script lang="ts">
	import { defineComponent } from 'vue';
	import ColorPicker from '../components/ColorPicker.vue';

	export default defineComponent({
		name: 'note-form',

		components: {
			ColorPicker
		},

		props: {
			user: { type: String }
		},

		data() {
			return {
				title: '' as string,
				description: '' as string,
				color: '' as string,
				author: '' as string,
				dialog: false as boolean,
				posX: 50 as number,
				posY: 50 as number
			};
		},

		methods: {
			pickColor(color: string) {
				this.color = color;
			},

			submit(event: MouseEvent) {				
				this.$emit('submit', {
					title: this.title,
					description: this.description,
					color: this.color,
					author: this.user,
					posX: this.posX,
					posY: this.posY
				});
				
				this.dialog = false;
			},

			show(event: MouseEvent) {
				this.dialog = true;
				this.title = '',
				this.description = '',
				this.color = '',
				this.author = '',
				this.posX = event.clientX;
				this.posY = event.clientY;
			}
		}
	});
</script>

<template>
	<div class="note-form">
		<v-dialog v-model="dialog" persistent>
			<v-card>
				<v-card-title>
					<span class="text-h5">Create a Todo</span>
				</v-card-title>
				<v-card-text>
					<v-container class="join-form">
						<v-row>
							<v-col cols="12">
								<v-text-field variant="outlined" placeholder="Your title here" label="Title" required v-model="title"></v-text-field>
							</v-col>
							<v-col cols="12">
								<v-textarea variant="outlined" placeholder="Your description here" label="Description" required v-model="description"></v-textarea>
							</v-col>
							<v-col cols="12">
								<color-picker @change="pickColor" />
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-btn color="error" @click="dialog = false">
						Cancel
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="primary" @click="submit">
						Create
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
