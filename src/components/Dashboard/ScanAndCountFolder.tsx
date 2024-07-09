'use client';

import { useGetNumberOfScan, useGetStatsFolder } from '@/services/Static.service';
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
import moment from 'moment';
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

export function ScanAndCountFolder() {
	const { data: statsNumberScanAndFolder } = useGetNumberOfScan();
	const data = {
		labels: statsNumberScanAndFolder?.map((item: any) =>
			moment(item.created_at).format('DD-MM-YYYY'),
		),
		datasets: [
			{
				label: 'Nombre',
				data: statsNumberScanAndFolder?.map((item: any) =>
					item.count_folder == null ? 0 : item.count_folder,
				),
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
			<Title order={5}>Overview</Title>
			<Line options={options} data={data} />
		</Card>
	);
}
