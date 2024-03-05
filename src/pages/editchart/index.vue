<template>
	<div class="common-layout">
		<el-container>
			<el-header><EditHeader /></el-header>
			<el-container>
				<el-aside width="50%"><LeftEdit @save-chart-data="savechartdata" /></el-aside>
				<el-main><RightView :chartId="id" :num="num" :options="options" /></el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, reactive, ref } from "vue";
import PageLoading from "@/components/PageLoading/index.vue";
import { useRouter } from "vue-router";
const router = useRouter();
let id = String(router.currentRoute.value.query.id);
const EditHeader = defineAsyncComponent({
	loader: () => import("./components/EditHeader/index.vue"),
	loadingComponent: PageLoading,
});
const LeftEdit = defineAsyncComponent({
	loader: () => import("./components/LeftEdit/index.vue"),
	loadingComponent: PageLoading,
});
const RightView = defineAsyncComponent({
	loader: () => import("./components/RightView/index.vue"),
	loadingComponent: PageLoading,
});

console.log(id);
let options = reactive<any>({});
let num = ref<number>(0);
const savechartdata = (data: any) => {
	console.log(eval(data));
	// let strArr = data.split("=");
	options = eval(data);
	num.value++;
};
</script>

<style lang="scss" scoped>
@import url("./css/index.scss");
</style>

