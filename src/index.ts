import { Ai } from '@cloudflare/ai'

export interface Env {
	AI: any;
	URL_PREFIX: string;
}

export default {
	async fetch(request: Request, env: Env) {
		if (request.method !== 'POST') {
			return new Response(JSON.stringify({ message: 'Method Not Allowed' }), { status: 405 });
		}

		if (!request.headers.get('Content-Type')?.includes('application/json')) {
			return new Response(JSON.stringify({ message: 'Unsupported Media Type' }), { status: 415 });
		}

		// Extract the URL path
		const urlPath = new URL(request.url).pathname;

		// Check if the URL path starts with URL_PREFIX

		if (env.URL_PREFIX && !urlPath.startsWith(env.URL_PREFIX)) {
			return new Response(JSON.stringify({ message: 'Forbidden' }), { status: 403 });
		}

		try {
			const ai = new Ai(env.AI);

			const { source_lang, target_lang, text_list } = await request.json() as any;
			if (!Array.isArray(text_list) || !text_list.length) {
				return new Response(JSON.stringify({ message: 'Invalid text_list' }), { status: 400 });
			}
			const translations = await Promise.all(text_list.map(async (text: string) => {
				const aiParams: any = {
					text,
					target_lang: target_lang === "zh-CN" ? "chinese" : target_lang
				};
				if (source_lang && source_lang !== "auto") {
					aiParams.source_lang = source_lang;
				}
				const response = await ai.run('@cf/meta/m2m100-1.2b', aiParams);
				return {
					detected_source_lang: source_lang,
					text: response.translated_text
				};
			}));
	
			return new Response(JSON.stringify({ translations, message: 'ok' }));
		} catch (error) {
			return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
		}
	},
}