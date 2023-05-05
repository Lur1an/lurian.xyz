import type { Post } from '$lib/types';
import { json } from '@sveltejs/kit';

function formatDateString(date: string) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
	const [year, month, day] = date.substring(0, 10).split('-');
    return `${months[parseInt(month)]} ${day}, ${year}`;
}

async function getPosts() {
	let posts: Post[] = [];
	const paths = import.meta.glob('/src/posts/*.md', { eager: true });
	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug };
            post.date = formatDateString(post.date);
			posts.push(post);
		}
	}
	return posts;
}

export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
