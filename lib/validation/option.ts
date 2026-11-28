import { findOption, getOptionName } from '../utils/index.ts';
import { dataTypes as DTs, shortFlagPattern, longFlagPattern } from '../constants.ts';

export function validateOption({ flags, longFlags, shortFlags }, options) {
	flags.forEach((flag, index) => {
		if (!shortFlagPattern.test(flag) && !longFlagPattern.test(flag)) {
			throw new Error(`Invalid flag: '${flag}' (use a short flag like -d, or a long flag like --save-file)`);
		}
		if (flags.indexOf(flag) !== index) throw new Error(`The flag '${flag}' is written more than once`);
		if (findOption(flag, options)) throw new Error(`The flag '${flag}' is already registered`);
	});
	const name = getOptionName(longFlags, shortFlags);
	if (Object.hasOwn(options, name)) throw new Error(`The option name '${name}' is already registered`);
}

export function validateDataType(dataType, defaultVal) {
	const allowed = Object.values(DTs);
	if (!allowed.includes(dataType)) throw new Error(`Invalid data type: '${dataType}'. Use one of: ${allowed.join(', ')}`);
	if (defaultVal !== undefined && typeof defaultVal !== dataType) throw new Error(`The default value must be a ${dataType}, but it is a ${typeof defaultVal}`);
}