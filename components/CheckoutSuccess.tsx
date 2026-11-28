"use client";

import {use, useEffect} from "react";
import Link from "next/link";
import {Check, ArrowRight, ShoppingBag, XCircle} from "lucide-react";
import {VerifyResult} from "@/app/actions/orders";
import {useAppDispatch} from "@/app/store/hooks";
import {clearCart} from "@/app/store/slices/cartSlice";

interface ICheckoutSuccess {
    reference: string;
    verificationPromise: Promise<VerifyResult>; // 💡 Accepts the background task promise
}

const CheckoutSuccess = ({reference, verificationPromise}: ICheckoutSuccess) => {
    const dispatch = useAppDispatch();

    const verification = use(verificationPromise);
    const shortId = reference.slice(0, 8).toUpperCase();
    const isPaid = verification.status === "paid";

    useEffect(() => {
        if (!isPaid) return;
        dispatch(clearCart())
        sessionStorage.removeItem("express_checkout_item");

    }, [isPaid, dispatch]);

    if (!isPaid) {
        const isError = verification.status === "error";

        return (
            <main className="min-h-screen bg-white text-neutral-950 px-4 py-24 flex items-center justify-center">
                <div className="max-w-xl w-full text-center space-y-8">
                    <div
                        className="mx-auto w-20 h-20 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                        <XCircle className="w-10 h-10"/>
                    </div>
                    <div className="space-y-3">
                        <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-600">
                            {isError ? "Verification Issue" : "Payment Pending"}
                        </p>
                        <h1 className="text-3xl font-black uppercase tracking-tight">
                            {isError ? "We Couldn't Confirm Your Payment" : "We're Confirming Your Payment"}
                        </h1>
                        <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
                            If you were debited, don&apos;t pay again. Your order is safe and will update
                            once the payment is confirmed. Contact us with your reference if this
                            persists.
                        </p>
                        <div
                            className="inline-block mt-3 bg-neutral-100 border border-neutral-200 rounded-lg px-4 py-2 font-mono text-xs text-neutral-700">
                            Reference: <span className="font-bold text-neutral-950">{reference}</span>
                        </div>
                    </div>
                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center border border-neutral-200 bg-white hover:bg-neutral-50 h-12 px-6 rounded-full font-bold text-xs uppercase tracking-wider gap-2 transition-all shadow-xs"
                    >
                        Back to Shop
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white text-neutral-900 px-4 py-16 flex items-center justify-center">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Success Icon */}
                <div
                    className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <Check className="w-8 h-8 stroke-[2.5]"/>
                </div>

                {/* Order Heading */}
                <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
            Order Confirmed
          </span>
                    <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
                        Thank you for your order
                    </h1>
                    <p className="text-sm text-neutral-500">
                        We have received your order and are preparing it for shipment.
                    </p>

                    {/* Reference Badge */}
                    <div
                        className="inline-block mt-3 bg-neutral-100 border border-neutral-200 rounded-lg px-4 py-2 font-mono text-xs text-neutral-700">
                        Order Reference:{" "}
                        <span className="font-bold text-neutral-950">#KWALI-{shortId}</span>
                    </div>
                </div>

                {/* Next Steps Card */}
                <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-left space-y-1.5">
          <span className="text-xs font-semibold text-neutral-900 block">
            What happens next?
          </span>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                        We&apos;ll send you an update as soon as your items ship. Sit back
                        and relax while we prepare your delivery!
                    </p>
                </div>

                {/* Actions */}
                <div className="pt-2">
                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-white h-11 px-6 rounded-lg font-medium text-sm transition-colors w-full gap-2"
                    >
                        <ShoppingBag className="w-4 h-4"/>
                        <span>Continue Shopping</span>
                        <ArrowRight className="w-4 h-4"/>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default CheckoutSuccess;
