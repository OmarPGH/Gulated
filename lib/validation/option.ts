export function validateOption(option) {
	const first = option[0];
	const secound = option[1];
	if (!(first.startsWith('-') || first.startsWith('--'))) throw new Error("Invalid Option");
	if (!secound.startsWith('--')) throw new Error("Invalid Option");
}