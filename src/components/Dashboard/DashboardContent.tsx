'use client';

import { Grid, GridCol } from '@mantine/core';
import { OverviewCard } from './OverviewCard';
import { ScanAndCountFolder } from './ScanAndCountFolder';
import { StatsFolderByCategories } from './StatsFolderByCategories';
import { StatsFolderBySociety } from './StatsFolderBySociety';

export function DashboardContent() {
	return (
		<Grid>
			<GridCol span={{ sm: 12, md: 12, lg: 6 }}>
				<OverviewCard />
			</GridCol>
			<GridCol span={{ sm: 12, md: 12, lg: 6 }}>
				<ScanAndCountFolder />
			</GridCol>
			<GridCol span={{ sm: 12, md: 12, lg: 6 }}>
				<StatsFolderByCategories />
			</GridCol>
			<GridCol span={{ sm: 12, md: 12, lg: 6 }}>
				<StatsFolderBySociety />
			</GridCol>
		</Grid>
	);
}
