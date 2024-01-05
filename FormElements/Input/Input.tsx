import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import { InputLabel, OutlinedInput } from "@mui/material";
import { InputProps } from "utils/types";
import { InputWrapper } from "components/Wrappers";
import InputAdornment from "./InputAdornment/InputAdornment";

export const Input = ({
	value,
	helperText,
	onChange,
	onKeyDown,
	field,
	id,
	type,
	label,
	required,
	placeholder,
	invalid,
	endAdornment,
	startAdornment,
	mask,
	readOnly,
	minLength,
	maxLength,
	disabled,
	maskProps = {},
	autoComplete,
	textarea,
}: InputProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const [isInvalid, setIsInvalid] = useState(invalid ? invalid : false);
	const [errorMessage, setErrorMessage] = useState(
		helperText ? helperText : "",
	);
	const idForHelperText = `helper-text-${field}`;
	const idForInput = `${field}-${id}`;
	const inputType =
		type === "password" ? (showPassword ? "text" : "password") : type;
	const adornment = endAdornment ? (
		endAdornment
	) : type === "password" ? (
		<InputAdornment show={showPassword} onChange={setShowPassword} />
	) : null;

	useEffect(() => {
		if (invalid !== isInvalid && invalid !== undefined) {
			setIsInvalid(invalid);
		}
	}, [invalid]);

	useEffect(() => {
		if (helperText && helperText !== errorMessage) {
			setErrorMessage(helperText);
		}
	}, [helperText]);

	useEffect(() => {
		checkValidityOfLength(`${value}`);
	}, [value]);

	const checkValidityOfLength = (value: string) => {
		const valueLength = value.length;
		if (valueLength > 0 && (minLength || maxLength)) {
			let message = "Вводимое значение не должно быть";

			if (minLength) {
				message = `${message} меньше ${minLength}`;
			}
			if (maxLength) {
				message = `${message} больше ${maxLength}`;
			}

			setErrorMessage(message);

			if (
				(maxLength && valueLength > maxLength) ||
				(minLength && valueLength < minLength)
			) {
				if (valueLength > 0) setIsInvalid(true);
			} else {
				setIsInvalid(false);
			}
		}
	};

	const changeValue = (event: {
		target: { name: string; value: string; id: string | number };
	}) => {
		const { name, value, id } = event.target;
		onChange({ field: name, value, id });
	};

	const commonInputProps = {
		id: idForInput,
		"aria-describedby": idForHelperText,
		name: field,
		fullWidth: true,
		required,
		placeholder,
		value,
		readOnly,
		inputProps: {
			readOnly,
			minLength,
			maxLength,
		},
		onChange: changeValue,
		onKeyDown,
		autoComplete,
		...textarea,
	};

	return (
		<InputWrapper
			id={idForHelperText}
			type={type}
			disabled={disabled}
			invalid={isInvalid}
			helperText={errorMessage}>
			{label ? (
				<InputLabel id={idForInput} required={required}>
					{label}
				</InputLabel>
			) : null}
			{mask ? (
				// @ts-ignore
				<InputMask
					mask={mask}
					value={value}
					onChange={changeValue}
					maskChar={null}
					{...maskProps}>
					{(inputProps: any) => (
						<OutlinedInput {...inputProps} {...commonInputProps} />
					)}
				</InputMask>
			) : (
				<OutlinedInput
					type={inputType ? inputType : "text"}
					endAdornment={adornment}
					startAdornment={startAdornment}
					{...commonInputProps}
				/>
			)}
		</InputWrapper>
	);
};
