import { ref } from "vue";

const resetKey = ref(0);

export function useSandboxReset() {
	const reset = () => {
		resetKey.value += 1;
	};

	return {
		reset,
		resetKey,
	};
}
