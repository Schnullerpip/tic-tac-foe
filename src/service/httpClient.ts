export class HttpClient {
	constructor(private readonly baseUrl: string) {}

	async get<T extends object>(path: `/${string}`, params = {}): Promise<T> {
		const queryString = new URLSearchParams(params).toString()
		const url = `${this.baseUrl}${path}?${queryString}`

		try {
			const response = await fetch(url)
			return (await response.json()) as T
		} catch (error: unknown) {
			throw new Error(`Error fetching data: ${error}`)
		}
	}
}
