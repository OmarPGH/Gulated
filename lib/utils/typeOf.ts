import { dataTypes as DTs } from '../constants.ts';

export function typeOf(string, expected) {
	if (typeof string !== 'string') return { result: undefined };
	if (expected === DTs.string) return { result: DTs.string, parsed: string };
	string = string.trim();
	if (string !== "" && !Number.isNaN(Number(string))) return { result: DTs.number, parsed: Number(string) };
	return { result: DTs.string, parsed: string };
}