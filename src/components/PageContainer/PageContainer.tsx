import {
	Anchor,
	Breadcrumbs,
	Container,
	ContainerProps,
	Group,
	Space,
	ThemeIcon,
	Title,
} from '@mantine/core';
import { FC, ReactNode } from 'react';

type PageContainerProps = {
	children: ReactNode;
	title: string;
	items?: { label: string; href: string }[];
	icon?: React.FC<any>;
} & Pick<ContainerProps, 'fluid'>;

export const PageContainer: FC<PageContainerProps> = ({
	children,
	title,
	items,
	fluid = true,
	icon: Icon,
}) => {
	return (
		<Container px={0} fluid={fluid}>
			{items && items.length > 0 ? (
				<Breadcrumbs>
					{items.map(item => (
						<Anchor key={item.label} href={item.href}>
							{item.label}
						</Anchor>
					))}
				</Breadcrumbs>
			) : null}
			<Group>
				{/* <ThemeIcon variant="light" size={30}>
					<Icon size="1.1rem" />
				</ThemeIcon> */}
				<Title order={4}>{title}</Title>
			</Group>

			<Space h="lg" />

			{children}
		</Container>
	);
};
