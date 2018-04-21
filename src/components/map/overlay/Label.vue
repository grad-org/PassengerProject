<template>
	<bm-overlay
		ref="customOverlay"
		:class="{sample: true}"
		pane="labelPane"
		@draw="draw">
		<div v-text="text" @click="handleClick"></div>
	</bm-overlay>
</template>

<script>
	export default {
	props: ['text', 'position', 'active'],
	watch: {
		position: {
			handler () {
				this.$refs.customOverlay.reload()
			},
			deep: true
		}
	},
	methods: {
		handleClick () {
			global.alert('Well done.')
		},
		draw ({el, BMap, map}) {
			const {lng, lat} = this.position
			const pixel = map.pointToOverlayPixel(new BMap.Point(lng, lat))
			el.style.left = pixel.x + 8 + 'px'
			el.style.top = pixel.y - 8 + 'px'
		}
	}
	}
</script>

<style>
	.sample {
		width: 200px;
		background: rgba(0,0,0,0.5);
		overflow: hidden;
		color: #00bcd4;
		position: absolute;
	}
</style>