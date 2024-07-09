'use client';

// ** React Imports
import { useRouter } from 'next/navigation';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

import toast from 'react-hot-toast';

// ** Next Import

// ** Axios
import axiosClient from 'axiosClient';
import authConfig from 'src/config/auth';
import { any, RawCreateParams, ZodAny } from 'zod';
// ** Config

type AuthContextType = {
	user: null | any; // Replace 'any' with the actual type of your user
	isLoggedIn: boolean;
	isPending: boolean;
	loading: boolean;
	errMsg: string;
	setUser: Dispatch<SetStateAction<null | any>>; // Replace 'any' with the actual type of your user
	setLoading: Dispatch<SetStateAction<boolean>>;
	login: (params: any, errorCallback: any) => Promise<void>;
	logout: () => Promise<void>;
};

// ** Defaults
const defaultProvider: AuthContextType = {
	user: null,
	loading: true,
	isLoggedIn: false,
	setLoading: () => {},
	login: async () => {},
	logout: async () => {},
	setUser: () => {},
	isPending: false,
	errMsg: '',
};

const AuthContext = createContext<AuthContextType>(defaultProvider);

const AuthProvider = ({ children }: { children: ReactNode }) => {
	// ** States
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(defaultProvider.loading);
	const [isLoggedIn, setIsloggedIn] = useState<boolean>(false);
	const [isPending, setIsPending] = useState(false);
	const [errMsg, setErrMsg] = useState('');

	// ** Hooks
	const router = useRouter();
	useEffect(() => {
		const initAuth = async () => {
			// const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
			await axiosClient
				.get('/logged-user')
				.then(async response => {
					setUser(response.data);
					setLoading(false);
					setIsloggedIn(true);
					router.replace('/dashboard');
				})
				.catch(() => {
					setUser(null);
					setLoading(false);
					setIsloggedIn(false);
					router.replace('/login');
				});
		};
		initAuth();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleLogin = async (params: any, errorCallback: any): Promise<void> => {
		setIsPending(true);
		setLoading(true);
		await axiosClient
			.post(`/login`, { ...params })
			.then(async response => {
				setUser(response.data.result);
				window.localStorage.setItem('userData', JSON.stringify(response.data.result));
				window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.result);
				setIsloggedIn(true);
				setIsPending(false);
				setErrMsg('');
				setLoading(false);
				// params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
				const redirectURL = '/dashboard/folder';
				router.replace(redirectURL);
			})
			.catch(err => {
				if (errorCallback) errorCallback(err);
				setLoading(false);
				if (err?.response?.status == '404') {
					setErrMsg(err?.response?.data?.result);
				} else {
					toast.error(err?.response?.data?.result);
				}
				setLoading(false);
				setIsPending(false);
			});
	};

	const handleLogout = async () => {
		await axiosClient
			.get('/logout')
			.then(async response => {
				setUser(null);
				setIsloggedIn(false);
				window.localStorage.removeItem('userData');
				window.localStorage.removeItem(authConfig.storageTokenKeyName);
				router.push('/login');
			})
			.catch(() => {});
	};

	const values = {
		user,
		isLoggedIn,
		isPending,
		loading,
		errMsg,
		setUser,
		setLoading,
		login: handleLogin,
		logout: handleLogout,
	};

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
