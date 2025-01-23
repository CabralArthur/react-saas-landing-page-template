import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '@/app/api';
import { Team, UpdateTeamData } from './types';

export function useTeamSettingsContainer() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { data: team, isLoading: isLoadingTeam } = useQuery<Team>({
    queryKey: ['team'],
    queryFn: async () => {
      const response = await api.get('/team');
      return response.data;
    },
  });

  const { mutate: updateTeam, isPending: isUpdating } = useMutation({
    mutationFn: async (data: UpdateTeamData) => {
      const response = await api.put('/team', data);
      return response.data;
    },
    onSuccess: () => {
      toast.success('Team settings updated successfully');
      queryClient.invalidateQueries({ queryKey: ['team', 'userInfo'] });
    },
    onError: (error) => {
      console.error('Error updating team:', error);
      toast.error('Failed to update team settings');
    },
  });

  const { mutate: renewSubscription, isPending: isRenewing } = useMutation({
    mutationFn: async () => {
      const response = await api.post('/subscription/renew');
      return response.data;
    },
    onSuccess: () => {
      toast.success('Subscription renewed successfully');
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['team'] });
      }, 1000);
    },
    onError: (error) => {
      console.error('Error renewing subscription:', error);
      toast.error('Failed to renew subscription');
    },
  });

  const { mutate: cancelSubscription, isPending: isCanceling } = useMutation({
    mutationFn: async () => {
      await api.post('/subscription/cancel');
    },
    onSuccess: () => {
      toast.success('Subscription canceled successfully');
      queryClient.invalidateQueries({ queryKey: ['team'] });
    },
    onError: (error) => {
      console.error('Error canceling subscription:', error);
      toast.error('Failed to cancel subscription');
    },
  });

  const handleSubscribe = () => {
    navigate('/subscribe');
  };

  const isTrial = team?.subscription?.status === 'TRIAL';
  const isSubscriptionActive = team?.subscription?.status === 'ACTIVE' || isTrial;

  return {
    team,
    payments: team?.subscription?.payments || [],
    updateTeam,
    handleSubscribe,
    renewSubscription,
    cancelSubscription,
    isSubscriptionActive,
    isLoadingTeam,
    isUpdating,
    isRenewing,
    isCanceling,
  };
}
