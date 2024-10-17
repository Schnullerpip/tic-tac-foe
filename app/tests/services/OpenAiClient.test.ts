import { beforeEach, describe, expect, it } from 'vitest'
import { OpenAiClient } from '../../../shared/services/openai/OpenAiClient'

describe.skip('OpenAiClient', () => {
	let client: OpenAiClient
	beforeEach(() => {
		client = new OpenAiClient(
			'well, this string is definitely no openai api key...',
		)
	})

	it('should complete a prompt', async () => {
		const completion = await client.complete('say this is a test')
		expect(completion).toBe('This is a test.')
	})
})
