import { onDeactivated, onUnmounted } from 'vue'

export function useSleep() {
	let timerHandle: NodeJS.Timeout

	onUnmounted(clearTimerHandle)
	onDeactivated(clearTimerHandle)

	return {
		sleep: (ms: number) =>
			new Promise((resolve) => {
				timerHandle = setTimeout(resolve, ms)
			}),
	}

	function clearTimerHandle() {
		clearTimeout(timerHandle)
	}
}
