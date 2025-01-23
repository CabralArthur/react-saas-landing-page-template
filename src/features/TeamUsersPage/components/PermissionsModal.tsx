import { useState, useEffect } from "react";
import { TeamUser, Permission } from "../types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface PermissionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (permissions: Permission[]) => Promise<void>;
    user?: TeamUser;
    isLoading?: boolean;
    userPermissions?: Permission[];
}

const PERMISSIONS = [
    { id: "READ", label: "View" },
    { id: "CREATE", label: "Create" },
    { id: "UPDATE", label: "Edit" },
    { id: "DELETE", label: "Delete" }
];

export function PermissionsModal({
    isOpen,
    onClose,
    onSubmit,
    user,
    isLoading,
    userPermissions = [],
}: PermissionsModalProps) {
    const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set());
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (userPermissions) {
            const permissionSet = new Set(
                userPermissions.map(p => `${p.module}-${p.name}`)
            );
            setSelectedPermissions(permissionSet);
        }
    }, [userPermissions]);

    const handlePermissionChange = (permission: string, checked: boolean) => {
        setSelectedPermissions(prev => {
            const newSet = new Set(prev);
            const key = `EXAMPLE-${permission}`;
            if (checked) {
                newSet.add(key);
            } else {
                newSet.delete(key);
            }
            return newSet;
        });
    };

    const handleSubmit = async () => {
        setIsSaving(true);
        try {
            const permissions: Permission[] = Array.from(selectedPermissions).map(key => {
                const [module, name] = key.split("-");
                return { module, name };
            });
            await onSubmit(permissions);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={() => {
            if (!isSaving) {
                onClose();
            }
        }}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Manage User Permissions</DialogTitle>
                    <DialogDescription>
                        Configure what {user?.name} can do in the system
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Action</TableHead>
                                    <TableHead className="w-[100px] text-center">Allowed</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {PERMISSIONS.map(permission => (
                                    <TableRow key={permission.id}>
                                        <TableCell className="font-medium">
                                            {permission.label}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <div className="flex items-center justify-center">
                                                <Checkbox
                                                    id={`EXAMPLE-${permission.id}`}
                                                    checked={selectedPermissions.has(`EXAMPLE-${permission.id}`)}
                                                    onCheckedChange={(checked) =>
                                                        handlePermissionChange(permission.id, checked as boolean)
                                                    }
                                                    disabled={isSaving}
                                                />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isSaving}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || isSaving}
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
} 