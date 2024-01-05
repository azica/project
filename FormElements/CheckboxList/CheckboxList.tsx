import { useState, useEffect } from "react";
import { filterCheckedValues } from "utils/helpers";
import { CheckboxOnChange, CheckboxListTypes } from "utils/types";
import { Checkbox } from "components/FormElements/Checkbox";
import { Member } from "components/Member";
import { ApplicationItemInfo } from "components/ApplicationsList/ApplicationItemInfo";
import { FormGroup, FormControl, Application } from "./styles";

interface CheckboxListProps {
	minCount?: number;
	maxCount?: number;
	list: CheckboxListTypes;
	labelElement?: "member" | "application";
	onChange: (value: { id: number }[]) => void;
}

export const CheckboxList = ({
	list,
	labelElement,
	maxCount,
	onChange,
}: CheckboxListProps) => {
	const [listProps, setListProps] = useState<CheckboxListTypes>(list);
	const [values, setValues] = useState(filterCheckedValues(listProps));
	const [isExcess, setIsExcess] = useState(
		maxCount ? values.length > maxCount - 1 : false,
	);

	useEffect(() => {
		let newList: any = [];
		list.map((item) =>
			newList.push(
				values.find((value) => value.id === item.id)
					? { ...item, checked: true }
					: item,
			),
		);
		setListProps(newList);
	}, [list]);

	const valueChange: CheckboxOnChange = (newVal: {
		field: string;
		value: boolean;
	}) => {
		const newListProps = listProps.map((item) =>
			newVal.field === `${item.id}` ? { ...item, checked: newVal.value } : item,
		);
		const newValues = filterCheckedValues(newListProps);

		if (maxCount) setIsExcess(newValues.length > maxCount - 1);

		setValues(newValues);
		setListProps(newListProps);
		onChange(newValues);
	};

	return (
		<FormControl
			// @ts-ignore
			component='fieldset'
			variant='outlined'>
			<FormGroup className={labelElement ? "custom-select-container" : ""}>
				{listProps.map(
					//@ts-ignore
					({ id, checked, label, createdAt, fullName, disabled, ...other }) => (
						<Checkbox
							key={id}
							id={id}
							onChange={valueChange}
							checked={checked ? checked : false}
							className={checked ? "checked" : ""}
							disabled={
								disabled
									? disabled
									: isExcess
									? checked
										? false
										: true
									: false
							}
							field={`${id}`}
							label={
								labelElement ? (
									labelElement === "member" ? ( // @ts-ignore
										<Member id={id} fullName={fullName} {...other} />
									) : (
										<Application>
											{/*@ts-ignore*/}
											<ApplicationItemInfo
												id={id}
												date={createdAt}
												creator={fullName}
												size='small'
												{...other}
											/>
										</Application>
									)
								) : (
									label
								)
							}
						/>
					),
				)}
			</FormGroup>
		</FormControl>
	);
};
