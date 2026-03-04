import type { Metadata } from "next";
import { Suspense } from "react";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "سجّل بيزنسك — InstaPay Checkout",
  description:
    "سجّل في دقيقتين وابدأ تقبل مدفوعات InstaPay من عملاءك عن طريق واتساب.",
};

export default function OnboardPage() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-background px-4 py-8 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="relative w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M7 12h10M12 7v10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            سجّل بيزنسك على InstaPay Checkout
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            في خطوتين بسيطين هتبدأ تقبض أونلاين
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/5 sm:p-8">
          <Suspense fallback={<div className="h-40" />}>
            <OnboardingForm />
          </Suspense>
        </div>
      </div>
      <Toaster position="top-center" dir="rtl" />
    </main>
  );
}
