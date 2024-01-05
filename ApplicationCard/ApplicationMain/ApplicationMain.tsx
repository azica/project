import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Typography } from "@mui/material";
import { addedErrorOnField, formatBytes, getApiByType } from "utils/helpers";
import {
	baseApiUrl,
	memberRoleId,
	candidateRoleId,
	presidiumRoleId,
	commisionRoleId,
	headExpertRoleId,
	headLegalRoleId,
	headAccountantRoleId,
} from "utils/constants";
import {
	useApplicationContent,
	useUserRole,
	setApplicationContent,
	useUserId,
} from "utils/store";
import { useRequest } from "utils/hooks";
import {
	ApplicationDetailProps,
	ErrorProps,
	StatusProps,
	ApplicationButtonProps,
	FileAttachedProps,
	HistoryItemProps,
	InputDataProps,
	InputOnChange,
	FileItemProps,
	ApplicationFormProps,
	ApplicationStatusType,
} from "utils/types";
import { AttachedFiles } from "components/AttachedFiles";
import { History } from "components/History";
import { Uploader } from "components/Uploader";
import { Input, Button } from "components/FormElements";
import { RelatedApplications } from "components/RelatedApplications";
import { MeetingParticipants } from "components/MeetingParticipants";
import { Solution } from "components/Solution";
import { ButtonPreparations } from "../ButtonPreparations";
import {
	Content,
	Container,
	Header,
	Text,
	LeftBlock,
	ButtonContainer,
} from "./styles";
import { DatePopup } from "components/DatePopup";

const comment = {
	id: 3,
	field: "comment",
	placeholder: "Введите комментарий",
	required: true,
	value: "",
	textarea: {
		multiline: true,
		rows: 6,
	},
};


