import { typeOf, typeofFlag, parseFlags, getOptionName, findOption, splitCombinedFlags } from './utils/index.ts';
import { validateOption, validateDataType } from './validation/index.ts';
import { flagsTypes as FTs, dataTypes as DTs } from './constants.ts';

export const input = {
	options: {},
	add(option: string, dataType: string, defaultVal) {
		if (typeof option !== 'string') throw new Error("Your option isn't a string");
		const parsed = parseFlags(option);
		validateOption(parsed, this.options);
		validateDataType(dataType, defaultVal);
		const { longFlags, shortFlags } = parsed;
		this.options[getOptionName(longFlags, shortFlags)] = {
			longFlags,
			shortFlags,
			dataType,
			defaultVal,
		};
		return this;
	},
	get(argv = process.argv.slice(2)) {
		const options = this.options;
		const args = {};
		const separatedArgs = splitCombinedFlags(argv);

		const resolveName = (token) => {
			const name = findOption(token, options);
			if (name) return name;
			const type = typeofFlag(token);
			if (type === FTs.longFlag) throw new Error(`Invalid long flag: '${token}'`);
			if (type === FTs.shortFlag) throw new Error(`Invalid short flag: '${token}'`);
			throw new Error(`Unknown option: '${token}'`);
		};

		const isValue = (token, option) => token !== undefined && (
			!typeofFlag(token) ||
			(option.dataType === DTs.number && typeOf(token, DTs.number).result === DTs.number)
		);

		const applyDefaults = () => {
			for (const key in options) {
				if (!Object.hasOwn(args, key) && options[key].defaultVal !== undefined) args[key] = options[key].defaultVal;
			}
		};

		let i = 0;
		while (i < separatedArgs.length) {
			const currentArg = separatedArgs[i];
			const nextArg = separatedArgs[i + 1];
			const name = resolveName(currentArg);
			const option = options[name];

			if (Object.hasOwn(args, name)) throw new Error(`'${name}' was inputted more than once`);

			if (option.dataType === DTs.boolean) {
				args[name] = true;
				i++;
				continue;
			}

			if (!isValue(nextArg, option)) {
				if (option.defaultVal === undefined) throw new Error(`No data has been inputted to ${name}`);
				args[name] = option.defaultVal;
				i++;
				continue;
			}

			const typeOfNextArg = typeOf(nextArg, option.dataType);
			if (typeOfNextArg.result !== option.dataType) {
				throw new Error(`The data type that inputted to '${name}' is wrong\nExpected: ${option.dataType}\nFound: ${typeOfNextArg.result}`);
			}
			args[name] = typeOfNextArg.parsed;
			i += 2;
		}

		applyDefaults();
		return args;
	},
};
