import { type Writable, writable } from 'svelte/store';

class SnekNode {
	next: SnekNode | null = null;
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

enum Direction {
	UP,
	DOWN,
	LEFT,
	RIGHT
}

enum BoardChunk {
	EMPTY,
	FOOD,
	SNEK
}

// Calculates the coordinates of the adjacent chunk in the given direction
function adjacentCoords(
	coords: { x: number; y: number },
	direction: Direction,
	height: number,
	width: number
): { x: number; y: number } {
	let { x, y } = coords;
	switch (direction) {
		case Direction.UP:
			y = coords.y - 1;
			y = y >= 0 ? y : height - 1;
			break;
		case Direction.DOWN:
			y = coords.y + 1;
			y = y < height ? y : 0;
			break;
		case Direction.LEFT:
			x = coords.x - 1;
			x = x >= 0 ? x : width - 1;
			break;
		case Direction.RIGHT:
			x = coords.x + 1;
			x = x < width ? x : 0;
			break;
	}
	return { x: x, y: y };
}

// Double linked list
class Snek {
	head: SnekNode;
	tail: SnekNode;
	length = 1;

	constructor(node: SnekNode) {
		this.head = node;
		this.tail = node;
	}

	addNode(node: SnekNode) {
		if (this.head === null) {
			this.head = node;
			this.tail = node;
			return;
		}
		this.tail.next = node;
		this.tail = node;
        this.length++;
        console.info(this);
	}
}

function randomInt(max: number): number {
	return Math.floor(Math.random() * max);
}

class GameEngine {
	snek: Snek;
	direction = Direction.RIGHT;
	board: BoardChunk[][];
	boardHooks: Writable<BoardChunk>[][];

	constructor(height: number, width: number, hooks: Writable<BoardChunk>[][]) {
		this.board = new Array(height);
		this.boardHooks = new Array(height);
        this.boardHooks = hooks;
		for (let i = 0; i < height; i++) {
			this.board[i] = new Array(width);
			this.boardHooks[i] = new Array(width);
			for (let j = 0; j < width; j++) {
				this.board[i][j] = BoardChunk.EMPTY;
				this.boardHooks[i][j] = writable(BoardChunk.EMPTY);
			}
		}
		this.snek = new Snek(new SnekNode(0, 0));
		this.updateBoard(0, 0, BoardChunk.SNEK);
		this.spawnFood();
	}

	setDirection(direction: Direction) {
		console.info(`Updating direction to ${direction}`)
		this.direction = direction;
	}

	// Updates both internal board and updates subscriber for updates
	updateBoard(x: number, y: number, chunk: BoardChunk) {
		this.board[y][x] = chunk;
		this.boardHooks[y][x].set(chunk);
	}

	height(): number {
		return this.board.length;
	}

	width(): number {
		return this.board[0].length;
	}

	gameOver(): void {
		console.info('Game over');
	}

	move(moveX: number, moveY: number): void {
		let currentNode: SnekNode | null = this.snek.head;
		let oldX = currentNode.x;
		let oldY = currentNode.y;
		while (currentNode != null) {
			currentNode.x = moveX;
			currentNode.y = moveY;
			this.updateBoard(moveX, moveY, BoardChunk.SNEK);
			moveX = oldX;
			moveY = oldY;
			currentNode = currentNode.next;
		}
		this.updateBoard(moveX, moveY, BoardChunk.EMPTY);
	}

	spawnFood(): void {
		const possibleChunks: Array<{ chunk: BoardChunk; x: number; y: number }> = [];
		for (let x = 0; x < this.height(); x++) {
			for (let y = 0; y < this.width(); y++) {
				const chunk = this.board[x][y];
				if (chunk === BoardChunk.EMPTY) {
					possibleChunks.push({ chunk, x, y });
				}
			}
		}
		const chunk = possibleChunks[randomInt(possibleChunks.length)];
		this.updateBoard(chunk.x, chunk.y, BoardChunk.FOOD);
	}

	act(): 'GAME_OVER' | 'OK' {
		const snekHead = this.snek.head;
		const nextPos = adjacentCoords(
			{ x: snekHead.x, y: snekHead.y },
			this.direction,
			this.height(),
			this.width()
		);
		const nextChunk = this.board[nextPos.y][nextPos.x];
		if (nextChunk === BoardChunk.SNEK) {
            console.info('Game over');
			return 'GAME_OVER';
		}
		if (nextChunk === BoardChunk.FOOD) {
			this.addChunk();
            this.spawnFood();
		}
        this.move(nextPos.x, nextPos.y);
		return 'OK';
	}

	addChunk(): void {
		console.info('Adding chunk');
		const snekTail = this.snek.tail;
		const possibleNewChunks = [Direction.UP, Direction.DOWN, Direction.LEFT, Direction.RIGHT]
        .filter((direction) => direction !== this.direction)
        .map(
			(direction) => {
				return adjacentCoords(
					{ x: snekTail.x, y: snekTail.y },
					direction,
					this.height(),
					this.width()
				);
			}
		);
        console.info(possibleNewChunks)
		const newChunk = possibleNewChunks[randomInt(possibleNewChunks.length)];
        console.info(newChunk)
		this.snek.addNode(new SnekNode(newChunk.x, newChunk.y));
		this.updateBoard(newChunk.x, newChunk.y, BoardChunk.SNEK);
	}
}

export { BoardChunk, Direction, GameEngine };
