<script setup lang="ts">
import * as Cesium from "cesium";
import { onMounted, onUnmounted } from "vue";
let viewer: any;

onMounted(() => {
	viewer = new Cesium.Viewer("cesium-container", {
		animation: false, // 动画小组件
		baseLayerPicker: false, // 底图组件，选择三维数字地球的底图（imagery and terrain）。
		fullscreenButton: false, // 全屏组件
		vrButton: false, // VR模式
		geocoder: false, // 地理编码（搜索）组件
		homeButton: false, // 首页，点击之后将视图跳转到默认视角
		infoBox: false, // 信息框
		sceneModePicker: false, // 场景模式，切换2D、3D 和 Columbus View (CV) 模式。
		selectionIndicator: false, // 是否显示选取指示器组件
		timeline: false, // 时间轴
		navigationHelpButton: false, // 帮助提示，如何操作数字地球。
		// 如果最初应该看到导航说明，则为true；如果直到用户明确单击该按钮，则该提示不显示，否则为false。
		navigationInstructionsInitiallyVisible: false,
		shouldAnimate: true, // 是否显示动画
		imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
			url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
		}),
		//需要纯色背景必须设置
		contextOptions: {
			webgl: {
				alpha: true,
			},
		},
	});
	viewer._cesiumWidget._creditContainer.style.display = "none";
	function icrf(scene: Cesium.Scene, time: Cesium.JulianDate) {
		// 判断当前场景是否为 3D 模式，如果不是则直接返回
		if (scene.mode !== Cesium.SceneMode.SCENE3D) {
			return;
		}
		// 获取 ICRF 到固定坐标系的变换矩阵
		const icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
		// 如果获取到变换矩阵，则更新相机的位置和方向
		if (Cesium.defined(icrfToFixed)) {
			const camera = viewer.camera;
			const offset = Cesium.Cartesian3.clone(camera.position);
			const transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
			camera.lookAtTransform(transform, offset);
		}
	}
	viewer.scene.postUpdate.addEventListener(icrf);
	viewer.clock.multiplier = -1 * 60 * 60; //反转将“-”号去掉
	viewer.scene.globe.enableLighting = false;
	viewer.scene.sun.show = false; //在Cesium1.6(不确定)之后的版本会显示太阳和月亮，不关闭会影响展示
	viewer.scene.moon.show = false;
	viewer.scene.skyBox.show = false;
	viewer.scene.backgroundColor = new Cesium.Color(0.0, 0.0, 0.0, 0.0);
	//抗锯齿
	viewer.scene.fxaa = true;
	viewer.scene.postProcessStages.fxaa.enabled = true;
});

onUnmounted(() => {
	if (viewer && !viewer.isDestroyed()) {
		viewer.destroy();
	}
});
</script>
<template>
	<div id="cesium-container"></div>
</template>
<style lang="scss" scoped>
#cesium-container {
	position: absolute;
	width: 100vw;
	height: 100vh;
	overflow: hidden;
}
</style>
