import { useState, useEffect, ChangeEvent } from "react";
import { InputLabel } from "@mui/material";
import ReactDadataBox, {
	PartyResponseType,
	AddressResponseType,
} from "utils/dadata";
import { dadataToken } from "utils/constants";
import { InputProps } from "utils/types";
import { InputWrapper } from "components/Wrappers";

export const DadataField = ({
	value,
	onChange,
	field,
	id,
	readOnly,
	maskProps = {},
	suggest,
	invalid,
	disabled,
	helperText,
	...other
}: InputProps) => {
	const [isInvalid, setIsInvalid] = useState(invalid ? invalid : false);
	const [errorMessage, setErrorMessage] = useState(
		helperText ? helperText : "",
	);
	const idForHelperText = `helper-text-${field}`;
	const idForInput = `${field}-${id}`;

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

	const getAddress = (address: any) => {
		const {
			settlement_with_type,
			area_with_type,
			city_with_type,
			street_with_type,
			house,
			region_with_type,
			flat,
			postal_code,
		} = address;

		const postcode = house ? (postal_code ? postal_code : "") : "";

		let customAddress = {
			street: street_with_type ? street_with_type : "",
			house: house ? house : "",
			office: flat ? flat : "",
			postcode,
			region: "",
			city: settlement_with_type ? settlement_with_type : city_with_type,
		};

		customAddress.region = region_with_type
			? `${region_with_type}${
					area_with_type
						? `, ${area_with_type}`
						: city_with_type && customAddress.city !== city_with_type
						? `, ${city_with_type}`
						: ""
			  }`
			: "";

		return customAddress;
	};

	const changeValue = (suggestion: PartyResponseType | AddressResponseType) => {
		const { data } = suggestion;
		const { address, inn, name, ogrn, type } = data;
		let dadataValues: { [name: string]: any } = {};
		let value;

		if (suggest === "party") {
			dadataValues = {
				inn,
				ogrn,
				organizationForm: type === "INDIVIDUAL" ? 2 : 1,
			};
			value = inn ? inn : "";

			if (name) {
				const { full, full_with_opf, short_with_opf } = name;

				dadataValues = {
					...dadataValues,
					entrepreneursName: full,
					fullName: full_with_opf,
					shortName: short_with_opf,
				};
			}

			if (address?.data) {
				dadataValues = {
					...dadataValues,
					...getAddress(address.data),
				};
			}
		} else {
			const dadataAddress = getAddress(data);
			const { region, street, house, office, postcode, city } = dadataAddress;
			
			dadataValues = {
				postcode: postcode,
				region: region ? region : "",
				street: street,
				house: house,
				office: office,
				city: city ? city : "",
			};

			value = dadataValues.region;
		}

		onChange({
			field,
			value,
			id: idForInput,
			suggestion: dadataValues,
		});
	};

	const props = {
		...other,
		token: dadataToken,
		type: suggest,
		onChange: changeValue,
		field,
		id: idForInput,
		query: value,
		invalid,
		disabled,
	};

	return (
		<InputWrapper
			id={idForHelperText}
			disabled={disabled}
			invalid={isInvalid}
			helperText={errorMessage}>
			{suggest === "party" ? (
				// @ts-ignore
				<ReactDadataBox<"party"> {...props} />
			) : (
				// @ts-ignore
				<ReactDadataBox<"address"> {...props} />
			)}
		</InputWrapper>
	);
};
