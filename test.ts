import { input } from './lib/index.ts';

input
	.add('--sf, --save-file', 'bool')
	.add('-d,--depth', 'num')

console.log(input);