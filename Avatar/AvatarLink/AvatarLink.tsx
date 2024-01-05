import { AvatarProps } from "utils/types";
import { Avatar } from "components/Avatar";
import { Container } from "./styles";

interface AvatarLinkProps extends AvatarProps {
	id: number;
}

export const AvatarLink = ({ id, ...avatar }: AvatarLinkProps) => (
	<Container to={`/staff/${id}`}>
		<Avatar {...avatar} />
	</Container>
);

export default AvatarLink;
