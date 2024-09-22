<script setup lang="ts">
import { onMounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
onMounted(() => {
	gsap.context(() => {
		gsap.to(".one-box", {
			opacity: 1,
			x: 0,
			scrollTrigger: {
				trigger: ".one-box", // 元素
				x: 200,
				start: "top top", // 开始位置
				end: "+=500", // 结束位置
				scrub: true, // 是否平滑滚动
			},
		});
	});
});
</script>
<template>
	<div class="home-box">
		<div class="asd"><div class="one-box"></div></div>
	</div>
</template>

<style scoped lang="scss">
@import "./css/index.scss";
</style>
