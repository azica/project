import { AvatarProps } from "utils/types";
import { liteBlue } from "styles/colors";
import { Wrapper, Text, Image } from "./styles";

export const Avatar = ({ image, name, color }: AvatarProps) => {
	const splitingName = name && name.split(" ");
	const initials = splitingName
		? `${splitingName[0].substring(0, 1)}${
				splitingName[1] ? splitingName[1].substring(0, 1) : ""
		  }`
		: "?";
	return (
		<Wrapper
			className={!name ? "no-user" : undefined}
			style={{ background: color ? color : liteBlue }}>
			{image ? (
				<Image>
					<img src={image.url} alt={image.name} />
				</Image>
			) : (
				<Text>{initials}</Text>
			)}
		</Wrapper>
	);
};
