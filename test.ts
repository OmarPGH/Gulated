import { input } from './lib/index.ts';

input
	.add('_sf, --save-file', 'bool')
	.add('-d,--depth', 'num')

console.log(input);
console.log(input.get())