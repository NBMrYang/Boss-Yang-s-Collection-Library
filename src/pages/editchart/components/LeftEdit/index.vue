<template>
	<div class="LeftEdit">
		<div class="editButton">
			<div class="theme">
				<div class="themeTitle">{{ t("member-layout.editchart.theme") }}:</div>
				<el-select v-model="themeName" @change="changeTheme" placeholder="Select" style="width: 240px">
					<el-option v-for="item in themeData" :key="item.value" :label="item.label" :value="item.value">
						<span style="float: left">{{ t(`member-layout.editchart.themeName.${item.value}`) }}</span>
					</el-option>
					<template #tag>
						<el-tag color="red" />
					</template>
				</el-select>
			</div>
			<el-button class="custom-button" type="primary" @click="handleSave">{{
				t("member-layout.editchart.button")
			}}</el-button>
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
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/theme/abcdef.css";
import { useRouter } from "vue-router";
import { chartData, themeData } from "./chart";
import { useI18n } from "@/composables/useI18n";
import locales from "@/layouts/MemberLayout/locales/index";
const t = useI18n(locales);
const router = useRouter();
let id = String(router.currentRoute.value.query.id);
let changeTheme = async () => {
	await import(`../../../../../node_modules/codemirror/theme/${themeName.value}.css`);
	cmOptions.theme = themeName.value;
};
let optionName = `let option ={} //更改option名称请同时更改 
`;
let code = ref(optionName + chartData[id]);
const emit = defineEmits<{
	(e: "save-chart-data", value: any): void;
}>();
let themeName = ref<string>("abcdef");
const cmRef = ref();
let cmOptions: any = reactive({
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
@import "./css/index.scss";
</style>
