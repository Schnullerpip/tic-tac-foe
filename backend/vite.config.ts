import { defineConfig } from 'vite'

// TODO 9
// 9.1 configure a correct outDir (where does vercel expect the serverless functions to be?)
// 9.2 tip: use 'ssr: true' in order for vite to generate a node compatible build
// 9.3 configure the rollupOptions['input']
// 9.3.1 input defines the entry-points to the bundle(s) created by vite
// 9.3.2 we want to have a chooseNextMove and a concludeGame entry point
// 9.3.3 (optional) figure out what preserveModules true/false does and decide if you want it or not
// 9.4 try out the build and see if the chooseNextMove and concludeGame functions are available

export default defineConfig({
	root: './',
	build: {
		emptyOutDir: true, // explicit, because the out dir is not in this project's root
		rollupOptions: {
			input: {},
			output: {
				format: 'esm',
				entryFileNames: '[name].mjs',
				preserveModules: true,
			},
		},
	},
})
