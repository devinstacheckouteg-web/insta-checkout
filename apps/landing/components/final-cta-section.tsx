"use client"

import { motion } from "framer-motion"
import { useTranslations } from "@/lib/locale-provider"

export function FinalCtaSection() {
  const { t } = useTranslations()
  return (
    <section id="cta" className="bg-primary px-4 py-16 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-2xl flex-col items-center text-center"
      >
        <h2 className="text-2xl font-bold text-primary-foreground text-balance md:text-[2.5rem] md:leading-tight">
          {t("landing.finalCta.title")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
          {t("landing.finalCta.subtitle")}
        </p>
        <a
          href="/onboard"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-card px-8 py-4 text-base font-bold text-primary transition-transform hover:scale-[1.02]"
        >
          {t("landing.finalCta.cta")}
        </a>
        <p className="mt-4 text-sm text-primary-foreground/70">
          {t("landing.finalCta.noCard")}
        </p>
      </motion.div>
    </section>
  )
}
