import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/stores/user.store";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { toast } from "react-toastify";
import { getToken } from "@/utils/storage";

const PricingContainer = () => {
  const { userInfo } = useUserStore();
  const navigate = useNavigate();
  const { createCheckoutSession, isLoading, error } = useStripeCheckout();

  const handleSubscribeClick = async (paymentFrequency: string) => {
    if (!getToken() || !userInfo) {
      navigate('/login', { state: { returnTo: '/#pricing' } });
      return;
    }

    try {
      await createCheckoutSession(paymentFrequency);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to start checkout process";
      toast.error(errorMessage);
      console.error("Checkout error:", error);
    }
  }

  return {
    isLoggedIn: !!userInfo,
    handleSubscribeClick,
    isLoading,
    error
  }
}

export default PricingContainer
