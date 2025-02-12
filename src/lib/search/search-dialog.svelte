<script lang="ts">
	import {
		forcefocus,
		getFocusableChildren,
		keyboardnavigation,
		trapfocus
	} from '$lib/actions/focus';
	import { lockBodyScrolling, unlockBodyScrolling } from '$lib/actions/scroll';
	import { ALPHABET } from '$lib/constants';
	import { onMount, tick } from 'svelte';
	import SearchWorker from './search-worker?worker';
	import Dialog from '$lib/components/dialog.svelte';

	let { open = $bindable(false), modal = false } = $props();

	let dialog = $state() as Dialog;

	// const { show, hide, toggle } = dialog;

	let activator: HTMLElement | undefined;
	let searchEl = $state() as HTMLInputElement;

	let worker: Worker;
	let ready = $state(false);
	let results = $state([]);

	export function show() {
		dialog?.show();
	}

	export function hide() {
		dialog?.hide();
	}

	export function toggle(value?: boolean) {
		dialog?.toggle(value);
	}

	function onSearch(event: Event) {
		event.preventDefault();

		if (searchEl.value.length > 0) {
			worker.postMessage({
				type: 'query',
				payload: searchEl.value
			});
		} else {
			results = [];
		}
	}

	$effect(() => {
		if (!open) {
			results = [];
		}
	});

	onMount(() => {
		worker = new SearchWorker();
		worker.postMessage({
			type: 'init'
		});

		worker.addEventListener('message', (event) => {
			const { type, payload } = event.data;

			if (type === 'ready') {
				ready = true;
			}
			if (type === 'results') {
				results = payload;
			}
		});
	});
</script>

<svelte:window
	onkeydown={(e) => {
		if (e.key === 'k' && (navigator.userAgent.includes('Mac') ? e.metaKey : e.ctrlKey)) {
			e.preventDefault();
			dialog?.toggle();
		}
		if (open && e.key === 'Escape') {
			dialog?.hide();
		}
	}}
/>

{#if ready}
	<Dialog id="search-dialog" bind:this={dialog} bind:open {modal}>
		<form id="global-search" onsubmit={onSearch}>
			<div class="input-group" role="group">
				<input
					bind:this={searchEl}
					name="q"
					type="search"
					placeholder="Zoeken"
					spellcheck="false"
					aria-label="search"
					oninput={onSearch}
					use:forcefocus
				/>
				<button
					type="button"
					aria-label="Clear"
					onclick={(e) => {
						searchEl!.value = '';
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="34"
						height="34"
						fill="currentColor"
						class="bi bi-x"
						viewBox="0 0 16 16"
					>
						<path
							d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
						/>
					</svg>
				</button>
			</div>
			<button
				type="button"
				aria-label="close"
				class="mx-2 px-2 text-2xl text-gray-600 hover:outline hover:outline-1"
				onclick={dialog?.hide}>ESC</button
			>
		</form>
		<menu id="az-menu">
			{#each ALPHABET as letter}
				<button type="button">{letter}</button>
			{/each}
		</menu>
		<div id="search-results">
			{#each results as writer}
				<p><a href="adsfasdf">{writer.fullname}</a></p>
			{/each}
		</div>
	</Dialog>
{/if}

<style lang="postcss">
	:global(#search-dialog) {
		@apply fixed top-2;
		@apply flex flex-col;
		@apply bg-white;
		@apply rounded-lg shadow-lg;
		min-height: 16rem;
		max-height: calc(100% - 2rem);
	}

	#global-search {
		@apply flex;
		@apply p-2;

		.input-group {
			@apply relative;
			@apply flex items-center grow;

			input {
				@apply grow;
				@apply pr-8;
			}

			button {
				@apply absolute top-0 right-1 h-full;
			}
		}
	}

	#az-menu {
		@apply flex gap-x-1;
		@apply border-y border-red-900;
		@apply px-2;

		button {
			@apply h-full px-2 py-1;
			@apply text-xl;
		}
	}
</style>
