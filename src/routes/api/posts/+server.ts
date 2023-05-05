import type { Post } from '$lib/types';
import { json } from '@sveltejs/kit';
import { formatDateString } from '$lib/util';

async function getPosts() {
	let posts: Post[] = [];
	const paths = import.meta.glob('/src/posts/*.md', {eager: true});
	for (let [path, file] of Object.entries(paths)) {
		const slug = path.split('/').at(-1)?.replace('.md', '');
		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata =  file.metadata as Omit<Post, 'slug'>;
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
