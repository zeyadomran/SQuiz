import validator from "validator";
import { FieldError } from "../types/FieldError";
import { RegisterUserType } from "../types/UserTypes";

export const registerValidation = (data: RegisterUserType) => {
	let errors: FieldError[] = [];
	const validEmail = validateEmail(data.email);
	const validUsername = validateUsername(data.username);
	const validPassword = validatePassword(data.password);
	if (validEmail) errors.push(validEmail);
	if (validUsername) errors.push(validUsername);
	if (validPassword) errors = errors.concat(validPassword);
	return errors.length > 0 ? errors : null;
};

export const validateEmail = (email: string) => {
	if (!validator.isEmail(email)) {
		return {
			field: "email",
			message: "Email needs to be in the form example@squiz.com",
		};
	}
	return null;
};
export const validateUsername = (username: string) => {
	if (username.length < 3 && username.length > 18) {
		return {
			field: "username",
			message: "Username needs to between 3 & 18 characters long.",
		};
	}
	return null;
};

export const validatePassword = (password: string) => {
	let errors: FieldError[] = [];

	if (!validator.isLength(password, { min: 8 })) {
		errors.push({
			field: "password",
			message: "Password needs to be at least 8 characters long.",
		});
	}

	if (!/[A-Z]/.test(password)) {
		errors.push({
			field: "password",
			message: "Password needs to have at least 1 uppercase character.",
		});
	}

	if (!/[a-z]/.test(password)) {
		errors.push({
			field: "password",
			message: "Password needs to have at least 1 lowercase character.",
		});
	}

	if (!/\d/.test(password)) {
		errors.push({
			field: "password",
			message: "Password needs to have at least 1 number.",
		});
	}

	if (!/\W/.test(password)) {
		errors.push({
			field: "password",
			message: "Password needs to have at least 1 special character.",
		});
	}

	return errors.length > 0 ? errors : null;
};
