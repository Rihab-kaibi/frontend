'use client';
import { Box, Title } from '@mantine/core';

import AuthGuard from '@/@core/auth/AuthGuard';
import FallbackSpinner from '@/@core/Loader';
import classes from './(auth)/layout.module.css';
import Login from './(auth)/login/page';

export default function Page() {
	return (
		<Box className={classes.wrapper}>
			<Title order={1} fw="bolder">
				EXTRACTEUR
			</Title>
			<Box w={400}>
				<Login />
			</Box>
		</Box>
	);
}
