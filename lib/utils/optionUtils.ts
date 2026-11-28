import { toCamelCase } from './caseConverter.ts';

export function getOptionName(longFlags: string[], shortFlags: string[]) {
	return toCamelCase(longFlags[0] ?? shortFlags[0]);
}

export function findOption(flag: string, options) {
	return Object.keys(options).find((name) => {
		const { longFlags, shortFlags } = options[name];
		return longFlags.includes(flag) || shortFlags.includes(flag);
	});
}
