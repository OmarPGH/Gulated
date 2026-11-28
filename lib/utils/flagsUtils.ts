import { flagsTypes as FTs, flagSeparator, combinedShortFlagPattern } from '../constants.ts';
import { toCamelCase } from './caseConverter.ts';

export function typeofFlag(flag) {
	if (typeof flag !== 'string') return;
	if (flag.startsWith('--')) {
		return FTs.longFlag;
	} else if (flag.startsWith('-')) {
		return FTs.shortFlag;
	}
}

export function splitCombinedFlags(argv: string[]) {
	const separatedArgs: string[] = [];
	for (const argument of argv) {
		if (!combinedShortFlagPattern.test(argument)) {
			separatedArgs.push(argument);
			continue;
		}
		const letters = argument.slice(1);
		for (const letter of letters) separatedArgs.push(`-${letter}`);
	}
	return separatedArgs;
}

export function parseFlags(option: string) {
	const flags = option.split(flagSeparator).map((flag) => flag.trim());
	return {
		flags,
		longFlags: flags.filter((flag) => typeofFlag(flag) === FTs.longFlag),
		shortFlags: flags.filter((flag) => typeofFlag(flag) === FTs.shortFlag),
	};
}
