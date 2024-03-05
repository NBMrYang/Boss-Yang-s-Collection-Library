<script lang="ts">
export default {
	name: "Home",
};
</script>
<script setup lang="ts">
import { defineAsyncComponent, ref } from "vue";
import PageLoading from "@/components/PageLoading/index.vue";
import { CustomChartData } from "./components/CustomChartCard/data";
import { useRouter } from "vue-router";
const router = useRouter();
// const ArticleChartCard = defineAsyncComponent({
// 	loader: () => import("./components/ArticleChartCard/index.vue"),
// 	loadingComponent: PageLoading,
// });
const CustomChartCard = defineAsyncComponent({
	loader: () => import("./components/CustomChartCard/index.vue"),
	loadingComponent: PageLoading,
});
let chartArray = ref<CustomChartData[]>([
	{
		id: "line",
		name: "折线图",
	},
	{
		id: "bar",
		name: "柱状图",
	},
	{
		id: "pie",
		name: "饼图",
	},
	{
		id: "gauge",
		name: "仪表盘",
	},
	{
		id: "radar",
		name: "雷达图",
	},
	{
		id: "scatter",
		name: "散点图",
	},
	{
		id: "candlestick",
		name: "K线图",
	},
	{
		id: "treemap",
		name: "矩形树图",
	},
]);
const mouseDownChart = (item: CustomChartData) => {
	let routeData = router.resolve({
		name: "EditChart",
		query:{
			id:item.id
		}
	});
	window.open(routeData.href, "_blank");
};
</script>

<template>
	<el-row :gutter="20">
		<el-col v-for="item in chartArray" :key="item.id" :span="6"
			><CustomChartCard :name="item.name" @click="mouseDownChart(item)"></CustomChartCard
		></el-col>
	</el-row>
</template>

<style scoped lang="scss"></style>

