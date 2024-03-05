<template>
	<div class="RightView">
		<ChartComponent :chart-id="chartId" :options="options" />
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, toRefs } from "vue";
import PageLoading from "@/components/PageLoading/index.vue";
interface Props {
	chartId: string;
    num:number;
	options: any;
}
const props = withDefaults(defineProps<Props>(), {});
const { chartId, options} = toRefs(props);
const ChartComponent = defineAsyncComponent({
	loader: () => import("@/components/ChartComponent/index.vue"),
	loadingComponent: PageLoading,
});
</script>

<style scoped lang="scss">
@import url("./css/index.scss");
</style>
