import { useState, useEffect } from 'react';
import { useTeamSettingsContainer } from './TeamSettingsPage.container';
import { Loader2 } from 'lucide-react';
import { TeamInfoSection } from './components/TeamInfoSection';
import { BillingSection } from './components/BillingSection';
import { PaymentsSection } from './components/PaymentsSection';
import { FormData } from './types';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUserStore } from '@/stores/user.store';

export default function TeamSettingsPage() {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const [showRenewDialog, setShowRenewDialog] = useState(false);

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const {
    team,
    payments,
    updateTeam,
    handleSubscribe,
    cancelSubscription,
    renewSubscription,
    isLoadingTeam,
    isUpdating,
    isRenewing,
    isCanceling
  } = useTeamSettingsContainer();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (team) {
      setFormData({
        name: team.name,
        description: team.description || ''
      });
    }
  }, [team]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateTeam(formData);
  };

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = async () => {
    return new Promise<void>((resolve) => {
      cancelSubscription(undefined, {
        onSuccess: () => resolve(),
        onError: () => resolve(),
      });
    });
  };

  const handleRenew = async () => {
    return new Promise<void>((resolve) => {
      renewSubscription(undefined, {
        onSuccess: () => resolve(),
        onError: () => resolve(),
      });
    });
  };

  if (isLoadingTeam) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 mt-4">
      <TeamInfoSection
        formData={formData}
        isLoading={isUpdating}
        onSubmit={handleSubmit}
        onChange={handleFieldChange}
      />

      <BillingSection
        subscription={team?.subscription}
        plan_status={team?.subscription?.status || 'INACTIVE'}
        onSubscribe={handleSubscribe}
        onCancel={handleCancel}
        onRenewSubscription={() => setShowRenewDialog(true)}
        isLoading={isCanceling || isRenewing}
      />

      <PaymentsSection payments={payments} />

      <Dialog open={showRenewDialog} onOpenChange={setShowRenewDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Renew Subscription</DialogTitle>
            <DialogDescription>
              Are you sure you want to renew your subscription? You'll be charged according to your current plan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                handleRenew().then(() => setShowRenewDialog(false));
              }}
              disabled={isRenewing}
            >
              {isRenewing ? 'Renewing...' : 'Yes, Renew Subscription'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
