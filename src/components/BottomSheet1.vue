<template>
	<div>
		<!-- <mu-raised-button @click="openBottomSheet" label="打开选择框" /> -->
		<mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet" :overlay="overlay" >
			<div class="container">
				<div>
				<mu-raised-button label="现在" class="demo-raised-button" primary/>
				<mu-raised-button label="预约" class="demo-raised-button" />
				</div>
				<mu-text-field class="outset" hintText="你在哪儿" type="text"  icon="lens" @focus="searchLocation"/>
				<mu-text-field class="destination" hintText="你要去哪儿" type="text" icon="lens"/>
			</div>
		</mu-bottom-sheet>
	</div>
</template>

<script>
export default {
data () {
	return {
		bottomSheet: true,
		overlay: false
	}
},
methods: {
	closeBottomSheet () {
		// this.bottomSheet = false
	},
	openBottomSheet () {
		this.bottomSheet = true
	},
	searchLocation () {
		console.log("搜索位置")
	}
}
}
</script>

<style scoped>
	.container{
		/* display: flex; */
		flex-wrap: wrap;
		margin: 0 auto;
	}
	.demo-raised-button {
		margin: 12px;
	}
	* {
		z-index: 2;
	}
	.mu-text-field {
		display: block;
		width: 95.7%;
	}
	.outset {
		color: #009688;
		font-size: 18px
	}
	.destination {
		color: #ffc107
	}
</style>
