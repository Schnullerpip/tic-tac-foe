import OpenAI from 'openai'

export class OpenAiClient {
	private readonly client: OpenAI

	constructor(apiKey: string) {
		this.client = new OpenAI({
			apiKey,
			dangerouslyAllowBrowser: true,
		})
	}

	async complete(content: string): Promise<string> {
		const completion = await this.client.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{
					role: 'user',
					content,
				},
			],
		})
		return completion.choices[0].message.content ?? ''
	}
}

if (import.meta.vitest) {
	const { describe, it, expect, beforeEach } = import.meta.vitest
	describe('OpenAiClient', () => {
		let client: OpenAiClient
		beforeEach(() => {
			client = new OpenAiClient(import.meta.env.VITE_OPENAI_API_KEY)
		})

		it.skip('should complete a prompt', async () => {
			const completion = await client.complete('say this is a test')
			expect(completion).toBe('This is a test.')
		})
	})
}
