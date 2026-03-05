"use client";

import { Toaster } from "@/components/ui/sonner";
import { useLocale } from "@/lib/locale-provider";

export function LocaleAwareToaster() {
  const { dir } = useLocale();
  return <Toaster position="top-center" dir={dir} />;
}
