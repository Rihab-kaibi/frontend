import {
	useMutation,
	UseMutationOptions,
	UseMutationResult,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';
import { FolderUpdateModel } from '@/types/folderType';
import axiosClient from 'axiosClient';

//  les types
type DeleteFolderVariables = number | undefined;
type DeleteFileVariables = string | undefined;
type DeleteFolderResponse = AxiosResponse<void>;
type UpdateFolderResponse = AxiosResponse<FolderUpdateModel>;
type UpdateFolderVariables = {
	id: string | undefined;
	values: FolderUpdateModel | any;
};

// get all folders
export const useGetFolders = ({
	page,
	pageSize,
	paginated,
	search,
	exported,
	newElement,
}: {
	page: number;
	pageSize: string;
	paginated: boolean;
	search: string;
	exported: string;
	newElement: string;
}) => {
	return useQuery({
		queryKey: ['folders', page, pageSize, paginated, search, exported, newElement],

		queryFn: () =>
			axiosClient
				.get(
					`folders?${search ? `search=${search}` : ''}${paginated !== false ? `&paginated=true&page=${page}&page_size=${pageSize}` : ''}
					${exported ? `&exported=${exported}` : ''}${newElement ? `&new=${newElement}` : ''}`,
				)
				.then(res => res.data),
	});
};

// get details folder
export const useGetDetailsFolders = ({ id }: { id: number }) => {
	return useQuery({
		queryKey: ['details-folders', id],

		queryFn: () => axiosClient.get(`folders/${id}`).then(res => res.data),
	});
};

//  delete folder
const deleteFolder = async (id: DeleteFolderVariables): Promise<DeleteFolderResponse> => {
	const response = await axiosClient.delete(`folders/${id}`);
	return response;
};

export const useDeleteFolder = (): UseMutationResult<
	DeleteFolderResponse,
	Error,
	DeleteFolderVariables,
	unknown
> => {
	const queryClient = useQueryClient();
	const mutationConfig: UseMutationOptions = {
		mutationFn: (id: any) => deleteFolder(id as DeleteFolderVariables),
		onSuccess: () => {
			toast.success('Dossier supprimé avec succès');
			queryClient.invalidateQueries();
		},
	};

	return useMutation(mutationConfig) as UseMutationResult<
		DeleteFolderResponse,
		Error,
		DeleteFolderVariables,
		unknown
	>;
};

// update

const updateFolder = async ({
	id,
	values,
}: UpdateFolderVariables): Promise<UpdateFolderResponse> => {
	const response = await axiosClient.put(`folders/${id}`, values);
	return response;
};

export const useUpdateFolder = (): UseMutationResult<
	UpdateFolderResponse,
	Error,
	UpdateFolderVariables,
	unknown
> => {
	const mutationConfig: UseMutationOptions<
		UpdateFolderResponse,
		Error,
		UpdateFolderVariables,
		unknown
	> = {
		mutationFn: ({ id, values }) => updateFolder({ id, values }),
		onSuccess: () => {
			toast.success('Le Nom du fichier est modifié avec succès');
		},
		// onError: () => {
		//   toast.error("Verify Submitted Data");
		// },
	};

	return useMutation(mutationConfig);
};

// files
const deleteFile = async (id: DeleteFileVariables): Promise<DeleteFolderResponse> => {
	const response = await axiosClient.delete(`files/${id}`);
	return response;
};

export const useDeleteFile = (): UseMutationResult<
	DeleteFolderResponse,
	Error,
	DeleteFileVariables,
	unknown
> => {
	const queryClient = useQueryClient();
	const mutationConfig: UseMutationOptions<
		DeleteFolderResponse,
		Error,
		DeleteFileVariables,
		unknown
	> = {
		mutationFn: id => deleteFile(id),
		onSuccess: () => {
			toast.success('Fichier supprimé avec succès');
			queryClient.invalidateQueries();
		},
		// onError: () => {
		//   toast.error("Error deleting GroupModel");
		// },
	};
	return useMutation(mutationConfig);
};

const updateFile = async ({ id, values }: UpdateFolderVariables): Promise<UpdateFolderResponse> => {
	const response = await axiosClient.put(`files/${id}`, values);
	return response;
};

export const useUpdateFile = (): UseMutationResult<
	UpdateFolderResponse,
	Error,
	UpdateFolderVariables,
	unknown
> => {
	const queryClient = useQueryClient();
	const mutationConfig: UseMutationOptions<
		UpdateFolderResponse,
		Error,
		UpdateFolderVariables,
		unknown
	> = {
		mutationFn: ({ id, values }) => updateFile({ id, values }),
		onSuccess: () => {
			toast.success('Le Nom du fichier est modifié avec succès');
			queryClient.invalidateQueries();
		},
		// onError: () => {
		//   toast.error("Verify Submitted Data");
		// },
	};

	return useMutation(mutationConfig);
};

const addFilesToFolder = async ({
	id,
	values,
}: UpdateFolderVariables): Promise<UpdateFolderResponse> => {
	const response = await axiosClient.post(`folders/${id}/files`, values);
	return response;
};

export const useAddFilesToFolder = (): UseMutationResult<
	UpdateFolderResponse,
	Error,
	UpdateFolderVariables,
	unknown
> => {
	const queryClient = useQueryClient();
	const mutationConfig: UseMutationOptions<
		UpdateFolderResponse,
		Error,
		UpdateFolderVariables,
		unknown
	> = {
		mutationFn: ({ id, values }) => addFilesToFolder({ id, values }),
		onSuccess: () => {
			toast.success('Les fichiers ajputé avec succès');
			queryClient.invalidateQueries();
		},
		// onError: () => {
		//   toast.error("Verify Submitted Data");
		// },
	};

	return useMutation(mutationConfig);
};
