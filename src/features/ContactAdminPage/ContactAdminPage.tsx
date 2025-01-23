import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Mail, Building2, CreditCard } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/stores/user.store";

export default function ContactAdminPage() {
    const { userInfo } = useUserStore();

    const isAdmin = userInfo?.isAdmin;

    if (userInfo?.team?.plan_status === 'ACTIVE') {
        return <Navigate to="/home" />
    }

    if (isAdmin) {
        return <Navigate to="/team/settings" />
    }

  return (
    <div className="min-h-screen bg-muted/10 py-10">
      <div className="container max-w-3xl">
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Subscription Required</h1>
            <p className="text-muted-foreground text-lg">
              Your access is currently restricted
            </p>
          </div>

          <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle className="text-lg">Access Restricted</AlertTitle>
            <AlertDescription className="text-base mt-2">
              Your team's subscription needs attention. Please contact your team administrator to resolve this issue and restore full access to the platform.
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-muted/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle>Administrator Actions</CardTitle>
                </div>
                <CardDescription>
                  Your administrator can help with:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Renewing the subscription</li>
                  <li>Updating payment information</li>
                  <li>Managing subscription status</li>
                  <li>Resolving payment issues</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-muted/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle>Subscription Benefits</CardTitle>
                </div>
                <CardDescription>
                  What you get with an active subscription:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Full access to all features</li>
                  <li>Unlimited website tracking</li>
                  <li>Advanced UTM management</li>
                  <li>Team collaboration tools</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-primary/50 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle>Need Help?</CardTitle>
              </div>
              <CardDescription>
                If you're unable to reach your administrator, our support team is here to help
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Contact us at <span className="text-primary font-medium">support@utmizer.com</span> and we'll help you get in touch with your team administrator.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 