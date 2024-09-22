<template>
	<div class="onetitle"><div class="text">杨老板的收藏库</div></div>
</template>
<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted } from "vue";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const initAnimation = () => {};
onMounted(() => {
	initAnimation();
});
</script>
<style lang="scss">
.onetitle {
	position: fixed;
	z-index: 9;
	display: flex;
	align-items: center;
	justify-content: center;
	font-family: cursive;
	font-size: calc(100vw * 60 / 1920);
	font-weight: bold;
	color: transparent;
	animation: lightning 5s infinite;
}

@keyframes lightning {
	0% {
		color: #a1f702;
		text-shadow: 0 0 4px #ffffff, 0 0 8px #ffffff, 0 0 16px #ffffff, 0 0 32px #ffc400, 0 0 64px #ffc400;
	}
	50% {
		color: #00eeff;
		text-shadow: 0 0 4px #ffffff, 0 0 8px #ffffff, 0 0 16px #ffffff, 0 0 32px #ffc400, 0 0 64px #ffc400;
	}
	100% {
		color: #a1f702;
		text-shadow: 0 0 4px #ffffff, 0 0 8px #ffffff, 0 0 16px #ffffff, 0 0 32px #ffffff, 0 0 64px #ffffff;
	}
}
</style>
