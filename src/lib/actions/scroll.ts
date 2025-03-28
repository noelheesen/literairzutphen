import { page } from '$app/state';
import { tick } from 'svelte';

export function hashscroll(window: Window) {
	let anchor = page.url.hash;

	if (anchor) {
		anchor = anchor.substring(1);
	} else {
		return;
	}

	const selectorEl = document.querySelector(`writer[name=${anchor}]`);

	if (selectorEl) {
		const closestBlockEl = selectorEl.closest('section');

		if (closestBlockEl) {
			closestBlockEl.scrollIntoView({
				block: 'nearest'
			});
		}
	}
}

const scrollLocks = new Set<HTMLElement>();

export function lockBodyScrolling(el: HTMLElement) {
	scrollLocks.add(el);

	document.documentElement.classList.add('scroll-lock');
}

export function unlockBodyScrolling(el: HTMLElement) {
	scrollLocks.delete(el);

	document.documentElement.classList.remove('scroll-lock');
}
