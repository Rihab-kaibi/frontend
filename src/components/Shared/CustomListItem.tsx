import { Box, Group, Input, rem, Text, ThemeIcon } from '@mantine/core';
import { IconDeviceFloppy, IconEye, IconFile, IconPencil, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useDeleteFile, useUpdateFile, useUpdateFolder } from '@/services/folder.service';
import CustomModal from './CustomModal';
import classes from './listItem.module.css';

interface File {
	id: string;
	name: string;
}

interface CustomListItemProps {
	files: any[];
	showIcon: boolean;
	showName: boolean;
	onChangeNameFile: (value: any, index: number) => void;
}

export function CustomListItem({
	files,
	showIcon,
	showName,
	onChangeNameFile,
}: CustomListItemProps) {
	const [fileSelected, setfileSelected] = useState<string | null>(null);
	const [open, setOpen] = useState(false);
	const [updateName, setUpdateName] = useState(false);
	const [fileName, setFileName] = useState('');
	const [indexFile, setIndexFile] = useState<number | null>(null);
	const deleteFileMutation = useDeleteFile();
	const updateFilesMutation = useUpdateFile();
	const viewFile = (file: string) => {
		setOpen(true);
		setfileSelected(file);
	};

	const handleDeleteFile = async (fileId: string) => {
		try {
			await deleteFileMutation.mutateAsync(fileId);
		} catch (error) {
			console.error('Error deleting file:', error);
		}
	};
	const updateNameFile = (file: any, index: number) => {
		setUpdateName(true);
		setFileName(file?.name);
		setIndexFile(index);
	};
	const handleUpdateName = async (file: any) => {
		setUpdateName(false);
		const formData = new FormData();
		const data = {
			name: fileName,
		};

		formData.append(`files[${indexFile}].[name]`, fileName);
		try {
			await updateFilesMutation.mutateAsync({
				values: data,
				id: file.id,
			});
		} catch (error: any) {}
	};
	return (
		<>
			<Group>
				{files?.map((file, index) => (
					<Box py={14} px={20} key={index} className={classes.itemList}>
						{/* <ThemeIcon color="blue" size={24} radius="xl"> */}
						<IconFile style={{ width: rem(19), height: rem(19) }} />
						{/* </ThemeIcon> */}
						<Box ml={6} style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
							{updateName && indexFile === index ? (
								<Group>
									{showName ? (
										<Input
											value={file?.nom}
											size="md"
											onChange={e => onChangeNameFile(e?.target?.value || '', index)}
										/>
									) : (
										<Input value={fileName} size="xs" onChange={e => setFileName(e.target.value)} />
									)}

									{!showName && (
										<IconDeviceFloppy
											color="#0D68C6"
											// onClick={() => updateNameFile(file, index)}
											style={{
												width: rem(18),
												height: rem(18),
												cursor: 'pointer',
												marginRight: '5px',
											}}
											onClick={() => handleUpdateName(file)}
										/>
									)}
								</Group>
							) : (
								<Text>{showName ? file?.nom : file?.name}</Text>
							)}

							<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
								{showIcon && (
									<>
										<IconEye
											color="#0D68C6"
											onClick={() => viewFile(file)}
											style={{
												width: rem(18),
												height: rem(18),
												cursor: 'pointer',
												marginRight: '5px',
											}}
										/>
										<IconPencil
											color="#0D68C6"
											onClick={() => updateNameFile(file, index)}
											style={{
												width: rem(18),
												height: rem(18),
												cursor: 'pointer',
												marginRight: '5px',
											}}
										/>
										<IconTrash
											onClick={() => handleDeleteFile(file?.id)}
											color="red"
											style={{
												width: rem(18),
												height: rem(18),
												cursor: 'pointer',
												marginRight: '5px',
											}}
										/>
									</>
								)}

								{showName &&
									(updateName && indexFile == index ? (
										<IconDeviceFloppy
											color="#0D68C6"
											// onClick={() => updateNameFile(file, index)}
											style={{
												width: rem(18),
												height: rem(18),
												cursor: 'pointer',
												marginRight: '5px',
											}}
											onClick={() => handleUpdateName(file)}
										/>
									) : (
										<IconPencil
											color="#0D68C6"
											onClick={() => updateNameFile(file, index)}
											style={{
												width: rem(18),
												height: rem(18),
												cursor: 'pointer',
												marginRight: '5px',
											}}
										/>
									))}
							</div>
						</Box>
					</Box>
				))}
			</Group>

			<CustomModal open={open} closeModal={() => setOpen(false)} file={fileSelected} />
		</>
	);
}
