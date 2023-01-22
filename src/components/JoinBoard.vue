<script lang="ts">
	import { defineComponent } from 'vue';

	export default defineComponent({
		name: 'join-board',

		data() {
			return {
				name: '' as string,
				dialog: true as boolean
			};
		},

		setup() {
		},

		methods: {
			submit(event: MouseEvent) {
				if (!this.name) return;

				this.$emit('submit', this.name);
			},
			
			enter(event: KeyboardEvent) {
				if (!this.name || (event.type === 'keyup' && event.key.toLowerCase() !== 'enter')) return;

				this.$emit('submit', this.name);
			},
		}
	});
</script>

<template>
	<div class="join-board">
		<v-dialog v-model="dialog" persistent>
			<v-card>
				<v-card-title>
					<span class="text-h5">Join The Board!</span>
				</v-card-title>
				<v-card-text>
					<v-container class="join-form">
						<v-row>
							<v-col cols="12">
								<v-text-field variant="outlined" placeholder="Enter your name" label="Name" required v-model="name" @keyup="enter"></v-text-field>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" @click="submit">Join</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<style scoped>
	.join-form {
		min-width: 400px;
	}
</style>
