
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import loginPaisageSource from '@/assets/img/login-paisage.jpg';

export default function Signup() {
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
                        <CardTitle className="text-2xl font-semibold">Create an account</CardTitle>
                        <CardDescription>Sign up to get started</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" type="text" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Sign up
                            </Button>
                        </form>
                        
                        <div className="flex flex-col mt-4 space-y-2">
                            <span className="text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <Link to="/login" className="font-medium text-primary hover:underline">
                                    Sign in
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