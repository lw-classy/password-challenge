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
