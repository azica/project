import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { baseApiUrl } from "utils/constants";
import { useRequest } from "utils/hooks";
import { InputDataProps, InputOnChange, LoginType } from "utils/types";
import {
	getValueFromArray,
	addedErrorOnField,
	setTokenFromStorage,
	getUserIdByJwt,
} from "utils/helpers";
import { useUserUpdate } from "utils/hooks";
import { setUser } from "utils/store";
import { Form } from "components/Form";
import { Input } from "components/FormElements";
import { FormWrapper } from "components/Wrappers";
import { AuthButtons } from "components/Auth/AuthButtons";
import { FormContent, InputsContainer } from "../styles";
import { LinkRight, ButtonType } from "./styles";

let inputsData = [
	{
		value: "",
		field: "login",
		placeholder: "Телефон",
		type: "tel",
		mask: "+7 999 999 99 99",
		id: 1,
		required: true,
		autoComplete: "tel",
	},
	{
		id: 3,
		field: "password",
		placeholder: "Пароль",
		type: "password",
		required: true,
		value: "",
	},
];

export const LoginForm = () => {
	const [loginType, setLoginType] = useState<LoginType>("email");
	const [inputProps, setInputProps] = useState<InputDataProps[]>(inputsData);
	const [isLoader, setIsLoader] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const request = useRequest;
	const userUpdate = useUserUpdate;
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const url = `${baseApiUrl}/auth/login/`;

	const login = () => {
		setIsLoader(true); //@ts-ignore
		const desiredValues = getValueFromArray(inputProps);
		const options = {
			method: "POST",
			data: desiredValues,
		};

		request(url, options, true).then((res) => {
			setTimeout(() => {
				closeSnackbar();

				const { data, status } = res;

				if (status >= 200 && status < 300) {
					setTokenFromStorage(data);

					userUpdate(getUserIdByJwt(data.access)).then((res) => {
						const { data, status } = res;

						if (status >= 200 && status < 300) {
							dispatch(setUser({ ...data }));
							setIsLoader(false);
							navigate("/profile");
						}
					});
				} else {
					const { errors } = data;
					setIsLoader(false);

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

	const typeToggle = () => {
		const newType: LoginType = loginType === "email" ? "phone" : "email";
		const isEmail = newType === "email";
		const newInputProps = inputProps;

		newInputProps[0] = {
			...newInputProps[0],
			value: "",
			type: isEmail ? "tel" : "email",
			placeholder: isEmail ? "Телефон" : "Почта",
			mask: isEmail ? "+7 999 999 99 99" : undefined,
			autoComplete: isEmail ? "tel" : "email",
		};

		setLoginType(newType);
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
		<FormWrapper title='Вход'>
			<Form
				url={url}
				values={[]}
				afterSubmit={login}
				noSend
				button={
					<AuthButtons
						firstName='Войти'
						secondName='Зарегистрироваться'
						link='/registration'
						preloader={isLoader}
					/>
				}>
				<FormContent>
					<InputsContainer>
						<ButtonType onClick={typeToggle}>
							{loginType === "email" ? "По почте?" : "По телефону?"}
						</ButtonType>
						{inputProps.map(({ id, ...other }) => {
							return (
								<Input key={id} id={id} {...other} onChange={valueChange} />
							);
						})}
					</InputsContainer>
					<LinkRight to='/login/password-pecovery'>Забыли пароль?</LinkRight>
				</FormContent>
			</Form>
		</FormWrapper>
	);
};
