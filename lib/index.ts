import { isFlag, toCamelCase } from './utils/index.ts';
import { validateOption } from './validation/index.ts';
import { flagsType } from './constants.ts';

export let input = {
	options: {},
	add(option, dataType) {
		if (typeof option !== 'string') throw new Error("Your option isn't a string");
		option = option.replaceAll(" ", "").split(',');
		validateOption(option);
		let options = this.options;
		options[toCamelCase(option[1])] = {
			dataType: dataType,
			alias: option[0],
			shortFlag: isFlag(option[0]) === flagsType.shortFlag ? option[0] : undefined,
		};
		return this;
	},
	get() {
		const plainInput = process.argv.slice(2);
		let args = {};
		{
			let i = 0;
			while (i < plainInput.length) {
				let ele = plainInput[i];
				const nextEle = plainInput[i + 1];
				const flag = () => isFlag(ele);
				const options = this.options;
				if (flag() === flagsType.longFlag && !Object.keys(options).includes(toCamelCase(ele))) {
					throw new Error(`Invalid long flag: '${ele}'`);
				} else if (flag() === flagsType.shortFlag || flag() === flagsType.alias) {
					for (const key in options) {
						const val = options[key];
						console.log(val);
						if (val.shortFlag === ele || val.alias === ele) {
							ele = toCamelCase(key);
						}
					}
					if (!Object.keys(options).includes(toCamelCase(ele))) throw new Error(`Invalid alias or short flag: '${ele}'.`);
					i++
				}
				args[ele.slice(ele.lastIndexOf('-') + 1)] = {
					value: nextEle,
				};
				i++
			}
		}
		return args;
	},
}