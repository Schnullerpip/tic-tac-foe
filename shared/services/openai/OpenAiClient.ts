import type OpenAI from 'openai'

// TODO 5
// 5.1. in the constructor use the apiKey to instantiate the client field
// 5.2. implement the complete method

export class OpenAiClient {
	private readonly client: OpenAI

	constructor(apiKey: string) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		this.client = {} as unknown as any
	}

	async complete(content: string): Promise<string> {
		return 'meh...'
	}
}
