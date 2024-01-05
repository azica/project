import { useState, useEffect, useRef } from "react";
import {
	Select as SelectMUI,
	FormControl,
	OutlinedInput,
	FormHelperText,
	InputLabel,
	Chip,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { InputProps } from "utils/types";
import { ArrowIcon } from "assets/icons";
import { Placeholder, MenuItem, Text, ChipList, ChipItem } from "./styles";

interface SelectProps extends InputProps {
	filter?: boolean;
	replaceName?: boolean;
}

export const Select = ({
	options,
	id,
	field,
	placeholder,
	label,
	value,
	required,
	invalid,
	helperText,
	onChange,
	filter,
	startAdornment,
	replaceName,
	multiple,
}: SelectProps) => {
	// @ts-ignore
	const [selected, setSelected] = useState<string | string[]>(value);
	const selectWrapper = useRef(null);
	const [wrapperWidth, setWrapperWidth] = useState(0);
	const idForInput = `${field}-${id}`;
	const idForLabel = idForInput + "-label";

	useEffect(() => {
		// @ts-ignore
		setWrapperWidth(selectWrapper.current.offsetWidth);
	}, []);

	const handleChange = (event: SelectChangeEvent<typeof selected>) => {
		const target = event.target;
		const { value } = target;

		if (replaceName && !multiple) {
			// @ts-ignore
			const data = JSON.parse(value);
			setSelected(data.name);
		} else {
			setSelected(value);
		}
		onChange({ value, field, id: idForInput });
	};

	return (
		<FormControl
			className={filter ? "filter common-input" : "common-input"}
			required={required}
			error={invalid}
			ref={selectWrapper}>
			{label ? (
				<InputLabel id={idForLabel} required={required}>
					{label}
				</InputLabel>
			) : null}

			<SelectMUI
				id={idForInput}
				value={selected}
				onChange={handleChange}
				label={label}
				labelId={idForLabel}
				input={
					<OutlinedInput
						style={{ width: wrapperWidth }}
						name={field}
						startAdornment={startAdornment}
					/>
				}
				IconComponent={ArrowIcon}
				MenuProps={{
					style: { width: wrapperWidth, maxHeight: 500 },
					PaperProps: {
						className: "select",
					},
				}}
				multiple={multiple}
				displayEmpty
				renderValue={(selected) => {
					if (selected.length === 0 || selected === "") {
						return <Placeholder>{placeholder}</Placeholder>;
					}
					if (multiple) {
						return (
							<ChipList>
								{/* @ts-ignore */}
								{selected.map((value) => {
									console.log(value);
									const data = replaceName ? JSON.parse(value) : null;
									return (
										<ChipItem key={value}>
											<Chip label={data ? data.name : value} />
										</ChipItem>
									);
								})}
							</ChipList>
						);
					} else {
						return selected;
					}
				}}>
				{options &&
					options.map(({ name, value }) => (
						<MenuItem
							key={value}
							value={replaceName ? JSON.stringify({ name, value }) : value}
							autoFocus={false}>
							<Text title={name}>{name}</Text>
						</MenuItem>
					))}
			</SelectMUI>
			<FormHelperText title={helperText}>{helperText}</FormHelperText>
		</FormControl>
	);
};
