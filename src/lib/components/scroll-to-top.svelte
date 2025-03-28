<script lang="ts">
	import { browser } from '$app/environment';
    import { scrollY } from 'svelte/reactivity/window'

    let visible = $state(false)

    if (browser) {
        $effect(() => {
            visible = (scrollY.current || 0) >= ((document?.documentElement.offsetHeight || 0) / 4) * 3
        })
    }
</script>

{#if visible}
<button aria-label="scrolltotop" onclick={() => {
    window.scrollTo({ top: 0 })
}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
    </svg>
</button>
{/if}

<style lang="postcss">
    button {
        @apply fixed bottom-2 right-2;
        color: rgb(153 27 27 / var(--tw-border-opacity, 1));
    }
</style>