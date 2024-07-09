import { Group, Text } from '@mantine/core';
import { Menu, rem } from '@mantine/core';
import { IconDotsVertical, IconEye, IconPencil, IconTrash } from '@tabler/icons-react';
import moment from 'moment';

// export const columns = ["id", "name", "code"];
import { useRouter } from 'next/navigation';
import { useDeleteFolder } from '@/services/folder.service';

function RowOptions({ row }: any) {
	const router = useRouter();
	const deleteFolderMutation = useDeleteFolder();
	return (
		<Menu shadow="md" width={200}>
			<Menu.Target>
				<IconDotsVertical style={{ cursor: 'pointer', width: rem(18), height: rem(18) }} />
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item
					onClick={() => router.push(`/dashboard/folder/${row.id}/update`)}
					leftSection={<IconPencil style={{ width: rem(14), height: rem(14) }} />}
				>
					Modifier
				</Menu.Item>
				<Menu.Item
					color="red"
					// loading={deleteFolderMutation?.isLoading}
					onClick={async () => {
						await deleteFolderMutation.mutateAsync(row.id);
					}}
					leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
				>
					Supprimer
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
export const folderColumns = [
	{
		headerAlign: 'center',
		width: 10,
		field: 'path',
		headerName: 'Path',
		align: 'center',
		renderCell: (row: any) => {
			return (
				<Text fz="sm" fw={400}>
					{row?.path}
				</Text>
			);
		},
	},
	{
		headerAlign: 'center',
		width: 40,
		field: 'date',
		headerName: 'Date',
		align: 'center',
		renderCell: (row: any) => {
			return (
				<Text fz="sm" fw={400}>
					{moment(row?.date).format('DD/MM/YYYY')}
				</Text>
			);
		},
	},
	{
		headerAlign: 'center',
		width: 10,
		field: 'name',
		headerName: 'Nom',
		align: 'center',
		renderCell: (row: any) => {
			return (
				<Text fz="sm" fw={400}>
					{row?.name}
				</Text>
			);
		},
	},
	{
		headerAlign: 'center',
		width: 40,
		field: 'adresse',
		headerName: 'Adresse',
		align: 'center',
		renderCell: (row: any) => {
			return (
				<Text fz="sm" fw={400}>
					{row?.adresse}
				</Text>
			);
		},
	},
	{
		headerAlign: 'center',
		flex: 0.05,
		sortable: false,
		field: 'société',
		headerName: 'Société',
		align: 'center',
		renderCell: (row: any) => (
			<Text fz="sm" fw={400}>
				{row?.society}
			</Text>
		),
	},

	{
		headerAlign: 'center',
		flex: 0.05,
		sortable: false,
		field: 'phone_number',
		headerName: 'Numéro de téléphone',
		align: 'center',
		renderCell: (row: any) => (
			<Text fz="sm" fw={400}>
				{row?.phone_number}
			</Text>
		),
	},
	{
		headerAlign: 'center',
		flex: 0.05,
		sortable: false,
		field: 'exported',
		headerName: 'Exporté',
		align: 'center',
		renderCell: (row: any) => (
			<Text fz="sm" fw={400}>
				{row?.exported == 1 ? 'Oui' : 'Non'}
			</Text>
		),
	},
	{
		headerAlign: 'center',
		flex: 0.05,
		sortable: false,
		field: 'new',
		headerName: 'Nouveau',
		align: 'center',
		renderCell: (row: any) => (
			<Text fz="sm" fw={400}>
				{row?.new == 1 ? 'Oui' : 'Non'}
			</Text>
		),
	},
	{
		headerAlign: 'center',
		flex: 0.05,
		sortable: false,
		field: 'created_at',
		headerName: 'Date de création',
		align: 'center',
		renderCell: (row: any) => (
			<Text fz="sm" fw={400}>
				{moment(row?.created_at).format('DD/MM/YYYY')}
			</Text>
		),
	},
	{
		headerAlign: 'center',
		flex: 0.05,
		sortable: false,
		field: 'updated_at',
		headerName: 'Date de modification',
		align: 'center',
		renderCell: (row: any) => (
			<Text fz="sm" fw={400}>
				{moment(row?.updated_at).format('DD/MM/YYYY')}
			</Text>
		),
	},
	{
		headerAlign: 'center',
		flex: 0.05,
		sortable: false,
		field: 'updated_at',
		headerName: 'Action',
		align: 'center',
		renderCell: (row: any) => (
			<Group>
				{/* <div
					style={{
						backgroundColor: '#4BAE50',
						width: '25px',
						height: '25px',
						borderRadius: '50%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				> */}
				<IconEye style={{ width: rem(20), height: rem(20) }} />

				<RowOptions row={row} />
			</Group>
		),
	},
];
