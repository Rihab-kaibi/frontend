'use client';
import { Avatar, Group, Menu, rem, UnstyledButton } from '@mantine/core';

import { IconArrowsLeftRight } from '@tabler/icons-react';
import { forwardRef } from 'react';
import userprofille from '@/assets/userprofille.jpg';
import { useAuth } from '@/hooks/useAuth';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
	image: string;
	name: string;
	email: string;
	icon?: React.ReactNode;
}

// eslint-disable-next-line react/display-name
const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
	({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
		<UnstyledButton
			ref={ref}
			style={{
				padding: '0',
				color: 'var(--mantine-color-text)',
				borderRadius: 'var(--mantine-radius-sm)',
			}}
			{...others}
		>
			<Group>
				<Avatar src={userprofille.src} radius="xl" />
			</Group>
		</UnstyledButton>
	),
);

export function ToggleUser() {
	const auth = useAuth();
	const handleLogout = () => {
		auth.logout();
	};
	return (
		<Menu shadow="md" width={200}>
			<Menu.Target>
				<UserButton email="" image="" name="" />
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item
					onClick={() => handleLogout()}
					leftSection={<IconArrowsLeftRight style={{ width: rem(14), height: rem(14) }} />}
				>
					Se déconnecter
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
