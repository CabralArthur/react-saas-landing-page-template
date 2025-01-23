import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormRegister } from "react-hook-form";
import useProfilePageContainer from "./ProfilePage.container";
interface UserProfile {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ProfilePageProps {
  isLoading: boolean;
  register: UseFormRegister<UserProfile>;
  onSubmit: (e: React.FormEvent) => void;
}

const ProfilePage = () => {
  const {
    isLoading,
    register,
    onSubmit
  }: ProfilePageProps = useProfilePageContainer();

  return (
    <div className="flex flex-col gap-8 mt-4">
        <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-lg text-muted-foreground">
                Manage your account settings and preferences.
            </p>
        </div>
      <Card>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none px-6 py-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          <form onSubmit={onSubmit}>
            <TabsContent value="general">
              <CardContent className="p-6">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 lg:grid-cols-12">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <div className="mt-2">
                      <Input
                        id="name"
                        disabled={isLoading}
                        {...register("name")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <Input
                        id="email"
                        type="email"
                        disabled={isLoading}
                        {...register("email")}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            <TabsContent value="security">
              <CardContent className="p-6">
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 lg:grid-cols-12">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="current-password"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Current Password
                    </label>
                    <div className="mt-2">
                      <Input
                        id="current-password"
                        type="password"
                        {...register("currentPassword")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium text-gray-900"
                    >
                      New Password
                    </label>
                    <div className="mt-2">
                      <Input
                        id="new-password"
                        type="password"
                        {...register("newPassword")}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Confirm New Password
                    </label>
                    <div className="mt-2">
                      <Input
                        id="confirm-password"
                        type="password"
                        {...register("confirmPassword")}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </TabsContent>

            <CardFooter className="flex items-center justify-end gap-x-6 border-t px-6 py-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </form>
        </Tabs>
      </Card>
    </div>
  );
};

export default ProfilePage;
