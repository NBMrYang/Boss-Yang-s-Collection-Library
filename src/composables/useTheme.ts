import { onBeforeMount, watch, ref, Ref } from "vue";
import { theme, themeStorageKey } from "@/config/settings";
import { useGlobalStore } from "@/store/global";

/**
 * @description:设置 模板主题
 * @author LiQingSong
 */
export const useTheme = (): Ref<boolean> => {
	const globalStore = useGlobalStore();
	const themeStorage = localStorage.getItem(themeStorageKey) || theme;
	const isDark = ref(themeStorage === "dark");

	const setDark = () => {
		const s = 1850;
		const i = 120;
		const u = Math.hypot(Math.max(s, innerWidth - s), Math.max(i, innerHeight - i));
		localStorage.setItem(themeStorageKey, isDark.value ? "dark" : "light");
		document
			.startViewTransition(() => {
				isDark.value
					? document.querySelector("html")?.classList.add("dark")
					: document.querySelector("html")?.classList.remove("dark");
				globalStore.theme = isDark.value ? "dark" : "light";
			})
			.ready.then(() => {
				const f = [`circle(0px at ${s}px ${i}px)`, `circle(${u}px at ${s}px ${i}px)`];
				document.documentElement.animate(
					{
						clipPath: isDark.value ? [...f].reverse() : f,
					},
					{
						duration: 400,
						easing: "ease-in",
						pseudoElement: isDark.value ? "::view-transition-old(root)" : "::view-transition-new(root)",
					},
				);
			});
	};

	watch(isDark, () => {
		setDark();
	});

	onBeforeMount(() => {
		setDark();
	});

	return isDark;
};

