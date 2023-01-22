<script lang="ts">
	import { defineComponent } from 'vue';
	import { mapStores } from 'pinia'
	import JoinBoard from '../components/JoinBoard.vue';
	import { useUsersStore } from '../store/users';

	export default defineComponent({
		name: 'join',

		components: {
			JoinBoard
		},

		data() {
			return {
				name: '' as string
			};
		},


		computed: {
			...mapStores(useUsersStore)
		},

		methods: {
			addUser(name: string) {
				const usersStore = useUsersStore();
				usersStore.add(name);
				this.$router.push('board');
			}
		}
	});
</script>

<template>
	<join-board @submit="addUser"/>
</template>