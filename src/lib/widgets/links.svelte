<script lang="ts">
	import { configStore, regex } from '$lib/index.ts';

    let matchLink = (name:string, regex:string) => {
		if (typeof window !== 'undefined') {
			console.log("Match attempt");
			// On every update, reset selection (pivot) to 0
			let match = new RegExp(regex ? regex : ".", "i"); // Check if regex has content. If it does not, set it to "."
			return match.test(name);
		}
    }

	let selectorState = $state({
		selected: -3,
		totalLinks: 0
	});

	function onKeyDown(e:any) {
		switch (e.keyCode) {
			case 38: // ArrowUp
				selectorState.selected = selectorState.selected >= 0 ? 0 : selectorState.selected + 1;
				console.log(selectorState.selected);
				break;
			case 40: // ArrowDown
				selectorState.selected =
					selectorState.selected <= -selectorState.totalLinks + 1
						? -selectorState.totalLinks + 1
						: selectorState.selected - 1;
				console.log(selectorState.selected);
				break;
			default:
				break;
		}
	};
</script>

<svelte:window on:keydown={onKeyDown} onload={() => {selectorState.totalLinks = 0}}/>
{#each $configStore.links as group, index}
	<div class="links box" style={`grid-column: ${index + 1}`}>
		{#each group as link}
            {#if matchLink(link.name, $regex)}
                <a class="link" onshow={() => {selectorState.totalLinks++; console.log("Total Links: " + selectorState.totalLinks)}} class:action={() => {!selectorState.selected++}} href={link.url}>{link.name}</a>
            {/if}
		{/each}
	</div>
{/each}

<style>
	.link.action {
		/*background-color: rgba(255,255,255,.1);*/
		background-color: red;
		color: var(--hgl);
	}

    .links {
        flex-direction: column;
        gap: 20px;
        grid-row: 3;
        height: 200px;
        animation: 0.8s links ease-in-out forwards;
        transform: translate(0px, -385px);
    }

    @keyframes links {
        from {
            height: 200px;
            transform: translate(0px, -385px);
        }
        to {
            height: 220px;
            transform: translate(0px, 0px);
        }
    }

    .link {
        font-size: 1.2em;
        color: var(--font-color);
        text-decoration: none;
        transform: scale(1);
        transition: color 0.2s ease;
    }

    .link:hover {
        color: var(--font-bright);
        /* text-shadow: 0px 0px 20px var(--font-color); */
    }

    .link::after {
        content: '';
        display: block;
        position: absolute;
        bottom: -2px;
        /* left: 50%; */
        right: 0;
        width: 0%;
        height: 1.5px;
        background-color: var(--font-color);
        transition: width 0.2s ease, background-color 0.2s ease,
            height 0.1s ease;
        /* transform: translateX(-50%); */
        z-index: -1;
    }

    .link:hover::after {
        width: 100%;
        right: auto;
        left: 0;
        background-color: var(--font-bright);
    }

    .link:active {
        /* transform: scale(0.95); */
        color: var(--background-2);
    }

    .link:active::after {
        height: 110%;
    }
</style>