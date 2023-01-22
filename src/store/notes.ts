import { defineStore } from 'pinia';
import api from '../util/api';

export type Note = {
	id: string;
	title: string;
	description: string;
	color: string;
	author: string;
	posX: number;
	posY: number;
};

export type NoteStore = {
	notes: Note[];
};

export const useNotesStore = defineStore('notes', {
	state: () => {
		return { 
			notes: []
		} as NoteStore;
	},
	
	actions: {
		add(note: Note) {			
			api.emit('add-note', note);
		},

		remove(id: string) {			
			api.emit('remove-note', id);
		},

		load() {			
			api.emit('load-note');
		},
	},
});

// update store with responses from socket
api.on('update-notes', (notes: Note[]) => {
	const noteStore = useNotesStore();
	noteStore.notes = notes;
})