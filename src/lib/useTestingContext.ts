import { ref } from "vue";

const currentContext = ref<string | null>(null);

export function useTestingContext() {
	const context = (newContext: string) => {
		currentContext.value = newContext;
	};

	const clearContext = () => {
		currentContext.value = null;
	};

	return {
		context,
		clearContext,
		currentContext,
	};
}
