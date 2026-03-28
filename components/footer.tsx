import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link href="#home" className="relative w-20 h-10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blackshirt%20front-XdLDhSr1hRDFA0ioVCoC2wOl1AYNTp.png"
              alt="Mirt Suq Logo"
              fill
              className="object-contain"
            />
          </Link>

          {/* Quick Links */}
          <div className="flex items-center gap-6">
            <Link
              href="#home"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="#about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="#contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Mirt Suq. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
