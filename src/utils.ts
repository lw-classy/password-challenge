export const lowercase = 'abcdefghijklmnopqrstuvwxyz';
export const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const specialChars = '!@#$%^&*()-_=+[]{}|;:,.<>?';

/**
 * Generate a password with given charset
 *
 * @param length Given length of the desired password
 * @param charset Given charset of the given password
 */
export const generatePassword: (length: number, charset?: string) => string = (length, charset = lowercase + uppercase + specialChars) => {
	let password = '';
	for (let i = 0; i < length; i++) {
		password += charset[Math.floor(Math.random() * charset.length)];
	}
	return password;
};

export const selectCharset = (checkboxes: {uppercase: boolean; lowercase: boolean; special: boolean}) => {
	let charSet = '';
	if (checkboxes.uppercase) charSet += uppercase;
	if (checkboxes.lowercase) charSet += lowercase;
	if (checkboxes.special) charSet += specialChars;
	return charSet;
};
