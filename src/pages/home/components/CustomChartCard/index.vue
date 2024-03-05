<template>
	<el-card class="rowChart" shadow="hover">
		<template #header>
            <span class="chart-top-header-name">{{ name }}</span>
        </template>
		<img
			src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
			style="width: 100%;height: calc(100vh * 300/977);"
		/>
	</el-card>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

interface Props {
	name: string;
}
const props = withDefaults(defineProps<Props>(), {
    name:"暂无名字"
});

const { name } = toRefs(props);
</script>

<style scoped>
@import url(./css/index.scss);
</style>

