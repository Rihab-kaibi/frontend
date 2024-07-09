import { IconComponents, IconDashboard, IconFiles, IconFolders,IconLock,IconMoodSmile } from '@tabler/icons-react';
import { NavItem } from '@/types/nav-item';

export const navLinks: NavItem[] = [
	{ label: 'Dashboard', icon: IconDashboard, link: '/dashboard' },
	{ label: 'Dossier', icon: IconFolders, link: '/dashboard/folder' },
	// { label: 'Fichier', icon: IconFiles, link: '/dashboard/file' },
	// {
	// 	label: 'Components',
	// 	icon: IconComponents,
	// 	initiallyOpened: false,
	// 	links: [
	// 		{
	// 			label: 'Table',
	// 			link: '/dashboard/table',
	// 		},
	// 		{
	// 			label: 'Form',
	// 			link: '/dashboard/form',
	// 		},
	// 	],
	// },
	// {
	// 	label: 'Auth',
	// 	icon: IconLock,
	// 	initiallyOpened: true,
	// 	links: [
	// 		{
	// 			label: 'Login',
	// 			link: '/login',
	// 		},
	// 		{
	// 			label: 'Register',
	// 			link: '/register',
	// 		},
	// 	],
	// },
	// {
	// 	label: 'Sample',
	// 	icon: IconMoodSmile,
	// 	initiallyOpened: true,
	// 	links: [
	// 		{
	// 			label: 'Landing',
	// 			link: '/',
	// 		},
	// 	],
	// },
];
