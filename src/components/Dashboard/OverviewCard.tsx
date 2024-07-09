'use client';

import { useGetNumberOfScanMonthly } from '@/services/Static.service';
import { Card, Title } from '@mantine/core';
import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
	responsive: true,
	smooth: true,
	plugins: {
		legend: {
			position: 'top' as const,
		},
	},
};

const labels = [
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Août',
	'Septembre',
	'Octobre',
	'Novembre',
	'Décembre',
];

export function OverviewCard() {
	const { data: nbScanMonthly } = useGetNumberOfScanMonthly();

	const data = {
		labels,
		datasets: [
			{
				label: 'Nombre',
				data: nbScanMonthly,
				tension: 0.4,
				borderColor: '#0891b2',
				backgroundColor: '#0891b2',
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
			<Title order={5}>{`Nombre d'analyses mensuelles`}</Title>
			<Line options={options} data={data} />
		</Card>
	);
}
