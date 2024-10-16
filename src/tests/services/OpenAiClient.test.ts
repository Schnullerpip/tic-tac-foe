import { beforeEach, describe, expect, it } from 'vitest'
import { OpenAiClient } from '../../../shared/services/openai/OpenAiClient'

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
