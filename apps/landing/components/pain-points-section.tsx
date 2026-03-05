"use client"

import { motion } from "framer-motion"
import { Smartphone, FileText, HelpCircle, TrendingDown } from "lucide-react"
import { useTranslations } from "@/lib/locale-provider"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function PainPointsSection() {
  const { t, get } = useTranslations()
  const items = (get("landing.painPoints.items") ?? []) as Array<{ title: string; description: string }>

  return (
    <section className="bg-card px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-2xl font-semibold text-foreground text-balance md:text-[2.5rem] md:leading-tight"
        >
          {t("landing.painPoints.title")}
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-10 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4 lg:gap-6"
        >
          {[Smartphone, FileText, HelpCircle, TrendingDown].map((Icon, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="flex min-w-[260px] flex-col rounded-xl border border-border bg-card p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] md:min-w-0"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <Icon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-base font-bold leading-relaxed text-foreground">
                {items[i]?.title ?? ""}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {items[i]?.description ?? ""}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center text-lg font-semibold text-primary"
        >
          {t("landing.painPoints.cta")}
        </motion.p>
      </div>
    </section>
  )
}
