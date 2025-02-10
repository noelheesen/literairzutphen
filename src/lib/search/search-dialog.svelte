<script lang="ts">
	import { forcefocus, trapfocus } from '$lib/actions/focus';
	import { lockBodyScrolling, unlockBodyScrolling } from '$lib/actions/scroll';
    import { ALPHABET } from '$lib/constants';
    import { onMount, tick } from 'svelte'
    import SearchWorker from './search-worker?worker'

    let {
        open = $bindable(false),
        modal = false
    } = $props()

    let worker: Worker
    let activator: HTMLElement | undefined
    let searchEl = $state() as HTMLInputElement

    export function show() {
        open = true
    }

    export function hide() {
        open = false
    }

    export function toggle(value?: boolean) {
        if (value === undefined) {
            value = !open
        }
        value ? show() : hide()
    }

    export function search(e) {
        e.preventDefault()

        const data = new FormData(e.currentTarget)        
        
        worker.postMessage({
            type: 'query',
            payload: { query: data.get('q') }
        })
    }

    $effect(() => {
        if (open) {
            activator = document.activeElement as HTMLElement
            tick().then(() => {
                activator?.blur()
            })
        } else {
            if (activator) {
                forcefocus(activator)
            }
        }
    })

    $effect(() => {
        if (modal) {
            if (open) {
                lockBodyScrolling(document.documentElement)
            } else {
                unlockBodyScrolling(document.documentElement)
            }
        }
    })

    onMount(() => {
        worker = new SearchWorker()
        worker.postMessage({
            type: 'init'
        })
    })
</script>

<svelte:window onkeydown={(e) => {
    if (e.key === 'k' && (navigator.userAgent.includes('Mac') ? e.metaKey : e.ctrlKey)) {
        console.log('handling keycombo')
        e.preventDefault()
        toggle()
    }
    if (open && e.key === 'Escape') {
        console.log('handling escape')
        hide()
    }
}}></svelte:window>

{#if open}
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div
        id="search-dialog"
        use:trapfocus
        onkeydown={(e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                
            }
        }}
    >
        <form id="global-search" onsubmit={search}>
            <div class="input-group" role="group">
                <input bind:this={searchEl} name="q" type="search" placeholder="Zoeken" spellcheck="false" aria-label="search" use:forcefocus>
                <button type="button" aria-label="Clear" onclick={(e) => { searchEl!.value = '' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </button>
            </div>
            <button type="button" aria-label="close" class="mx-2 px-2 text-2xl text-gray-600 hover:outline hover:outline-1" onclick={hide}>ESC</button>
        </form>
        <menu id="az-menu">
            {#each ALPHABET as letter}
                <button type="button">{letter}</button>
            {/each}
        </menu>
        <div id="search-results">
            search results
        </div>
    </div>
{/if}

<style lang="postcss">
    #search-dialog {
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