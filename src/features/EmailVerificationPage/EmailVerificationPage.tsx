import { Button } from "@/components/ui/button";

export default function EmailVerification() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold">Verify your email</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We have sent a verification link to your email
          </p>
        </div>
        <Button className="w-full">
          Resend Verification Email
        </Button>
      </div>
    </div>
  );
}
