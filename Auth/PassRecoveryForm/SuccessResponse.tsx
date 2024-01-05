import { useState, useEffect, FormEvent } from "react";
import { Button } from "components/FormElements/Button";
import envelope from "assets/images/envelope.svg";
import { Text } from "../styles";
import {
	FormContent,
	Title,
	ImageWrapper,
	ResponseContent,
	LinkWrapper,
} from "./styles";

export const SuccessResponse = () => {
	return (
		<FormContent>
			<ImageWrapper>
				<img src={envelope} alt='' />
			</ImageWrapper>
			<ResponseContent>
				<Title component='h3' variant='h3'>
					Проверьте почту!
				</Title>
				<Text style={{ textAlign: "center" }}>
					На почту было отправлено письмо с ссылкой для создания нового пароля!
				</Text>
				<LinkWrapper url='/login'>
					<Button>На главную</Button>
				</LinkWrapper>
			</ResponseContent>
		</FormContent>
	);
};
