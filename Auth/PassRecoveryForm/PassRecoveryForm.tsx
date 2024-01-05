import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { baseApiUrl } from "utils/constants";
import { useRequest } from "utils/hooks";
import { InputDataProps, InputOnChange } from "utils/types";
import { addedErrorOnField } from "utils/helpers";
import { Form } from "components/Form";
import { Input } from "components/FormElements";
import { FormWrapper } from "components/Wrappers";
import { SuccessResponse } from "./SuccessResponse";
import { Text, InputsContainer } from "../styles";
import { FormContent } from "./styles";

let inputsData = [
	{
		value: "",
		field: "email",
		placeholder: "Почта",
		type: "email",
		id: 1,
		require: true,
	},
];

export const PassRecoveryForm = () => {
	const [inputProps, setInputProps] = useState<InputDataProps[]>(inputsData);
	const [successShow, setSuccessShow] = useState(false);
	const [isLoader, setIsLoader] = useState(false);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const request = useRequest;
	const url = `${baseApiUrl}/auth/reset-password/`;

	useEffect(() => {
		closeSnackbar();
	}, []);

	const login = () => {
		setIsLoader(true);
		const options = {
			method: "POST",
			data: { email: inputProps[0].value },
		};

		request(url, options, true).then((res) => {
			const { data, status } = res;
			setTimeout(() => {
				setIsLoader(false);
				closeSnackbar();
				if (status >= 200 && status < 300) {
					console.log(res);
					setSuccessShow(true);
				} else {
					const { errors } = data;
					if (errors && errors.length > 0) {
						if (errors[0].field === "nonFieldErrors") {
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
			}, 500);
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
		<FormWrapper
			title={!successShow ? "Восстановление пароля" : ""}
			link='/login'>
			{!successShow ? (
				<Form
					url={url}
					values={[]}
					afterSubmit={login}
					buttonName='Отправить ссылку'
					buttonProps={{
						fullWidth: true,
						preloader: { loading: isLoader },
						disabled: isLoader,
					}}
					noSend>
					<FormContent>
						<Text>
							Введите почту, на неё мы отправим ссылку для восстановления пароля
						</Text>
						<InputsContainer>
							{inputProps.map(({ id, ...other }) => {
								return (
									<Input key={id} id={id} {...other} onChange={valueChange} />
								);
							})}
						</InputsContainer>
					</FormContent>
				</Form>
			) : (
				<SuccessResponse />
			)}
		</FormWrapper>
	);
};
