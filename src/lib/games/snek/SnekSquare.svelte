
<script lang="ts">
	import type { Writable } from "svelte/store";
	import { BoardChunk } from "./engine";

    export let squareType: Writable<BoardChunk>;
    export let styles: string;

    function color(chunk: BoardChunk): string {
        switch (chunk) {
            case BoardChunk.EMPTY:
                return "bg-gray-200";
            case BoardChunk.SNEK:
                return "bg-green-500";
            case BoardChunk.FOOD:
                return "bg-red-500";
        }
    }

    $: squareStyle = styles + " " + color($squareType);
</script>

<div class={squareStyle}>

</div>
