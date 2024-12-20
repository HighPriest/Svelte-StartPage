<script lang="ts">
    import { configStore, regex } from '$lib/index.ts';

    function matchLink(name:string, regex:string) {
        console.log("Match attempt");
        // On every update, reset selection (pivot) to 0
        let match = new RegExp(regex ? regex : ".", "i"); // Check if regex has content. If it does not, set it to "."
        return match.test(name);
    }
</script>

{#each $configStore.links as group, index}
	<div class="links box" style={`grid-column: ${index + 1}`}>
		{#each group as link}
            {#if matchLink(link.name, $regex)}
			    <a class="link" href={link.url}>{link.name}</a>
            {/if}
		{/each}
	</div>
{/each}

<style>
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