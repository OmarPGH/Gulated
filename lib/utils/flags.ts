import { constants } from '../constants.ts';

export function typeofFlag(flag) {
	if (flag.startsWith('--')) {
		return constants.longFlag;
	} else if (flag.startsWith('-')) {
		return constants.shortFlag;
	}
}

export function isFlag(string) {
	const flagType = typeofFlag(string);
	if (flagType) {
		return flagType;
	}
	return false;
}