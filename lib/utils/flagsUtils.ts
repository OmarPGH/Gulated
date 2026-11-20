import { flagsType } from '../constants.ts';

export function typeofFlag(flag) {
	if (flag.startsWith('--')) {
		return flagsType.longFlag;
	} else if (flag.startsWith('-')) {
		return flagsType.shortFlag;
	} else if (flag.startsWith('_')) {
		return flagsType.alias;
	}
}

export function isFlag(string) {
	const flagType = typeofFlag(string);
	if (flagType) {
		return flagType;
	}
	return false;
}