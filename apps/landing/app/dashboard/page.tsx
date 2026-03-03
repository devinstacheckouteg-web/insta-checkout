import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, CreditCard, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "لوحة التحكم — InstaPay Checkout",
  description: "لوحة التحكم الخاصة بك — قريباً",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <CreditCard className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-foreground">InstaPay Checkout</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-16">
        <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-lg sm:p-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
            <LayoutDashboard className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            مرحباً في لوحتك
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed max-w-md mx-auto">
            لوحة التحكم الخاصة بمتجرك — قريباً هتقدر تشوف أوردراتك، تضيف منتجات، وتبعَت لينكات الدفع لعملاءك.
          </p>
          <p className="mt-6 text-sm text-muted-foreground">
            دلوقتي تقدر تعمل أول لينك دفع عن طريق واتساب 👇
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_BOT_NUMBER || "201000000000"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-base font-bold text-white hover:bg-[#20BD5A] transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            افتح واتساب وابدأ
          </a>
        </div>
      </div>
    </main>
  );
}
