<script lang="ts">
    import { regex } from '$lib/index.ts';
</script>

<div class="search">
    <form method="GET" id="action">
        <input type="text" oninput={(event) => regex.set(event.currentTarget.value)} autofocus autocomplete="off">
    </form>
</div>