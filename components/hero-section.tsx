"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Phone } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Mobile: Black background with logo */}
      <div className="absolute inset-0 z-0 md:hidden bg-background flex items-center justify-center">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-eDcoIUtJGHqS6Xek76QJejOLSdSM4B.png"
          alt="Mirt Suq Logo"
          width={280}
          height={280}
          className="opacity-20"
          priority
        />
      </div>

      {/* Desktop: Video Background */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105"
        >
          <source
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/video-NZUMiExYy366PRgEPG3NlI0pdtYVUb.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      </div>

      {/* Content - Left aligned */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6 tracking-tight">
            Trending Gadgets.
            <br />
            <span className="text-primary">Smart Life.</span>
          </h1>
          
          <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 text-pretty max-w-md">
            Discover the latest in tech innovation. Premium gadgets at prices that make sense.
          </p>
          
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105"
          >
            <a href="tel:0976700070" className="inline-flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Shop Now
            </a>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <button
          onClick={scrollToAbout}
          className="p-3 rounded-full border border-foreground/20 hover:border-primary transition-colors duration-300"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-5 h-5 text-foreground/60" />
        </button>
      </div>
    </section>
  )
}
