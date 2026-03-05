import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in — InstaPay Checkout | تسجيل دخول",
  description: "Sign in to your InstaPay Checkout dashboard. سجّل دخولك للوحة التحكم.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
