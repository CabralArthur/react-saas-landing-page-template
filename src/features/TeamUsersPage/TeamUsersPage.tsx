import { useState } from "react";
import { useTeamUsersContainer } from "./TeamUsersPage.container";
import { TeamUser, CreateUserData, UpdateUserData, Permission } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Shield, Trash2, UserPlus, Pencil } from "lucide-react";
import { UserFormModal } from "./components/UserFormModal";
import { PermissionsModal } from "./components/PermissionsModal";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "react-toastify";
import { useUserStore } from "@/stores/user.store";

export default function TeamUsersPage() {
    const {
        users,
        createUser,
        updateUser,
        updatePermissions,
        removeUser,
        getUserPermissions,
        canRemoveUser,
        isLoading,
        isCreating,
        isUpdating,
        isUpdatingPermissions,
        isRemoving,
    } = useTeamUsersContainer();
    const { userInfo } = useUserStore();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPermissionsModalOpen, setIsPermissionsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<TeamUser | undefined>();
    const [userToDelete, setUserToDelete] = useState<TeamUser | null>(null);
    const [userPermissions, setUserPermissions] = useState<Permission[]>([]);
    const [isLoadingPermissions, setIsLoadingPermissions] = useState(false);

    const handleAddUser = () => {
        setSelectedUser(undefined);
        setIsModalOpen(true);
    };

    const handleEditUser = (user: TeamUser) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleManagePermissions = async (user: TeamUser) => {
        setSelectedUser(user);
        setIsPermissionsModalOpen(true);
        setIsLoadingPermissions(true);
        try {
            const userPermissions = await getUserPermissions(user.id);

            setUserPermissions(userPermissions.permissions);
        } catch {
            toast.error('Failed to load user permissions');
        } finally {
            setIsLoadingPermissions(false);
        }
    };

    const handleDeleteUser = (user: TeamUser) => {
        if (!canRemoveUser(user)) {
            toast.error(user.id === userInfo?.id ? "You cannot remove yourself" : "Cannot remove admin users");
            return;
        }
        setUserToDelete(user);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;
        await removeUser(userToDelete.id);
        setUserToDelete(null);
    };

    const handleSubmit = async (data: CreateUserData | UpdateUserData) => {
        if (selectedUser) {
            await updateUser({
                userId: selectedUser.id,
                data: data as UpdateUserData,
            });
        } else {
            await createUser(data as CreateUserData);
        }
        setIsModalOpen(false);
    };

    const handlePermissionsSubmit = async (permissions: Permission[]) => {
        if (!selectedUser) return;
        await updatePermissions({
            userId: selectedUser.id,
            data: { permissions },
        });
        setIsPermissionsModalOpen(false);
    };

    const handleClosePermissionsModal = () => {
        setIsPermissionsModalOpen(false);
        setUserPermissions([]);
    };

    if (isLoading && !users.length) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="py-6 space-y-6">
            <div className="space-y-1 flex items-center justify-between">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
                    <p className="text-lg text-muted-foreground">
                        Manage your team members and their permissions
                    </p>
                </div>
                <Button onClick={handleAddUser}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                </Button>
            </div>
            <Card>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="w-[150px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        {user.name}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.isAdmin ? "default" : "secondary"}>
                                            {user.isAdmin ? "Admin" : "Member"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleEditUser(user)}
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleManagePermissions(user)}
                                            >
                                                <Shield className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDeleteUser(user)}
                                                disabled={!canRemoveUser(user)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <UserFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmit}
                user={selectedUser}
                isLoading={isCreating || isUpdating}
            />

            <PermissionsModal
                isOpen={isPermissionsModalOpen}
                onClose={handleClosePermissionsModal}
                onSubmit={handlePermissionsSubmit}
                user={selectedUser}
                isLoading={isUpdatingPermissions || isLoadingPermissions}
                userPermissions={userPermissions}
            />

            <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove User</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to remove {userToDelete?.name} from the team?
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            disabled={isRemoving}
                        >
                            {isRemoving ? "Removing..." : "Remove User"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
} 