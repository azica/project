import { useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ListItem } from "components/ListItem";
import { Voting } from "components/Voting";
import { ApplicationProps } from "utils/types";
import { getPathByType } from "utils/helpers";
import { List, ItemWrapper } from "./styles";

interface ApplicationsListProps {
	content: ApplicationProps[];
	detail?: boolean;
	size?: "small";
	protocol?: {
		type: "commission_controls" | "presidium";
		id?: number;
		showVote?: boolean;
	};
	light?: boolean;
}

export const ApplicationsList = ({
	content,
	detail,
	size,
	protocol,
	light,
}: ApplicationsListProps) => {
	const { pathname, search } = useLocation();

	const setUrl = (id: number, type?: string) => {
		let link = "";
		if (detail) link = getPathByType(type);
		return link + id;
	};

	return (
		<List>
			<TransitionGroup component={null}>
				{content.map(
					({
						id,
						createdAt,
						linkedId,
						result,
						name,
						fullName,
						type,
						voting,
						...other
					}, index) => (
						<CSSTransition key={`${id}${index}`} classNames='grow' timeout={250}>
							<ItemWrapper>
								<ListItem
									url={`${setUrl(id, type)}`}
									wrapperClass={`application-item ${size ? size : ""}`}
									from={pathname + search}
									size={size}
									light={light}
									content={{
										...other,
										id,
										date: createdAt,
										type: "application",
										content: {
											creator: fullName,
											type,
											result,
											name,
										},
									}}
								/>
								{voting !== undefined && protocol && protocol.showVote && (
									<Voting
										api={`${protocol.type}/${protocol.id}`}
										id={id}
										voting={voting}
									/>
								)}
							</ItemWrapper>
						</CSSTransition>
					),
				)}
			</TransitionGroup>
		</List>
	);
};
