<script lang=ts>
	import '../app.css';
	import Links from '../../data/links.json'
	import { ALPHABET } from '$lib/constants';

	let { children } = $props();
</script>

<header class="h-12 sticky border-b-4 border-red-800">
	<h1>Literair Zutphen</h1>
	<menu>
		<ul class="flex float-right">
			{#each ALPHABET as letter}
				<li>{letter}</li>
			{/each}
		</ul>
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
