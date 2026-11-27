"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";

import {
  Menu,
  X,
  Sun,
  Moon,
  ShieldCheck,
  LockKeyhole,
  LoaderCircle,
  Eye,
  EyeOff,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  { label: "Compétences", href: "/skills" },
  { label: "Projets", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const subscribeToNothing = () => () => { };

const getMountedSnapshot = () => true;

const getServerSnapshot = () => false;

const subscribeToScroll = (callback: () => void) => {
  window.addEventListener("scroll", callback, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", callback);
  };
};

const getScrollSnapshot = () => window.scrollY > 20;

const menuVariants: Variants = {
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },

  open: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  closed: {
    opacity: 0,
    x: -20,
  },

  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export default function Header() {
  const router = useRouter();

  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getServerSnapshot
  );

  const mounted = useSyncExternalStore(
    subscribeToNothing,
    getMountedSnapshot,
    getServerSnapshot
  );

  const [open, setOpen] = useState(false);

  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminError, setAdminError] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);

  const { theme, setTheme } = useTheme();

  const pathname = usePathname();

  const isHome = pathname === "/";

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  const hasBackground = scrolled || !isHome;

  const openAdminModal = () => {
    setOpen(false);
    setAdminPassword("");
    setAdminError("");
    setShowPassword(false);
    setAdminModalOpen(true);
  };

  const closeAdminModal = () => {
    if (adminLoading) return;

    setAdminModalOpen(false);
    setAdminPassword("");
    setAdminError("");
    setShowPassword(false);
  };

  const handleAdminLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!adminPassword.trim() || adminLoading) return;

    setAdminLoading(true);
    setAdminError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        cache: "no-store",
        body: JSON.stringify({
          password: adminPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAdminError(
          data.message || "Code d'accès incorrect."
        );
        return;
      }

      setAdminPassword("");
      setAdminModalOpen(false);

      router.replace("/login");
      router.refresh();
    } catch {
      setAdminError(
        "Impossible de contacter le serveur. Réessayez."
      );
    } finally {
      setAdminLoading(false);
    }
  };

