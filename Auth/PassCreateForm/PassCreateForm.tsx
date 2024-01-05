import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { setAuthData } from "utils/store";
import { baseApiUrl } from "utils/constants";
import { useRequest } from "utils/hooks";
import { InputDataProps, InputOnChange } from "utils/types";
import { Form } from "components/Form";
import { Input } from "components/FormElements";
import { FormWrapper } from "components/Wrappers";
import { FormContent, InputsContainer } from "../styles";

let inputsData = [
	{
		id: 1,
		field: "password",
		placeholder: "Пароль",
		type: "password",
		required: true,
		value: "",
	},
	{
		id: 2,
		field: "secondPassword",
		placeholder: "Повторите пароль",
		type: "password",
		required: true,
		value: "",
		helperText: "Пароли не совпадают",
		invalid: false,
	},
];

interface PassCreateProps {
	title: string;
	buttonName: string;
	link?: string;
	params: {
		phone?: string;
		fullName?: string;
		email?: string;
		token?: string;
	};
	isReset: boolean;
}

export const PassCreateForm = ({
	title,
	buttonName,
	link,
	params,
	isReset,
}: PassCreateProps) => {
	const [inputProps, setInputProps] = useState<InputDataProps[]>(inputsData);
	const [isLoader, setIsLoader] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const navigate = useNavigate();
	const dispath = useDispatch();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const request = useRequest;
	const url = `${baseApiUrl}/auth/${
		isReset ? "reset-password/set_password" : "register"
	}/`;

	useEffect(() => {
		closeSnackbar();
	}, []);

	const login = () => {
		setIsLoader(true);
		const options = {
			method: "POST",
			data: { ...params, password: inputProps[0].value },
		};

		request(url, options, true).then((res) => {
			const {
				data: { errors },
				status,
			} = res;
			if (status >= 200 && status < 300) {
				dispath(setAuthData(null));
				enqueueSnackbar(
					isReset ? "Пароль успешно изменен!" : "Регистрация прошла успешна!",
					{
						variant: "success",
						description: "Войдите, чтобы продолжить",
					},
				);
				navigate("/login");
			} else {
				closeSnackbar();
				enqueueSnackbar("При отправке запроса возникла ошибка!", {
					variant: "error",
					description: errors[0] ? errors[0].message : "",
					autoHideDuration: null,
				});
			}
			setTimeout(() => {
				setIsLoader(false);
			}, 250);
		});
	};

	const valueChange: InputOnChange = (newVal) => {
		const newInputProps = inputProps.map((item) =>
			newVal.field === item.field
				? { ...item, value: newVal.value, invalid: false }
				: item,
		);
		comparePassword(newInputProps);
	};

	const comparePassword = (newInputProps: InputDataProps[]) => {
		let newProps = newInputProps;
		const noMatch = newProps[0].value !== newProps[1].value;

		newProps[1] = {
			...newProps[1],
			invalid: noMatch,
		};

		setIsDisabled(noMatch);
		setInputProps(newProps);
	};

	return (
		<FormWrapper title={title} link={link}>
			<Form
				url={url}
				values={[]}
				buttonProps={{
					fullWidth: true,
					disabled: isDisabled || isLoader,
					preloader: { loading: isLoader },
				}}
				afterSubmit={login}
				buttonName={buttonName}
				noSend>
				<FormContent>
					<InputsContainer style={{ marginTop: 16 }}>
						{inputProps.map(({ id, ...other }) => {
							return (
								<Input key={id} id={id} {...other} onChange={valueChange} />
							);
						})}
					</InputsContainer>
				</FormContent>
			</Form>
		</FormWrapper>
	);
};
