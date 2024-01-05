import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { setAuthData } from "utils/store";
import { baseApiUrl } from "utils/constants";
import { useRequest } from "utils/hooks";
import { InputDataProps, InputOnChange } from "utils/types";
import { getValueFromArray, addedErrorOnField } from "utils/helpers";
import { Form } from "components/Form";
import { Input, Checkbox, ConsentLabel } from "components/FormElements";
import { FormWrapper } from "components/Wrappers";
import { AuthButtons } from "components/Auth/AuthButtons";
import { FormContent } from "../styles";
import { CustomInputsContainer } from "./styles";

const inputsData = [
	{
		id: 1,
		value: "",
		field: "fullName",
		placeholder: "ФИО",
		required: true,
	},
	{
		id: 2,
		value: "",
		field: "phone",
		placeholder: "Телефон",
		mask: "+7 999 999 99 99",
		type: "tel",
		required: true,
	},
	{
		id: 3,
		value: "",
		field: "email",
		placeholder: "Почта",
		type: "email",
		required: true,
	},
	{
		value: true,
		field: "consent",
		type: "checkbox",
		id: 4,
		label: ConsentLabel({ centered: false }),
		required: true,
	},
];

export const RegForm = () => {
	const [inputProps, setInputProps] = useState<InputDataProps[]>(inputsData);
	const [preloader, setPreloader] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const request = useRequest;
	const url = `${baseApiUrl}/auth/register/primary/`;

	useEffect(() => {
		closeSnackbar();
	}, []);

	const login = () => {
		setPreloader(true);
		const inputs = [...inputProps];
		inputs.pop(); //@ts-ignore
		const desiredValues = getValueFromArray(inputs);
		const options = {
			method: "POST",
			data: desiredValues,
		};

		request(url, options, true).then((res) => {
			const {
				data: { smsCodeActionTime, errors, isVerified, smsText },
				status,
			} = res;
			//@ts-ignore
			dispatch(setAuthData(desiredValues));
			setTimeout(() => {
				setPreloader(false);
				closeSnackbar();
				if (status >= 200 && status < 300) {
					if (isVerified) {
						navigate("/create-password", {
							state: {
								from: "/verification",
							},
						});
					} else {
						enqueueSnackbar(smsText, {
							variant: "success",
							autoHideDuration: null,
						});
						navigate("/verification", {
							state: { smsCodeActionTime, smsText },
						});
					}
				} else {
					if (errors && errors.length > 0) {
						if (errors[0].field === "non_field_errors") {
							enqueueSnackbar("При отправке запроса возникла ошибка!", {
								variant: "error",
								description: errors[0] ? errors[0].message : "",
								autoHideDuration: null,
							});
						} else {
							setInputProps(addedErrorOnField(errors, inputProps));
						}
					}
				}
			}, 250);
		});
	};

	const valueChange: InputOnChange = (newVal) => {
		const newInputProps = inputProps.map((item) =>
			newVal.field === item.field
				? { ...item, value: newVal.value, invalid: false }
				: item,
		);

		setInputProps(newInputProps);
	};

	return (
		<FormWrapper title='Регистрация'>
			<Form
				url=''
				values={[]}
				afterSubmit={login}
				noSend
				button={
					<AuthButtons
						firstName='Зарегистрироваться'
						secondName='Войти'
						link='/login'
						// @ts-ignore
						disabled={!inputProps[3].value || preloader}
						preloader={preloader}
					/>
				}>
				<FormContent>
					<CustomInputsContainer>
						{inputProps.map(({ id, type, value, ...other }) =>
							type === "checkbox" ? (
								<Checkbox
									key={id}
									{...other}
									// @ts-ignore
									checked={Boolean(value) ? value : false}
									onChange={valueChange}
								/>
							) : (
								<Input
									key={id}
									id={id}
									{...other}
									type={type}
									value={value}
									onChange={valueChange}
								/>
							),
						)}
					</CustomInputsContainer>
				</FormContent>
			</Form>
		</FormWrapper>
	);
};
