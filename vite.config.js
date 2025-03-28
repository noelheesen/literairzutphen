import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
// import micromatch from 'micromatch';
// import fs from 'fs'
// import path from 'path';
// import { parse, walk } from 'html5parser';

export default defineConfig({
	logLevel: 'info',
	plugins: [
		sveltekit(),
		// {
		// 	name: 'writer-data',
		// 	moduleParsed(info) {
		// 		const paths = [
		// 			'routes/+page.svelte',
		// 			'routes/colofon/+page.svelte',
		// 			'routes/citaten-gedichten-en-teksten/+page.svelte',
		// 			'routes/tijdvak/**/+page.svelte',
		// 		]

		// 		const ismatch = micromatch.contains(info.id, paths)
		// 		const parts = info.id.split('/').reverse()
		// 		let filename = `${parts[1]}.json`

		// 		const writers = []

		// 		if (ismatch) {
		// 			fs.writeFileSync(`${__dirname}/rollupdebug/${filename}`, JSON.stringify(info.code))

		// 			// const start = info.code?.indexOf('var root = $.template(')
		// 			// const html = info.code?.substring()

		// 			const node = info.ast?.body.find((node) => {
		// 				return node.type === 'VariableDeclaration'
		// 					&& node.declarations[0].id.name === 'root'
		// 			})

		// 			if (node) {
		// 				// let html = node.declarations[0].init.arguments[0].quasis[0].value.cooked

		// 				// if (html) {
		// 				// 	const ast = parse(html)
							
		// 				// 	walk(ast, {
		// 				// 		enter(n) {
		// 				// 			if (n.name === 'writer') {
										
		// 				// 			}
		// 				// 		}
		// 				// 	})
		// 				// }
		// 				// fs.writeFileSync(`${__dirname}/rollupdebug/${filename}`, JSON.stringify(html))
		// 				// this.info({
		// 					// 	message: JSON.stringify(html)
		// 				// })
		// 			}


		// 		}

		// 	},
		// 	onLog(level, log) {
		// 		this.warn(log)
		// 	}
		// },
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
});
