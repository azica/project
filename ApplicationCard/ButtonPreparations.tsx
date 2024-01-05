import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getPathByType, getApiByType } from "utils/helpers";
import { baseApiUrl } from "utils/constants";
import { useRequest } from "utils/hooks";
import { ApplicationProps, ApplicationType } from "utils/types";
import { Button } from "components/FormElements";

interface ButtonPreparationsProps {
	id?: number;
	applications: ApplicationProps[];
}

export const ButtonPreparations = ({
	id,
	applications,
}: ButtonPreparationsProps) => {
	const [isLoader, setIsLoader] = useState(false);
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const request = useRequest;
	const buttonProps = {
		preloader: { loading: isLoader },
		disabled: isLoader,
	};

	const sendRequest = (type: string, data: {}) => {
		setIsLoader(true);
		const params = {
			method: "POST",
			data,
		};
		request(`${baseApiUrl}/${getApiByType(type)}/`, params).then((res) => {
			setTimeout(() => {
				const { data, status } = res;
				closeSnackbar();
				setIsLoader(false);
				if (status >= 200 && status < 300) {
					navigate(`${getPathByType(type)}${data.id}`);
				} else {
					const { errors } = data;
					if (errors && errors.length > 0) {
						enqueueSnackbar("При отправке запроса возникла ошибка!", {
							variant: "error",
							description: errors[0] ? errors[0].message : "",
							autoHideDuration: null,
						});
					}
				}
			}, 250);
		});
	};


	const getApplicationByType = (neededType: ApplicationType) => applications.find(({type}) => type === neededType);

	return (
		<>
			{applications.length === 0 && (
				<Button
					onClick={() =>
						sendRequest("expert_opinion", {
							expertOpinion: { application: id },
						})
					}
					{...buttonProps}>
					Создать ЭЗ
				</Button>
			)}
			{(applications.length === 1 && getApplicationByType("expert_opinion")?.status.type == "expert_opinion_ready") && (
				<Button
					onClick={() =>
						sendRequest("commission_control", {
							commissionControl: { applications: [id] },
						})
					}
					{...buttonProps}>
					Создать ПКК
				</Button>
			)}
			{(applications.length === 2 && getApplicationByType("commission_control")?.status.type == "commission_control_ready") && (
				<Button
					onClick={() => sendRequest("agenda", { agenda: { application: id } })}
					{...buttonProps}>
					Создать ВП
				</Button>
			)}
		</>
	);
};

export default ButtonPreparations;
