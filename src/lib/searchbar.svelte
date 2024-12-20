<script lang="ts">
    function matchLinks(regex:string) {
        console.log("Match attempt");
    }
</script>

<div class="search">
    <form method="GET" id="action">
        <input type="text" oninput={(event) => matchLinks(event.currentTarget.value)} autofocus autocomplete="off">
    </form>
</div>