export const ApplicationMain = () => {
	const application: ApplicationDetailProps<"application"> =
		useApplicationContent();
	const {
		attachmentFiles,
		history,
		maxFilesSize,
		common,
		relatedApplications,
		participants,
		participantsCount,
		buttons,
		formElements
	} = application;
	const [files, setFiles] = useState<FileAttachedProps[]>([]);
	const [statuses, setStatuses] = useState<HistoryItemProps[]>([]);
	const [inputProps, setInputProps] = useState<InputDataProps[]>([]);
	const [selectedFiles, setSelectedFiles] = useState<FileItemProps[]>([]);
	const [updateUpload, setUpdateUpload] = useState(false);
	const [isEmployee, setIsEmployee] = useState(false);
	const [isMeetingParticipant, setIsMeetingParticipant] = useState(false);
	const [isHeadExpert, setIsHeadExpert] = useState(false);
	const [isHeadLegal, setHeadLegal] = useState(false);
	const [isHeadAccountant, setIsHeadAccountant] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [id, setId] = useState(common?.id);
	const [showPopup, setShowPopup] = useState(false);
	const [date, setDate] = useState("");
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const roles = useUserRole();
	const userId = useUserId();
	const request = useRequest;
	const name = common ? common.name : undefined;
	const type = common ? common.type : undefined;
	const isExpertOpinion = type === "expert_opinion";
	const isCommissionProtocol = type === "commission_control";
	const isPresidium = type === "presidium";
	const isVV = type === "vv";
	const noEditable = type === "odo" || type === "vv" || type === "oo";
	const statusType = common?.status.type;
	const url = `${baseApiUrl}/${getApiByType(type)}/${id}/`;

	useEffect(() => {
		if (attachmentFiles !== files) {
			setFiles([...attachmentFiles, ...files]);
		}
	}, [attachmentFiles]);

	useEffect(() => {
		if(formElements) {
			formElements.map(({elements}) => {
				setInputProps(elements && elements.length > 0 ? elements : []);
			})
		} else {
			setInputProps([]);
		}
	}, [formElements]);

	useEffect(() => {
		setFiles([]);
	}, [pathname]);

	useEffect(() => {
		if (common) {
			if (id === common.id && statuses === history) {
				setStatuses([...history, ...statuses]);
			} else {
				setStatuses(history);
				setId(common.id);
			}
		}
	}, [history, id]);

	useEffect(() => {
		if (roles)
			roles.map(({ id }) => {
				setIsEmployee(id !== candidateRoleId && id !== memberRoleId);
				setIsHeadExpert(id === headExpertRoleId);
				setHeadLegal(id === headLegalRoleId);
				setIsHeadAccountant(id === headAccountantRoleId);
			});
	}, [roles]);

	useEffect(() => {
		if(participants && participants.length > 0) {
			participants.map(({id}) => {
				if(id === userId) {
					setIsMeetingParticipant(true);
				}
			})
		} else {
			setIsMeetingParticipant(false);
		}
	}, [participants]);

	const updateFiles = (data: {
		files: FileAttachedProps[];
		history: HistoryItemProps[];
		buttons: ApplicationButtonProps[];
		common: { status: StatusProps; finalizePeriod?: string | null };
		formElements: ApplicationFormProps[] | null;
	}) => {
		setFiles([...data.files, ...files]);
		setStatuses([...data.history, ...statuses]);
		dispatch(
			setApplicationContent({
				...application,
				buttons: data.buttons,
				formElements: data.formElements, // @ts-ignore 
				common: {
					...application.common,
					status: data.common.status,
					finalizePeriod: data.common.finalizePeriod,
				},
			}),
		);
	};

	const changeValue: InputOnChange = ({ field, value }) => {
		console.log(field, value);
		const newInputProps = inputProps.map((item) =>
			field === item.field ? { ...item, value, invalid: false } : item,
		);
		setInputProps(newInputProps);
	};

	const defineFunction = (status: ApplicationStatusType, type?: "submit" | "upload") => {
		switch (type) {
			case "submit":
				if (status === "application_redo") {
					checkDataFields();
				} else {
					changeStatus(status, type);
				}
				break;
			case "upload":
				sendFiles(status);
				break;
			default:
				changeStatus(status, type);
				break;
		}
	};

	const changeStatus = (status: ApplicationStatusType, type?: string) => {
		let params = {
			method: "PUT",
			data: {
				status,
			},
		};

		if (type === "submit") {
			inputProps.map(({ field, value }) => {
				params.data = { ...params.data, [field]: value };
			});
			// @ts-ignore
			if (status === "application_redo") params.data.finalizePeriod = date;
		}

		setIsLoading(true);
		request(`${url}`, params).then((res) => {
			const { data, status } = res;
			closeSnackbar();

			if (status >= 200 && status < 300) {
				if (type === "submit") {
					const newInputProps = inputProps.map((item) => ({
						...item,
						value: "",
					}));
					setInputProps(newInputProps);
				}
				dispatch(setApplicationContent(data));
			} else {
				const { errors } = data;
				if(inputProps.length > 0) {
					setInputProps(addedErrorOnField(errors, inputProps));
				}
				enqueueSnackbar("При отправке запроса возникла ошибка!", {
					variant: "error",
					description: errors[0] ? errors[0].message : `Error ${status}`,
					autoHideDuration: null,
				});
			}
			setTimeout(() => {
				setIsLoading(false);
			}, 250);
		});
	};

	const checkDataFields = () => {
		let errors: ErrorProps[] = [];

		inputProps.map(({ field, value }) => {
			if (`${value}`.length < 1)
				errors.push({ message: "Это обязательное поле", field });
		});

		if (errors.length > 0) {
			setInputProps(addedErrorOnField(errors, inputProps));
		} else {
			setShowPopup(true);
		}
	};

	const sendFiles = (status: ApplicationStatusType) => {
		const formData = new FormData();

		setIsLoading(true);
		for (const i in selectedFiles) {
			formData.append(
				"file",
				selectedFiles[i].file,
				selectedFiles[i].file.name,
			);
		}
		formData.append('status', status)

		request(`${url}files-upload/`, { method: "POST", data: formData }).then(
			(res) => {
				closeSnackbar();
				if (res) {
					const { data, status } = res;
					if (status >= 200 && status < 300) {
						setUpdateUpload(true);
						updateFiles(data);
					} else {
						const { errors } = data;

						enqueueSnackbar("Ошибка при загрузке файла!", {
							variant: "error",
							description: errors[0] ? errors[0].message : "",
							autoHideDuration: null,
						});
					}
				} else {
					enqueueSnackbar(
						"При отправке запроса, что-то пошло не так. Попробуйте снова",
						{
							variant: "error",
							autoHideDuration: null,
						},
					);
				}
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			},
		);
	};

	return (
		<Content>
			{attachmentFiles && (
				<>
					<LeftBlock>
						{relatedApplications && (
							<RelatedApplications
								list={relatedApplications}
								id={id}
								isProtocol={isCommissionProtocol || isPresidium}
								protocolType={isPresidium ? "presidium" : "commission_controls"}
								showVote={
									isMeetingParticipant ||
									statusType === "commission_control_signed" ||
									statusType === "commission_control_preparing_extract" ||
									statusType === "commission_control_ready" ||
									statusType === "presidium_closed"
								}
								isHeadExpert={isHeadExpert}
								statusType={statusType}
							/>
						)}
						{participants && (isCommissionProtocol || isPresidium) && (
							<MeetingParticipants
								participants={participants}
								maxCount={participantsCount}
								id={id}
								protocolType={isPresidium ? "presidium" : "commission_controls"}
								isHeadExpert={isHeadExpert}
								statusType={statusType}
							/>
						)}
						{!(statusType === "agenda_created") && !isPresidium && (
							<AttachedFiles files={files} id={id} name={name} />
						)}

						{common?.result && <Solution {...common.result} />}

						{isEmployee && (
							<>
								{isHeadExpert && (
										<>
											{statusType === "application_preparing_documents" && !noEditable && (
												<ButtonPreparations
													id={id}
													applications={ relatedApplications ? relatedApplications : []}
												/>
											)}
										</>
									)}
							</>
						)}
						{ formElements && formElements.map(({ type }) => type === 'uploader' ? (
							<Container
								lined={`${
									isPresidium && isHeadExpert
										? false
										: true
								}`}>
								<Header>
									<Typography component='h3' variant='h3'>
										{isExpertOpinion
											? "Загрузить ЭЗ с подписью"
											: "Загрузите документы"}
									</Typography>
								</Header>
								{maxFilesSize && (
									<Text>
										{`Размер файлов не должен превышать ${formatBytes(maxFilesSize, 1)}`}
									</Text>
								)}
								<Uploader
									multiple={!isExpertOpinion}
									screen
									onChange={setSelectedFiles}
									maxSize={maxFilesSize ? maxFilesSize : undefined}
									maxCount={1}
									accept={[".doc", ".docx", ".pdf"]}
									updateValues={updateUpload}
								/>
							</Container>
							) : inputProps.length > 0 && (
								<Container>
									<Header>
										<Typography component='h3' variant='h3'>
											Ваш комментарий
										</Typography>
									</Header>
									<Text>Если есть замечания, то опишите их ниже</Text>
									{inputProps.map(({ id, ...other }) => (
										<Input
											key={id}
											id={id}
											{...other}
											onChange={changeValue}
										/>
									))}
								</Container>
							)
						)}
						{buttons && buttons.length > 0 && (
							<ButtonContainer>
								{buttons.map(({ type, name, status }, index) => (
									<Button
										key={status}
										variant={index === 1 ? "outlined" : undefined}
										preloader={index === 0 ? { loading: isLoading } : undefined}
										disabled={isLoading}
										onClick={() => defineFunction(status, type)}>
										{name}
									</Button>
								))}
								<DatePopup 
									title="Укажите срок доработки заявки"
									button="Принять"
									show={showPopup}
									afterClose={setShowPopup}
									date={date}
									setDate={setDate}
									onSubmit={() => changeStatus("application_redo", "submit")} 
								/>
							</ButtonContainer>
						)}
					</LeftBlock>
					<History list={statuses} isEmployee={isEmployee} />
				</>
			)}
		</Content>
	);
};

export default ApplicationMain;
