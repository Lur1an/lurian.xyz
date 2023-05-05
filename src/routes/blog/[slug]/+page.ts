import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const slug = params.slug;
		const post = await import(`/src/posts/${slug}.md`);
		return {
			content: post.default,
			metadata: post.metadata
		};
	} catch (e) {
		throw error(404, 'Post not found');
	}
}
