import { InputProps } from "utils/types";
import {
	Input,
	DatePicker,
	Select,
	Checkbox,
	RadioGroup,
	DadataField,
} from "components/FormElements";
import { Wrapper } from "./styles";

interface InputsSpreaderProps extends InputProps {
	className?: string;
}

export const InputsSpreader = ({
	type,
	value,
	options,
	onChange,
	className,
	...other
}: InputsSpreaderProps) => {
	let componet;

	switch (type) {
		case "date":
			componet = (
				<DatePicker {...other} type={type} value={value} onChange={onChange} />
			);
			break;
		case "select":
			componet = (
				<Select
					{...other}
					options={options}
					value={value}
					onChange={onChange}
				/>
			);
			break;
		case "checkbox":
			componet = (
				<Checkbox
					{...other}
					// @ts-ignore
					checked={Boolean(value) ? value : false}
					onChange={onChange}
				/>
			);
			break;
		case "radio":
			componet = (
				<RadioGroup
					{...other}
					// @ts-ignore
					list={options}
					// @ts-ignore
					defaultValue={value}
					onChange={onChange}
				/>
			);
			break;
		case "dadata":
			componet = (
				<DadataField {...other} type={type} value={value} onChange={onChange} />
			);
			break;
		default:
			componet = (
				<Input {...other} type={type} value={value} onChange={onChange} />
			);
			break;
	}

	return <Wrapper className={className}>{componet}</Wrapper>;
};
