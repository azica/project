import { useCallback, forwardRef } from "react";
import { useSnackbar, SnackbarContent } from "notistack";
import { AlertColor } from "@mui/material";
import { CloseIcon, WarningIcon, SuccessIcon } from "assets/icons";
import { IconButton } from "components/IconButton";
import { Conteiner, Title, Description } from "./styles";

interface AlertProps {
	message: string;
	description?: string;
	id: number | string;
	variant: AlertColor;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
	({ id, variant, description, message }, ref) => {
		const { closeSnackbar } = useSnackbar();

		const handleClose = useCallback(() => {
			closeSnackbar(id);
		}, [id, closeSnackbar]);

		return (
			<SnackbarContent ref={ref}>
				<Conteiner
					severity={variant ? variant : "success"}
					onClose={handleClose}
					iconMapping={{
						success: <SuccessIcon />,
						error: <WarningIcon />,
					}}
					action={
						<IconButton onClick={handleClose}>
							<CloseIcon />
						</IconButton>
					}>
					<Title>{message}</Title>
					{description && <Description>{description}</Description>}
				</Conteiner>
			</SnackbarContent>
		);
	},
);

Alert.displayName = "Alert";

export default Alert;
