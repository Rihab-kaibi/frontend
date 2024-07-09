import {
	ActionIcon,
	Button,
	Group,
	Menu,
	Popover,
	rem,
	Select,
	Switch,
	Text,
	TextInput,
} from '@mantine/core';
import { IconFilter } from '@tabler/icons-react';

export function Demo() {
	return (
		<Popover width={400} trapFocus position="bottom" withArrow shadow="md">
			<Popover.Target>
				<ActionIcon variant="filled" ml={9} aria-label="Settings">
					<IconFilter style={{ width: '70%', height: '70%' }} stroke={1.5} />
				</ActionIcon>
			</Popover.Target>
			<Popover.Dropdown>
				<Group mt="xs">
					<Switch value="react" checked={true}  labelPosition='left' label="Exporté" />
					<Switch value="react"checked={true}  labelPosition='left' label="Nouveau" />
				</Group>
			</Popover.Dropdown>
		</Popover>
		// <Menu shadow="md" width={500}>
		// 	<Menu.Target>
		// 		<IconFilter style={{ width: '70%', height: '70%' }} stroke={1.5} />
		// 	</Menu.Target>

		// 	<Menu.Dropdown>
		// 		<Menu.Label>Application</Menu.Label>
		// 		<Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
		// 			<Switch.Group
		// 				defaultValue={['react']}
		// 				label="Select your favorite framework/library"
		// 				description="This is anonymous"
		// 				withAsterisk
		// 			>
		// 				<Group mt="xs">
		// 					<Switch value="react" label="React" />
		// 					<Switch value="svelte" label="Svelte" />
		// 					<Switch value="ng" label="Angular" />
		// 					<Switch value="vue" label="Vue" />
		// 				</Group>
		// 			</Switch.Group>
		// 		</Menu.Item>

		// 	</Menu.Dropdown>
		// </Menu>
	);
}
