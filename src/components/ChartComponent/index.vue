<script setup lang="ts">
import { nextTick, onMounted, toRefs, watch } from "vue";
import * as echarts from "echarts";
interface Props {
	chartId: string;
	options: any;
}
const props = withDefaults(defineProps<Props>(), {
	chartId: "chart",
	options: {},
});
let { chartId, options } = toRefs(props);

const initeCharts = () => {
	// 绘制图表
	myChart.setOption(options.value);
    myChart.resize()
};
watch(
	() => options,
	() => {
        initeCharts();
	},
	{
		deep: true,
	},
);
let myChart: any = null;
onMounted(() => {
	nextTick(() => {
		myChart = echarts.init(document.getElementById(`${chartId.value}`)!);
		initeCharts();
	});
});
</script>
<template>
	<div :id="chartId" :style="{ width: '100%', height: '100%' }"></div>
</template>
<style lang="scss" scoped></style>

