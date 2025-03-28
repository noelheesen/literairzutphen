<script lang="ts">
	import { MediaQuery } from 'svelte/reactivity';
	import '../app.css';
	import Links from '../data/links.json';
	import { hashscroll } from '$lib/actions/scroll';
	import SearchDialog from '$lib/search/search-dialog.svelte';
	import { page } from '$app/state';
	import ScrollToTop from '$lib/components/scroll-to-top.svelte';

	let { children } = $props();

	const isMediaLarge = new MediaQuery('min-width: 1024px');

	let navdrawn = $state(false);
	let searchdialog: SearchDialog;
</script>

<svelte:window use:hashscroll />

<header id="site-header">
	<h1 id="site-title">{isMediaLarge.current ? 'Literair Zutphen' : 'LZ'}</h1>

	<button id="search-activator" aria-label="search activator" onclick={() => searchdialog?.show()}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="15"
			height="15"
			fill="currentColor"
			class="bi bi-search"
			viewBox="0 0 16 16"
		>
			<path
				d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
			/>
		</svg>
		<span class="placeholder">zoeken</span>
	</button>

	<button id="az-activator" onclick={() => searchdialog?.show()}>A – Z</button>

	{#if !isMediaLarge.current}
		<button
			id="nav-toggle"
			onclick={() => {
				navdrawn = !navdrawn;
			}}
		>
			{#if navdrawn}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="34"
					height="34"
					fill="currentColor"
					class="bi bi-text-indent-left"
					viewBox="0 0 16 16"
				>
					<path
						d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m.646 2.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L4.293 8 2.646 6.354a.5.5 0 0 1 0-.708M7 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m-5 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
					/>
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="34"
					height="34"
					fill="currentColor"
					class="bi bi-text-indent-right"
					viewBox="0 0 16 16"
				>
					<path
						d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m10.646 2.146a.5.5 0 0 1 .708.708L11.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708zM2 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5"
					/>
				</svg>
			{/if}
		</button>
	{/if}
</header>

<aside id="site-nav" class:navdrawn>
	<nav>
		<li><a href="/" class:current-route={page.route.id === '/'}>Home</a></li>
		<li><a href="/introductie" class:current-route={page.route.id === '/introductie'}>Introductie</a></li>
		<h4>Tijdvak</h4>
		<ul>
			<li><a href="/tijdvak/voor-1500" class:current-route={page.route.id === '/tijdvak/voor-1500'}>voor 1500</a></li>
			<li><a href="/tijdvak/1500-1700" class:current-route={page.route.id === '/tijdvak/1500-1700'}>1500 - 1700</a></li>
			<li><a href="/tijdvak/1700-1800" class:current-route={page.route.id === '/tijdvak/1700-1800'}>1700 - 1800</a></li>
			<li><a href="/tijdvak/1800-1900" class:current-route={page.route.id === '/tijdvak/1800-1900'}>1800 - 1900</a></li>
			<li><a href="/tijdvak/1900-1945" class:current-route={page.route.id === '/tijdvak/1900-1945'}>1900 - 1945</a></li>
			<li><a href="/tijdvak/1945-heden" class:current-route={page.route.id === '/tijdvak/1945-heden'}>1945 - heden</a></li>
		</ul>
		<li><a href="/citaten-gedichten-en-teksten" class:current-route={page.route.id === '/citaten-gedichten-en-teksten'}>Citaten, gedichten en teksten</a></li>
		<li><a href="/colofon" class:current-route={page.route.id === '/colofon'}>Colofon / Contact</a></li>
	</nav>

	<h4>Links</h4>
	<ul>
		{#each Links as link}
			<li>
				<a href={link.url} target="_blank" rel="noopener noreferrer" title={link.title}
					>{link.text}</a
				>
			</li>
		{/each}
	</ul>
</aside>

<main>{@render children()}</main>

<ScrollToTop />

<div id="dialog-portal">
	<SearchDialog bind:this={searchdialog} modal />
</div>

<style lang="postcss">
	main {
		@apply pt-14 pb-6;
		margin: 0 6svw;
	}

	#site-header {
		@apply fixed top-0;
		@apply flex items-center;
		@apply h-14 w-full;
		@apply pr-2;
		@apply border-b-4 border-red-800;
		@apply shadow-md;

		#site-title {
			@apply inline-block;
			@apply text-3xl font-semibold;
			@apply mr-auto ml-4;
			font-family: Tangerine;
		}

		#search-activator {
			@apply p-1 mr-1;
			@apply inline-flex items-center;
			@apply text-gray-600;

			> * {
				@apply select-none pointer-events-none;
			}

			&:hover {
				@apply text-gray-900;
			}

			.placeholder {
				@apply ml-1;
				margin-top: -2px;	
			}
		}

		#az-activator {
			@apply p-1 mr-1;
			@apply font-semibold text-gray-600;
			margin-top: -2px;

			&:hover {
				@apply text-gray-900;
			}
		}
	}

	#site-nav {
		@apply fixed top-14;
		@apply p-4 pr-7;
		@apply hidden;
		background-color: var(--background-color);

		&.navdrawn {
			display: initial;
		}

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

	@media (max-width: 1023px) {
		#site-nav {
			@apply bottom-0;
			@apply w-full;
		}
	}

	@media (min-width: 1024px) {
		main {
			margin: 0 auto;
			max-width: 64rem;
		}

		#site-header {
			#search-activator,
			#az-activator {
				@apply mr-3;
			}
		}

		#site-nav {
			display: initial;
		}
	}

	:global(#dialog-portal) {
		@apply fixed top-0 left-0 h-full w-full;
		@apply flex items-center justify-center;
		@apply pointer-events-none;
	}

	.current-route {
		@apply ml-2;
	}
</style>
