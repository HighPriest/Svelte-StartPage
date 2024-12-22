<script lang="ts">
	import { configStore } from '$lib/index.ts';
	import Searchbar from '$lib/searchbar.svelte';
	import StatusBar, { updateTime } from '$lib/statusbar.svelte';
	import Weather, { updateWeather } from '$lib/widgets/weather.svelte';
    import Links from '$lib/widgets/links.svelte';
	import { onMount } from 'svelte';

	const userState = $state({
		showConfig: false,
        configString: JSON.stringify($configStore, undefined, 4),
	});

	function updateApp() {
		updateTime();
	}
    function fetchData() {
        updateWeather($configStore);
    }

    function updateConfig() {
        try {
            $configStore = JSON.parse(userState.configString)
            userState.configString = JSON.stringify($configStore, undefined, 4)
            fetchData();
        } catch (e) {
            console.error(e)
        }
    }

	onMount(() => {
		const storedConfig = localStorage.getItem('config')
			? JSON.parse(localStorage.getItem('config')!)
			: $configStore; // Check localStorage for the config

		configStore.set(storedConfig);

		configStore.subscribe((value) => {
			// Subscribe to the contents of the config store
			localStorage.setItem('config', JSON.stringify(value)); // Store the config inside the localStorage
		});

        fetchData();
		setInterval(updateApp, $configStore.updateInterval);
	});
</script>

<main>
	<div class="grid">
        <Searchbar/>
		<div class="widgets">
			<StatusBar></StatusBar>
			<Weather></Weather>
		</div>
        <Links/>

		{#if userState.showConfig}
			<div class="config box">
				<textarea class="config-textarea" bind:value={userState.configString} onchange={updateConfig}></textarea>
			</div>
		{/if}
	</div>
    <button class="config-button" onclick={() => userState.showConfig = !userState.showConfig}>
        {userState.showConfig ? 'close config' : 'open config'}
    </button>
</main>

<style>
    main {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .grid {
        margin: 0;
        display: grid;
        grid-template-columns: min-content min-content min-content min-content;
        grid-template-rows: 200px 145px 220px;
        grid-gap: 20px;
    }

    .widgets {
        grid-column: 1 / 5;
        grid-row: 2;
        display: flex;
        justify-content: center;
        gap: 20px;
        width: fit-content;
        z-index: 5;
        animation: 0.8s widgets ease-in-out forwards;
        transform: translate(0px, -192.5px);
    }

    @keyframes widgets {
        from {
            transform: translate(0px, -192.5px);
        }
        to {
            transform: translate(0px, 0px);
        }
    }

    .config-button {
        position: absolute;
        right: 0;
        bottom: 0;
        background: none;
        opacity: 0;
        padding: 20px;
        transform: scale(1);
        transition: 0.05s linear;
    }

    .config-button:hover {
        opacity: 1;
    }

    .config-button:active {
        transform: scale(0.95);
    }

    .config {
        grid-column: 1 / 5;
        grid-row: 2 / 4;
        display: flex;
        z-index: 20;
        padding: 40px;
    }

    .config-textarea {
        width: 100%;
        height: 100%;
        background: var(--background-3);
        border: none;
        border-radius: 10px;
        padding: 20px;
        color: inherit;
        font: inherit;
    }
</style>