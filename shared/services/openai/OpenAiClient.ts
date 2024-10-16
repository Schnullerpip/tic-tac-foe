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
