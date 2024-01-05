import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { CircularProgress } from "@mui/material";
import { useRequest } from "utils/hooks";
import { baseApiUrl } from "utils/constants";
import { ImageProps } from "utils/types";
import { setUserAvatar } from "utils/store";
import { PhotoIcon } from "assets/icons";
import ava from "assets/images/avatar.svg";
import { Wrapper, Image, Uploader, Preloader } from "./styles";

interface AvatarUploaderProps {
	id: number;
	image: ImageProps | null;
	profile?: boolean;
}

export const AvatarUploader = ({ id, image, profile }: AvatarUploaderProps) => {
	const [avatar, setAvatar] = useState<ImageProps>({ url: ava, name: "" });
	const [isLoading, setIsLoading] = useState(false);
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const request = useRequest;
	const url = `${baseApiUrl}/users/${id}/avatar-upload/`;

	useEffect(() => {
		if (image) {
			setAvatar({ url: image.url, name: image.name });
		}
	}, [image]);

	const onFileChange = (event: any) => {
		const target = event.target;
		const { files } = target;
		const formData = new FormData();

		setIsLoading(true);
		formData.append("avatar", files[0]);
		setAvatar({ url: URL.createObjectURL(files[0]), name: files[0].name });

		request(url, { method: "PUT", data: formData }).then((res) => {
			const { data } = res;
 
			enqueueSnackbar("Запрос прошел успешно!", {
				variant: "success",
				description: "Фото профиля успешно изменено!",
			});
			if (profile) dispatch(setUserAvatar(data));

			setTimeout(() => {
				setIsLoading(false);
			}, 250);
		});
	};

	return (
		<Wrapper>
			{/* @ts-ignore */}
			<Uploader color='primary' aria-label='upload picture' component='label'>
				<input hidden accept='image/*' type='file' onChange={onFileChange} />
				<PhotoIcon />
			</Uploader>
			<Preloader show={`${isLoading}`}>
				<CircularProgress style={{ width: 24, height: 24 }} />
			</Preloader>
			<Image src={avatar.url} alt={avatar.name} />
		</Wrapper>
	);
};
