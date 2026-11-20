export function toCamelCase(string) {
	return string.replace(/^-+|-+$/g, "").split('-').map((ele, index) => {
		if (index === 0) return ele;
		return ele[0].toUpperCase() + ele.slice(1);
	}).join('');
}