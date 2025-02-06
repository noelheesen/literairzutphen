<script lang=ts>
	import '../app.css';
	// import Links from '../../data/links.json'
	import { ALPHABET } from '$lib/constants';
	import { scrollToWriter } from '$lib/actions/scroll-to-writer';

	let { children } = $props();
</script>

<svelte:window use:scrollToWriter></svelte:window>

<header class="sticky border-b-4 border-red-800">
	<h1>Literair Zutphen</h1>
	<menu class="float-right">
		<ul class="flex">
			{#each ALPHABET as letter}
				<li><button type="button">{letter}</button></li>
			{/each}
		</ul>
		<button id="drawer-toggle">DRAWER</button>
	</menu>
</header>


<!-- <aside class="border-r-2 inline-block">
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
		<li><a href="/citaten-en-gedichten">Citaten, gedichten en teksten</a></li>
		<li><a href="/colofon">Colofon / Contact</a></li>
	</nav>

	<h4>Links</h4>
	<ul>
		{#each Links as link}
			<li><a href={link.url} target="_blank" rel="noopener noreferrer" title={link.title}>{link.text}</a></li>
		{/each}
	</ul>
</aside> -->

<main>{@render children()}</main>

<style>
	header {
		height: 3.4rem;
	}
	h1 {
		display: inline-block;
		font-family: Tangerine;
		font-size: 2.3rem;
	}

	menu {
		display: inline-flex;
		column-gap: 0.4rem;
	}
</style>