import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '@/app/api';
import { TeamUser, CreateUserData, UpdateUserData, UpdatePermissionsData } from './types';
import { useUserStore } from '@/stores/user.store';

export function useTeamUsersContainer() {
    const queryClient = useQueryClient();
    const { userInfo } = useUserStore();

    const { data: users = [], isLoading } = useQuery<TeamUser[]>({
        queryKey: ['team-users'],
        queryFn: async () => {
            const response = await api.get('/user');
            return response.data;
        },
    });

    const getUserPermissions = async (userId: string) => {
        const response = await api.get(`/user/${userId}/permissions`);
        return response.data;
    };

    const { mutate: createUser, isPending: isCreating } = useMutation({
        mutationFn: async (data: CreateUserData) => {
            const response = await api.post('/user', data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team-users'] });
            toast.success('User invited successfully');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to invite user');
        },
    });

    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: async ({ userId, data }: { userId: string; data: UpdateUserData }) => {
            const response = await api.put(`/user/${userId}`, data);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team-users'] });
            toast.success('User updated successfully');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update user');
        },
    });

    const { mutate: updatePermissions, isPending: isUpdatingPermissions } = useMutation({
        mutationFn: async ({ userId, data }: { userId: string; data: UpdatePermissionsData }) => {
            const response = await api.put(`/user/${userId}/permissions`, data);
            return response.data;
        },
        onSuccess: (_, { userId }) => {
            queryClient.invalidateQueries({ queryKey: ['team-users'] });
            if (userId === userInfo?.id) {
                queryClient.invalidateQueries({ queryKey: ['user'] });
            }
            toast.success('User permissions updated successfully');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to update user permissions');
        },
    });

    const { mutate: removeUser, isPending: isRemoving } = useMutation({
        mutationFn: async (userId: string) => {
            await api.delete(`/user/${userId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['team-users'] });
            toast.success('User removed successfully');
        },
        onError: (error: Error) => {
            toast.error(error.message || 'Failed to remove user');
        },
    });

    const canRemoveUser = (user: TeamUser) => {
        return !user.isAdmin && user.id !== userInfo?.id;
    };

    return {
        users,
        createUser,
        updateUser,
        updatePermissions,
        removeUser,
        getUserPermissions,
        canRemoveUser,
        isLoading: isLoading || isCreating || isUpdating || isRemoving,
        isCreating,
        isUpdating,
        isUpdatingPermissions,
        isRemoving,
    };
} 