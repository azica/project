import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { baseApiUrl, managerRoleId, headExpertRoleId } from "utils/constants";
import { useUserRole } from "utils/store";
import { ApplictionDetailInfoProps } from "utils/types";
import { DownloadIcon } from "assets/icons";
import { Button } from "components/FormElements";
import { BackIconButton } from "components/BackIconButton";
import { Popup } from "components/Popup";
import { ApplicationItemInfo } from "components/ApplicationsList/ApplicationItemInfo";
import { ProtocolsPopup } from "components/ProtocolsPopup";
import { ResponsibleUser } from "components/ResponsibleUser";
import { PresidiumPopup } from "./PresidiumPopup";
import { Container, Content, LeftBlock } from "./styles";
import { Link } from "styles/common";

interface ApplicationCardHeaderProps
	extends ApplictionDetailInfoProps<"application"> {
	url: string;
	api: string;
}

export const ApplicationCardHeader = ({
	id,
	name,
	status,
	createdAt,
	fullName,
	curator,
	clerk,
	type,
	presidium,
	finalizePeriod,
	url,
	api,
}: ApplicationCardHeaderProps) => {
	const info = {
		id,
		creator: fullName,
		name,
		date: createdAt,
		status,
		type,
		finalizePeriod,
	};
	const [showPopup, setShowPopup] = useState(false);
	const [isManager, setIsManager] = useState(false);
	const [isExpert, setIsExpert] = useState(false);
	const { state } = useLocation();
	const roles = useUserRole();
	const apiUrl = `${baseApiUrl}/${api}/${id}/get-pdf/`;
	const backLink = state?.from ? state.from : `/${url}`;
	const isAgenda = type === "agenda";
	const isCommission = type === "commission_control";
	const isPresidium = type === "presidium";
	const hasCurator =
		type === "odo" ||
		type === "oo" ||
		type === "vv" ||
		type === "extract" ||
		type === "termination";

	useEffect(() => {
		if (roles)
			roles.map(({ id }) => {
				if (id === managerRoleId) setIsManager(true);
				if (id === headExpertRoleId) setIsExpert(true);
			});
	}, [roles]);

	const getPdf = () => window.open(apiUrl, "_blank");

	return (
		<Container>
			<BackIconButton link={backLink} />
			<Content>
				<ApplicationItemInfo {...info} titleSize='h2' />
				<LeftBlock>
					{hasCurator &&
						curator !== undefined &&
						!(curator === null && isManager) && (
							<ResponsibleUser user={curator} />
						)}
					{isAgenda && (
						<>
							{presidium ? (
								<Link
									to={`/protocols-presidium/${presidium.id}`}
									className='button-link'>
									{presidium.name}
								</Link>
							) : (
								<>
									<Button
										variant='outlined'
										onClick={() => setShowPopup(true)}
										secondary>
										Выбрать протокол президиума
									</Button>
									<Popup active={showPopup} afterClose={setShowPopup}>
										<PresidiumPopup afterClose={setShowPopup} id={id} />
									</Popup>
								</>
							)}
						</>
					)}
					{(isCommission || isPresidium) && clerk && (
						<ResponsibleUser user={clerk} type='secretary' />
					)}
					<Button
						variant='outlined'
						icon={<DownloadIcon />}
						onClick={getPdf}
						secondary>
						PDF
					</Button>
					{hasCurator && isManager && curator === null && (
						<>
							<Button onClick={() => setShowPopup(true)} secondary>
								Назначить куратора
							</Button>
							<Popup active={showPopup} afterClose={setShowPopup}>
								<ProtocolsPopup
									afterClose={setShowPopup}
									id={id}
									title='Добавить куратора'
									type='applications'
									url='add-curator'
									listType='radio'
								/>
							</Popup>
						</>
					)}
					{(isCommission || isPresidium) && isExpert && !clerk && (
						<>
							<Button onClick={() => setShowPopup(true)} secondary>
								Назначить секретаря
							</Button>
							<Popup active={showPopup} afterClose={setShowPopup}>
								<ProtocolsPopup
									afterClose={setShowPopup}
									id={id}
									title='Добавить секретаря'
									type={isPresidium ? "presidium" : "commission_controls"}
									url='clerk'
									listType='radio'
								/>
							</Popup>
						</>
					)}
				</LeftBlock>
			</Content>
		</Container>
	);
};

export default ApplicationCardHeader;
