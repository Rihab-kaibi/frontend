import {
	ActionIcon,
	Button,
	Divider,
	Grid,
	Group,
	Loader,
	Pagination,
	Popover,
	Select,
	Switch,
	Table,
	Text,
	TextInput,
} from '@mantine/core';
import {
	IconAdjustments,
	IconChevronDown,
	IconDownload,
	IconFilter,
	IconSearch,
} from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';
import { tablePaginated } from '@/types/table';
import { Demo } from '../Shared/Menu';

interface CustomTableProps {
	data: [];
	addButtonTitle?: string;
	addButton?: boolean;
	isLoading: boolean;
	columns: any[];
	search: string;
	setSearch: Dispatch<SetStateAction<string>>;
	filterArray: any[];
	setPage: Dispatch<SetStateAction<number>>;
	page: number;
	paginated: tablePaginated;
	setPageSize: Dispatch<SetStateAction<string>>;
	pageSize: string;
	addButtonLink: string;
}

export default function CustomDataTable({
	columns,
	search,
	setSearch,
	isLoading,
	setPage,
	setPageSize,
	pageSize,
	data,
	functionExportList,
	exported,
	setExported,
	newElement,
	setnewElement,
	accesFilter,
	setAccesFilter,
}: any) {
	const handleChangeFilter = (checked: boolean) => {
		console.log('checked', checked);
		setAccesFilter(checked);

		if (!checked) {
			setExported('');
			setnewElement('');
		}
	};

	return (
		<>
			<Grid mt={5}>
				<Grid.Col span={2} onClick={() => functionExportList()}>
					<Button size="xs" rightSection={<IconDownload size={14} />}>
						Télécharger
					</Button>
				</Grid.Col>
				<Grid.Col display={'flex'} style={{ alignItems: 'center' }} span={2} offset={8}>
					{' '}
					<TextInput
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder="Search"
						variant="filled"
						leftSection={<IconSearch size="0.8rem" />}
						style={{}}
					/>
					<Popover width={400} trapFocus position="bottom" withArrow shadow="md">
						<Popover.Target>
							<ActionIcon variant="filled" ml={9} aria-label="Settings">
								<IconFilter style={{ width: '70%', height: '70%' }} stroke={1.5} />
							</ActionIcon>
						</Popover.Target>
						<Popover.Dropdown>
							<Switch
								onChange={e => handleChangeFilter(e.target.checked)}
								checked={accesFilter}
								labelPosition="left"
								label="Filtre"
							/>
							<Divider mt={10} />
							<Group mt="xs">
								<Switch
									disabled={!accesFilter}
									onChange={e => setExported(e.target.checked === true ? '1' : '0')}
									checked={exported === '1' ? true : false}
									labelPosition="left"
									label="Exporté"
								/>
								<Switch
									disabled={!accesFilter}
									onChange={e => setnewElement(e.target.checked === true ? '1' : '0')}
									checked={newElement === '1' ? true : false}
									labelPosition="left"
									label="Nouveau"
								/>
							</Group>
						</Popover.Dropdown>
					</Popover>
				</Grid.Col>
			</Grid>

			<Table.ScrollContainer mt={15} minWidth={500}>
				<Table striped>
					<Table.Thead>
						<Table.Tr>
							{columns.map((item: any, key: any) => (
								<Table.Th style={{ color: '#696969' }} key={key}>
									{item.headerName}{' '}
								</Table.Th>
							))}
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{data?.data?.map((row: any) => (
							<Table.Tr key={row.id}>
								{columns?.map((item: any, index: number) => (
									<Table.Td key={index}>{item.renderCell(row)}</Table.Td>
								))}
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</Table.ScrollContainer>

			{isLoading && (
				<Group justify="center">
					<Loader size={30} />
					<Text>Loading...</Text>
				</Group>
			)}
			<Group justify="flex-end" mt="sm">
				<Select
					maw={90}
					size="xs"
					radius="md"
					rightSection={<IconChevronDown size="1rem" />}
					rightSectionWidth={30}
					styles={{ rightSection: { pointerEvents: 'none' } } as any}
					defaultValue={pageSize}
					data={['10', '25', '50', '100']}
					onChange={event => setPageSize(event ?? '10')}
				/>
				<Pagination
					value={data?.current_page}
					onChange={setPage}
					total={data?.last_page}
					size="sm"
					withEdges
					radius="md"
				/>
			</Group>
		</>
	);
}
