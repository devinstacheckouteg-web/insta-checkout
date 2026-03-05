"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, MessageCircle, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CheckoutPreview } from "./checkout-preview";
import { BUSINESS_TYPE_OPTIONS } from "./types";

interface ConfirmationScreenProps {
  businessName: string;
  category?: string | null;
}

export function ConfirmationScreen({
  businessName,
  category,
}: ConfirmationScreenProps) {
  const match = category
    ? BUSINESS_TYPE_OPTIONS.find((o) => o.value === category)
    : null;
  const productName = match?.defaultProduct ?? "منتج تجريبي";
  const price = match?.defaultPrice ?? 200;
  const businessType = (match?.value ?? "Other") as "Food & Desserts" | "Clothing" | "Electronics" | "Services" | "Other";

  const botNumber = process.env.NEXT_PUBLIC_WHATSAPP_BOT_NUMBER || "201000000000";
  const whatsappText = encodeURIComponent(`${productName} ${price}`);
  const whatsappLink = `https://wa.me/${botNumber}?text=${whatsappText}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10 ring-4 ring-success/20"
      >
        <CheckCircle className="h-12 w-12 text-success" strokeWidth={2} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-foreground">تم التسجيل بنجاح! 🎉</h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          حسابك جاهز. هنبعتلك رسالة على واتساب — افتح واتساب وابدأ أول لينك دفع!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center py-4"
      >
        <CheckoutPreview
          businessName={businessName}
          productName={productName}
          price={price}
          businessType={businessType}
          inPhoneFrame
          disabled
          className="scale-90"
        />
      </motion.div>

      <div className="flex flex-col gap-3">
        <motion.a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button className="h-12 w-full rounded-xl bg-[#25D366] text-base font-bold text-white hover:bg-[#20BD5A] shadow-lg hover:shadow-xl transition-all gap-2">
            <MessageCircle className="h-5 w-5" />
            اعمل أول لينك دفع
          </Button>
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Link href="/dashboard">
            <Button variant="outline" className="h-12 w-full rounded-xl gap-2">
              <LayoutDashboard className="h-5 w-5" />
              ادخل لوحة التحكم
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-muted-foreground"
      >
        محتاج مساعدة؟{" "}
        <a
          href={`https://wa.me/${botNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          كلمنا على واتساب
        </a>
      </motion.p>
    </motion.div>
  );
}
