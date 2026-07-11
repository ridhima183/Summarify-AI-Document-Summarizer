"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "framer-motion";

import ThemeToggle from "./ThemeToggle";

import { BookOpenText } from "lucide-react";

const links = [
  {
    href: "/",
    label: "Summarize",
  },
  {
    href: "/methodology",
    label: "Methodology",
  },
  {
    href: "/history",
    label: "Reading Log",
  },
  {
    href: "/about",
    label: "About",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">

        {/* Logo */}

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{
              rotate: -8,
              scale: 1.08,
            }}
            transition={{
              duration: 0.25,
            }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10"
          >
            <BookOpenText className="h-6 w-6 text-primary" />
          </motion.div>

          <div>

            <h1 className="font-serif text-2xl">
              Summarizer
            </h1>

            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              AI Reading Companion
            </p>

          </div>

        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-3 md:flex">

          {links.map((link) => {

            const active =
              pathname === link.href;

            return (

              <motion.div
                key={link.href}
                whileHover={{
                  y: -2,
                }}
              >

                <Link
                  href={link.href}
                  className={`relative rounded-full px-5 py-2 transition-all duration-300 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>

              </motion.div>

            );

          })}

        </nav>

        <motion.div
          whileHover={{
            rotate: 20,
            scale: 1.08,
          }}
        >
          <ThemeToggle />
        </motion.div>

      </div>

    </motion.header>
  );
}