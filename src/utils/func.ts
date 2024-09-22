/**
 * 简单的节流函数
 * @param func 函数
 * @param delay 节流时间
 * @author YangJun
 * @returns
 */
export function throttle<T extends (...args: any[]) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout> | null = null;
	return function (this: any, ...args: Parameters<T>) {
		if (!timer) {
			func.apply(this, args);
			timer = setTimeout(() => {
				timer = null;
			}, delay);
		}
	};
}
