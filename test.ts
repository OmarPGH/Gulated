import { input } from './lib/index.ts';

input
	.add('-s, -f, --save-file, --save', 'boolean')
	.add('-l, --lock', 'boolean')
	.add('-d,--depth', 'number', 5)
	.add('-p, --path', 'string')

console.log(input);
console.log(input.get())