import { useState, useEffect, ChangeEvent } from "react";
import { CheckboxOnChange } from "utils/types";
import { InputWrapper } from "components/Wrappers";
import {
	CheckMark,
	CheckContainer,
	CheckboxMui,
	FormControlLabel,
} from "./styles";

interface CheckboxProps {
	id: number | string;
	checked: boolean;
	onChange: CheckboxOnChange;
	field: string;
	label?: any;
	helperText?: string;
	invalid?: boolean;
	disabled?: boolean;
	className?: string;
}

export const Checkbox = ({
	id,
	checked,
	onChange,
	field,
	label,
	helperText,
	invalid,
	disabled,
	className,
}: CheckboxProps) => {
	const idForHelperText = `helper-text-${field}`;
	const idForInput = `${field}-${id}`;

	const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = event.target;
		onChange({ field: name, value: checked, id: idForInput });
	};

	return (
		<InputWrapper
			id={idForHelperText}
			type='checkbox'
			invalid={invalid}
			helperText={helperText}>
			<FormControlLabel
				control={
					<CheckboxMui
						id={idForInput}
						checked={checked}
						name={field}
						onChange={changeValue}
						icon={<CheckContainer />}
						checkedIcon={
							<CheckContainer>
								<CheckMark />
							</CheckContainer>
						}
					/>
				}
				label={label}
				disabled={disabled}
				className={className}
			/>
		</InputWrapper>
	);
};
