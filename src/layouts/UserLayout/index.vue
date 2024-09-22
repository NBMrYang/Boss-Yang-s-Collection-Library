<script lang="ts" setup>
import { computed, ref, onMounted, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { formatRoutes } from "@/utils/router";
import { useTitle } from "@/composables/useTitle";
import layoutRotes from "./routes";
import { useI18n } from "@/composables/useI18n";
const t = useI18n();
const route = useRoute();
// 框架所有菜单路由 与 patch key格式的所有菜单路由
const routerPathKeyRouter = ref(formatRoutes(layoutRotes));
const routeItem = computed(() => routerPathKeyRouter.value.pathKeyRouter[route.path]);
const fireworksEffect = defineAsyncComponent({
	loader: () => import("./components/fireworks_effect/index.vue"),
});
const CesiumMap = defineAsyncComponent({
	loader: () => import("./components/CesiumMap/index.vue"),
});
useTitle(routeItem, t);
onMounted(() => {});
</script>
<template>
	<div class="twoScreen">
		<fireworksEffect />
		<CesiumMap />
		<router-view class="route" />
	</div>
</template>
<style scoped lang="scss">
.twoScreen {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100vh;
}
</style>
