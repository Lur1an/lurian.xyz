<script lang="ts">
	import { BoardChunk, Direction, GameEngine } from '$lib/games/snek/engine';
	import { writable, type Writable } from 'svelte/store';
	import SnekSquare from './SnekSquare.svelte';
	import { onMount } from 'svelte';
	import type { ModalSettings } from '@skeletonlabs/skeleton/dist/utilities/Modal/types';
	import { getModalStore } from '@skeletonlabs/skeleton';

    let modalStore = getModalStore();
	let game: GameEngine;
	let hooks: Writable<BoardChunk>[][];
	function onKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowUp':
				game.setDirection(Direction.UP);
				break;
			case 'ArrowDown':
				game.setDirection(Direction.DOWN);
				break;
			case 'ArrowLeft':
				game.setDirection(Direction.LEFT);
				break;
			case 'ArrowRight':
				game.setDirection(Direction.RIGHT);
				break;
		}
	}
    let gameInterval: NodeJS.Timer;

    const gameOver = () => {
        clearInterval(gameInterval);
        console.info("GAME OVER");
        const alert: ModalSettings = {
            type: 'alert',
            // Data
            title: 'Game Over',
            body: 'You lost!',
            buttonTextCancel: 'Try Again!',
            image: 'https://media3.giphy.com/media/JUSwkiO1Eh5K43ruN0/giphy.gif',
        };
        modalStore.trigger(alert);
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
		gameInterval = setInterval(() => {
			const result = game.tick();
            if (result === "GAME_OVER") {
                gameOver();
            }
		}, 115);
	});
</script>

{#if game !== undefined}
	<div class="aspect-square grid grid-cols-12 gap-3 w-[40%] h-[40%] mt-20">
		{#each game.boardHooks as row}
			{#each row as hook}
				<SnekSquare squareType={hook} />
			{/each}
		{/each}
	</div>
{/if}
<svelte:window on:keydown|preventdefault={onKeyDown} />