const hiddenAdminClass =
  "opacity-30 hover:opacity-75 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${hasBackground
          ? "border-b border-border bg-bg-primary/80 shadow-lg shadow-black/5 backdrop-blur-md dark:shadow-black/30"
          : "bg-transparent"
          }`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/"
              className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-text-primary"
            >
              <Image
                src="/favicon.jpeg"
                alt="Zo Lantosoa Logo"
                width={40}
                height={40}
                priority
                className="h-10 w-10 shrink-0 rounded-lg border border-border object-cover shadow-sm"
              />

              <span>Zo Lantosoa</span>
            </Link>
          </motion.div>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`group relative text-sm font-medium transition-colors ${active
                      ? "text-primary"
                      : "text-text-secondary hover:text-primary"
                      }`}
                  >
                    {link.label}

                    <span className="absolute -bottom-1 left-0 h-0.5 w-full overflow-hidden rounded-full">
                      {!active && (
                        <span className="absolute inset-0 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                      )}

                      {active && (
                        <motion.span
                          layoutId="active-nav-indicator"
                          className="absolute inset-0 w-full bg-primary"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">

            {mounted && (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setTheme(
                      theme === "dark" ? "light" : "dark"
                    )
                  }
                  aria-label="Changer de thème"
                  className="relative"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />

                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              </motion.div>
            )}

            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:block"
            >
              <button
                type="button"
                onClick={openAdminModal}
                aria-label="Ouvrir l'accès administrateur"
                title="Admin"
                className={`${hiddenAdminClass} inline-flex items-center justify-center gap-2 rounded-full border border-border bg-bg-card/70 px-4 py-2.5 text-sm font-semibold text-text-secondary transition-all duration-300`}
              >
                <ShieldCheck className="h-4 w-4" />
                Admin
              </button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="hidden lg:block"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-accent-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-shadow hover:shadow-primary/50"
              >
                Me contacter ↗
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(!open)}
                aria-label={
                  open ? "Fermer le menu" : "Ouvrir le menu"
                }
                aria-expanded={open}
                aria-controls="mobile-navigation"
              >
                {open ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </motion.div>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-navigation"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden border-t border-border bg-bg-primary/95 backdrop-blur-md md:hidden"
            >
              <motion.ul className="space-y-1 px-6 py-4">
                {navLinks.map((link) => {
                  const active = isActive(link.href);

                  return (
                    <motion.li
                      key={link.href}
                      variants={itemVariants}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors ${active
                          ? "bg-primary/10 text-primary"
                          : "text-text-secondary hover:bg-primary/10 hover:text-primary"
                          }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="active-mobile-dot"
                            className="h-1.5 w-1.5 rounded-full bg-primary"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}
                        {link.label}
                      </Link>
                    </motion.li>
                  );
                })}

                <motion.li
                  variants={itemVariants}
                  className="pt-3"
                >
                  <button
                    type="button"
                    onClick={openAdminModal}
                    aria-label="Ouvrir l'accès administrateur"
                    className="flex w-full items-center gap-3 rounded-lg border border-border px-4 py-3 text-sm font-semibold text-text-secondary opacity-30 transition-all duration-300 hover:opacity-75 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    <ShieldCheck className="h-4 w-4" />
                    Admin
                  </button>
                </motion.li>

                <motion.li
                  variants={itemVariants}
                  className="pt-2"
                >
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-accent-blue px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30"
                  >
                    Me contacter ↗
                  </Link>
                </motion.li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <AnimatePresence>
        {adminModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-5 py-8 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeAdminModal();
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="admin-modal-title"
              className="relative w-full max-w-md rounded-2xl border border-border bg-bg-primary p-7 shadow-2xl sm:p-9"
            >
              <button
                type="button"
                onClick={closeAdminModal}
                disabled={adminLoading}
                aria-label="Fermer"
                className="absolute right-4 top-4 rounded-full p-2 text-text-secondary transition-colors hover:bg-primary/10 hover:text-primary disabled:opacity-50"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-7 flex flex-col items-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <span className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Accès sécurisé
                </span>
                <h2
                  id="admin-modal-title"
                  className="text-2xl font-bold tracking-tight text-text-primary"
                >
                  Administration
                </h2>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-text-secondary">
                  Veuillez saisir votre code d&apos;accès pour continuer.
                </p>
              </div>

              <form
                onSubmit={handleAdminLogin}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="admin-access-password"
                    className="text-sm font-medium text-text-primary"
                  >
                    Code d&apos;accès
                  </label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
                    <input
                      id="admin-access-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={adminPassword}
                      onChange={(event) => {
                        setAdminPassword(event.target.value);
                        setAdminError("");
                      }}
                      placeholder="Entrez votre code d'accès"
                      autoComplete="current-password"
                      autoFocus
                      required
                      disabled={adminLoading}
                      className="h-12 w-full rounded-xl border border-border bg-bg-card pl-11 pr-12 text-sm text-text-primary outline-none transition-all placeholder:text-text-secondary/60 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword
                          ? "Masquer le mot de passe"
                          : "Afficher le mot de passe"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-text-secondary transition-colors hover:text-primary"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {adminError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      role="alert"
                      aria-live="polite"
                      className="overflow-hidden"
                    >
                      <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
                        {adminError}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  type="submit"
                  disabled={adminLoading || !adminPassword.trim()}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-accent-blue text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:shadow-primary/40 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {adminLoading ? (
                    <>
                      <LoaderCircle className="h-4 w-4 animate-spin" />
                      Vérification en cours...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="h-4 w-4" />
                      Vérifier le code d&apos;accès
                    </>
                  )}
                </button>
              </form>
              <p className="mt-6 text-center text-[11px] text-text-secondary">
                Espace réservé à l&apos;administrateur.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}