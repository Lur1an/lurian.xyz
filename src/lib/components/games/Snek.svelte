<script lang="ts">
	class SnekNode {
		next: SnekNode | null = null;
		pos: { x: number; y: number };

		constructor(x: number, y: number) {
			this.pos = { x, y };
		}
	}

	enum Direction {
		UP,
		DOWN,
		LEFT,
		RIGHT
	}

	type Empty = 0;
	type FoodChunk = 1;
	type Chunk = SnekNode | FoodChunk | Empty;

    enum BoardChunk {
        EMPTY,
        FOOD,
        SNEK
    }


	function getColor(chunk: Chunk): string {
		if (chunk instanceof SnekNode) {
			return 'bg-red-500';
		} else if (chunk === 1) {
			return 'bg-green-500';
		} else {
			return 'bg-gray-300';
		}
	}

	function movement(
		coordinates: { x: number; y: number },
		direction: Direction,
		height: number,
		width: number
	): { x: number; y: number } {
		let newY: number = coordinates.y;
		let newX: number = coordinates.x;
		switch (direction) {
			case Direction.UP:
				newY = coordinates.y - 1;
				newY = newY >= 0 ? newY : height - 1;
				break;
			case Direction.DOWN:
				newY = coordinates.y + 1;
				newY = newY < height ? newY : 0;
				break;
			case Direction.LEFT:
				newX = coordinates.x - 1;
				newX = newX >= 0 ? newX : width - 1;
				break;
			case Direction.RIGHT:
				newX = coordinates.x + 1;
				newX = newX < width ? newX : 0;
				break;
		}
		return { x: newX, y: newY };
	}

	class SnekGame {
		head: SnekNode;
		snekLength: number = 1;
		direction: Direction = Direction.RIGHT;
		board: Chunk[][];

		constructor(height: number, width: number) {
			this.board = Array.from({ length: height }, () => Array(width).fill(0));
			this.head = new SnekNode(0, 0);
			this.board[0][0] = this.head;
		}

		height(): number {
			return this.board.length;
		}

		width(): number {
			return this.board[0].length;
		}

		gameOver(): void {
			// TODO
            clearInterval(gameLoop)
			console.log('Game over!');
		}

		move(): void {
			console.info('Processing movement');
			const nextPosition = movement(this.head.pos, this.direction, this.height(), this.width());
			console.info(`Next position: ${nextPosition.x}, ${nextPosition.y}`);
			const nextChunk = this.board[nextPosition.y][nextPosition.x];
			console.info(`Next chunk: ${nextChunk}`);
			if (nextChunk instanceof SnekNode && nextChunk !== this.head.next) {
				this.gameOver();
			} else if (nextChunk === 1) {
				// FoodChunk
			}
			// apply movement
			this.board[this.head.pos.y][this.head.pos.x] = 0;
			this.head.pos = nextPosition;
			this.board[nextPosition.y][nextPosition.x] = this.head;
		}
	}

	let game = new SnekGame(12, 12);
	let gameLoop = setInterval(() => {
		game.move();
		game = game;
	}, 100);
</script>

<div class="grid grid-cols-12 gap-3 h-[70%] w-[70%]">
	{#each game.board as row, i}
		{#each row as _, j}
			<div class="w-full h-full {getColor(game.board[i][j])}" />
		{/each}
	{/each}
</div>
