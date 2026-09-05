import { Suspense } from "react";
import { redirect } from "next/navigation";
import { verifyPaystackPayment } from "@/app/actions/orders";
import SuccessPageSkeleton from "@/components/SuccessPageSkeleton";
import CheckoutSuccess from "@/components/CheckoutSuccess";

interface PageProps {
  searchParams: Promise<{ reference?: string }>;
}

const SuccessPage = async ({ searchParams }: PageProps) => {
  const { reference } = await searchParams;

  if (!reference) {
    redirect("/shop");
  }

  // 💡 Hand off the unresolved Promise to activate streaming
  const paymentPromise = verifyPaystackPayment(reference);

  return (
    <Suspense fallback={<SuccessPageSkeleton />}>
      <CheckoutSuccess reference={reference} paymentPromise={paymentPromise} />
    </Suspense>
  );
};

export default SuccessPage;
