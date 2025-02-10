import { tick } from 'svelte';

export function forcefocus(el: HTMLElement) {
	tick().then(() => el.focus());
}

export function getFocusableChildren(el: HTMLElement) {
	const children: HTMLElement[] = Array.from(
		el.querySelectorAll(
			':where(a[href], button, input, textarea, select, summary, [tabindex]:not([tabindex="-1"])):not(details:not([open]) *), summary:not(details:not([open]) details *)'
		)
	);

	const index = children.indexOf(document.activeElement as HTMLElement);

	function traverse(d: number, selector?: string) {
		const reordered = [...children.slice(index), ...children.slice(0, index)];

		let i = (reordered.length + d) % reordered.length;

		let node;
		while ((node = reordered[i])) {
			i += d;

			if (!selector || node.matches(selector)) {
				node.focus();
				return;
			}
		}
	}

	return {
		children,
		next(selector?: string) {
			return traverse(1, selector);
		},
		prev(selector?: string) {
			return traverse(-1, selector);
		},
		update(d: number) {
			let i = index + d;

			i += children.length;
			i %= children.length;

			children[i].focus();
		}
	};
}

export function trapfocus(el: HTMLElement, options?: { resetFocus?: boolean }) {
	const currentEl = document.activeElement as HTMLElement;

	function onKeyDown(e: KeyboardEvent) {
		if (e.key === 'Tab') {
			e.preventDefault();

			const children = getFocusableChildren(el);

			if (e.shiftKey) {
				children.prev();
			} else {
				children.next();
			}
		}
	}

	el.addEventListener('keydown', onKeyDown);

	return {
		destroy() {
			el.removeEventListener('keydown', onKeyDown);

			if (options?.resetFocus) {
				currentEl?.focus({ preventScroll: true });
			}
		}
	};
}
