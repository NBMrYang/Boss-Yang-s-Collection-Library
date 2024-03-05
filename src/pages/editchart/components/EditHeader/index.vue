<template>
	<div class="EditHeader">{{ t("member-layout.editchart.header") }}</div>
</template>

<script setup lang="ts">
import { useI18n } from "@/composables/useI18n";
import locales from "@/layouts/MemberLayout/locales/index";
const t = useI18n(locales);
</script>

<style lang="scss" scoped>
@import "./css/index.scss";
</style>
