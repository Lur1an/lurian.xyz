
<script lang="ts">
	import type { Writable } from "svelte/store";
	import { BoardChunk } from "./engine";

    export let squareType: Writable<BoardChunk>;
    export let styles: string;

    function color(chunk: BoardChunk): string {
        switch (chunk) {
            case BoardChunk.EMPTY:
                return "variant-ghost-surface";
            case BoardChunk.SNEK:
                return "bg-warning-500";
            case BoardChunk.FOOD:
                return "bg-primary-500";
        }
    }

    $: squareStyle = styles + " " + color($squareType);
</script>

<div class={squareStyle}>

</div>
