export let initialized = false;

const map = new Map<string, any>();

export function init() {
	if (initialized) {
		return;
	}
}

export function search(query: string) {
	const escaped = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
	const exact_match = new RegExp(`^${escaped}$`, 'i');
	const word_match = new RegExp(`(^|\\b)${escaped}($|\\b)`, 'i');
	const near_match = new RegExp(`(^|\\b)${escaped}`, 'i');
	const parts = path.split('/');
}
