import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@/app/api";
import { useState } from "react";
import { setToken } from "@/utils/storage";

interface AuthResponse {
  token: string;
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPageContainer() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<
    LoginFormData
  >({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      
      const response = await api.post<AuthResponse>("/auth/login", data);

      setToken(response.data?.token);
      
      toast.success("Login successful!");
      navigate("/tasks");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    errors,
    onSubmit,
    handleSubmit,
    isLoading
  }
}