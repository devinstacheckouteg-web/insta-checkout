"use client"

import { useState, useEffect } from "react"
import { Menu, X, CreditCard, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { onAuthStateChanged } from "firebase/auth"
import { useTranslations } from "@/lib/locale-provider"
import { LanguageSwitcher } from "./language-switcher"
import { auth, signOutUser } from "@/lib/firebase"

export function Navbar() {
  const { t } = useTranslations()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<typeof auth.currentUser>(null)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u?.email) console.log("[Navbar] Logged in as:", u.email)
      setUser(u)
    })
    return () => unsub()
  }, [])

  const navLinks = [
    { label: t("landing.nav.features"), href: "#features" },
    { label: t("landing.nav.howItWorks"), href: "#how-it-works" },
    { label: t("landing.nav.pricing"), href: "#pricing" },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <CreditCard className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-foreground">
            InstaPay Checkout
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          {user ? (
            <>
              <a
                href="/dashboard"
                className="rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {t("landing.nav.dashboard")}
              </a>
              <button
                onClick={() => signOutUser().then(() => (window.location.href = "/"))}
                className="flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                {t("landing.nav.logout")}
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="rounded-lg border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t("landing.nav.login")}
            </a>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? t("common.closeMenu") : t("common.openMenu")}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-card md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              <div className="mb-2 flex justify-center md:hidden">
                <LanguageSwitcher />
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  {link.label}
                </a>
              ))}
              {user ? (
                <>
                  <a
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 rounded-lg bg-primary px-4 py-3 text-center text-base font-semibold text-primary-foreground"
                  >
                    {t("landing.nav.dashboard")}
                  </a>
                  <button
                    onClick={() => {
                      setMobileOpen(false)
                      signOutUser().then(() => (window.location.href = "/"))
                    }}
                    className="mt-2 flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-base font-medium text-muted-foreground hover:bg-secondary"
                  >
                    <LogOut className="h-4 w-4" />
                    {t("landing.nav.logout")}
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-2 rounded-lg bg-primary px-4 py-3 text-center text-base font-semibold text-primary-foreground"
                >
                  {t("landing.nav.login")}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
