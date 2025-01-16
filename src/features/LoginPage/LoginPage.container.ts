import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@/app/api";
import { User } from "@/processes/user";

interface AuthResponse {
  token: string;
  user: User;
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPageContainer() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<
    LoginFormData
  >({
    resolver: zodResolver(loginSchema)
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: async (credentials: LoginFormData) => {
      const { data } = await api.post<AuthResponse>("/auth/login", credentials);
      return data;
    },
    onSuccess: data => {
      localStorage.setItem(
        "auth-storage",
        JSON.stringify({
          state: {
            token: data.token,
            user: data.user,
            isAuthenticated: true
          }
        })
      );
      toast.success("Login successful!");
      navigate("/tasks");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Login failed");
    }
  });

  const onSubmit = (data: LoginFormData) => login(data);

  return {
    register,
    errors,
    isPending,
    onSubmit,
    handleSubmit
  }
}
