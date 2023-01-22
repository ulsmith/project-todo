import { defineStore } from 'pinia';
import api from '../util/api';

export type User = {
	name?: string;
};

export type UserStore = {
	me: User;
	users: User[];
};

export const useUsersStore = defineStore('users', {
	state: () => {
		return { 
			me: {}, 
			users: []
		} as UserStore;
	},

	getters: {
		names(state) {
			return state.users.map((u) => u.name);
		},
	},
	
	actions: {
		add(name: string) {
			if (this.users.find((user) => user.name === name)) throw Error(`Cannot add user, user ${name} already exists`);
			
			this.me = { name };
			api.emit('add-user', this.me);

			// need to change route to board now
		},
	},
});

// update store with responses from socket
api.on('update-users', (users: User[]) => {
	const userStore = useUsersStore();
	userStore.users = users;
})