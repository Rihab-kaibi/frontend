'use client';

import React from 'react';
import UpdateFolder from '@/components/FolderComponenet/update/UpdateFolder';


const Page = ({
	params,
}: {
	params: {
		id: string;
	};
}) => {
	
	return (
		<>
			<UpdateFolder id={params.id} />
		</>
	);
};

export default Page;
