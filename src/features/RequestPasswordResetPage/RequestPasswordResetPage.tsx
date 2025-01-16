import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RequestPasswordReset() {
  return (
    <div className="flex min-h-screen flex-1 items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold">Forgot your password?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your email to reset your password
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required />
          </div>
          <Button type="submit" className="w-full">
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
}
