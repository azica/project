import { Button } from "components/FormElements/Button";
import { Line, ButtonsContainer, LinkWrapper } from "./styles";

interface ButtonsProps {
	firstName: string;
	secondName: string;
	link: string;
	disabled?: boolean;
	preloader: boolean;
}

export const AuthButtons = ({
	firstName,
	secondName,
	link,
	disabled,
	preloader,
}: ButtonsProps) => (
	<ButtonsContainer>
		<Button
			variant='contained'
			type='submit'
			disabled={disabled || preloader}
			preloader={{ loading: preloader }}>
			{firstName}
		</Button>
		<Line>
			<p>или</p>
		</Line>
		<LinkWrapper url={link}>
			<Button variant='outlined'>{secondName}</Button>
		</LinkWrapper>
	</ButtonsContainer>
);
