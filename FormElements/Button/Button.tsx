import { ReactNode } from "react";
import { ButtonPreloaderProps } from "utils/types";
import { ClipIcon } from "assets/icons";
import { ButtonPreloader } from "./ButtonPreloader";
import { ButtonCustom, Content, ButtomWrapper } from "./styles";

interface ButtonProps {
	variant?: "outlined" | "contained";
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	children: ReactNode;
	secondary?: boolean;
	link?: string;
	uploade?: boolean;
	uploadeProps?: {
		accept?: string;
		value?: string;
		files?: FileList | null;
		multiple?: boolean;
		onChange?: (value: any) => void;
	};
	icon?: ReactNode;
	onClick?: (value: any) => void;
	preloader?: ButtonPreloaderProps;
	fullWidth?: boolean;
	className?: string;
}

export const Button = ({
	type,
	variant,
	disabled,
	children,
	secondary,
	link,
	uploade,
	uploadeProps,
	icon,
	onClick,
	preloader,
	fullWidth,
	className,
}: ButtonProps) => {
	const component = uploade ? "label" : undefined;
	const needAnIcon = uploade ? <ClipIcon /> : null;
	const startIcon = icon ? icon : needAnIcon;

	return (
		<ButtomWrapper style={fullWidth ? { width: "100%" } : undefined}>
			<ButtonCustom
				variant={`${variant ? variant : "contained"}`}
				type={type}
				disabled={disabled}
				secondary={secondary ? `${secondary}` : undefined}
				onClick={onClick}
				href={link}
				inside={preloader && `${!preloader.outside}`}
				// @ts-ignore
				component={component}
				startIcon={startIcon}
				className={className}>
				<Content>
					{children}
					{preloader && !preloader.outside ? (
						<ButtonPreloader {...preloader} disabled={disabled} />
					) : null}
				</Content>
				{uploade ? (
					<input hidden accept='*' {...uploadeProps} type='file' />
				) : null}
			</ButtonCustom>
			{preloader && preloader.outside ? (
				<ButtonPreloader {...preloader} disabled={disabled} />
			) : null}
		</ButtomWrapper>
	);
};
