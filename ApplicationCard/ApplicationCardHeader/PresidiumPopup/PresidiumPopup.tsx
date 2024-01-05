import { useState, useEffect, FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Typography } from "@mui/material";
import { baseApiUrl } from "utils/constants";
import { setApplicationContent } from "utils/store";
import { useRequest } from "utils/hooks";
import { CheckboxListTypes, InputOnChange } from "utils/types";
import { Button, Select } from "components/FormElements";
import { Container, Empty } from "./styles";
import { Text } from "styles/common";

interface PresidiumPopupProps {
	id?: number;
	afterClose: (value: boolean) => void;
}

interface ValueProps {
	name: string;
	value: number;
}

export const PresidiumPopup = ({ id, afterClose }: PresidiumPopupProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isButtonLoading, setIsButtonLoading] = useState(false);
	const [options, setOptions] = useState<ValueProps[]>([]);
	const [value, setValue] = useState<string | number | boolean | null>(null);
	const dispatch = useDispatch();
	const request = useRequest;
	const apiUrl = `${baseApiUrl}/agenda/${id}/add-presidium/`;

	useEffect(() => {
		sendRequest(apiUrl);
	}, []);

	const sendRequest = (api: string, search?: boolean) => {
		setIsLoading(true);
		request(api).then((res) => {
			const { data } = res;

			setTimeout(() => {
				setOptions(data);
				setIsLoading(false);
			}, 250);
		});
	};

	const sendForm = (event: FormEvent<HTMLDivElement>) => {
		setIsButtonLoading(true);
		const options = {
			method: "PUT",
			data: { id: Number(value) },
		};

		request(apiUrl, options).then((res) => {
			const { data, status } = res;
			console.log(data);
			if (status) {
				dispatch(setApplicationContent(data));
			}
			setTimeout(() => {
				setIsButtonLoading(false);
				afterClose(false);
			}, 250);
		});
	};

	const changeValue: InputOnChange = ({ value, field, id }) => {
		console.log(field, value, id);
		const param = JSON.parse(`${value}`).value;
		console.log(param);
		setValue(param);
	};

	return (
		<Container>
			<Typography variant='h2' component='h2'>
				Выберите протокол президиума
			</Typography>
			<Text>
				Выберите протокол президиума к которому будет привязан данный вопрос
				повестки
			</Text>

			{options.length > 0 ? (
				<Select
					id={1}
					field='presidium'
					value={value ? value : ""}
					onChange={changeValue}
					options={options}
					placeholder='Выберите протокол'
					replaceName
				/>
			) : (
				<Empty>
					<Text style={{ textAlign: "center" }}>
						Подходящих протоколов президиума не найдено
					</Text>
				</Empty>
			)}

			<Button
				type='submit'
				preloader={{ loading: isButtonLoading }}
				disabled={
					(options && options.length < 1) || value === null || isButtonLoading
				}
				onClick={sendForm}>
				Принять
			</Button>
		</Container>
	);
};

export default PresidiumPopup;
