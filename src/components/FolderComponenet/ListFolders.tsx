'use client';

import { Card } from '@mantine/core';
import { IconFolders } from '@tabler/icons-react';
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer/PageContainer';

import CustomDataTable from '@/components/Table/CustomDataTable';
import { useGetFolders } from '@/services/folder.service';
import { folderColumns } from './folderColumns';
import { useAuth } from '@/hooks/useAuth';

const ListFolders = () => {
	const [search, setSearch] = useState<string>('');
	const [pageSize, setPageSize] = useState<string>('10');
	const [page, setPage] = useState<number>(1);
	const [exported, setExported] = useState<string>('');
	const [accesFilter, setAccesFilter] = useState(false);
	const [newElement, setnewElement] = useState('');
	const [filterArray] = useState<any[]>([]);

	const { data, isLoading } = useGetFolders({
		page,
		pageSize,
		paginated: true,
		search,
		exported,
		newElement,
	});

	const exportListFolders = async () => {
		window.open(`${process.env.baseUrl}/web/folders/exported?exported=0`, '_blank');
	};
	return (
		<PageContainer title="Liste des dossiers" icon={IconFolders}>
			<Card style={{ height: '80vh' }}>
				<CustomDataTable
					filterArray={filterArray}
					data={data}
					search={search}
					isLoading={isLoading}
					setSearch={setSearch}
					columns={folderColumns}
					addButtonTitle="Ajouter"
					addButtonLink={'/'}
					addButton={true}
					page={page}
					setPage={setPage}
					pageSize={pageSize}
					setPageSize={setPageSize}
					exportList={true}
					functionExportList={exportListFolders}
					exported={exported}
					setExported={setExported}
					newElement={newElement}
					setnewElement={setnewElement}
					accesFilter={accesFilter}
					setAccesFilter={setAccesFilter}
				/>
			</Card>
		</PageContainer>
	);
};

export default ListFolders;
