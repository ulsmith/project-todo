<script lang="ts">
	import { defineComponent, ref } from 'vue';
	import { mapStores } from 'pinia'
	import { useUsersStore } from '../store/users';
	import { useNotesStore } from '../store/notes';
	import NoteForm from '../components/NoteForm.vue';
	import NoteCard from '../components/NoteCard.vue';
	
	import type { Note } from '../store/notes';

	export default defineComponent({
		name: 'join',

		components: {
			NoteForm,
			NoteCard
		},

		computed: {
			...mapStores(useUsersStore, useNotesStore),

			height: () => window.innerHeight + 'px'
		},

		created() {
			if (!this.usersStore.me.name) this.$router.push('/');

			const notesStore = useNotesStore();
			notesStore.load();
		},

		methods: {
			newNote(event: MouseEvent) {
				const element = event.target as HTMLInputElement;
				if (!element.classList.contains('board')) return;

				(this.$refs.noteForm as InstanceType<typeof NoteForm>).show(event);
			},

			addNote(note: Note) {
				const notesStore = useNotesStore();
				notesStore.add(note);
			},		

			removeNote(id: string) {
				const notesStore = useNotesStore();
				notesStore.remove(id);
			}			
		}
	});
</script>

<template>
	<div class="board" @click="newNote" :style="{ height }">
		<v-chip class="chip" color="primary">You are {{ usersStore.me.name }}</v-chip>
		<v-chip class="chip" color="secondary">Users online {{ usersStore.names.join(', ') }}</v-chip>

		<note-form ref="noteForm" :user="usersStore.me.name" @submit="addNote"/>
		<note-card v-for="note in notesStore.notes" :note="note" @complete="removeNote"/>
	</div>
</template>

<style scoped>
	.board {
		padding: 5px;
	}

	.chip {
		margin: 5px;
	}
</style>