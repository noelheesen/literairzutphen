<script lang=ts>
	import '../app.css';
	import Links from '../data/links.json'
	import { hashscroll } from '$lib/actions/scroll';
	import SearchDialog from '$lib/search/search-dialog.svelte';

	let { children } = $props();

	let opened = $state(false)
	let searchdialog: SearchDialog
</script>

<svelte:window use:hashscroll></svelte:window>

<header id="site-header">
	<h1 id="site-title">Literair Zutphen</h1>

	<!-- <form id="site-search">
		<div class="input-group">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
				<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
			</svg>
			<input type="search" name="q" placeholder="zoeken" aria-label="zoeken" onclick={(e) => { searchdialog?.show() }}>
		</div>
	</form> -->

	<button id="search-activator" aria-label="search activator" onclick={() => searchdialog?.show() }>
		<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
			<path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
		</svg>
		<span class="placeholder">zoeken</span>
		<span class="kbd-keys"><kbd>{navigator.userAgent.includes('Mac') ? 'Cmd' : 'Ctrl'}</kbd> <kbd>K</kbd></span>
	</button>
	<button id="az-activator" onclick={() => searchdialog?.show() }>A – Z</button>
	<button id="nav-toggle" onclick={() => {
		opened = !opened
	}}>
		{#if opened}
			<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-text-indent-left" viewBox="0 0 16 16">
				<path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708M7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
			</svg>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-text-indent-right" viewBox="0 0 16 16">
				<path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m10.646 2.146a.5.5 0 0 1 .708.708L11.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708zM2 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"/>
			</svg>
		{/if}
	</button>
</header>

<aside id="site-nav">
	<nav>
		<li><a href="/">Home</a></li>
		<li><a href="/introductie">Introductie</a></li>
		<h4>Tijdvak</h4>
		<ul>
			<li><a href="/tijdvak/voor-1500">voor 1500</a></li>
			<li><a href="/tijdvak/1500-1700">1500 - 1700</a></li>
			<li><a href="/tijdvak/1700-1800">1700 - 1800</a></li>
			<li><a href="/tijdvak/1800-1900">1800 - 1900</a></li>
			<li><a href="/tijdvak/1900-1945">1900 - 1945</a></li>
			<li><a href="/tijdvak/1945-heden">1945 - heden</a></li>
		</ul>
		<li><a href="/citaten-gedichten-en-teksten">Citaten, gedichten en teksten</a></li>
		<li><a href="/colofon">Colofon / Contact</a></li>
	</nav>

	<h4>Links</h4>
	<ul>
		{#each Links as link}
			<li><a href={link.url} target="_blank" rel="noopener noreferrer" title={link.title}>{link.text}</a></li>
		{/each}
	</ul>
</aside>

<main>{@render children()}</main>

<!-- svelte-ignore a11y_no_static_element_interactions, a11y_click_events_have_key_events -->
<div id="dialog-portal" onclick={() => {  }}>
	<SearchDialog bind:this={searchdialog} modal/>
</div>

<style lang="postcss">
	#site-header {
		@apply fixed top-0;
		@apply flex items-center;
		@apply h-14 w-full;
		@apply border-b-2 border-red-800;
		@apply shadow-md;
		@apply pr-2;

		> button {
			@apply mr-3;
			@apply p-1;
		}

		#site-title {
			@apply inline-block;
			@apply text-3xl font-semibold;
			font-family: Tangerine;
			@apply mr-auto ml-4;
		}

		#search-activator {
			@apply inline-flex;
			@apply items-center;
			@apply py-2 px-3;
			@apply text-gray-600;

			.placeholder {
				margin-top: -2px;
				font-weight: 500;
				@apply ml-1;
			}

			.kbd-keys {
				@apply text-xs;
				@apply border border-gray-400 rounded;
				@apply px-1 ml-2;
				@apply text-gray-400;
			}

			&:hover {
				@apply text-gray-800;

				.kbd-keys {
					@apply text-green-700;
					@apply border-green-700;
				}
			}
		}

		#az-activator {
			@apply text-xl font-semibold;
			margin-top: -2px;
			@apply text-gray-600;

			&:hover {
				@apply text-gray-800;
			}
		}
	}

	@media (min-width: 1000px) {
		#nav-toggle {
			@apply hidden;
		}
	}

	#site-nav {
		@apply fixed top-14;
		@apply p-4 pr-7;

		h4 {
			@apply mt-2;
			@apply font-bold;
		}

		h4 + ul {
			@apply ml-3 my-1;
		}

		a {
			@apply block;
			@apply text-blue-950;
			@apply font-semibold;
			@apply text-sm;
			@apply my-1;

			&:hover {
				@apply underline;
			}

			&:first-child {
				@apply mt-0;
			}
		}
	}

	:global(#dialog-portal) {
		@apply fixed top-0 left-0 h-full w-full;
		@apply flex items-center justify-center;
		@apply pointer-events-none;

		&:not(:empty) {
			background-color: hsla(0, 0%, 0%, 0.4);
			@apply pointer-events-auto;
			@apply cursor-pointer;
		}

		> :global(*) { cursor: initial; }
	}
</style>