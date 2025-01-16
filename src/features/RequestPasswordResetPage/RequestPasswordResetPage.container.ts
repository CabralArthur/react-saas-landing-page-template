import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import api from "@/app/api";

const resetPasswordSchema = z.object({
    email: z.string().email("Invalid email address").nonempty()
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function RequestPasswordResetPageContainer() {
    const { 
        register, 
        handleSubmit,
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema)
    });

    const { mutate: resetPassword, isPending } = useMutation({
        mutationFn: async (data: ResetPasswordFormData) => {
            await api.post("/auth/request-reset-password", data);
        },
        onSuccess: () => {
            toast.success("Reset password request sent");
        },
        onError: (error: Error) => {
            toast.error(error.message || "Reset password request failed");
        }
    });

    const onSubmit = (data: ResetPasswordFormData) => {
        resetPassword(data);
    };

    return { register, handleSubmit, onSubmit, isPending };
}