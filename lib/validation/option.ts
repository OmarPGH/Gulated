import { typeofFlag } from '../utils/index.ts';
import { flagsType } from '../constants.ts';

export function validateOption(option) {
	const first = option[0];
	const secound = option[1];
	console.log(typeofFlag(first));
	console.log(typeofFlag(secound));
	if (typeofFlag(first) !== flagsType.shortFlag && typeofFlag(first) !== flagsType.alias || typeofFlag(secound) !== flagsType.longFlag) throw new Error("Invalid option");
}