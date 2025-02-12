<script lang="ts">
	import { forcefocus, keyboardnavigation, trapfocus } from '$lib/actions/focus';
	import { lockBodyScrolling, unlockBodyScrolling } from '$lib/actions/scroll';
	import { tick, type Snippet } from 'svelte';

	let {
		id,
		class: klass,
		open = $bindable(false),
		modal = false,
		children
	}: { id?: string; class?: string; open: boolean; modal?: boolean; children: Snippet } = $props();

	let activator: HTMLElement | undefined;

	export function show() {
		open = true;
	}

	export function hide() {
		open = false;
	}

	export function toggle(value?: boolean) {
		if (value === undefined) {
			value = !open;
		}
		value ? show() : hide();
	}

	$effect(() => {
		if (open) {
			activator = document.activeElement as HTMLElement;

			tick().then(() => {
				activator?.blur();
			});
		} else {
			if (activator) {
				forcefocus(activator);
			}
		}
	});

	$effect(() => {
		if (modal) {
			if (open) {
				lockBodyScrolling(document.documentElement);
			} else {
				unlockBodyScrolling(document.documentElement);
			}
		}
	});
</script>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<div class="modal-overlay" onclick={hide}></div>
	<div {id} class={klass} role="dialog" use:trapfocus use:keyboardnavigation>
		{@render children()}
	</div>
{/if}

<style lang="postcss">
	div[role='dialog'] {
		@apply pointer-events-auto;
	}

	.modal-overlay {
		@apply fixed top-0 left-0 h-full w-full;
		@apply pointer-events-auto;
		@apply cursor-pointer;
		background-color: hsla(0, 0%, 0%, 0.4);
	}
</style>
