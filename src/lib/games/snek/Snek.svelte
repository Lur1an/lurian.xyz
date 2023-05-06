<script lang="ts">
	import { BoardChunk, Direction, GameEngine } from '$lib/games/snek/engine';
	import { writable, type Writable } from 'svelte/store';
	import SnekSquare from './SnekSquare.svelte';
	import { onMount } from 'svelte';

	let game: GameEngine;
	let hooks: Writable<BoardChunk>[][];
	function onKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowUp':
				game.direction = Direction.UP;
				break;
			case 'ArrowDown':
				game.direction = Direction.DOWN;
				break;
			case 'ArrowLeft':
				game.direction = Direction.LEFT;
				break;
			case 'ArrowRight':
				game.direction = Direction.RIGHT;
				break;
		}
	}
	onMount(() => {
        hooks = [];
		for (let i = 0; i < 12; i++) {
			hooks[i] = new Array(12);
			for (let j = 0; j < 12; j++) {
				hooks[i][j] = writable(BoardChunk.EMPTY);
			}
		}
		game = new GameEngine(12, 12, hooks);
		setInterval(() => {
			game.act();
		}, 100);
	});
</script>

{#if game !== undefined}
	<div class="grid grid-cols-12 gap-3 h-[70%] w-[70%]">
		{#each game.boardHooks as row}
			{#each row as hook}
				<SnekSquare squareType={hook} styles="h-full w-full" />
			{/each}
		{/each}
	</div>
{/if}
<svelte:window on:keydown|preventDefault={onKeyDown} />
