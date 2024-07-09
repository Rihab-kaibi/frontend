import { ActionIcon, Box, Button, Grid, Group, Image, rem, Text, Title } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import {
	IconCloudDownload,
	IconFileTypeZip,
	IconPhoto,
	IconUpload,
	IconX,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useAddFilesToFolder } from '@/services/folder.service';
import { CustomListItem } from './CustomListItem';

export function CustomDropzone(props: Partial<DropzoneProps> | any) {
	const { detailsFolder, id } = props;
	const [files, setfiles] = useState<any[]>([]);
	const addFilesToFolderMutation = useAddFilesToFolder();

	const onChangeFiles = (values: any[]) => {
		const filesWithDefaultNames = values.map(file => {
			return { file, nom: file.name };
		});

		setfiles(filesWithDefaultNames);
	};
	const onChangeNameFile = (value: string | undefined, index: number) => {
		const updatedFiles = [...files];
		updatedFiles[index].nom = value;
		setfiles(updatedFiles);
	};

	const dowloadAllFileZip = async () => {
		window.open(`${process.env.baseUrl}/web/folders/${id}/zip`, '_blank');
	};

	const handleAddFiles = async () => {
		const formData = new FormData();
		files?.map((file, index) => {
			formData.append(`files[${index}][file]`, file.file);

			formData.append(`files[${index}][name]`, file.nom);

			formData.append(`files[${index}][method]`, '1');
		});
		try {
			await addFilesToFolderMutation.mutateAsync({
				values: formData,
				id: id,
			});
		} catch (error: any) {}
	};

	return (
		<Grid>
			<Grid.Col span={12}>
				<Box
					style={{
						border: '2px dashed #0D68C6',
						borderRadius: '10px',
						backgroundColor: '#3a84d00d',
					}}
				>
					<Dropzone
						onDrop={files => onChangeFiles(files)}
						onReject={files => console.log('rejected files', files)}
						maxSize={5 * 1024 ** 2}
						accept={IMAGE_MIME_TYPE}
						{...props}
					>
						<Group justify="center" gap="xl" mih={120} style={{ pointerEvents: 'none' }}>
							<Dropzone.Accept>
								<IconUpload
									style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
									stroke={1.5}
								/>
							</Dropzone.Accept>
							<Dropzone.Reject>
								<IconX
									style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
									stroke={1.5}
								/>
							</Dropzone.Reject>
							<Dropzone.Idle>
								{/* <IconPhoto
									style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
									stroke={1.5}
								/> */}
								<IconCloudDownload
									color="#0D68C6"
									style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
									stroke={1.5}
								/>
							</Dropzone.Idle>

							<div>
								<Text size="md" inline>
									Faites glisser les images ici ou{' '}
									<Text style={{ color: '#0D68C6', textDecoration: 'underline' }}>
										cliquez pour sélectionner des fichiers
									</Text>
								</Text>
							</div>
						</Group>
					</Dropzone>
				</Box>
				<CustomListItem
					files={files}
					onChangeNameFile={onChangeNameFile}
					showIcon={false}
					showName={true}
				/>
				{files.length !== 0 && (
					<Box display={'flex'} mt={6} style={{ justifyContent: 'flex-end' }}>
						<Button onClick={handleAddFiles}>Ajouter</Button>
					</Box>
				)}
			</Grid.Col>
			<Grid.Col span={12}>
				<Box ml={20}>
					<Box display={'flex'} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
						<Title order={5}>Listes Des fichier </Title>
						<ActionIcon
							onClick={() => dowloadAllFileZip()}
							aria-label="default action icon"
							p={3}
							size="lg"
							color="blue"
						>
							<IconFileTypeZip size={25} />
						</ActionIcon>
					</Box>
					<CustomListItem
						onChangeNameFile={onChangeNameFile}
						files={detailsFolder?.files}
						showIcon={true}
						showName={false}
					/>
				</Box>
			</Grid.Col>
		</Grid>
	);
}
