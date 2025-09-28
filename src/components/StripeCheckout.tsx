import React, { useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { PaymentIntent } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51SBJ1cDqgelkcfWY087CKL3nYNFT01JSr12Nth17ljy4w3ZMBQu4YK8XeTO5fHhe3WYmexypAxTixj1ookfLO6hp009dAN9yAV");

const API_BASE = "http://localhost:4000/api/v1";

type CheckoutInnerProps = {
  clientSecret: string;
  onPaymentSuccess?: (paymentIntent: PaymentIntent) => void | Promise<void>;
};

function CheckoutInner({ clientSecret, onPaymentSuccess }: CheckoutInnerProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setStatus("Confirming payment…");

    try {
      await elements.submit();

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: { return_url: window.location.href },
        redirect: "if_required",
      });

      if (error) {
        setStatus(`❌ ${error.message ?? "Payment failed"}`);
      } else {
        setStatus(`✅ Payment ${paymentIntent?.status}`);

        if (paymentIntent && onPaymentSuccess) {
          await onPaymentSuccess(paymentIntent);
        }
      }
    } catch (err: any) {
      setStatus(`❌ ${err.message || "Payment failed"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} style={{ maxWidth: 420, margin: "24px 0" }}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          marginTop: 16,
          padding: "10px 16px",
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        {loading ? "Processing…" : "Pay"}
      </button>
      {status && <div style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{status}</div>}
    </form>
  );
}


type StripeCheckoutProps = {
  amountCents: number;
  currency?: string;
  onPaymentSuccess?: (paymentIntent: PaymentIntent) => void | Promise<void>;
};



const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  amountCents,
  currency = "usd",
  onPaymentSuccess,
}) => {
  const [clientSecret, setClientSecret] = useState<string>("");
  console.log("inside stripe")

useEffect(() => {
  (async () => {
    try {
      console.log("▶ useEffect fired with", { amountCents, currency });

      const res = await fetch(`${API_BASE}/stripe/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountCents, currency }),
      });

      console.log("▶ fetch response status:", res.status);

      const data = await res.json();
      console.log("▶ payment intent response:", data);

      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error("❌ error in useEffect:", err);
    }
  })();
},[]);



  const options = useMemo(
    () =>
      clientSecret
        ? ({
            clientSecret,
            appearance: { theme: "stripe" },
          } as const)
        : undefined,
    [clientSecret]
  );

  console.log(options, "options")

  if (!options) {
    return <p>Creating PaymentIntent…</p>;
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutInner clientSecret={clientSecret} onPaymentSuccess={onPaymentSuccess}/>
    </Elements>
  );
};

export default StripeCheckout;
