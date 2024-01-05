import { useState, useEffect, ChangeEvent } from "react";
import { InputOnChange, CheckboxListTypes } from "utils/types";
import { Member } from "components/Member";
import {
	RadioGroupMui,
	Radio,
	FormControl,
	RadioContainer,
	RadioMark,
	FormControlLabel,
} from "./styles";

interface RadioGroupProps {
	list: CheckboxListTypes;
	labelElement?: string;
	defaultValue?: string | number;
	field: string;
	id: string | number;
	onChange: InputOnChange;
}

export const RadioGroup = ({
	list,
	field,
	id,
	onChange,
	labelElement,
	defaultValue,
}: RadioGroupProps) => {
	const [value, setValue] = useState<string | number>(
		defaultValue ? defaultValue : 1,
	);
	const idForInput = `${field}-${id}`;

	useEffect(() => {
		if (defaultValue) setValue(defaultValue);
	}, [defaultValue]);

	const changeValue = (event: ChangeEvent<HTMLInputElement>) => {
		const target = event.target;
		setValue(target.value);
		onChange({ value: target.value, field, id: idForInput });
	};

	return (
		<FormControl>
			<RadioGroupMui
				value={value}
				onChange={changeValue}
				className={
					labelElement ? "custom-select-container" : "select-container"
				}>
				{/* @ts-ignore */}
				{list.map(({ id, value, name, ...other }) => {
					return (
						<FormControlLabel
							key={`${id}`}
							id={idForInput}
							value={value ? value : id}
							control={
								<Radio
									icon={<RadioContainer />}
									checkedIcon={
										<RadioContainer>
											<RadioMark />
										</RadioContainer>
									}
								/>
							}
							label={
								// @ts-ignore
								labelElement === "member" ? <Member id={id} {...other} /> : name
							}
						/>
					);
				})}
			</RadioGroupMui>
		</FormControl>
	);
};
