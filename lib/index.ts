import { isFlag } from './utils/index.ts';

export function input() {
	const plainInput = process.argv.slice(2);
	let args = {};
	{
		let i = 0;
		while (i < plainInput.length) {
			const ele = plainInput[i];
			const nextEle = plainInput[i + 1];
			const flag = isFlag(ele);
			if (flag) {
				args[ele.slice(ele.lastIndexOf('-') + 1)] = {
					value: nextEle,
					type: flag,
				};
				i++
			}
			i++
		}
	}
	return args;
}