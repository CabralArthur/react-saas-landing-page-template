import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TeamUser, CreateUserData, UpdateUserData } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const createUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

const updateUserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    isAdmin: z.boolean().default(false),
});

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateUserData | UpdateUserData) => void;
    user?: TeamUser;
    isLoading?: boolean;
}

export function UserFormModal({
    isOpen,
    onClose,
    onSubmit,
    user,
    isLoading,
}: UserFormModalProps) {
    const isEditing = !!user;
    const schema = isEditing ? updateUserSchema : createUserSchema;
    type FormData = z.infer<typeof createUserSchema>;

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (user) {
            setValue("name", user.name);
        } else {
            reset({ name: "", email: "", password: "" } as FormData);
        }
    }, [user, setValue, reset]);

    const handleClose = () => {
        reset();
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing ? "Edit User" : "Add User"}
                        </DialogTitle>
                        <DialogDescription>
                            {isEditing
                                ? "Update the user's information."
                                : "Add a new user to your team."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter user's name"
                                {...register("name")}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {!isEditing && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter user's email"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <p className="text-sm text-destructive">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter user's password"
                                    {...register("password")}
                                />
                            </div>
                            </>
                        )}
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? isEditing
                                    ? "Saving..."
                                    : "Inviting..."
                                : isEditing
                                ? "Save Changes"
                                : "Send Invitation"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
} 