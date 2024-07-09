import {
	useMutation,
	UseMutationOptions,
	UseMutationResult,
	useQuery,
	useQueryClient,
	UseQueryResult,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import axiosClient from 'axiosClient';

type statsTypeFolder = string;

// number of scan monthly
export const useGetNumberOfScanMonthly = () => {
	return useQuery({
		queryKey: ['scan monthly'],

		queryFn: () => axiosClient.get(`stats/scan/monthly`).then(res => res.data),
	});
};
export const useGetNumberOfScan = () => {
	return useQuery({
		queryKey: ['scan '],

		queryFn: () => axiosClient.get(`stats/scan`).then(res => res.data),
	});
};
const fetchStatsFoldersByType = async (type: statsTypeFolder): Promise<any> => {
	const parsed = await axiosClient.get(`stats/folders?by=${type}`);
	return parsed.data;
};

export const useGetStatsFolder = (type: statsTypeFolder): UseQueryResult<[]> =>
	useQuery({
		queryKey: ['stats folders', type],
		queryFn: () => fetchStatsFoldersByType(type),
	});
