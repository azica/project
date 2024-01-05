import { useState, useEffect } from "react";
import { InputOnChange } from "utils/types";
import { LoupeIcon } from "assets/icons";
import { Input } from "components/FormElements";
import { Wrapper } from "./styles";

interface SearchProps {
	onChange: (value: string) => void;
}

export const Search = ({ onChange }: SearchProps) => {
	const [value, setValue] = useState("");

	useEffect(() => {
		onChange(value);
	}, [value]);

	const changeValue: InputOnChange = ({ value }) => {
		setValue(`${value}`);
	};

	return (
		<Wrapper>
			<Input
				id={1}
				type='text'
				field='search'
				placeholder='Введите номер или название заявки'
				value={value}
				onChange={changeValue}
				startAdornment={<LoupeIcon className='adornedStart' />}
			/>
		</Wrapper>
	);
};
