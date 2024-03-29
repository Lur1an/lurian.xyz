import adapter from "@sveltejs/adapter-node";
import seqPreprocessor from "svelte-sequential-preprocessor";
import { vitePreprocess } from "@sveltejs/kit/vite";
import { escapeSvelte, mdsvex } from "mdsvex";
import shiki from "shiki";

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: [".md"],
  layout: {
    _: "./src/mdsvex.svelte",
  },
  highlight: {
    highlighter: async (code, lang = "text") => {
      const highlighter = await shiki.getHighlighter({ theme: "poimandres" });
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang }));
      return `{@html \`${html}\`}`;
    },
  },
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ...mdsvexOptions.extensions],
  preprocess: seqPreprocessor([
    vitePreprocess(),
    mdsvex(mdsvexOptions),
  ]),
  kit: {
    adapter: adapter(),
  },
};

export default config;
