<script lang="ts">
	import { Direction, GameEngine } from '$lib/games/snek/engine';
	import SnekSquare from './SnekSquare.svelte';
	let game = new GameEngine(12, 12);

    function onKeyDown(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowUp':
                game.direction = Direction.UP
                break;
            case 'ArrowDown':
                game.direction = Direction.DOWN
                break;
            case 'ArrowLeft':
                game.direction = Direction.LEFT
                break;
            case 'ArrowRight':
                game.direction = Direction.RIGHT
                break;
        }

    }

	setInterval(() => {
		game.act();
	}, 1000);
</script>

<div class="grid grid-cols-12 gap-3 h-[70%] w-[70%]">
	{#each game.boardHooks as row}
		{#each row as hook}
			<SnekSquare squareType={hook} styles="h-full w-full" />
		{/each}
	{/each}
</div>
<svelte:window on:keydown|preventDefault={onKeyDown} />
