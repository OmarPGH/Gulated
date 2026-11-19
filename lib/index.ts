import { isFlag, toCamelCase } from './utils/index.ts';
import { validateOption } from './validation/index.ts';

// export function input() {
// 	const plainInput = process.argv.slice(2);
// 	let args = {};
// 	{
// 		let i = 0;
// 		while (i < plainInput.length) {
// 			const ele = plainInput[i];
// 			const nextEle = plainInput[i + 1];
// 			const flag = isFlag(ele);
// 			if (flag) {
// 				args[ele.slice(ele.lastIndexOf('-') + 1)] = {
// 					value: nextEle,
// 					type: flag,
// 				};
// 				i++
// 			}
// 			i++
// 		}
// 	}
// 	return args;
// }

export let input = {
	options: {},
	add(option, type) {
		if (typeof option !== 'string') throw new Error("Your option isn't a string");
		option = option.replaceAll(" ", "").split(',');
		validateOption(option);
		let options = this.options;
		options[toCamelCase(option[1].slice(2))] = {
			type: type,
		};
		return this;
	},
}