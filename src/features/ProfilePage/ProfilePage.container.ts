import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "@/app/api";
import { z } from "zod";
import { useUserStore } from "@/stores/user.store";
import { zodResolver } from "@hookform/resolvers/zod";

interface UserProfile {
  name: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const validationSchema = z.object({
    name: z.string().nullable(),
    email: z.string().email().nullable(),
    currentPassword: z.string().nullable(),
    newPassword: z.string()
      .nullable()
      .refine(value => {
        if (!value) return true;

        return value.length >= 8;
      }, 'Password must be at least 8 characters'),
    confirmPassword: z.string()
      .nullable()
      .refine(value => {
        if (!value) return true;

        return value.length >= 8;
      }, 'Password must be at least 8 characters')
      .refine(value => {
        if (!value) return true;

        return value.length >= 8;
      }, 'Passwords must match')
  });

export default function ProfilePageContainer() {
  const { userInfo } = useUserStore();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit: handleGeneralSubmit,
    
  } = useForm<UserProfile>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: userInfo?.name,
      email: userInfo?.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: async (data: UserProfile) => {
      const response = await api.put(`/user/${userInfo?.id}`, data);

      return response;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile");
    },
  });

  const onSubmit = (data: UserProfile) => {
    updateProfile(data);
  };

  return {
    isLoading: isUpdating,
    register,
    onSubmit: handleGeneralSubmit(onSubmit),
  };
}