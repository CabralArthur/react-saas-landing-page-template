import { useMutation } from "@tanstack/react-query";
import api from "@/app/api";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe

interface StripeSession {
  id: string;
}

export function useStripeCheckout() {
    const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  const { mutate: createCheckoutSession, isPending, error } = useMutation({
    mutationFn: async (paymentFrequency: string) => {
      const response = await api.post<StripeSession>("/subscription/checkout", { planModel: paymentFrequency });
      return response.data;
    },
    onSuccess: async (data) => {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Stripe failed to load");
      }
      
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.id
      });

      if (error) {
        throw new Error(error.message);
      }
    },
  });

  return {
    createCheckoutSession,
    isLoading: isPending,
    error
  };
} 