import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@/app/api";
import { User } from "@/processes/user";
import SignupPage from "./SignupPage";

interface AuthResponse {
  token: string;
  user: User;
}

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupContainer() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<
    SignupFormData
  >({
    resolver: zodResolver(signupSchema)
  });

  const { mutate: signup, isPending } = useMutation({
    mutationFn: async (credentials: SignupFormData) => {
      const { data } = await api.post<AuthResponse>(
        "/auth/register",
        credentials
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Account created successfully! Please verify your email.");
      navigate("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create account");
    }
  });

  const onSubmit = (data: SignupFormData) => signup(data);

  return (
    <SignupPage
      register={register}
      handleSubmit={handleSubmit(onSubmit)}
      errors={errors}
      isLoading={isPending}
    />
  );
}
