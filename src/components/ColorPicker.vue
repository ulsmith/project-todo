<script lang="ts">
	import { defineComponent } from 'vue';

	export type Color = {
		name: string;
		code: string;
	};

	export default defineComponent({
		name: 'color-picker',

		data() {
			return {
				color: '' as string,
				colors: [
					{ name: 'green', code: 'green' },
					{ name: 'blue', code: 'blue' },
					{ name: 'purple', code: '#9c27b0' },
					{ name: 'pink', code: '#e91e63' }
				] as Color[]
			};
		},

		methods: {
			change(color: string) {
				this.color = color;
				this.$emit('change', color);
			}
		}
	});
</script>

<template>
	<div class="color-picker">
		<span 
			v-for="item in colors"
			:class="item.name"
			:picked="item.name === color || null"
			:style="{ 'background-color': item.code }"
			@click="change(item.name)"
		/>
	</div>
</template>

<style scoped>
	.color-picker {
		margin: 5px;
		display: flex;
		flex-flow: row;
	}
	.color-picker span {
		display: inline-block;
		width: 40px;
		height: 40px;
		margin: 5px;
		cursor: pointer;
		box-sizing: border-box;
	}

	[picked] {
		border: 5px solid grey;
	}
</style>
