import { ApplicationItemInfoProps } from "utils/types";
import { ClockRoundIcon, PersonRoundIcon, CalendarIcon } from "assets/icons";
import { Status } from "components/Status";
import { Chip } from "components/Chip";
import { Container, AlignCenterBlock, Title, Finalize, Created } from "./styles";

interface ApplicationItemInfoComponentProps extends ApplicationItemInfoProps {
	titleSize?: "h2" | "h4";
	size?: "small";
	finalizePeriod?: string | null;
	light?: boolean;
}

export const ApplicationItemInfo = ({
	date,
	status,
	id,
	name,
	creator,
	titleSize,
	finalizePeriod,
	size,
	light,
}: ApplicationItemInfoComponentProps) => {
	const titleProps = titleSize ? titleSize : size ? "h5" : "h4";
	const dateJs = new Date(date);
	const dateInFormat = [dateJs.toLocaleDateString(), dateJs.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })];
	const finalizeDate = finalizePeriod
		? new Date(finalizePeriod).toLocaleDateString()
		: null;
	const chipProps = { small: size ? true : undefined };

	return (
		<Container className={size ? size : ""}>
			<AlignCenterBlock>
				<Title
					// @ts-ignore
					component={titleProps}
					variant={titleProps}
					className='list-item-content'>
					{name}
				</Title>
				<Status status={status} type='application' rounded />
				{finalizeDate && (
					<Finalize>
						<CalendarIcon />
						Срок доработки: {finalizeDate}
					</Finalize>
				)}
			</AlignCenterBlock>
			<AlignCenterBlock>
				{light ? (
					<Created>{`Создана: ${dateInFormat[0]} ${dateInFormat[1]}`}</Created>
					) : (
					<>
						<Chip label={`№${id}`} {...chipProps} />
						<Chip icon={<ClockRoundIcon />} label={`${dateInFormat[0]} ${dateInFormat[1]}`} {...chipProps} />
						<Chip icon={<PersonRoundIcon />} label={creator} {...chipProps} />
					</>
				)}
			</AlignCenterBlock>
		</Container>
	);
};
