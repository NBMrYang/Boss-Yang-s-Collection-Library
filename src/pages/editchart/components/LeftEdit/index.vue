<template>
	<div class="LeftEdit">
		<div class="editButton">
			<el-button class="custom-button" type="primary" @click="handleSave">运行</el-button>
		</div>
		<div class="bottomEdit">
			<Codemirror
				v-model:value="code"
				:options="cmOptions"
				ref="cmRef"
				height="100%"
				width="100%"
				@change="onChange"
				@input="onInput"
				@ready="onReady"
			>
			</Codemirror>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from "vue";
import "codemirror/mode/javascript/javascript.js";
import Codemirror from "codemirror-editor-vue3";
import "codemirror/addon/selection/active-line.js";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/ayu-mirage.css";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/theme/neo.css";
import "codemirror/theme/abcdef.css";
import { useRouter } from "vue-router";
import { chartData } from "./chart";
const router = useRouter();
let id = String(router.currentRoute.value.query.id);
let optionName = `let option ={} //更改option名称请同时更改 
`;
let code = ref(optionName + chartData[id]);
const emit = defineEmits<{
	(e: "save-chart-data", value: any): void;
}>();
const cmRef = ref();
const cmOptions = reactive({
	mode: "text/javascript",
	theme: "abcdef",
	lineNumbers: true,
	smartIndent: true,
	indentUnit: 4,
	foldGutter: true,
	matchBrackets: true,
	autoCloseBrackets: true,
	styleActiveLine: true, //是否高亮行
	readOnly: false, //是否只读
	initialFocus: true, //编辑器初始化时是否自动聚焦。
});
const onChange = (val: any, cm: any) => {
	console.log(val, "change变化");
	console.log(cm.getValue());
};

const onInput = (val: any) => {
	console.log(val, "输入");
};

const onReady = (cm: any) => {
	console.log(cm, "加载");
};
onMounted(() => {
	handleSave();
});

onUnmounted(() => {
	cmRef.value?.destroy();
});
function handleSave() {
	emit("save-chart-data", code.value);
}
</script>

<style scoped>
@import url("./css/index.scss");
</style>

