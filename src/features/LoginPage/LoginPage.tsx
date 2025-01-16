import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import loginPaisageSource from '@/assets/img/login-paisage.jpg';
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage({
    register,
    handleSubmit,
    errors,
    isLoading
}: {
    register: UseFormRegister<LoginFormData>
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    errors: FieldErrors<LoginFormData>
    isLoading: boolean
}) {
  return (
    <div className="flex min-h-screen flex-1">
        <div className="relative hidden w-0 flex-1 lg:block">
            <img
                alt="Login background"
                src={loginPaisageSource}
                className="absolute inset-0 h-full w-full object-cover"
            />
        </div>
        <div className="flex flex-1 flex-col justify-center px-4 py-12 lg:flex-none sm:px-6 lg:px-8">
            <div className="mx-auto w-full w-lg">
                <Card className="md:min-w-[400px]">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
                        <CardDescription>Enter your email and password to login</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email" 
                                    placeholder="m@example.com" 
                                    {...register("email")}
                                    aria-invalid={errors.email ? "true" : "false"}
                                />
                                {errors.email && <p className="text-sm text-red-500">Email is required</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    {...register("password")}
                                    aria-invalid={errors.password ? "true" : "false"}
                                />
                                {errors.password && <p className="text-sm text-red-500">Password is required</p>}
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>
                        </form>
                        
                        <div className="flex flex-col mt-4 space-y-2">
                            <div className="flex text-sm">
                                <span className="text-muted-foreground">
                                    Forgot your password?{' '}
                                    <Link to="/request-password-reset" className="font-medium text-primary hover:underline">
                                        Reset    
                                    </Link>
                                </span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                                Don't have an account yet?{' '}
                                <Link to="/signup" className="font-medium text-primary hover:underline">
                                    Start with a 14 days trial
                                </Link>
                            </span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  );
}