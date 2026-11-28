export const flagsTypes = {
	shortFlag: 'SHORTFLAG',
	longFlag: 'LONGFLAG',
};

export const dataTypes = {
	boolean: 'boolean',
	number: 'number',
	string: 'string',
};

export const flagSeparator = ',';

export const shortFlagPattern = /^-[A-Za-z]$/;
export const combinedShortFlagPattern = /^-[A-Za-z]{2,}$/;
export const longFlagPattern = /^--[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/;