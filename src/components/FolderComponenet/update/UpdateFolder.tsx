'use client';
import { useGetDetailsFolders, useUpdateFolder } from '@/services/folder.service';
import { Box, Button, Card, Grid, Group, TextInput } from '@mantine/core';
import { DateInput, DatesProvider } from '@mantine/dates';
import { DatePickerInput } from '@mantine/dates';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import '@mantine/dates/styles.css';
import { CustomDropzone } from '@/components/Shared/CustomDropzone';
import { map } from 'zod';
const UpdateFolder = ({ id }: any) => {
	const router = useRouter();
	const { data: detailsFolder, isSuccess } = useGetDetailsFolders({ id });
	const updateFolderMutation = useUpdateFolder();

	const [name, setName] = useState<string>('');
	const [adresse, setadresse] = useState<string>('');
	const [phone_number, setPhone_number] = useState<string>('');
	const [society, setSociety] = useState<string>('');
	const [category, setcategory] = useState<string>('');
	const [shab, setShab] = useState<string>('');
	const [modeChauffage, setModeChaufage] = useState<string>('');
	const [scenario, setScenario] = useState<string>('');
	const [date, setDate] = useState<Date | null>(null);
	const [path, setPath] = useState<string>('');
	const [files, setfiles] = useState([]);
	const [trv, setTrv] = useState<string[]>([]);

	useEffect(() => {
		detailsFolder && setName(detailsFolder?.name);
		setadresse(detailsFolder?.adresse);
		setPhone_number(detailsFolder?.phone_number);
		setSociety(detailsFolder?.society);
		setcategory(detailsFolder?.category);
		setDate(detailsFolder?.date ? moment(detailsFolder?.date).toDate() : null);
		setPath(detailsFolder?.path);
		setfiles(detailsFolder?.files);
		setShab(detailsFolder?.shab);
		setModeChaufage(detailsFolder?.mode_chauffage);
		setScenario(detailsFolder?.scenario_one);
		setTrv(detailsFolder?.trv);
	}, [detailsFolder]);

	const handleUpdateFolder = async () => {
		const data = {
			name: name,
			adresse: adresse,
			phone_number: phone_number,
			society: society,
			category: category,
			path: path,
			shab: shab,
			scenario_one: scenario,
			mode_chauffage: modeChauffage,
			trv: trv,
			exported: detailsFolder?.exported,
			new: detailsFolder.new,
			date: date ? moment(date).format('YYYY-MM-DD') : null,
		};
		try {
			await updateFolderMutation.mutateAsync({
				values: data,
				id,
			});

			router.push('/dashboard/folder');
		} catch (error: any) {}
	};
	return (
		<>
			<Card style={{ height: '100%' }}>
				<Grid>
					<Grid.Col span={6}>
						<TextInput
							label="Nom"
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder="nom"
							required
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							label="Adresse"
							value={adresse}
							onChange={e => setadresse(e.target.value)}
							placeholder="Adresse"
							required
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							label="Numéro de téléphone"
							value={phone_number}
							onChange={e => setPhone_number(e.target.value)}
							placeholder="Numéro de téléphone"
							required
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							label="Société"
							value={society}
							onChange={e => setSociety(e.target.value)}
							placeholder="Société"
							required
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							label="Catégorie"
							value={category}
							onChange={e => setcategory(e.target.value)}
							placeholder="Catégorie"
							required
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							label="Surface habitable"
							value={shab}
							onChange={e => setShab(e.target.value)}
							placeholder="SHAB"
							required
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							label="Mode de chauffage"
							value={modeChauffage}
							onChange={e => setModeChaufage(e.target.value)}
							placeholder="Mode de chauffage"
							required
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<TextInput
							label="Scenario perioritaire"
							value={scenario}
							onChange={e => setScenario(e.target.value)}
							placeholder="scenario perioritaire"
							required
						/>
					</Grid.Col>
					<Grid.Col span={6}>
						<DateInput
							label="Date"
							value={date}
							onChange={setDate}
							placeholder="Date"
							name="date"
							valueFormat="DD/MM/YYYY"
						/>
					</Grid.Col>

					{trv?.map((item: any, index: number) => (
						<Grid.Col span={6} key={index}>
							<TextInput
								label="TRV"
								value={item}
								onChange={e => {
									const newTrv = [...trv];
									newTrv[index] = e.target.value;
									setTrv(newTrv);
								}}
								placeholder="TRV"
								required
							/>
						</Grid.Col>
					))}
				</Grid>
				<Group justify="flex-end">
					<Button maw={150} size="xs" onClick={handleUpdateFolder} fullWidth mt="md">
						Modifier
					</Button>
				</Group>
			</Card>

			<Card mt={14}>
				<CustomDropzone detailsFolder={detailsFolder} id={detailsFolder?.id} />
			</Card>
		</>
	);
};

export default UpdateFolder;
