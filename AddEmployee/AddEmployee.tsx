import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { addEmployeeForm } from "assets/data";
import { getFormValues, addedErrorOnSections } from "utils/helpers";
import {
	InputDataProps,
	InputOnChange,
	FormSectionDataProps,
} from "utils/types";
import { Form } from "components/Form";
import { Button } from "components/FormElements/Button";
import { FormSection } from "components/FormSection";
import { AddButton } from "components/AddButton";
import { Popup } from "components/Popup";
import { ButtonContainer } from "components/Form/styles";
import { Container } from "./styles";

interface AddEmployeeProps {
	url: string;
}

export const AddEmployee = ({ url }: AddEmployeeProps) => {
	const [sectionsProps, setSectionsProps] =
		useState<FormSectionDataProps[]>(addEmployeeForm);
	const [formValues, setFormValues] = useState<any>();
	const [isLoading, setIsLoading] = useState(false);
	const [showPopup, setShowPopup] = useState(false);

	useEffect(() => {
		setFormValues(getFormValues(sectionsProps));
	}, [sectionsProps]);

	const changeValue: InputOnChange = ({ field, value, id }) => {};

	const sendForm = (data: any) => {
		if (data.errors) {
			const newSections = addedErrorOnSections(data.errors, sectionsProps);
			setSectionsProps(newSections);
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 500);
	};

	return (
		<>
			<AddButton
				title='Добавить сотрудника'
				onClick={() => setShowPopup(true)}
			/>
			<Popup active={showPopup} afterClose={setShowPopup}>
				<Container>
					<Typography variant='h2' component='h2'>
						Добавление сотрудника
					</Typography>
					<Form
						url={url}
						values={formValues}
						afterSubmit={sendForm}
						beforeSubmit={() => setIsLoading(true)}
						button={
							<ButtonContainer>
								<Button
									type='submit'
									preloader={{ loading: isLoading, outside: true }}
									disabled={isLoading}>
									Сохранить
								</Button>
							</ButtonContainer>
						}>
						<Container>
							{addEmployeeForm.map(({ id, ...other }, index) => (
								<FormSection
									key={id}
									id={id}
									index={index}
									className='employee'
									{...other}
									onChange={changeValue}
								/>
							))}
						</Container>
					</Form>
				</Container>
			</Popup>
		</>
	);
};
