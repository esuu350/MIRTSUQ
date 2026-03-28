"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <Link href="#home" className="relative w-24 h-12">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blackshirt%20front-XdLDhSr1hRDFA0ioVCoC2wOl1AYNTp.png"
            alt="Mirt Suq Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="#about"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
          >
            About Us
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-300"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}
