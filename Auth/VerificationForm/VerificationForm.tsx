import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import InputVerificationCode from "react-input-verification-code";
import { baseApiUrl } from "utils/constants";
import { useRequest } from "utils/hooks";
import { WarningRoundIcon } from "assets/icons";
import { Form } from "components/Form";
import { FormWrapper } from "components/Wrappers";
import { CountdownTimer } from "components/CountdownTimer";
import { Text } from "../styles";
import {
	InputsContainer,
	FormContent,
	Warning,
	InputWrapper,
	Timer,
	ResendContainer,
	СhangeableСontent,
	ResendButton,
} from "./styles";

interface VerificationFormProps {
	buttonName: string;
	link: string;
	params: {
		phone: string;
		fullName: string;
		email: string;
		smsCodeActionTime: number;
		smsText?: string;
	};
}

const getTargetTime = (time: number) => {
	const TIME_IN_MS = 1 * time * 1000;
	const NOW_IN_MS = new Date().getTime();

	return NOW_IN_MS + TIME_IN_MS;
};

export const VerificationForm = ({
	buttonName,
	link,
	params: { smsCodeActionTime, phone, email, fullName, smsText },
}: VerificationFormProps) => {
	const [value, setValue] = useState("");
	const [invalid, setInvalid] = useState(false);
	const [message, setMessage] = useState("Код введён не верно!");
	const [showResend, setShowResend] = useState(false);
	const [targetTime, setTargetTime] = useState(
		getTargetTime(smsCodeActionTime),
	);
	const navigate = useNavigate();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const request = useRequest;
	const url = `${baseApiUrl}/auth`;

	const sendCode = (code: string) => {
		if (code !== value) {
			setValue(code);
		}
		request(
			`${url}/sms-verify/`,
			{
				method: "POST",
				data: { phone, verificationCode: code },
			},
			true,
		).then((res) => {
			const {
				data: { errors },
				status,
			} = res;
			if (status >= 200 && status < 300) {
				navigate("/create-password", {
					state: { from: "/verification" },
				});
			} else {
				setInvalid(true);
				setMessage(errors[0].message);
			}
		});
	};

	const changeValue = (code: string) => {
		setValue(code);
		setInvalid(false);
	};

	const resendCode = () => {
		closeSnackbar();
		setShowResend(false);
		setTargetTime(getTargetTime(smsCodeActionTime));
		setValue("");
	};

	const beforeExpiry = () => {
		setShowResend(true);
	};

	return (
		<FormWrapper title={phone} link={link} width={354} padding='50px'>
			<Form
				url=''
				values={[]}
				afterSubmit={() => sendCode(value)}
				buttonName={buttonName}
				buttonProps={{ fullWidth: true }}
				noSend>
				<FormContent>
					<Text>Мы отправили на номер телефона СМС с кодом подтверждения</Text>
					<InputsContainer>
						<InputWrapper invalid={`${invalid}`}>
							<InputVerificationCode
								autoFocus
								placeholder=''
								onChange={changeValue}
								value={value}
								onCompleted={sendCode}
							/>
						</InputWrapper>
						<Warning show={`${invalid}`}>
							<WarningRoundIcon />
							<Text title={message}>{message}</Text>
						</Warning>
					</InputsContainer>
				</FormContent>
			</Form>
			<ResendContainer>
				<СhangeableСontent>
					<SwitchTransition mode='out-in'>
						<CSSTransition
							key={showResend ? "resend" : "timer"}
							timeout={300}
							classNames='fade'>
							{showResend ? (
								<ResendButton onClick={resendCode}>
									Отправить код повторно
								</ResendButton>
							) : (
								<Timer>
									Повторно код можно будет отправить через{" "}
									{!showResend ? (
										<CountdownTimer
											targetTime={targetTime}
											beforeExpiry={beforeExpiry}
										/>
									) : (
										`0:00`
									)}
								</Timer>
							)}
						</CSSTransition>
					</SwitchTransition>
				</СhangeableСontent>
			</ResendContainer>
		</FormWrapper>
	);
};
