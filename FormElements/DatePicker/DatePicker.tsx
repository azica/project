import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import locale from "dayjs/locale/ru";
import { DesktopDatePicker, DesktopDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { InputProps } from "utils/types";
import { CalendarIcon } from "assets/icons";
import { TextField } from "./styles";
import { TextFieldProps } from "@mui/material";

interface DatePickerProps extends InputProps {
	hasTime?: boolean;
}

export const DatePicker = ({
	id,
	helperText,
	onChange,
	field,
	label,
	required,
	placeholder,
	invalid,
	dateProps,
	hasTime,
	value,
}: DatePickerProps) => {
	const [date, setDate] = useState<Dayjs | null>(dayjs(`${value}`));
	const [isInvalid, setIsInvalid] = useState(invalid ? invalid : false);
	const idForHelperText = `helper-text-${field}`;
	const idForInput = `${field}-${id}`;
	const inputFormat = `DD.MM.YYYY${hasTime ? ' hh:mm a' : ''}`;
	const commonProps = {
		dayOfWeekFormatter: (day: string) => `${day}`,
		className: 'common-input',
		...dateProps,
		components: {
			OpenPickerIcon: CalendarIcon,
		},
		PopperProps: {
			placement: "bottom-end",
			className: "date-picker",
		},
		inputFormat,
		renderInput: ({ inputProps, ...params }: TextFieldProps) => {
			const newInput = {
				...inputProps,
				placeholder,
				id: idForInput,
				"aria-describedby": idForHelperText,
			};
			const newParams = {
				...params,
				inputProps: newInput,
				helperText,
				error: isInvalid,
				label,
				required,
			};
			return <TextField variant='outlined' {...newParams} />;
		}
	}

	useEffect(() => {
		if (invalid !== isInvalid && invalid !== undefined) {
			setIsInvalid(invalid);
		}
	}, [invalid]);

	const handleChange = (newValue: Dayjs | null) => {
		setDate(newValue);

		const dateIsValid = newValue?.isValid();
		if (dateIsValid && newValue) {
			const date = new Date(newValue.toDate().getTime() - newValue.toDate().getTimezoneOffset() * 60000);
			setIsInvalid(false);
			onChange({ field, value: `${date.toISOString()}`, id: idForInput });
		} else {
			setIsInvalid(true);
		}
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
			{ hasTime ? ( // @ts-ignore
					<DesktopDateTimePicker 
						value={date}
						onChange={handleChange} 
						ampm={false}
						{...commonProps}
					/> 
				) : ( // @ts-ignore
					<DesktopDatePicker
						mask='__.__.____'
						value={date}
						onChange={handleChange}
						{...commonProps}
					/>
				)
			}
		</LocalizationProvider>
	);
};
