export function toCamelCase(string) {
	if (!string.includes('-')) return string;
	return string.split('-').map((ele, index) => {
		if (index === 0) return ele;
		return ele[0].toUpperCase() + ele.slice(1);
	}).join('');
}