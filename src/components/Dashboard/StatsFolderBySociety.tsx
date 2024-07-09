import { Card, Text } from '@mantine/core';
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useGetStatsFolder } from '@/services/Static.service';

export function StatsFolderBySociety() {
	const type = 'society';
	const { data: statsFolderBySociety } = useGetStatsFolder(type);
	ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top' as const,
			},
			title: {
				display: false,
				text: 'Chart.js Bar Chart',
			},
		},
	};

	const labels = statsFolderBySociety?.map((item: any) => item.society);
	const data = {
		labels,
		datasets: [
			{
				label: 'Nombre',
				data: statsFolderBySociety?.map((item: any) => item.count_folder),
				backgroundColor: 'rgba(255, 99, 132, 0.5)',
			},
		],
	};
	return (
		<Card
			radius="md"
			w="100%"
			h="100%"
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
		>
			<Text>Nombre des dossier par société</Text>
			<Bar options={options} data={data} />
		</Card>
	);
}
