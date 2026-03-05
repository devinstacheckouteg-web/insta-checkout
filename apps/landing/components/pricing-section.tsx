"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { useTranslations } from "@/lib/locale-provider"

export function PricingSection() {
  const { t, get } = useTranslations()
  const freePlanFeatures = (get("landing.pricing.freeFeatures") ?? []) as string[]
  const proPlanFeatures = (get("landing.pricing.proFeatures") ?? []) as string[]

  return (
    <section id="pricing" className="bg-card px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-semibold text-foreground text-balance md:text-[2.5rem] md:leading-tight">
            {t("landing.pricing.title")}
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
          >
            <h3 className="text-lg font-bold text-foreground">{t("landing.pricing.free")}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-mono text-4xl font-bold text-foreground">0</span>
              <span className="text-sm text-muted-foreground"> {t("landing.pricing.perMonth")}</span>
            </div>

            <ul className="mt-6 flex flex-col gap-3">
              {freePlanFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="/onboard"
              className="mt-8 inline-flex items-center justify-center rounded-lg border-2 border-primary px-6 py-3 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t("landing.pricing.ctaFree")}
            </a>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative flex flex-col rounded-xl border-2 border-primary bg-card p-6 shadow-[0_0_24px_rgba(13,148,136,0.12)]"
          >
            <div className="absolute -top-3 start-6 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
              {t("landing.pricing.popular")}
            </div>
            <h3 className="text-lg font-bold text-foreground">{t("landing.pricing.pro")}</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-mono text-4xl font-bold text-foreground">199</span>
              <span className="text-sm text-muted-foreground"> {t("landing.pricing.perMonth")}</span>
            </div>

            <ul className="mt-6 flex flex-col gap-3">
              {proPlanFeatures.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="/onboard"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              {t("landing.pricing.ctaPro")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
