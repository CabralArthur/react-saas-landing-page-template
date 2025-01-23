import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, AlertTriangle } from 'lucide-react';
import { Subscription } from '../types';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BillingSectionProps {
  subscription?: Subscription;
  plan_status: 'ACTIVE' | 'INACTIVE' | 'CANCELED' | 'TRIAL' | 'OVERDUE';
  onSubscribe: () => void;
  onRenewSubscription: () => void;
  onCancel: () => Promise<void>;
  isLoading?: boolean;
}

export function BillingSection({ subscription, onSubscribe, onRenewSubscription, onCancel, isLoading }: BillingSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing</CardTitle>
        <CardDescription>
          Manage your subscription and billing information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {subscription?.status === 'ACTIVE' ? (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Subscription Status
                </h3>
                <div className="flex items-center gap-2">
                  <Badge variant={subscription?.status === 'ACTIVE' ? 'default' : 'destructive'}>
                    {subscription?.status}
                  </Badge>
                  {subscription?.cancelAtPeriodEnd && (
                    <Badge variant="secondary">Cancels at period end</Badge>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Current Plan
                </h3>
                <p className="text-2xl font-bold">
                  {subscription?.plan?.name || 'Default'}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Price
                </h3>
                <p className="text-2xl font-bold">
                  €{subscription?.plan?.price || 0}/
                  {subscription?.plan?.interval === 'MONTH' ? 'mo' : 'yr'}
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Current Period Ends
                </h3>
                <p className="text-2xl font-bold">
                  {subscription?.ends_at || '-'}
                </p>
              </div>
            </div>

            {!subscription.cancelAtPeriodEnd && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Cancel Subscription
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cancel Subscription</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to cancel your subscription? You'll continue to have access until the end of your current billing period.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="destructive"
                      onClick={onCancel}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Canceling...' : 'Yes, Cancel Subscription'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </>
        ) : (
          <>
            {subscription?.status === 'CANCELED' && (
              <div className="flex flex-col gap-3">
                <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle className="text-lg font-semibold">Subscription Ending {subscription?.plan?.name === 'MONTHLY' ? 'Soon' : ''}</AlertTitle>
                  <AlertDescription className="mt-2 text-base">
                    <p>Your subscription will end on <span className="font-medium">{subscription?.ends_at}</span>.</p>
                    <p className="mt-2">To maintain uninterrupted access to all features, please renew your subscription before it expires.</p>
                    <Button onClick={onRenewSubscription} className="mt-4 w-full sm:w-auto" variant="destructive">
                      Renew Subscription
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {subscription?.status === 'TRIAL' && (
              <div className="flex flex-col gap-3">
                <Alert className="border-primary bg-primary/10">
                  <AlertCircle className="h-5 w-5 text-primary" />
                  <AlertTitle className="text-lg font-semibold">Trial Period Active</AlertTitle>
                  <AlertDescription className="mt-2 text-base">
                    <p>Your trial period ends on <span className="font-medium">{subscription?.ends_at}</span>.</p>
                    <p className="mt-2">Subscribe now to ensure uninterrupted access to all features after your trial ends.</p>
                    <Button onClick={onSubscribe} className="mt-4 w-full sm:w-auto" variant="default">
                      Subscribe Now
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {subscription?.status === 'OVERDUE' && (
              <div className="flex flex-col gap-3">
                <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle className="text-lg font-semibold">Subscription Overdue</AlertTitle>
                  <AlertDescription className="mt-2 text-base">
                    <p>Your subscription has expired and your access is now limited.</p>
                    <p className="mt-2">Reactivate your subscription now to restore full access to all features.</p>
                    <Button onClick={onSubscribe} className="mt-4 w-full sm:w-auto" variant="destructive">
                      Reactivate Subscription
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {!subscription && (
              <div className="flex flex-col gap-3">
                <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle className="text-lg font-semibold">No Active Subscription</AlertTitle>
                  <AlertDescription className="mt-2 text-base">
                    <p>You currently don't have an active subscription.</p>
                    <p className="mt-2">Subscribe now to get full access to all features and start managing your UTM parameters effectively.</p>
                    <Button onClick={onSubscribe} className="mt-4 w-full sm:w-auto" variant="destructive">
                      Subscribe Now
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
} 