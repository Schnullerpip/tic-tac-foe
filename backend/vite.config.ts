import { defineConfig } from 'vite'
import path from 'node:path'

export default defineConfig({
	root: './',
	build: {
		outDir: '../api',
		emptyOutDir: true, // explicit, because the out dir is not in this project's root
		ssr: true,
		rollupOptions: {
			input: {
				test: path.resolve(__dirname, 'test.ts'),
			},
			output: {
				format: 'esm',
				entryFileNames: '[name].mjs',
				preserveModules: true,
			},
		},
	},
})
