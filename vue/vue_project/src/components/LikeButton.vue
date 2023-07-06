<template>
	<div>
		<button class="like" v-if="isLiked"  @click="unlikeTask">❤︎</button>
		<button class="unlike" v-else @click="likeTask">❤︎</button>
		{{ task.likers_count }}
	</div>
</template>

<script>
export default {
	name: 'LikeButton',
	props: {
		task: {
			type: Object,
			required: true,
		}
	},
	computed: {
		isLiked() {
			return this.$store.state.likes.some(like => like.task_id === this.task.id)
		},
	},
	methods: {
		async likeTask() {
			const updatedTask = await this.$store.dispatch('likeTask', this.task)
			this.$emit('update-task', updatedTask)
		},
		async unlikeTask() {
			const updatedTask = await this.$store.dispatch('unlikeTask', this.task)
			this.$emit('update-task', updatedTask)
		},
	}
}
</script>

<style lang="scss" scoped>
.unlike {
  background: none;
  border: none;
  cursor: pointer;
  color: gray;
}

.like {
	background: none;
  border: none;
  cursor: pointer;
  color: red;
}
</style>
